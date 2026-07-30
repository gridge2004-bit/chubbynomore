-- Roles
CREATE TYPE public.admin_role AS ENUM ('owner','admin','support','clinical_reviewer','read_only');
CREATE TYPE public.admin_status AS ENUM ('active','disabled','invited');

CREATE TABLE public.admin_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.admin_role NOT NULL DEFAULT 'read_only',
  status public.admin_status NOT NULL DEFAULT 'invited',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  invited_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  last_login_at timestamptz,
  disabled_at timestamptz
);

GRANT SELECT ON public.admin_profiles TO authenticated;
GRANT ALL ON public.admin_profiles TO service_role;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id uuid,
  admin_role public.admin_role,
  event_type text NOT NULL,
  target_record_id uuid,
  route text,
  success boolean NOT NULL DEFAULT true,
  session_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.audit_logs TO authenticated;
GRANT ALL ON public.audit_logs TO service_role;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE INDEX audit_logs_created_at_idx ON public.audit_logs (created_at DESC);
CREATE INDEX audit_logs_admin_idx ON public.audit_logs (admin_user_id, created_at DESC);

-- Helpers (security definer, avoid RLS recursion)
CREATE OR REPLACE FUNCTION public.current_admin_role()
RETURNS public.admin_role
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT role FROM public.admin_profiles
  WHERE user_id = auth.uid() AND status = 'active'
$$;

CREATE OR REPLACE FUNCTION public.is_aal2()
RETURNS boolean
LANGUAGE sql STABLE SET search_path = public
AS $$
  SELECT coalesce(current_setting('request.jwt.claims', true)::jsonb ->> 'aal', '') = 'aal2'
$$;

-- Active admin with completed MFA
CREATE OR REPLACE FUNCTION public.is_admin_aal2(_roles public.admin_role[])
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT public.is_aal2() AND EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid() AND status = 'active' AND role = ANY(_roles)
  )
$$;

REVOKE ALL ON FUNCTION public.current_admin_role() FROM public, anon;
REVOKE ALL ON FUNCTION public.is_admin_aal2(public.admin_role[]) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.current_admin_role() TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.is_admin_aal2(public.admin_role[]) TO authenticated, service_role;

-- admin_profiles policies
CREATE POLICY "Admins read own profile" ON public.admin_profiles
FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE POLICY "Owner reads all admin profiles" ON public.admin_profiles
FOR SELECT TO authenticated
USING (public.is_admin_aal2(ARRAY['owner']::public.admin_role[]));

CREATE POLICY "Service role manages admin profiles" ON public.admin_profiles
FOR ALL TO service_role USING (true) WITH CHECK (true);

-- audit_logs: append-only. Owner may read. No update/delete policies at all.
CREATE POLICY "Owner reads audit logs" ON public.audit_logs
FOR SELECT TO authenticated
USING (public.is_admin_aal2(ARRAY['owner']::public.admin_role[]));

CREATE POLICY "Service role manages audit logs" ON public.audit_logs
FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Customer data: admin read access, MFA required
GRANT SELECT ON public.leads TO authenticated;
GRANT SELECT ON public.screening_responses TO authenticated;
GRANT SELECT ON public.clinical_intakes TO authenticated;
GRANT SELECT ON public.intake_events TO authenticated;

CREATE POLICY "Admins with MFA read leads" ON public.leads
FOR SELECT TO authenticated
USING (public.is_admin_aal2(ARRAY['owner','admin','support','clinical_reviewer','read_only']::public.admin_role[]));

CREATE POLICY "Clinical roles with MFA read screening" ON public.screening_responses
FOR SELECT TO authenticated
USING (public.is_admin_aal2(ARRAY['owner','clinical_reviewer']::public.admin_role[]));

CREATE POLICY "Clinical roles with MFA read intakes" ON public.clinical_intakes
FOR SELECT TO authenticated
USING (public.is_admin_aal2(ARRAY['owner','clinical_reviewer']::public.admin_role[]));

CREATE POLICY "Owner with MFA reads intake events" ON public.intake_events
FOR SELECT TO authenticated
USING (public.is_admin_aal2(ARRAY['owner']::public.admin_role[]));

CREATE TRIGGER admin_profiles_touch BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();