/*
# Add chat_events table and new columns to chat_leads

1. New Tables
- `chat_events`
  - `id` (uuid, primary key)
  - `session_id` (uuid, FK to chat_sessions, ON DELETE CASCADE)
  - `question_id` (text) — which FAQ question was tapped (e.g. "q7")
  - `industry` (text, nullable) — detected industry at time of tap
  - `page` (text) — the URL path where the tap happened
  - `created_at` (timestamptz, default now())

2. Modified Tables
- `chat_leads` — add two nullable columns:
  - `question` (text) — the visitor's typed question if they submitted one via the lead form
  - `page` (text) — the URL path where the lead was captured

3. Security
- Enable RLS on `chat_events`.
- `chat_events`: INSERT + SELECT to anon, authenticated (the widget logs taps and admin reads them).
  service_role also gets SELECT for admin analytics.
- New columns on `chat_leads` are covered by existing grants (authenticated SELECT/INSERT/UPDATE,
  service_role full access). No new grants needed since ALTER TABLE ADD COLUMN inherits table-level grants.

4. Important Notes
- The chat widget logs every tapped question to `chat_events` so admin can see what people ask most.
- `chat_leads.question` stores the typed question when a visitor uses the "Leave your question" form.
- `chat_leads.page` stores the page URL where the lead was captured, for analytics.
- All new columns are nullable so existing rows are unaffected.
*/

CREATE TABLE IF NOT EXISTS chat_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  question_id text NOT NULL,
  industry text,
  page text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_events ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON chat_events TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON chat_events TO service_role;

DROP POLICY IF EXISTS "anon_select_chat_events" ON chat_events;
CREATE POLICY "anon_select_chat_events"
ON chat_events FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "anon_insert_chat_events" ON chat_events;
CREATE POLICY "anon_insert_chat_events"
ON chat_events FOR INSERT
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "service_select_chat_events" ON chat_events;
CREATE POLICY "service_select_chat_events"
ON chat_events FOR SELECT
TO service_role
USING (true);

DROP POLICY IF EXISTS "service_insert_chat_events" ON chat_events;
CREATE POLICY "service_insert_chat_events"
ON chat_events FOR INSERT
TO service_role
WITH CHECK (true);

-- Add question and page columns to chat_leads (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_name = 'chat_leads' AND column_name = 'question') THEN
    ALTER TABLE chat_leads ADD COLUMN question text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_name = 'chat_leads' AND column_name = 'page') THEN
    ALTER TABLE chat_leads ADD COLUMN page text;
  END IF;
END $$;

-- Index for common admin queries on chat_events
CREATE INDEX IF NOT EXISTS idx_chat_events_session_id ON chat_events(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_events_question_id ON chat_events(question_id);
CREATE INDEX IF NOT EXISTS idx_chat_events_created_at ON chat_events(created_at DESC);
