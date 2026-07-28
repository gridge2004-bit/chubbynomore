-- ============ CLINICAL INTAKE (separate from marketing lead data) ============
CREATE TABLE public.clinical_intakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  status text NOT NULL DEFAULT 'clinical_started'
    CHECK (status IN ('clinical_started','clinical_in_progress','clinical_completed','submitted_for_provider_review')),
  current_step text,
  last_completed_step text,
  -- Administrative + clinical answers. Never mirrored into marketing tables.
  answers jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- Identity verification for resume (never returned to the client).
  verify_last_name text,
  verify_dob date,
  -- Resume token is stored hashed; the raw token is shown to the user once.
  resume_token_hash text UNIQUE,
  resume_token_expires_at timestamptz,
  resume_attempts integer NOT NULL DEFAULT 0,
  provider_review_status text NOT NULL DEFAULT 'not_submitted'
    CHECK (provider_review_status IN ('not_submitted','pending_provider_integration','submitted','under_review','decision_returned')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  last_activity_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  submitted_at timestamptz
);

-- Non-clinical activity log (no health answers may be written here).
CREATE TABLE public.intake_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  intake_id uuid REFERENCES public.clinical_intakes(id) ON DELETE CASCADE,
  lead_id uuid REFERENCES public.leads(id) ON DELETE SET NULL,
  event text NOT NULL
    CHECK (event IN ('clinical_started','clinical_step_saved','clinical_resumed','clinical_resume_denied','clinical_completed','submitted_for_provider_review')),
  step text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Least privilege: trusted server code only. No anon / authenticated grants.
REVOKE ALL ON public.clinical_intakes FROM anon, authenticated;
REVOKE ALL ON public.intake_events FROM anon, authenticated;
GRANT ALL ON public.clinical_intakes TO service_role;
GRANT ALL ON public.intake_events TO service_role;

ALTER TABLE public.clinical_intakes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intake_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages clinical intakes"
  ON public.clinical_intakes FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY "Service role manages intake events"
  ON public.intake_events FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE INDEX idx_clinical_intakes_lead ON public.clinical_intakes(lead_id);
CREATE INDEX idx_clinical_intakes_token ON public.clinical_intakes(resume_token_hash);
CREATE INDEX idx_intake_events_intake ON public.intake_events(intake_id);

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER clinical_intakes_touch
  BEFORE UPDATE ON public.clinical_intakes
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============ MARKETING LEAD: funnel stages + link to intake ============
ALTER TABLE public.leads
  ADD COLUMN clinical_intake_id uuid REFERENCES public.clinical_intakes(id) ON DELETE SET NULL,
  ADD COLUMN funnel_completed_at timestamptz;

ALTER TABLE public.leads
  ADD CONSTRAINT leads_funnel_status_check CHECK (funnel_status IN (
    'quiz_started','quiz_completed','contact_captured',
    'clinical_started','clinical_in_progress','clinical_completed',
    'submitted_for_provider_review'
  ));