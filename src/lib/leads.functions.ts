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
        funnel_source: data.funnelSource ?? "homepage_quiz",
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
        consent_text_version: data.consentTextVersion,
        last_activity_at: now,
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error("[leads] insert failed", error?.message);
      throw new Error("We couldn't save your information. Please try again.");
    }

    return { leadId: row.id as string, funnelStatus: "contact_captured" };
  });
