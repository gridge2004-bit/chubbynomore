import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const filtersSchema = z.object({
  search: z.string().trim().max(120).optional(),
  state: z.string().trim().max(2).optional(),
  outcome: z.string().trim().max(40).optional(),
  funnelStatus: z.string().trim().max(60).optional(),
  marketingConsent: z.enum(["yes", "no"]).optional(),
  from: z.string().max(40).optional(),
  to: z.string().max(40).optional(),
  sort: z.enum(["newest", "oldest"]).default("newest"),
  page: z.number().int().min(1).max(10000).default(1),
});

const idSchema = z.object({ leadId: z.string().uuid() });

/** Current admin session: role, capabilities and MFA state. */
export const getAdminSession = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const m = await import("@/lib/admin.server");
    try {
      const s = await m.resolveAdmin(context);
      return {
        status: "ok" as const,
        role: s.role,
        capabilities: s.capabilities,
        mfaRequired: await m.requireAdminMfa(),
      };
    } catch (error) {
      if (error instanceof m.AccessDenied) {
        return {
          status: error.code,
          role: null,
          capabilities: null,
          mfaRequired: await m.requireAdminMfa(),
        };
      }
      return {
        status: "denied" as const,
        role: null,
        capabilities: null,
        mfaRequired: await m.requireAdminMfa(),
      };
    }
  });

export const listCustomers = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => filtersSchema.parse(data))
  .handler(async ({ data, context }) => {
    const m = await import("@/lib/admin.server");
    const session = await m.resolveAdmin(context);
    const result = await m.listCustomers(session, context, data);
    await m.audit({
      adminUserId: session.userId,
      adminRole: session.role,
      event: "customer_list_viewed",
      route: "/admin/customers",
      sessionId: session.sessionId,
    });
    return result;
  });

export const getCustomer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data, context }) => {
    const m = await import("@/lib/admin.server");
    const session = await m.resolveAdmin(context);
    const record = await m.getCustomer(session, context, data.leadId);
    await m.audit({
      adminUserId: session.userId,
      adminRole: session.role,
      event: "customer_record_viewed",
      targetRecordId: data.leadId,
      route: "/admin/customers/:leadId",
      sessionId: session.sessionId,
    });
    return record;
  });

export const revealCustomerContact = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data, context }) => {
    const m = await import("@/lib/admin.server");
    const session = await m.resolveAdmin(context);
    const revealed = await m.revealContact(session, context, data.leadId);
    await m.audit({
      adminUserId: session.userId,
      adminRole: session.role,
      event: "sensitive_fields_revealed",
      targetRecordId: data.leadId,
      route: "/admin/customers/:leadId",
      sessionId: session.sessionId,
    });
    return revealed;
  });

/** Security page data: identity + MFA state + recent activity. Works pre-MFA. */
export const getSecurityOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const m = await import("@/lib/admin.server");
    const identity = await m.resolveAdminIdentity(context);
    let recent: Array<{
      event_type: string;
      created_at: string;
      success: boolean;
      route: string | null;
    }> = [];
    if (identity.aal === "aal2" || !identity.mfaRequired) {
      const { data } = await context.supabase
        .from("audit_logs")
        .select("event_type, created_at, success, route")
        .eq("admin_user_id", context.userId)
        .order("created_at", { ascending: false })
        .limit(20);
      recent = data ?? [];
    }
    return { ...identity, recent };
  });

/** Owner-only audit log feed. */
export const listAuditLogs = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const m = await import("@/lib/admin.server");
    const session = await m.resolveAdmin(context);
    if (!session.capabilities.auditLogs) throw new m.AccessDenied();
    const { data } = await context.supabase
      .from("audit_logs")
      .select("id, admin_user_id, admin_role, event_type, target_record_id, route, success, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    return data ?? [];
  });

/** Records login / logout / denial events. Auth required. */
export const recordAdminEvent = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({ event: z.enum(["login_success", "logout", "export_attempted"]) })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    const m = await import("@/lib/admin.server");
    const b = await import("@/lib/admin-bootstrap.server");
    const identity = await m.resolveAdminIdentity(context).catch(() => null);
    if (data.event === "login_success" && identity) await b.touchLastLogin(context.userId);
    await m.audit({
      adminUserId: context.userId,
      adminRole: identity?.role ?? null,
      event: data.event,
      route: "/admin",
      sessionId: identity?.sessionId ?? null,
    });
    return { ok: true };
  });
