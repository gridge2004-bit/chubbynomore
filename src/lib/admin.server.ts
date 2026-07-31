/**
 * Server-only admin data access.
 *
 * Every export here assumes it is called from a server function that already
 * ran `requireSupabaseAuth`. Access is enforced twice: once here (role + MFA)
 * and once in the database (RLS policies keyed on `is_admin_aal2`).
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import {
  capabilitiesFor,
  type AdminCapabilities,
  type AdminRole,
} from "@/lib/admin-permissions";

type Client = SupabaseClient<Database>;

export type AdminContext = {
  supabase: Client;
  userId: string;
  claims: Record<string, unknown>;
};

export type AdminSession = {
  userId: string;
  role: AdminRole;
  capabilities: AdminCapabilities;
  sessionId: string | null;
  aal: string;
};

/** Generic failure — never distinguishes "no account" from "not authorized". */
export class AccessDenied extends Error {
  code: "denied" | "mfa_required";
  constructor(code: "denied" | "mfa_required" = "denied") {
    super(code === "mfa_required" ? "MFA_REQUIRED" : "ACCESS_DENIED");
    this.code = code;
  }
}

/**
 * Server-side feature flag: REQUIRE_ADMIN_MFA.
 * Source of truth is the database row `admin_security_settings.require_admin_mfa`
 * (also enforced inside the `is_admin_authorized` RLS helper). Fails closed.
 */
export async function requireAdminMfa(): Promise<boolean> {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("admin_security_settings")
      .select("enabled")
      .eq("key", "require_admin_mfa")
      .maybeSingle();
    if (error || !data) return true;
    return data.enabled;
  } catch {
    return true;
  }
}

export async function resolveAdmin(ctx: AdminContext): Promise<AdminSession> {
  const aal = String(ctx.claims.aal ?? "aal1");
  const sessionId =
    typeof ctx.claims.session_id === "string" ? ctx.claims.session_id : null;

  const { data, error } = await ctx.supabase
    .from("admin_profiles")
    .select("role, status")
    .eq("user_id", ctx.userId)
    .maybeSingle();

  if (error || !data || data.status !== "active") throw new AccessDenied();
  if (aal !== "aal2" && (await requireAdminMfa())) throw new AccessDenied("mfa_required");

  const role = data.role as AdminRole;
  return { userId: ctx.userId, role, capabilities: capabilitiesFor(role), sessionId, aal };
}

/** Admin identity without the MFA requirement (for the security page only). */
export async function resolveAdminIdentity(ctx: AdminContext) {
  const { data } = await ctx.supabase
    .from("admin_profiles")
    .select("role, status, last_login_at, created_at")
    .eq("user_id", ctx.userId)
    .maybeSingle();
  if (!data || data.status !== "active") throw new AccessDenied();
  return {
    role: data.role as AdminRole,
    lastLoginAt: data.last_login_at,
    createdAt: data.created_at,
    aal: String(ctx.claims.aal ?? "aal1"),
    mfaRequired: await requireAdminMfa(),
    sessionId:
      typeof ctx.claims.session_id === "string" ? ctx.claims.session_id : null,
  };
}


export type AuditEvent =
  | "login_success"
  | "login_failure"
  | "logout"
  | "customer_list_viewed"
  | "customer_record_viewed"
  | "sensitive_fields_revealed"
  | "export_attempted"
  | "admin_invited"
  | "admin_disabled"
  | "permission_changed"
  | "access_denied"
  | "admin_mfa_requirement_disabled";

/** Append-only. Contains no names, contact details, or health information. */
export async function audit(input: {
  adminUserId: string | null;
  adminRole: AdminRole | null;
  event: AuditEvent;
  targetRecordId?: string | null;
  route?: string | null;
  success?: boolean;
  sessionId?: string | null;
}) {
  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("audit_logs").insert({
      admin_user_id: input.adminUserId,
      admin_role: input.adminRole,
      event_type: input.event,
      target_record_id: input.targetRecordId ?? null,
      route: input.route ?? null,
      success: input.success ?? true,
      session_id: input.sessionId ?? null,
    });
  } catch {
    // Auditing must never leak details into the response.
  }
}

export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!domain) return "•••";
  const head = user.slice(0, 1);
  return `${head}${"•".repeat(Math.max(3, user.length - 1))}@${domain}`;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 4 ? `••• ••• ${digits.slice(-4)}` : "•••";
}

export type CustomerFilters = {
  search?: string;
  state?: string;
  outcome?: string;
  funnelStatus?: string;
  marketingConsent?: "yes" | "no";
  from?: string;
  to?: string;
  sort?: "newest" | "oldest";
  page?: number;
};

export const PAGE_SIZE = 25;

export async function listCustomers(session: AdminSession, ctx: AdminContext, f: CustomerFilters) {
  const page = Math.max(1, f.page ?? 1);
  const fromRow = (page - 1) * PAGE_SIZE;

  let q = ctx.supabase
    .from("leads")
    .select(
      "id, created_at, first_name, last_name, email, phone, state, funnel_status, marketing_consent, marketing_sync_status, funnel_completed_at",
      { count: "exact" },
    );

  if (f.search) {
    const s = f.search.replace(/[,()%]/g, " ").trim();
    if (s) {
      q = q.or(
        `first_name.ilike.%${s}%,last_name.ilike.%${s}%,email.ilike.%${s}%,phone.ilike.%${s}%`,
      );
    }
  }
  if (f.state) q = q.eq("state", f.state);
  if (f.funnelStatus) q = q.eq("funnel_status", f.funnelStatus);
  if (f.marketingConsent) q = q.eq("marketing_consent", f.marketingConsent === "yes");
  if (f.from) q = q.gte("created_at", f.from);
  if (f.to) q = q.lte("created_at", f.to);

  q = q
    .order("created_at", { ascending: f.sort === "oldest" })
    .range(fromRow, fromRow + PAGE_SIZE - 1);

  const { data, count, error } = await q;
  if (error) throw new Error("Unable to load records");

  let outcomes = new Map<string, string>();
  if (session.capabilities.clinical && data?.length) {
    const { data: rows } = await ctx.supabase
      .from("screening_responses")
      .select("lead_id, screening_outcome")
      .in("lead_id", data.map((d) => d.id));
    outcomes = new Map(
      (rows ?? [])
        .filter((r) => r.lead_id)
        .map((r) => [r.lead_id as string, r.screening_outcome]),
    );
  }

  let items = (data ?? []).map((r) => ({
    id: r.id,
    submittedAt: r.created_at,
    firstName: r.first_name,
    lastName: r.last_name,
    emailMasked: maskEmail(r.email),
    phoneMasked: maskPhone(r.phone),
    state: r.state,
    funnelStatus: r.funnel_status,
    completedAt: r.funnel_completed_at,
    marketingConsent: r.marketing_consent,
    launchlistSync: r.marketing_sync_status,
    screeningOutcome: outcomes.get(r.id) ?? null,
  }));

  if (f.outcome && session.capabilities.clinical) {
    items = items.filter((i) => i.screeningOutcome === f.outcome);
  }

  return { items, page, pageSize: PAGE_SIZE, total: count ?? 0 };
}

export async function getCustomer(session: AdminSession, ctx: AdminContext, leadId: string) {
  const { data: lead, error } = await ctx.supabase
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();
  if (error || !lead) throw new AccessDenied();

  const caps = session.capabilities;

  const contact = caps.contact
    ? {
        firstName: lead.first_name,
        lastName: lead.last_name,
        emailMasked: maskEmail(lead.email),
        phoneMasked: maskPhone(lead.phone),
        state: lead.state,
        submittedAt: lead.created_at,
        lastActivityAt: lead.last_activity_at,
        completedAt: lead.funnel_completed_at,
      }
    : null;

  const consent = caps.consent
    ? {
        operationalConsent: lead.operational_consent,
        operationalConsentAt: lead.operational_consent_at,
        marketingConsent: lead.marketing_consent,
        marketingConsentAt: lead.marketing_consent_at,
        consentTextVersion: lead.consent_text_version,
      }
    : null;

  const attribution = caps.attribution
    ? {
        source: lead.funnel_source,
        referringPage: lead.referring_page,
        utmSource: lead.utm_source,
        utmMedium: lead.utm_medium,
        utmCampaign: lead.utm_campaign,
        utmTerm: lead.utm_term,
        utmContent: lead.utm_content,
      }
    : null;

  let screening = null;
  if (caps.clinical) {
    const { data: s } = await ctx.supabase
      .from("screening_responses")
      .select("*")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false })
      .maybeSingle();
    if (s) {
      screening = {
        questionnaireVersion: s.questionnaire_version,
        isAdult: s.is_adult,
        heightFeet: s.height_feet,
        heightInches: s.height_inches,
        weightPounds: s.weight_pounds,
        bmi: s.calculated_bmi,
        bmiCategory: s.bmi_category,
        priorGlp1Use: s.prior_glp1_use,
        healthConditions: s.health_conditions,
        weightRelatedConditionResponse: s.weight_related_condition_response,
        screeningOutcome: s.screening_outcome,
        consentToStore: s.consent_to_store_screening_data,
        screeningConsentVersion: s.screening_consent_text_version,
        completedAt: s.screening_completed_at,
      };
    }
  }

  let clinical = null;
  if (caps.clinical) {
    const { data: c } = await ctx.supabase
      .from("clinical_intakes")
      .select("id, status, current_step, last_completed_step, provider_review_status, created_at, submitted_at, completed_at")
      .eq("lead_id", leadId)
      .order("created_at", { ascending: false })
      .maybeSingle();
    if (c) clinical = c;
  }

  return {
    id: lead.id,
    funnelStatus: lead.funnel_status,
    launchlistSync: lead.marketing_sync_status,
    contact,
    consent,
    attribution,
    screening,
    clinical,
  };
}

export async function revealContact(session: AdminSession, ctx: AdminContext, leadId: string) {
  if (!session.capabilities.contact) throw new AccessDenied();
  const { data, error } = await ctx.supabase
    .from("leads")
    .select("email, phone")
    .eq("id", leadId)
    .maybeSingle();
  if (error || !data) throw new AccessDenied();
  return { email: data.email, phone: data.phone };
}
