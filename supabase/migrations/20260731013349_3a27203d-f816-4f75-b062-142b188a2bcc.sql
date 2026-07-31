CREATE TABLE IF NOT EXISTS public.admin_security_settings (
  key text PRIMARY KEY,
  enabled boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.admin_security_settings TO service_role;
ALTER TABLE public.admin_security_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role manages admin security settings"
  ON public.admin_security_settings FOR ALL TO service_role USING (true) WITH CHECK (true);

INSERT INTO public.admin_security_settings (key, enabled)
VALUES ('require_admin_mfa', false)
ON CONFLICT (key) DO UPDATE SET enabled = EXCLUDED.enabled, updated_at = now();

CREATE OR REPLACE FUNCTION public.require_admin_mfa()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT coalesce(
    (SELECT enabled FROM public.admin_security_settings WHERE key = 'require_admin_mfa'),
    true
  )
$$;

CREATE OR REPLACE FUNCTION public.is_admin_authorized(_roles admin_role[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE user_id = auth.uid() AND status = 'active' AND role = ANY(_roles)
    )
    AND (NOT public.require_admin_mfa() OR public.is_aal2())
$$;

REVOKE ALL ON FUNCTION public.require_admin_mfa() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_admin_authorized(admin_role[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.require_admin_mfa() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_admin_authorized(admin_role[]) TO authenticated, service_role;

DROP POLICY IF EXISTS "Owner reads all admin profiles" ON public.admin_profiles;
CREATE POLICY "Owner reads all admin profiles" ON public.admin_profiles
  FOR SELECT TO authenticated
  USING (public.is_admin_authorized(ARRAY['owner']::admin_role[]));

DROP POLICY IF EXISTS "Owner reads audit logs" ON public.audit_logs;
CREATE POLICY "Owner reads audit logs" ON public.audit_logs
  FOR SELECT TO authenticated
  USING (public.is_admin_authorized(ARRAY['owner']::admin_role[]));

DROP POLICY IF EXISTS "Owner with MFA reads intake events" ON public.intake_events;
CREATE POLICY "Owner reads intake events" ON public.intake_events
  FOR SELECT TO authenticated
  USING (public.is_admin_authorized(ARRAY['owner']::admin_role[]));

DROP POLICY IF EXISTS "Clinical roles with MFA read intakes" ON public.clinical_intakes;
CREATE POLICY "Clinical roles read intakes" ON public.clinical_intakes
  FOR SELECT TO authenticated
  USING (public.is_admin_authorized(ARRAY['owner','clinical_reviewer']::admin_role[]));

DROP POLICY IF EXISTS "Clinical roles with MFA read screening" ON public.screening_responses;
CREATE POLICY "Clinical roles read screening" ON public.screening_responses
  FOR SELECT TO authenticated
  USING (public.is_admin_authorized(ARRAY['owner','clinical_reviewer']::admin_role[]));

DROP POLICY IF EXISTS "Admins with MFA read leads" ON public.leads;
CREATE POLICY "Admins read leads" ON public.leads
  FOR SELECT TO authenticated
  USING (public.is_admin_authorized(ARRAY['owner','admin','support','clinical_reviewer','read_only']::admin_role[]));