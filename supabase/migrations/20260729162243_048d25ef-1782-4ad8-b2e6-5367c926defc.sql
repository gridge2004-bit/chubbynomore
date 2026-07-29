CREATE TABLE public.screening_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
  questionnaire_version text NOT NULL DEFAULT '2026-07-29.v1',
  is_adult text,
  prior_glp1_use text,
  health_conditions text[] NOT NULL DEFAULT '{}',
  height_feet integer,
  height_inches integer,
  weight_pounds integer,
  calculated_bmi numeric(5,1),
  bmi_category text,
  weight_related_condition_response text,
  screening_outcome text NOT NULL,
  screening_started_at timestamptz,
  screening_completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  consent_to_store_screening_data boolean NOT NULL DEFAULT false,
  screening_consent_text_version text,
  screening_consent_timestamp timestamptz
);

GRANT ALL ON public.screening_responses TO service_role;

ALTER TABLE public.screening_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages screening responses"
  ON public.screening_responses FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE INDEX screening_responses_lead_id_idx ON public.screening_responses(lead_id);
CREATE INDEX screening_responses_created_at_idx ON public.screening_responses(created_at);

CREATE TRIGGER screening_responses_touch_updated_at
  BEFORE UPDATE ON public.screening_responses
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE TABLE public.retention_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key text NOT NULL UNIQUE,
  retention_days integer,
  description text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.retention_settings TO service_role;

ALTER TABLE public.retention_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages retention settings"
  ON public.retention_settings FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE TRIGGER retention_settings_touch_updated_at
  BEFORE UPDATE ON public.retention_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

INSERT INTO public.retention_settings (setting_key, retention_days, description) VALUES
  ('incomplete_screening_submissions', 180, 'Screening responses with no completion timestamp. Review before enabling automated deletion.'),
  ('completed_screening_submissions', 730, 'Completed screening responses. Review before enabling automated deletion.'),
  ('leads_never_continued', 365, 'Leads that never progressed past contact capture.'),
  ('deletion_requests', 30, 'Maximum days to fulfil a verified deletion request.');