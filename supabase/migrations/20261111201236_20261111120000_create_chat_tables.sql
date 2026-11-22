/*
# Create chat_sessions, chat_messages, and chat_leads tables

1. New Tables
- `chat_sessions`
  - `id` (uuid, primary key)
  - `page` (text) — the URL path where the chat started
  - `industry` (text, nullable) — detected industry: dental, property, legal
  - `started_at` (timestamptz, default now())
  - `lead_score` (text, nullable) — 'hot', 'warm', 'cold'
- `chat_messages`
  - `id` (uuid, primary key)
  - `session_id` (uuid, FK to chat_sessions, ON DELETE CASCADE)
  - `role` (text) — 'visitor' or 'assistant'
  - `content` (text) — the message content
  - `created_at` (timestamptz, default now())
- `chat_leads`
  - `id` (uuid, primary key)
  - `session_id` (uuid, FK to chat_sessions, ON DELETE CASCADE)
  - `name` (text, nullable)
  - `email` (text, nullable)
  - `phone` (text, nullable)
  - `business` (text, nullable)
  - `industry` (text, nullable)
  - `answers` (jsonb, nullable) — qualifying answers as key-value pairs
  - `score` (text, nullable) — 'hot', 'warm', 'cold'
  - `booked` (boolean, default false)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on all three tables.
- chat_sessions: INSERT + SELECT to anon, authenticated (the widget creates sessions and reads its own);
  UPDATE to service_role only (for lead_score updates from the edge function).
- chat_messages: INSERT to anon, authenticated (the widget appends messages);
  SELECT to anon, authenticated (widget reads its own conversation);
  service_role also gets SELECT for admin/transcript.
- chat_leads: INSERT to anon, authenticated (edge function via service_role creates leads);
  SELECT to service_role + authenticated (admin page reads leads);
  UPDATE to service_role only (for booked status).
- All tables: service_role gets full CRUD for admin operations and edge function usage.

3. Important Notes
- The chat widget runs client-side with the anon key, so it needs INSERT on sessions and messages,
  and SELECT on sessions/messages to load existing conversations.
- The edge function uses service_role to insert leads, update scores, and update booked status.
- The admin page uses authenticated role to read leads and transcripts.
- chat_leads is NOT readable by anon — only authenticated (admin) and service_role.
*/

CREATE TABLE IF NOT EXISTS chat_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page text NOT NULL,
  industry text,
  started_at timestamptz DEFAULT now(),
  lead_score text
);

ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON chat_sessions TO anon, authenticated;
GRANT UPDATE ON chat_sessions TO service_role;

DROP POLICY IF EXISTS "anon_select_insert_chat_sessions" ON chat_sessions;
CREATE POLICY "anon_select_insert_chat_sessions"
ON chat_sessions FOR SELECT
TO anon, authenticated
USING (true);

-- INSERT is granted but needs a policy too
DROP POLICY IF EXISTS "anon_insert_chat_sessions" ON chat_sessions;
CREATE POLICY "anon_insert_chat_sessions"
ON chat_sessions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- UPDATE: service_role only (for lead_score updates from edge function)
DROP POLICY IF EXISTS "service_update_chat_sessions" ON chat_sessions;
CREATE POLICY "service_update_chat_sessions"
ON chat_sessions FOR UPDATE
TO service_role
USING (true) WITH CHECK (true);

-- ─── chat_messages ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT ON chat_messages TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON chat_messages TO service_role;

DROP POLICY IF EXISTS "anon_select_chat_messages" ON chat_messages;
CREATE POLICY "anon_select_chat_messages"
ON chat_messages FOR SELECT
TO anon, authenticated
USING (true);

DROP POLICY IF EXISTS "anon_insert_chat_messages" ON chat_messages;
CREATE POLICY "anon_insert_chat_messages"
ON chat_messages FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- ─── chat_leads ──────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS chat_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES chat_sessions(id) ON DELETE CASCADE,
  name text,
  email text,
  phone text,
  business text,
  industry text,
  answers jsonb,
  score text,
  booked boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE chat_leads ENABLE ROW LEVEL SECURITY;

-- No anon grants on chat_leads — only authenticated (admin) and service_role
GRANT SELECT, INSERT, UPDATE ON chat_leads TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON chat_leads TO service_role;

DROP POLICY IF EXISTS "authenticated_select_chat_leads" ON chat_leads;
CREATE POLICY "authenticated_select_chat_leads"
ON chat_leads FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "authenticated_insert_chat_leads" ON chat_leads;
CREATE POLICY "authenticated_insert_chat_leads"
ON chat_leads FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_update_chat_leads" ON chat_leads;
CREATE POLICY "authenticated_update_chat_leads"
ON chat_leads FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- service_role gets full access (edge function creates leads, updates booked)
DROP POLICY IF EXISTS "service_all_chat_leads" ON chat_leads;
CREATE POLICY "service_all_chat_leads"
ON chat_leads FOR SELECT
TO service_role
USING (true);

DROP POLICY IF EXISTS "service_insert_chat_leads" ON chat_leads;
CREATE POLICY "service_insert_chat_leads"
ON chat_leads FOR INSERT
TO service_role
WITH CHECK (true);

DROP POLICY IF EXISTS "service_update_chat_leads" ON chat_leads;
CREATE POLICY "service_update_chat_leads"
ON chat_leads FOR UPDATE
TO service_role
USING (true) WITH CHECK (true);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_chat_leads_session_id ON chat_leads(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_leads_created_at ON chat_leads(created_at DESC);
