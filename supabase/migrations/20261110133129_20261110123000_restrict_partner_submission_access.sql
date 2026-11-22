/*
# Restrict partner submission table access

1. Purpose
- Make the intended access boundary explicit for partner applications and audit requests.
- Prevent browser roles from reaching private contact-submission tables directly.

2. Modified Tables
- `partner_applications`: revoke all table privileges from `anon` and `authenticated`.
- `audit_requests`: revoke all table privileges from `anon` and `authenticated`.

3. Security
- The public website submits through the `submit-partner` Edge Function.
- The Edge Function uses `service_role` to validate and insert submissions.
- Existing row-level security remains enabled, with service-role CRUD policies only.

4. Important Notes
- No user data is deleted or changed.
- Existing service-side access remains available.
- Direct browser reads and writes are denied at both the grant and policy layers.
*/

REVOKE ALL PRIVILEGES ON TABLE public.partner_applications FROM anon, authenticated;
REVOKE ALL PRIVILEGES ON TABLE public.audit_requests FROM anon, authenticated;
