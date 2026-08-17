-- Replace the always-true INSERT policy with a meaningful field-level check.
-- Requires name to be a non-empty string and email to match a basic pattern.
-- This mirrors the table's NOT NULL constraints at the RLS layer so garbage
-- or purely automated spam rows are rejected before they reach the DB.

DROP POLICY IF EXISTS "anon_insert_leads" ON contact_leads;

CREATE POLICY "anon_insert_leads" ON contact_leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name    IS NOT NULL AND length(trim(name))  > 0
    AND email IS NOT NULL AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );
