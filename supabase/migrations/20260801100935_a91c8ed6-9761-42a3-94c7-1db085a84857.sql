DROP FUNCTION IF EXISTS public.is_admin_aal2(admin_role[]);

REVOKE EXECUTE ON FUNCTION public.current_admin_role() FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.require_admin_mfa() FROM anon, authenticated, public;
GRANT EXECUTE ON FUNCTION public.current_admin_role() TO service_role;
GRANT EXECUTE ON FUNCTION public.require_admin_mfa() TO service_role;