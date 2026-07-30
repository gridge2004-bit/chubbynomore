/**
 * Screening submission runner (server-only).
 *
 * PRIVACY: no questionnaire answers, height, weight, BMI, conditions, or
 * outcomes are ever logged here. Only ids, counts, and error codes.
 */
import type { ScreeningSubmissionInput } from "@/lib/screening-schema";
import {
  QUESTIONNAIRE_VERSION,
  bmiCategory,
  calculateBmi,
  logServerEvent,
  newRequestId,
  rateLimitOk,
  screeningStorageAllowed,
  type ScreeningOutcome,
} from "@/lib/screening.server";

/** Conditions that always route to provider review, regardless of BMI. */
const REVIEW_REQUIRED = [
  "I or a family member have had medullary thyroid carcinoma",
  "I or a family member have Multiple Endocrine Neoplasia syndrome type 2, also called MEN 2",
  "I have had a serious allergic reaction to semaglutide, tirzepatide, or another GLP-1 medication",
  "I am pregnant, planning to become pregnant soon, or currently breastfeeding",
  "I am undergoing fertility treatment or expect to begin fertility treatment soon",
];

/** Screening routing only. Not a diagnosis or eligibility determination. */
function deriveOutcome(
  screening: ScreeningSubmissionInput["screening"],
  bmi: number | null,
): ScreeningOutcome {
  if (screening.isAdult === "no") return "adults_only";
  if (bmi === null) return "provider_review";
  if (bmi < 18.5) return "safety_path";
  if (bmi < 27) return "alternative_path";
  const flagged = screening.healthConditions.some((c) =>
    REVIEW_REQUIRED.includes(c),
  );
  if (flagged) return "provider_review";
  if (bmi >= 30) return "possible_fit";
  return screening.weightRelatedConditionResponse === "yes"
    ? "possible_fit"
    : "provider_review";
}

export type SubmitResult = {
  leadId: string;
  screeningId: string | null;
  screeningStored: boolean;
  screeningStorageDisabled: boolean;
  marketingSyncStatus: "not_requested" | "pending" | "synced" | "failed";
  duplicate: boolean;
};

export async function runScreeningSubmission(
  data: ScreeningSubmissionInput,
): Promise<SubmitResult> {
  const { contact, screening } = data;
  const email = contact.email.toLowerCase();
  const requestId = newRequestId();
  const FN = "submitScreening";

  if (!rateLimitOk(email)) {
    throw new Error("Too many attempts. Please wait a few minutes and try again.");
  }

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const now = new Date().toISOString();

  // Server-side BMI. A browser-supplied BMI is never accepted.
  const bmi =
    screening.heightFeet !== undefined &&
    screening.heightInches !== undefined &&
    screening.weightPounds !== undefined
      ? calculateBmi(
          screening.heightFeet,
          screening.heightInches,
          screening.weightPounds,
        )
      : null;
  const category = bmiCategory(bmi);
  const outcome = deriveOutcome(screening, bmi);

  /* 1. Create or reuse the lead (duplicate-click protection). */
  const duplicateSince = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const { data: existing } = await supabaseAdmin
    .from("leads")
    .select("id")
    .eq("email", email)
    .gte("created_at", duplicateSince)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const leadPayload = {
    first_name: contact.firstName,
    last_name: contact.lastName,
    email,
    phone: contact.phone,
    state: contact.state,
    funnel_source: contact.funnelSource ?? "website_intake",
    referring_page: contact.referringPage ?? null,
    utm_source: contact.utm?.source ?? null,
    utm_medium: contact.utm?.medium ?? null,
    utm_campaign: contact.utm?.campaign ?? null,
    utm_term: contact.utm?.term ?? null,
    utm_content: contact.utm?.content ?? null,
    funnel_status: "contact_captured",
    operational_consent: true,
    operational_consent_at: now,
    marketing_consent: contact.marketingConsent,
    marketing_consent_at: contact.marketingConsent ? now : null,
    consent_text_version: contact.consentTextVersion,
    last_activity_at: now,
  };

  let leadId: string;
  const duplicate = Boolean(existing?.id);

  if (existing?.id) {
    const { error } = await supabaseAdmin
      .from("leads")
      .update(leadPayload)
      .eq("id", existing.id);
    if (error) {
      logServerEvent({ fn: FN, code: "lead_update_failed", requestId, level: "error" });
      throw new Error("We couldn't save your information. Please try again.");
    }
    leadId = existing.id;
  } else {
    const { data: row, error } = await supabaseAdmin
      .from("leads")
      .insert(leadPayload)
      .select("id")
      .single();
    if (error || !row) {
      logServerEvent({ fn: FN, code: "lead_insert_failed", requestId, level: "error" });
      throw new Error("We couldn't save your information. Please try again.");
    }
    leadId = row.id;
  }

  /* 2. Store the screening response. */
  const storageAllowed = screeningStorageAllowed();
  let screeningId: string | null = null;

  if (storageAllowed) {
    const { data: recent } = await supabaseAdmin
      .from("screening_responses")
      .select("id")
      .eq("lead_id", leadId)
      .gte("created_at", duplicateSince)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    const screeningPayload = {
      lead_id: leadId,
      questionnaire_version: QUESTIONNAIRE_VERSION,
      is_adult: screening.isAdult,
      prior_glp1_use: screening.priorGlp1Use ?? null,
      health_conditions: screening.healthConditions,
      height_feet: screening.heightFeet ?? null,
      height_inches: screening.heightInches ?? null,
      weight_pounds: screening.weightPounds ?? null,
      calculated_bmi: bmi,
      bmi_category: category,
      weight_related_condition_response:
        screening.weightRelatedConditionResponse ?? null,
      screening_outcome: outcome,
      screening_started_at: screening.startedAt ?? null,
      screening_completed_at: screening.completedAt ?? now,
      consent_to_store_screening_data: true,
      screening_consent_text_version: screening.screeningConsentTextVersion,
      screening_consent_timestamp: now,
    };

    if (recent?.id) {
      const { error } = await supabaseAdmin
        .from("screening_responses")
        .update(screeningPayload)
        .eq("id", recent.id);
      if (error) {
        logServerEvent({ fn: FN, code: "screening_update_failed", requestId, level: "error" });
        throw new Error("We couldn't save your questionnaire. Please try again.");
      }
      screeningId = recent.id;
    } else {
      const { data: row, error } = await supabaseAdmin
        .from("screening_responses")
        .insert(screeningPayload)
        .select("id")
        .single();
      if (error || !row) {
        logServerEvent({ fn: FN, code: "screening_insert_failed", requestId, level: "error" });
        throw new Error("We couldn't save your questionnaire. Please try again.");
      }
      screeningId = row.id;
    }

    // Confirm the screening row exists and is linked to the correct lead
    // before anything downstream (marketing sync, success screen) happens.
    const { data: linked, error: verifyError } = await supabaseAdmin
      .from("screening_responses")
      .select("id, lead_id")
      .eq("id", screeningId)
      .maybeSingle();
    if (verifyError || !linked || linked.lead_id !== leadId) {
      logServerEvent({
        fn: FN,
        code: "screening_link_verification_failed",
        requestId,
        level: "error",
      });
      throw new Error(
        "We couldn't save your information. Please try again.",
      );
    }

    const { error: statusError } = await supabaseAdmin
      .from("leads")
      .update({ funnel_status: "screening_saved", last_activity_at: now })
      .eq("id", leadId);
    if (statusError) {
      logServerEvent({
        fn: FN,
        code: "lead_status_update_failed",
        requestId,
        level: "error",
      });
    }

  } else {
    logServerEvent({
      fn: FN,
      code: "screening_storage_disabled",
      requestId,
      level: "error",
    });
    throw new Error(
      "We couldn't save your information. Please try again.",
    );
  }

  /* 3. Optional marketing sync — never blocks, never carries health data. */
  let marketingSyncStatus: SubmitResult["marketingSyncStatus"] = "not_requested";

  if (contact.marketingConsent) {
    marketingSyncStatus = "pending";
    let errorCode: string | null = null;
    try {
      const { sendToLaunchList } = await import("@/lib/launchlist.server");
      const result = await sendToLaunchList({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email,
        phone: contact.phone,
        marketingConsentAt: now,
        consentTextVersion: contact.consentTextVersion,
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
      logServerEvent({
        fn: FN,
        code: "launchlist_unexpected_error",
        requestId,
        level: "error",
      });
    }

    const completedAt = new Date().toISOString();
    await supabaseAdmin
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
  }

  return {
    leadId,
    screeningId,
    screeningStored: storageAllowed,
    screeningStorageDisabled: !storageAllowed,
    marketingSyncStatus,
    duplicate,
  };
}

/** Counts only. No user information is returned. */
export async function screeningRowCounts() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const [leads, screenings, intakes] = await Promise.all([
    supabaseAdmin.from("leads").select("*", { count: "exact", head: true }),
    supabaseAdmin
      .from("screening_responses")
      .select("*", { count: "exact", head: true }),
    supabaseAdmin
      .from("clinical_intakes")
      .select("*", { count: "exact", head: true }),
  ]);
  return {
    leads: leads.count ?? 0,
    screeningResponses: screenings.count ?? 0,
    clinicalIntakes: intakes.count ?? 0,
  };
}
