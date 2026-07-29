import { z } from "zod";

/** Client-safe validation schema for a complete questionnaire submission. */

const HEALTH_CONDITION_MAX = 200;

export const screeningSubmissionSchema = z.object({
  contact: z.object({
    firstName: z.string().trim().min(1).max(80),
    lastName: z.string().trim().min(1).max(80),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().min(10).max(25),
    state: z
      .string()
      .trim()
      .regex(/^[A-Z]{2}$/),
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
  }),
  screening: z.object({
    isAdult: z.enum(["yes", "no"]),
    priorGlp1Use: z.enum(["yes", "no", "unsure"]).optional(),
    healthConditions: z.array(z.string().max(HEALTH_CONDITION_MAX)).max(20),
    heightFeet: z.number().int().min(3).max(8).optional(),
    heightInches: z.number().int().min(0).max(11).optional(),
    weightPounds: z.number().int().min(70).max(800).optional(),
    weightRelatedConditionResponse: z.enum(["yes", "no", "unsure"]).optional(),
    startedAt: z.string().datetime().optional(),
    completedAt: z.string().datetime().optional(),
    // Required acknowledgment before health information is stored.
    consentToStoreScreeningData: z.literal(true),
    screeningConsentTextVersion: z.string().max(64),
  }),
});

export type ScreeningSubmissionInput = z.infer<typeof screeningSubmissionSchema>;
