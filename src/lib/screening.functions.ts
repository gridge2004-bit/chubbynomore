import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { screeningSubmissionSchema } from "@/lib/screening-schema";

/**
 * Single entry point for questionnaire submissions.
 *
 * Order: validate -> create/reuse lead -> store screening response ->
 * confirm both writes -> optional marketing sync. The caller only shows
 * the success card once this resolves successfully.
 */
export const submitScreening = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => screeningSubmissionSchema.parse(data))
  .handler(async ({ data }) => {
    const { runScreeningSubmission } = await import("@/lib/screening-run.server");
    return runScreeningSubmission(data);
  });

/** Operational counts only — never returns user information. */
export const getScreeningRowCounts = createServerFn({ method: "GET" }).handler(
  async () => {
    const { screeningRowCounts } = await import("@/lib/screening-run.server");
    return screeningRowCounts();
  },
);

export type ScreeningSubmission = z.infer<typeof screeningSubmissionSchema>;
