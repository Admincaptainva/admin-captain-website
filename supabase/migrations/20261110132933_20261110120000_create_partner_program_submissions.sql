/*
# Create partner program submission tables

1. Purpose
- Store applications from businesses that want to join the AdminCaptainVA partner program.
- Store audit requests submitted through a partner's personal landing page.
- Keep submitted contact information protected from public browser reads.

2. New Tables
- `partner_applications`
  - `id`: unique submission identifier.
  - `full_name`, `company`, `email`, `phone`: applicant contact details.
  - `partner_type`: referral partner or agency.
  - `industries`: industries served by the applicant.
  - `client_count`: approximate number of clients served.
  - `heard_about`: how the applicant found AdminCaptainVA.
  - `created_at`: submission timestamp.
- `audit_requests`
  - `id`: unique audit request identifier.
  - `partner_slug`: partner attribution value from the URL.
  - `business_name`, `contact_name`, `email`, `phone`: requester contact details.
  - `office_phone`: number the requester authorizes AdminCaptainVA to test.
  - `industry`: business industry.
  - `business_hours`: supplied office hours.
  - `test_call_consent`: required permission for test calls.
  - `created_at`: submission timestamp.

3. Security
- Enable row-level security on both tables.
- Do not grant browser roles access; the public forms submit through a server-side function using `service_role`.
- Add separate service-role CRUD policies for each table so server-side operations remain explicit.
- Grant full table access only to `service_role`.

4. Important Notes
- No authentication is added because these are public lead forms.
- The partner slug is stored for attribution and is not used as an authorization check.
- Data is retained for follow-up and partner payout tracking.
*/

CREATE TABLE IF NOT EXISTS public.partner_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  company text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  partner_type text NOT NULL CHECK (partner_type IN ('referral_partner', 'agency')),
  industries text[] NOT NULL DEFAULT '{}',
  client_count text NOT NULL,
  heard_about text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.audit_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_slug text NOT NULL,
  business_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  office_phone text NOT NULL,
  industry text NOT NULL,
  business_hours text NOT NULL,
  test_call_consent boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT audit_requests_test_call_consent_check CHECK (test_call_consent = true)
);

CREATE INDEX IF NOT EXISTS partner_applications_created_at_idx ON public.partner_applications (created_at DESC);
CREATE INDEX IF NOT EXISTS audit_requests_partner_slug_idx ON public.audit_requests (partner_slug);
CREATE INDEX IF NOT EXISTS audit_requests_created_at_idx ON public.audit_requests (created_at DESC);

ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_requests ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.partner_applications TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.audit_requests TO service_role;

DROP POLICY IF EXISTS "service role can read partner applications" ON public.partner_applications;
CREATE POLICY "service role can read partner applications" ON public.partner_applications FOR SELECT TO service_role USING (true);
DROP POLICY IF EXISTS "service role can create partner applications" ON public.partner_applications;
CREATE POLICY "service role can create partner applications" ON public.partner_applications FOR INSERT TO service_role WITH CHECK (true);
DROP POLICY IF EXISTS "service role can update partner applications" ON public.partner_applications;
CREATE POLICY "service role can update partner applications" ON public.partner_applications FOR UPDATE TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "service role can delete partner applications" ON public.partner_applications;
CREATE POLICY "service role can delete partner applications" ON public.partner_applications FOR DELETE TO service_role USING (true);

DROP POLICY IF EXISTS "service role can read audit requests" ON public.audit_requests;
CREATE POLICY "service role can read audit requests" ON public.audit_requests FOR SELECT TO service_role USING (true);
DROP POLICY IF EXISTS "service role can create audit requests" ON public.audit_requests;
CREATE POLICY "service role can create audit requests" ON public.audit_requests FOR INSERT TO service_role WITH CHECK (true);
DROP POLICY IF EXISTS "service role can update audit requests" ON public.audit_requests;
CREATE POLICY "service role can update audit requests" ON public.audit_requests FOR UPDATE TO service_role USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "service role can delete audit requests" ON public.audit_requests;
CREATE POLICY "service role can delete audit requests" ON public.audit_requests FOR DELETE TO service_role USING (true);
