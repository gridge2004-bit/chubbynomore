import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/**
 * Clinical intake persistence.
 *
 * Boundaries enforced here:
 *  - Clinical answers live ONLY in `clinical_intakes` (service-role only, RLS on).
 *    They are never written to `leads` or any marketing surface.
 *  - The raw resume token is returned to the caller once; only its SHA-256 hash
 *    is stored, so a database reader cannot resume an intake.
 *  - Resuming requires the token AND an identity check (last name + date of birth).
 *  - Errors returned to the client are generic; details stay in server logs and
 *    never include answer content.
 */

const RESUME_TTL_HOURS = 72;
const MAX_RESUME_ATTEMPTS = 10;

/** Marketing-safe funnel stages mirrored onto the lead record. */
const FUNNEL_STATUSES = [
  "quiz_started",
  "quiz_completed",
  "contact_captured",
  "clinical_started",
  "clinical_in_progress",
  "clinical_completed",
  "submitted_for_provider_review",
] as const;

const answersSchema = z.record(z.string().max(80), z.union([z.string().max(5000), z.boolean()]));

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function hashToken(token: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

async function admin() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

const genericError = () =>
  new Error("We couldn't save your progress. Please try again in a moment.");

/** Records a non-clinical funnel event. Never receives answer content. */
async function logEvent(
  db: Awaited<ReturnType<typeof admin>>,
  intakeId: string | null,
  leadId: string | null,
  event: string,
  step?: string | null,
) {
  await db.from("intake_events").insert({
    intake_id: intakeId,
    lead_id: leadId,
    event,
    step: step ?? null,
  });
}

async function setLeadStage(
  db: Awaited<ReturnType<typeof admin>>,
  leadId: string | null,
  status: (typeof FUNNEL_STATUSES)[number],
  extra: Record<string, unknown> = {},
) {
  if (!leadId) return;
  await db
    .from("leads")
    .update({ funnel_status: status, last_activity_at: new Date().toISOString(), ...extra })
    .eq("id", leadId);
}

/* ───────────────────────── start ───────────────────────── */

export const startClinicalIntake = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ leadId: z.string().uuid().nullable().optional() }).parse(data),
  )
  .handler(async ({ data }) => {
    const db = await admin();
    const token = randomToken();
    const expires = new Date(Date.now() + RESUME_TTL_HOURS * 3600 * 1000).toISOString();

    const { data: row, error } = await db
      .from("clinical_intakes")
      .insert({
        lead_id: data.leadId ?? null,
        status: "clinical_started",
        current_step: "identity",
        resume_token_hash: await hashToken(token),
        resume_token_expires_at: expires,
      })
      .select("id")
      .single();

    if (error || !row) {
      console.error("[intake] start failed", error?.message);
      throw genericError();
    }

    await logEvent(db, row.id, data.leadId ?? null, "clinical_started", "identity");
    await setLeadStage(db, data.leadId ?? null, "clinical_started", {
      clinical_intake_id: row.id,
    });

    return { intakeId: row.id as string, resumeToken: token, resumeExpiresAt: expires };
  });

/* ───────────────────────── save progress ───────────────────────── */

export const saveIntakeProgress = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        intakeId: z.string().uuid(),
        resumeToken: z.string().length(64),
        currentStep: z.string().max(60),
        lastCompletedStep: z.string().max(60).nullable(),
        answers: answersSchema,
        completed: z.boolean().optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: row, error } = await db
      .from("clinical_intakes")
      .select("id, lead_id, resume_token_hash, resume_token_expires_at")
      .eq("id", data.intakeId)
      .maybeSingle();

    if (error) {
      console.error("[intake] save lookup failed", error.message);
      throw genericError();
    }
    if (
      !row ||
      row.resume_token_hash !== (await hashToken(data.resumeToken)) ||
      !row.resume_token_expires_at ||
      new Date(row.resume_token_expires_at) < new Date()
    ) {
      throw new Error("This session is no longer valid. Please start again.");
    }

    // Identity-verification values are derived server-side from the answers.
    const lastName = typeof data.answers.legal_last_name === "string" ? data.answers.legal_last_name.trim().toLowerCase() : null;
    const dobRaw = typeof data.answers.date_of_birth === "string" ? data.answers.date_of_birth : null;
    const dob = dobRaw && /^\d{4}-\d{2}-\d{2}$/.test(dobRaw) ? dobRaw : null;

    const now = new Date().toISOString();
    const status = data.completed ? "clinical_completed" : "clinical_in_progress";

    const { error: updateError } = await db
      .from("clinical_intakes")
      .update({
        answers: data.answers,
        current_step: data.currentStep,
        last_completed_step: data.lastCompletedStep,
        status,
        last_activity_at: now,
        completed_at: data.completed ? now : null,
        ...(lastName ? { verify_last_name: lastName } : {}),
        ...(dob ? { verify_dob: dob } : {}),
      })
      .eq("id", data.intakeId);

    if (updateError) {
      console.error("[intake] save failed", updateError.message);
      throw genericError();
    }

    await logEvent(
      db,
      data.intakeId,
      row.lead_id,
      data.completed ? "clinical_completed" : "clinical_step_saved",
      data.currentStep,
    );
    await setLeadStage(
      db,
      row.lead_id,
      data.completed ? "clinical_completed" : "clinical_in_progress",
      data.completed ? { funnel_completed_at: now } : {},
    );

    return { saved: true, status };
  });

/* ───────────────────────── resume ───────────────────────── */

export const resumeIntake = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z
      .object({
        resumeToken: z.string().length(64),
        lastName: z.string().trim().min(1).max(80),
        dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    const db = await admin();
    const { data: row, error } = await db
      .from("clinical_intakes")
      .select(
        "id, lead_id, answers, current_step, last_completed_step, status, verify_last_name, verify_dob, resume_token_expires_at, resume_attempts",
      )
      .eq("resume_token_hash", await hashToken(data.resumeToken))
      .maybeSingle();

    if (error) {
      console.error("[intake] resume lookup failed", error.message);
      throw genericError();
    }

    // Same message for unknown, expired, and locked tokens — no enumeration.
    const invalid = new Error(
      "This link is no longer valid or the details didn't match. Please start a new assessment.",
    );
    if (!row) throw invalid;
    if (!row.resume_token_expires_at || new Date(row.resume_token_expires_at) < new Date()) {
      throw invalid;
    }
    if (row.resume_attempts >= MAX_RESUME_ATTEMPTS) throw invalid;

    const matches =
      row.verify_last_name === data.lastName.trim().toLowerCase() &&
      row.verify_dob === data.dateOfBirth;

    if (!matches) {
      await db
        .from("clinical_intakes")
        .update({ resume_attempts: row.resume_attempts + 1 })
        .eq("id", row.id);
      await logEvent(db, row.id, row.lead_id, "clinical_resume_denied");
      throw invalid;
    }

    const now = new Date().toISOString();
    await db
      .from("clinical_intakes")
      .update({ resume_attempts: 0, last_activity_at: now })
      .eq("id", row.id);
    await logEvent(db, row.id, row.lead_id, "clinical_resumed", row.current_step);

    return {
      intakeId: row.id as string,
      answers: (row.answers ?? {}) as Record<string, string | boolean>,
      currentStep: row.current_step as string | null,
      lastCompletedStep: row.last_completed_step as string | null,
      status: row.status as string,
    };
  });

/* ───────────────────────── provider submission ───────────────────────── */

/**
 * No provider API / clinical portal integration exists yet, so production
 * submission is intentionally disabled. This never claims success and never
 * forwards clinical content anywhere.
 */
export const PROVIDER_INTEGRATION_CONNECTED = false;

export const PROVIDER_INTEGRATION_REQUIREMENTS = [
  "A licensed-provider review destination (EHR/clinical portal or provider API) with its base URL, auth method, and payload contract",
  "A signed BAA with that destination and with every processor in the path",
  "An approved clinical questionnaire so there are clinical answers to transmit",
  "A mapping from intake fields to the destination's required schema",
  "A returned review decision (webhook or polling) plus its status vocabulary",
  "Transmission audit logging and retry/failure handling for clinical payloads",
  "Outbound email delivery for resume links (currently the link is shown on screen only)",
];

export const submitIntakeForProviderReview = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) =>
    z.object({ intakeId: z.string().uuid(), resumeToken: z.string().length(64) }).parse(data),
  )
  .handler(async ({ data }) => {
    if (!PROVIDER_INTEGRATION_CONNECTED) {
      // Mark intent only; nothing is transmitted and nothing is claimed as submitted.
      const db = await admin();
      await db
        .from("clinical_intakes")
        .update({ provider_review_status: "pending_provider_integration" })
        .eq("id", data.intakeId);
      return {
        submitted: false,
        reason: "provider_integration_not_connected" as const,
        requirements: PROVIDER_INTEGRATION_REQUIREMENTS,
      };
    }
    // Real transmission is implemented once the destination contract exists.
    return { submitted: false, reason: "provider_integration_not_connected" as const, requirements: PROVIDER_INTEGRATION_REQUIREMENTS };
  });
