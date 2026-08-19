import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const CONSENT_TEXT_VERSION = "2026-07-28.v1";

const usStates = /^[A-Z]{2}$/;

const leadSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(10).max(25),
  state: z.string().trim().regex(usStates),
  operationalConsent: z.literal(true),
  marketingConsent: z.boolean(),
  consentTextVersion: z.string().max(64),
  funnelSource: z.string().max(80).optional(),
  referringPage: z.string().max(500).optional(),
  utm: z
    .object({
      source: z.string().max(200).optional(),
      medium: z.string().max(200).optional(),
      campaign: z.string().max(200).optional(),
      term: z.string().max(200).optional(),
      content: z.string().max(200).optional(),
    })
    .optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

/**
 * Creates a recoverable lead record. Contact + consent data only —
 * never clinical / health questionnaire answers.
 */
export const createLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const now = new Date().toISOString();

    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        state: data.state,
        funnel_source: data.funnelSource ?? "website_intake",
        referring_page: data.referringPage ?? null,
        utm_source: data.utm?.source ?? null,
        utm_medium: data.utm?.medium ?? null,
        utm_campaign: data.utm?.campaign ?? null,
        utm_term: data.utm?.term ?? null,
        utm_content: data.utm?.content ?? null,
        funnel_status: "contact_captured",
        operational_consent: true,
        operational_consent_at: now,
        marketing_consent: data.marketingConsent,
        marketing_consent_at: data.marketingConsent ? now : null,
        marketing_sync_provider: data.marketingConsent ? "launchlist" : null,
        marketing_sync_status: data.marketingConsent
          ? "pending"
          : "not_requested",
        marketing_sync_attempted_at: data.marketingConsent ? now : null,
        consent_text_version: data.consentTextVersion,
        last_activity_at: now,
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error("[leads] insert failed", error?.message);
      throw new Error("We couldn't save your information. Please try again.");
    }

    const leadId = row.id as string;

    // Marketing sync is strictly opt-in and never blocks the funnel.
    let marketingSyncStatus:
      | "not_requested"
      | "pending"
      | "synced"
      | "failed" = "not_requested";

    if (data.marketingConsent) {
      marketingSyncStatus = "pending";
      let errorCode: string | null = null;
      try {
        const { sendToLaunchList } = await import("@/lib/launchlist.server");
        const result = await sendToLaunchList({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email.toLowerCase(),
          phone: data.phone,
          marketingConsentAt: now,
          consentTextVersion: data.consentTextVersion,
          source: "website_intake",
        });
        if (result.forwarded) {
          marketingSyncStatus = "synced";
        } else {
          marketingSyncStatus = "failed";
          errorCode = result.errorCode;
        }
      } catch (err) {
        marketingSyncStatus = "failed";
        errorCode = "unexpected_error";
        console.error(
          "[launchlist] unexpected error",
          err instanceof Error ? err.message : "unknown",
        );
      }

      const completedAt = new Date().toISOString();
      const { error: syncError } = await supabaseAdmin
        .from("leads")
        .update({
          marketing_sync_provider: "launchlist",
          marketing_sync_status: marketingSyncStatus,
          marketing_sync_attempted_at: now,
          marketing_sync_completed_at:
            marketingSyncStatus === "synced" ? completedAt : null,
          marketing_sync_error_code: errorCode,
        })
        .eq("id", leadId);
      if (syncError) {
        console.error("[leads] sync status update failed", syncError.message);
      }
    }

    return {
      leadId,
      funnelStatus: "contact_captured",
      marketingSyncStatus,
    };
  });

/* ───────────── partial (progressive) lead capture ───────────── */

const partialLeadSchema = z.object({
  leadId: z.string().uuid().nullable().optional(),
  firstName: z.string().trim().max(80).optional(),
  lastName: z.string().trim().max(80).optional(),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(10).max(25),
  lastCompletedStep: z.string().trim().max(60),
  funnelSource: z.string().max(80).optional(),
  referringPage: z.string().max(500).optional(),
});

export type PartialLeadInput = z.infer<typeof partialLeadSchema>;

/**
 * Saves/updates a recoverable partial lead as soon as email + phone exist.
 * Contact data only — never clinical answers, never marketing sync.
 */
const CHECK_CONSTRAINT = "23514";
const FALLBACK_STATUS = "contact_captured";

function isTransient(err: unknown) {
  const msg = err instanceof Error ? err.message : String(err ?? "");
  return /fetch failed|network|ETIMEDOUT|ECONNRESET|socket hang up|timeout|503|502|504/i.test(
    msg,
  );
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const savePartialLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => partialLeadSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );
    const now = new Date().toISOString();
    const email = data.email.toLowerCase();

    const base = {
      email,
      phone: data.phone,
      last_completed_step: data.lastCompletedStep,
      last_activity_at: now,
    };

    let leadId = data.leadId ?? null;

    if (!leadId) {
      const { data: existing } = await supabaseAdmin
        .from("leads")
        .select("id")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      leadId = (existing?.id as string | undefined) ?? null;
    }

    if (leadId) {
      const update = () =>
        supabaseAdmin
          .from("leads")
          .update({
            ...base,
            ...(data.firstName ? { first_name: data.firstName } : {}),
            ...(data.lastName ? { last_name: data.lastName } : {}),
          })
          .eq("id", leadId as string);

      let { error } = await update();
      if (error && isTransient(error)) {
        console.warn("[lead-capture] transient update failure, retrying once");
        await sleep(1500);
        ({ error } = await update());
      }
      if (error) {
        console.error("[lead-capture] partial update failed", error.message);
        throw new Error("We couldn't save your progress. Please try again.");
      }
      return { leadId, funnelStatus: "partial_contact" as const };
    }

    const insert = (funnelStatus: string) =>
      supabaseAdmin
        .from("leads")
        .insert({
          ...base,
          first_name: data.firstName || "",
          last_name: data.lastName || "",
          state: "",
          funnel_source: data.funnelSource ?? "website_intake",
          referring_page: data.referringPage ?? null,
          funnel_status: funnelStatus,
          operational_consent: false,
          marketing_consent: false,
          marketing_sync_status: "not_requested",
          consent_text_version: CONSENT_TEXT_VERSION,
          partial_captured_at: now,
        })
        .select("id")
        .single();

    let status = "partial_contact";
    let { data: row, error } = await insert(status);

    // Transient (network/timeout) failures: exactly one retry with backoff.
    if (error && isTransient(error)) {
      console.warn("[lead-capture] transient insert failure, retrying once");
      await sleep(1500);
      ({ data: row, error } = await insert(status));
    }

    // Constraint rejects 'partial_contact': keep the lead, downgrade the status.
    if (error && error.code === CHECK_CONSTRAINT) {
      console.warn(
        `[lead-capture] funnel_status check constraint rejected '${status}', falling back to '${FALLBACK_STATUS}'`,
        error.message,
      );
      status = FALLBACK_STATUS;
      ({ data: row, error } = await insert(status));
    }

    if (error || !row) {
      console.error("[lead-capture] partial insert failed", error?.message);
      throw new Error("We couldn't save your progress. Please try again.");
    }

    return {
      leadId: row.id as string,
      funnelStatus: status as "partial_contact" | "contact_captured",
    };
  });
