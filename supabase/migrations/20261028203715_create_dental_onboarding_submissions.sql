/*
# Create private dental onboarding submissions

1. New Tables
- `dental_onboarding_submissions`
- `id` (uuid, primary key)
- `answers` (jsonb, the submitted onboarding responses)
- `submitted_at` (timestamptz, submission time)

2. Security
- Enable row-level security on the new table.
- Allow the browser's anonymous client to insert completed submissions.
- Do not grant SELECT, UPDATE, or DELETE to anon or authenticated, so submitted onboarding details cannot be read from a public page.
- Keep service_role access available for private operational review.

3. Important Notes
- Draft answers remain in the client's browser until submission and are not written to the database as partial drafts.
- This table intentionally has no public read policy.
*/

CREATE TABLE IF NOT EXISTS public.dental_onboarding_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  answers jsonb NOT NULL,
  submitted_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.dental_onboarding_submissions ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON public.dental_onboarding_submissions TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.dental_onboarding_submissions TO service_role;

DROP POLICY IF EXISTS "Public can submit dental onboarding" ON public.dental_onboarding_submissions;
CREATE POLICY "Public can submit dental onboarding"
ON public.dental_onboarding_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (jsonb_typeof(answers) = 'object');