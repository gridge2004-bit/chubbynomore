-- Reduce elevated-privilege surface: this helper only needs the caller's own row,
-- which the "Admins read own profile" policy already exposes.
DROP FUNCTION IF EXISTS public.current_admin_role();
CREATE OR REPLACE FUNCTION public.current_admin_role()
RETURNS public.admin_role
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = public
AS $$
  SELECT role FROM public.admin_profiles
  WHERE user_id = auth.uid() AND status = 'active'
$$;
REVOKE ALL ON FUNCTION public.current_admin_role() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.current_admin_role() TO authenticated, service_role;

CREATE TABLE public.admin_allowlist (
  email text PRIMARY KEY,
  role public.admin_role NOT NULL DEFAULT 'owner',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.admin_allowlist TO service_role;
ALTER TABLE public.admin_allowlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role manages admin allowlist" ON public.admin_allowlist
FOR ALL TO service_role USING (true) WITH CHECK (true);

INSERT INTO public.admin_allowlist (email, role) VALUES
  ('greg@chubbynomore.com', 'owner'),
  ('scott@chubbynomore.com', 'owner');