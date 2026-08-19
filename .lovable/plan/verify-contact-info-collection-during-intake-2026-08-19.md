# Verify contact-info collection during intake

## Current behavior

The intake form is already configured to collect contact information progressively, before the final submission.

- `src/components/intake/IntakeWizard.tsx` defines a `persistContact` callback (lines 393–425) that is triggered by a 900 ms debounced `useEffect` (lines 427–433) whenever a valid email and a 10‑digit phone are present.
- The effect runs as the user types or advances through steps, saving `step_N_in_progress` as the last completed step.
- It calls `savePartialLead` from `src/lib/leads.functions.ts`, which inserts/updates a row in `public.leads` with:
  - `email`, `phone`, `first_name`, `last_name`
  - `funnel_status = 'partial_contact'`
  - `last_completed_step`
  - `last_activity_at`
  - `partial_captured_at` (on insert)
- If the same email already exists, the function updates the existing lead instead of creating a duplicate.
- The returned `leadId` is stored in `leadIdRef.current` so subsequent saves reuse the same record.
- Marketing sync is explicitly skipped for partial leads; clinical answers are never sent to this function.

## Verification plan

1. Review the code paths in `IntakeWizard.tsx` and `leads.functions.ts` to confirm the logic above is intact and not accidentally disabled.
2. Run a quick end-to-end check in the browser preview: open `/intake`, enter an email and phone, wait one second, and confirm the UI does not block.
3. Query the backend for the most recent `partial_contact` lead rows to confirm a record was created with the expected fields.
4. Report the findings and note any gaps (e.g., whether the partial save is visible in the admin customer list, or if a validation edge case prevents it).

## Expected outcome

A new `partial_contact` lead row exists in `public.leads` as soon as a valid email + phone combination is entered, before the user reaches the final submission step.
