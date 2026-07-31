CREATE OR REPLACE FUNCTION public.is_admin_aal2(_roles admin_role[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT public.is_aal2() AND EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid() AND status = 'active' AND role = ANY(_roles)
  )
$function$;

CREATE OR REPLACE FUNCTION public.current_admin_role()
RETURNS admin_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT role FROM public.admin_profiles
  WHERE user_id = auth.uid() AND status = 'active'
$function$;

REVOKE ALL ON FUNCTION public.is_admin_aal2(admin_role[]) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.current_admin_role() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_aal2() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin_aal2(admin_role[]) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.current_admin_role() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_aal2() TO authenticated, service_role;