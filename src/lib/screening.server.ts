/**
 * Screening storage helpers (server-only).
 *
 * PRIVACY: nothing in this module may log questionnaire answers, height,
 * weight, BMI, conditions, or the screening outcome. Only opaque ids,
 * error codes, and counts may be logged.
 */

export const QUESTIONNAIRE_VERSION = "2026-07-29.v1";

export const SCREENING_CONSENT_TEXT_VERSION = "2026-07-29.v1";

export const SCREENING_CONSENT_TEXT =
  "I understand that the information I provide will be stored and used to evaluate my request, coordinate next steps, and support the operation of the Chubby No More service. This questionnaire does not guarantee eligibility, treatment, or a prescription.";

export type ScreeningOutcome =
  | "possible_fit"
  | "provider_review"
  | "alternative_path"
  | "safety_path"
  | "adults_only";

export const SCREENING_OUTCOMES: ScreeningOutcome[] = [
  "possible_fit",
  "provider_review",
  "alternative_path",
  "safety_path",
  "adults_only",
];

/** BMI = 703 x weight(lb) / height(in)^2, rounded to one decimal. */
export function calculateBmi(
  heightFeet: number,
  heightInches: number,
  weightPounds: number,
): number | null {
  const totalInches = heightFeet * 12 + heightInches;
  if (!Number.isFinite(totalInches) || totalInches <= 0) return null;
  if (!Number.isFinite(weightPounds) || weightPounds <= 0) return null;
  return Math.round(((703 * weightPounds) / (totalInches * totalInches)) * 10) / 10;
}

/** Screening category only — never a diagnosis. */
export function bmiCategory(bmi: number | null): string | null {
  if (bmi === null) return null;
  if (bmi < 18.5) return "below_screening_range";
  if (bmi < 25) return "standard_range";
  if (bmi < 27) return "elevated_range";
  if (bmi < 30) return "conditional_range";
  return "screening_range_30_plus";
}

/**
 * Production safety gate. Real (non-development) storage of screening health
 * information stays disabled until the project owner explicitly enables it.
 * No BAA is assumed and no HIPAA compliance is claimed.
 */
export function isRealScreeningStorageEnabled(): boolean {
  return process.env.ENABLE_REAL_SCREENING_STORAGE === "true";
}

export function isDevelopmentEnvironment(): boolean {
  const env = process.env.NODE_ENV;
  return env !== "production";
}

export function screeningStorageAllowed(): boolean {
  return isDevelopmentEnvironment() || isRealScreeningStorageEnabled();
}

/* ── Rate limiting + duplicate protection ────────────────────────────
   Per-worker in-memory window. Keyed by a non-reversible hash of the
   email so no contact detail sits in memory in plain text. */

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const attempts = new Map<string, number[]>();

function hashKey(value: string): string {
  let h = 5381;
  for (let i = 0; i < value.length; i += 1) {
    h = ((h << 5) + h + value.charCodeAt(i)) | 0;
  }
  return String(h >>> 0);
}

export function rateLimitOk(email: string): boolean {
  const key = hashKey(email.toLowerCase());
  const now = Date.now();
  const recent = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    attempts.set(key, recent);
    return false;
  }
  recent.push(now);
  attempts.set(key, recent);
  return true;
}

/** Window in which a repeat submission from the same email is treated as a
 *  duplicate click rather than a new screening. */
export const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;
