/*
# Add free plan fields to contact_leads

1. Modified Tables
- `contact_leads`
  - Added `practice_name` (text) — name of the dental practice
  - Added `specialty` (text) — dental specialty selected from dropdown
  - Added `voicemail_count` (text) — estimated after-hours voicemail calls per week
- The existing `trade` column is kept for backward compatibility but new submissions use `specialty`.

2. Security
- No policy changes. Existing RLS policies remain in effect:
  - anon + authenticated INSERT (public form submissions)
  - authenticated SELECT (business owner reads leads)

3. Notes
- These columns support the new "Start Free" plan form which replaces
  the old "Free Consultation" form.
- New required fields: practice_name, specialty (enforced in the frontend).
- voicemail_count is optional.
*/

ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS practice_name text;
ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS specialty text;
ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS voicemail_count text;
