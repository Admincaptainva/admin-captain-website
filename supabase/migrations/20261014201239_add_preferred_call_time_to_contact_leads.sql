-- Add preferred_call_time column for the new "best time to chat" field
ALTER TABLE contact_leads ADD COLUMN IF NOT EXISTS preferred_call_time text;

-- name is now optional (practice name replaces it as the primary identifier)
ALTER TABLE contact_leads ALTER COLUMN name DROP NOT NULL;
