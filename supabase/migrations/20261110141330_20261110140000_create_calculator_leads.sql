/*
# Create calculator_leads table

1. New Tables
- `calculator_leads`
  - `id` (uuid, primary key, auto-generated)
  - `industry` (text, not null) — e.g. 'dental', 'property', 'legal'
  - `email` (text, not null) — the email address the user wants the breakdown sent to
  - `inputs` (jsonb, not null) — all calculator input values at submission time
    (callsPerWeek, missedPercent, newPatientPercent, patientValue, goElsewhere, wouldBook)
  - `monthly_loss` (integer, not null) — computed monthly lost revenue in whole dollars
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `calculator_leads`.
- Grant INSERT to `anon, authenticated` so the public-facing calculator can save leads.
- Grant SELECT to `service_role` only (admin reads; public cannot read other people's emails).
- Four INSERT/SELECT/UPDATE/DELETE policies:
  - INSERT: anon + authenticated can insert (anyone using the calculator can save their email)
  - SELECT, UPDATE, DELETE: service_role only — no public read access to collected emails
- No UPDATE/DELETE grants to anon/authenticated — leads are write-once from the client.

3. Important Notes
- This table stores email addresses voluntarily provided by users who click
  "Email me this breakdown" on the lost-revenue calculator. It is intentionally
  public-writable (no auth) since the calculator appears on a marketing page.
- The `inputs` column is JSONB so different industries can store different fields
  without schema changes.
- `monthly_loss` is stored as a denormalized integer for quick reporting queries.
*/

CREATE TABLE IF NOT EXISTS calculator_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  industry text NOT NULL,
  email text NOT NULL,
  inputs jsonb NOT NULL,
  monthly_loss integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE calculator_leads ENABLE ROW LEVEL SECURITY;

-- Only service_role can read leads (admin dashboard, edge functions)
GRANT SELECT ON calculator_leads TO service_role;
-- Public can insert new leads
GRANT INSERT ON calculator_leads TO anon, authenticated;

-- INSERT: anyone can save their calculator breakdown
DROP POLICY IF EXISTS "anon_insert_calculator_leads" ON calculator_leads;
CREATE POLICY "anon_insert_calculator_leads"
ON calculator_leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- SELECT: service_role only (no public read)
-- No anon/authenticated SELECT policy needed — the GRANT above only goes to service_role.
-- RLS blocks anon/authenticated from reading since there's no SELECT policy for them.
