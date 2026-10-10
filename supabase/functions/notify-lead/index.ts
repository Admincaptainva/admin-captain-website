// Supabase Edge Function: notify-lead
//
// Called by both free-plan forms. It:
//   1. validates the submission,
//   2. saves it to public.leads (service role, bypasses RLS),
//   3. only after a successful insert, emails the details to NOTIFICATION_EMAIL via Resend,
//   4. stamps leads.notified_at so the same lead is never emailed twice.
//
// Secrets (set in Supabase Dashboard → Edge Functions → Secrets, or `supabase secrets set`):
//   RESEND_API_KEY      required  – from https://resend.com/api-keys
//   NOTIFICATION_EMAIL  required  – YOUR inbox; where new-lead emails go
//   NOTIFICATION_FROM   optional  – verified sender, e.g. "AdminCaptainVA Leads <leads@admincaptainva.com>"
// Provided automatically by Supabase: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type Source = 'contact_form' | 'chat_widget';

interface Lead {
  id: string;
  full_name: string;
  email: string;
  practice_name: string | null;
  phone: string | null;
  specialty: string | null;
  call_volume: string | null;
  message: string | null;
  source: Source;
  created_at?: string;
}

const LIMITS: Record<string, number> = {
  full_name: 200,
  email: 320,
  practice_name: 200,
  phone: 50,
  specialty: 200,
  call_volume: 100,
  message: 5000,
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

function text(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t === '' ? null : t;
}

// Accepts both the new field names and the older ones the forms used to send
// (name / practice / voicemail_count / trade), so nothing breaks mid-deploy.
function parseLead(raw: Record<string, unknown>): { lead?: Lead; error?: string } {
  const lead: Lead = {
    id: typeof raw.id === 'string' && UUID_RE.test(raw.id) ? raw.id : crypto.randomUUID(),
    full_name: text(raw.full_name) ?? text(raw.name) ?? '',
    email: (text(raw.email) ?? '').toLowerCase(),
    practice_name: text(raw.practice_name) ?? text(raw.practice),
    phone: text(raw.phone),
    specialty: text(raw.specialty) ?? text(raw.trade),
    call_volume: text(raw.call_volume) ?? text(raw.voicemail_count) ?? text(raw.voicemail),
    message: text(raw.message),
    source: raw.source === 'chat_widget' ? 'chat_widget' : 'contact_form',
  };

  if (!lead.full_name) return { error: 'Please enter your full name.' };
  if (!EMAIL_RE.test(lead.email)) return { error: 'Please enter a valid email address.' };
  for (const [field, max] of Object.entries(LIMITS)) {
    const v = lead[field as keyof Lead];
    if (typeof v === 'string' && v.length > max) {
      return { error: `The ${field.replace('_', ' ')} field is too long.` };
    }
  }
  return { lead };
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmail(lead: Lead) {
  const submitted = new Date(lead.created_at ?? Date.now()).toLocaleString('en-US', {
    timeZone: 'America/Chicago',
    dateStyle: 'medium',
    timeStyle: 'short',
  });
  const formName = lead.source === 'chat_widget' ? '"Start Today for Free" panel' : '"Start your free plan" form';

  const rows: [string, string | null][] = [
    ['Full Name', lead.full_name],
    ['Practice Name', lead.practice_name],
    ['Email', lead.email],
    ['Phone', lead.phone],
    ['Specialty', lead.specialty],
    ['After-hours calls to voicemail / week', lead.call_volume],
    ['Message', lead.message],
    ['Submitted', `${submitted} (Central)`],
    ['Form', formName],
    ['Lead ID', lead.id],
  ];

  const subject = `New free-plan lead: ${lead.full_name}${lead.practice_name ? ` — ${lead.practice_name}` : ''}`;

  const textBody = rows.map(([k, v]) => `${k}: ${v ?? '—'}`).join('\n');

  const htmlRows = rows
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;white-space:nowrap;vertical-align:top">${esc(k)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;white-space:pre-wrap">${
          v ? (k === 'Email' ? `<a href="mailto:${esc(v)}">${esc(v)}</a>` : k === 'Phone' ? `<a href="tel:${esc(v.replace(/[^\d+]/g, ''))}">${esc(v)}</a>` : esc(v)) : '<span style="color:#9ca3af">—</span>'
        }</td>
      </tr>`,
    )
    .join('');

  const html = `<!doctype html>
<html><body style="margin:0;padding:24px;background:#f3f4f6;font-family:Inter,Arial,sans-serif">
  <table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden">
    <tr><td style="background:#0a1628;padding:20px 24px;color:#ffffff;font-size:18px;font-weight:700">
      New free-plan signup <span style="color:#FFA800">●</span>
    </td></tr>
    <tr><td style="padding:16px 12px">
      <table role="presentation" width="100%" style="border-collapse:collapse">${htmlRows}</table>
    </td></tr>
    <tr><td style="padding:0 24px 20px;color:#6b7280;font-size:12px">Reply to this email to respond to ${esc(lead.full_name)} directly.</td></tr>
  </table>
</body></html>`;

  return { subject, html, text: textBody };
}

async function sendNotification(lead: Lead): Promise<{ ok: boolean; error?: string }> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  const to = Deno.env.get('NOTIFICATION_EMAIL');
  const from = Deno.env.get('NOTIFICATION_FROM') ?? 'AdminCaptainVA Leads <onboarding@resend.dev>';

  if (!apiKey || !to) {
    return { ok: false, error: 'RESEND_API_KEY or NOTIFICATION_EMAIL secret is not set' };
  }

  const { subject, html, text: textBody } = buildEmail(lead);

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: lead.email,
        subject,
        html,
        text: textBody,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { ok: false, error: `Resend responded ${res.status}: ${detail.slice(0, 500)}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, error: `Resend request failed: ${err instanceof Error ? err.message : String(err)}` };
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);

  let raw: Record<string, unknown>;
  try {
    raw = await req.json();
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('not an object');
  } catch {
    return json({ ok: false, error: 'Invalid request body.' }, 400);
  }

  const { lead, error: validationError } = parseLead(raw);
  if (!lead) return json({ ok: false, error: validationError }, 400);

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!supabaseUrl || !serviceKey) {
    console.error('[notify-lead] SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing');
    return json({ ok: false, error: 'Server is not configured.' }, 500);
  }
  const db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // 1) Save the lead first.
  let saved: Lead & { notified_at: string | null };
  const { data: inserted, error: insertError } = await db.from('leads').insert(lead).select().single();

  if (insertError) {
    if (insertError.code === '23505') {
      // Same id already saved (a retry, or the browser's fallback insert won the race). Reuse it.
      const { data: existing, error: fetchError } = await db.from('leads').select().eq('id', lead.id).single();
      if (fetchError || !existing) {
        console.error('[notify-lead] duplicate id but could not load row', lead.id, fetchError);
        return json({ ok: false, error: 'Could not save your request.' }, 500);
      }
      if (existing.notified_at) {
        return json({ ok: true, id: lead.id, emailSent: true, duplicate: true });
      }
      saved = existing;
    } else {
      console.error('[notify-lead] database insert failed', insertError);
      return json({ ok: false, error: 'Could not save your request.' }, 500);
    }
  } else {
    saved = inserted;
  }

  // 2) Only after a successful insert, send the email. A failure here does NOT fail the request:
  //    the lead is safely stored, and notified_at stays NULL so you can find un-emailed leads.
  const mail = await sendNotification(saved);
  if (!mail.ok) {
    console.error(`[notify-lead] lead ${saved.id} saved but notification email failed: ${mail.error}`);
    return json({ ok: true, id: saved.id, emailSent: false });
  }

  const { error: stampError } = await db
    .from('leads')
    .update({ notified_at: new Date().toISOString() })
    .eq('id', saved.id);
  if (stampError) console.error('[notify-lead] email sent but notified_at update failed', saved.id, stampError);

  return json({ ok: true, id: saved.id, emailSent: true });
});
