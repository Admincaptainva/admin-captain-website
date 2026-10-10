import { FunctionsHttpError } from '@supabase/supabase-js';
import { supabase } from './supabase';

export const SPECIALTIES = [
  'Implant & Denture Centers',
  'Oral Surgeons & Periodontists',
  'Endodontists',
  'Orthodontists',
  'Cosmetic & Restorative',
  'Pediatric Dentists',
  'Other',
];

export const CALL_VOLUME_OPTIONS = ['Less than 10', '10–25', '25–50', '50+'];

export type LeadSource = 'contact_form' | 'chat_widget';

export interface LeadInput {
  full_name: string;
  email: string;
  practice_name?: string;
  phone?: string;
  specialty?: string;
  call_volume?: string;
  message?: string;
  source: LeadSource;
}

export type SubmitLeadResult =
  | { ok: true; id: string | null; emailSent: boolean }
  | { ok: false; error: string };

const GENERIC_ERROR = 'Something went wrong saving your request. Please try again or call us at (763) 496-6613.';

function clean(v: string | undefined): string | null {
  const t = (v ?? '').trim();
  return t === '' ? null : t;
}

function newId(): string | null {
  try {
    return crypto.randomUUID();
  } catch {
    return null; // very old browser / insecure context: let the database pick one
  }
}

/**
 * Saves a lead and triggers the notification email.
 *
 * 1. Calls the `notify-lead` Edge Function, which inserts the row and then emails you.
 * 2. If the function can't be reached (not deployed, network, 5xx), falls back to inserting
 *    the row directly so the lead is never lost — you'll find it in the `leads` table with
 *    `notified_at` empty.
 *
 * Never throws: every failure is logged with a clear [lead-capture] prefix and returned as
 * `{ ok: false, error }` with a message that's safe to show in the UI.
 */
export async function submitLead(input: LeadInput): Promise<SubmitLeadResult> {
  const id = newId();
  const lead = {
    ...(id ? { id } : {}),
    full_name: input.full_name.trim(),
    email: input.email.trim().toLowerCase(),
    practice_name: clean(input.practice_name),
    phone: clean(input.phone),
    specialty: clean(input.specialty),
    call_volume: clean(input.call_volume),
    message: clean(input.message),
    source: input.source,
  };

  // 1) Preferred path: Edge Function saves + emails.
  try {
    const { data, error } = await supabase.functions.invoke<{
      ok: boolean;
      id?: string;
      emailSent?: boolean;
      error?: string;
    }>('notify-lead', { body: lead });

    if (!error && data?.ok) {
      if (!data.emailSent) {
        console.error(
          `[lead-capture] Lead ${data.id ?? id} was saved, but the notification email failed. ` +
            'Check the notify-lead function logs and the RESEND_API_KEY / NOTIFICATION_EMAIL secrets.',
        );
      }
      return { ok: true, id: data.id ?? id, emailSent: Boolean(data.emailSent) };
    }

    // A 400 means the data itself was rejected — show that message instead of retrying.
    if (error instanceof FunctionsHttpError && error.context instanceof Response && error.context.status === 400) {
      const body = await error.context.json().catch(() => ({}));
      console.warn('[lead-capture] Submission rejected by notify-lead:', body?.error);
      return { ok: false, error: body?.error || 'Please check the form and try again.' };
    }

    console.error('[lead-capture] notify-lead failed, falling back to direct insert:', error ?? data);
  } catch (err) {
    console.error('[lead-capture] notify-lead could not be reached, falling back to direct insert:', err);
  }

  // 2) Fallback: save the lead directly so it isn't lost (no email is sent on this path).
  try {
    const { error } = await supabase.from('leads').insert(lead);
    if (error && error.code !== '23505') {
      console.error('[lead-capture] Database insert failed:', error);
      return { ok: false, error: GENERIC_ERROR };
    }
    console.error(
      `[lead-capture] Lead ${id ?? '(new)'} saved via fallback, but NO notification email was sent. ` +
        'Deploy the notify-lead Edge Function to receive emails.',
    );
    return { ok: true, id, emailSent: false };
  } catch (err) {
    console.error('[lead-capture] Database insert threw:', err);
    return { ok: false, error: GENERIC_ERROR };
  }
}
