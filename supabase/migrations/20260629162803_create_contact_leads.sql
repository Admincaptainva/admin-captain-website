/*
# Create contact_leads table

1. New Tables
- `contact_leads`
  - `id` (uuid, primary key)
  - `name` (text, not null) — full name of the inquirer
  - `email` (text, not null) — email address
  - `phone` (text) — optional phone number
  - `trade` (text) — type of trade business
  - `message` (text) — their message or question
  - `created_at` (timestamp)

2. Security
  - Enable RLS on `contact_leads`.
  - Allow anon + authenticated INSERT so the public contact form can submit leads.
  - SELECT restricted to authenticated only (business owner can read leads).
*/

CREATE TABLE IF NOT EXISTS contact_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  trade text,
  message text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON contact_leads;
CREATE POLICY "anon_insert_leads" ON contact_leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_select_leads" ON contact_leads;
CREATE POLICY "auth_select_leads" ON contact_leads FOR SELECT
  TO authenticated USING (true);
