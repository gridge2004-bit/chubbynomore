REVOKE ALL ON FUNCTION public.is_admin_aal2(admin_role[]) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.is_aal2() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.current_admin_role() FROM PUBLIC, anon;

GRANT EXECUTE ON FUNCTION public.is_admin_aal2(admin_role[]) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_aal2() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.current_admin_role() TO authenticated, service_role;