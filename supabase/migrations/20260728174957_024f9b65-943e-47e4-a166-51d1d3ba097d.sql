ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS marketing_sync_provider text,
  ADD COLUMN IF NOT EXISTS marketing_sync_status text NOT NULL DEFAULT 'not_requested',
  ADD COLUMN IF NOT EXISTS marketing_sync_attempted_at timestamptz,
  ADD COLUMN IF NOT EXISTS marketing_sync_completed_at timestamptz,
  ADD COLUMN IF NOT EXISTS marketing_sync_error_code text;

ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_marketing_sync_status_check;
ALTER TABLE public.leads ADD CONSTRAINT leads_marketing_sync_status_check
  CHECK (marketing_sync_status IN ('not_requested','pending','synced','failed'));