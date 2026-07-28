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
