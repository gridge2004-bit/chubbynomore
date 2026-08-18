ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS last_completed_step text,
  ADD COLUMN IF NOT EXISTS partial_captured_at timestamp with time zone;