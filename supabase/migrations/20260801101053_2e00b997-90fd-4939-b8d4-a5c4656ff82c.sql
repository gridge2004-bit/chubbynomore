CREATE SCHEMA IF NOT EXISTS private;
GRANT USAGE ON SCHEMA private TO authenticated, service_role;

CREATE OR REPLACE FUNCTION private.is_admin_authorized(_roles public.admin_role[])
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1 FROM public.admin_profiles
      WHERE user_id = auth.uid() AND status = 'active' AND role = ANY(_roles)
    )
    AND (NOT public.require_admin_mfa() OR public.is_aal2())
$function$;

REVOKE EXECUTE ON FUNCTION private.is_admin_authorized(public.admin_role[]) FROM public;
GRANT EXECUTE ON FUNCTION private.is_admin_authorized(public.admin_role[]) TO authenticated, service_role;

DROP POLICY "Owner reads all admin profiles" ON public.admin_profiles;
CREATE POLICY "Owner reads all admin profiles" ON public.admin_profiles
  FOR SELECT TO authenticated
  USING (private.is_admin_authorized(ARRAY['owner'::public.admin_role]));

DROP POLICY "Owner reads audit logs" ON public.audit_logs;
CREATE POLICY "Owner reads audit logs" ON public.audit_logs
  FOR SELECT TO authenticated
  USING (private.is_admin_authorized(ARRAY['owner'::public.admin_role]));

DROP POLICY "Clinical roles read intakes" ON public.clinical_intakes;
CREATE POLICY "Clinical roles read intakes" ON public.clinical_intakes
  FOR SELECT TO authenticated
  USING (private.is_admin_authorized(ARRAY['owner'::public.admin_role, 'clinical_reviewer'::public.admin_role]));

DROP POLICY "Owner reads intake events" ON public.intake_events;
CREATE POLICY "Owner reads intake events" ON public.intake_events
  FOR SELECT TO authenticated
  USING (private.is_admin_authorized(ARRAY['owner'::public.admin_role]));

DROP POLICY "Admins read leads" ON public.leads;
CREATE POLICY "Admins read leads" ON public.leads
  FOR SELECT TO authenticated
  USING (private.is_admin_authorized(ARRAY['owner'::public.admin_role, 'admin'::public.admin_role, 'support'::public.admin_role, 'clinical_reviewer'::public.admin_role, 'read_only'::public.admin_role]));

DROP POLICY "Clinical roles read screening" ON public.screening_responses;
CREATE POLICY "Clinical roles read screening" ON public.screening_responses
  FOR SELECT TO authenticated
  USING (private.is_admin_authorized(ARRAY['owner'::public.admin_role, 'clinical_reviewer'::public.admin_role]));

DROP FUNCTION public.is_admin_authorized(public.admin_role[]);

DO $$
DECLARE c int;
BEGIN
  SET LOCAL ROLE authenticated;
  PERFORM count(*) FROM public.leads;
  RESET ROLE;
END $$;