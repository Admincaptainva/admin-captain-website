import { useState } from 'react';
import { Check, PhoneCall, ShieldCheck } from 'lucide-react';
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../lib/config';

const partners: Record<string, string> = { 'demo-partner': 'Demo Partner' };
const industries = ['Dental', 'Property management', 'Legal', 'Other'];

export default function PartnerLanding({ slug }: { slug: string }) {
  const partnerName = partners[slug] ?? 'your partner';
  const [form, setForm] = useState({ business_name: '', contact_name: '', email: '', phone: '', office_phone: '', industry: 'Dental', business_hours: '', test_call_consent: false });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function updateField(name: string, value: string | boolean) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/submit-partner`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({ type: 'audit', data: { ...form, partner_slug: slug } }),
      });
      if (!response.ok) throw new Error('submission failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className="min-h-screen overflow-hidden bg-ink-950">
      <section className="relative flex min-h-[620px] items-center pt-28 pb-20"><div className="absolute inset-0 grid-pattern opacity-50" /><div className="absolute right-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full bg-gold-400/10 blur-[130px]" /><div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-12"><div><p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">A personal invitation from {partnerName}</p><h1 className="mt-5 text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl font-display">See how many calls your office may be <span className="text-gradient-gold">missing.</span></h1><p className="mt-7 max-w-2xl text-lg leading-relaxed text-sky-200/75">{partnerName} invited you to a free Missed-Call Audit. We test-call your office at lunch and after hours, then show you what those missed calls may be costing your business.</p><div className="mt-8 space-y-3">{['Free Missed-Call Audit', 'No setup fee if you sign up', '30 days to cancel with no penalty'].map((item) => <div key={item} className="flex items-center gap-3 text-sm text-sky-200/75"><Check className="h-5 w-5 text-gold-400" />{item}</div>)}</div></div><div id="audit-form" className="rounded-3xl border border-gold-400/25 bg-ink-800/80 p-7 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-9"><div className="mb-7 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-400/15 text-gold-400"><PhoneCall className="h-5 w-5" /></div><div><p className="font-bold text-white">Request your audit</p><p className="text-xs text-sky-200/55">No commitment required</p></div></div>{status === 'success' ? <div className="py-8 text-center"><Check className="mx-auto h-12 w-12 text-emerald-400" /><h2 className="mt-5 text-2xl font-bold text-white font-display">Request received.</h2><p className="mt-3 text-sm leading-relaxed text-sky-200/70">Thanks. We will contact you within one business day to coordinate the audit.</p></div> : <form onSubmit={handleSubmit} className="space-y-4"><div className="grid gap-4 sm:grid-cols-2">{[['business_name', 'Business name'], ['contact_name', 'Contact name'], ['email', 'Email'], ['phone', 'Your phone']].map(([name, label]) => <label key={name} className="text-sm font-medium text-sky-200/75">{label}<input required type={name === 'email' ? 'email' : 'text'} value={form[name as keyof typeof form] as string} onChange={(event) => updateField(name, event.target.value)} className="mt-2 w-full rounded-xl border border-ink-500 bg-ink-700 px-3.5 py-3 text-white outline-none focus:border-gold-400" /></label>)}</div><label className="block text-sm font-medium text-sky-200/75">Office phone number to test<input required type="tel" value={form.office_phone} onChange={(event) => updateField('office_phone', event.target.value)} className="mt-2 w-full rounded-xl border border-ink-500 bg-ink-700 px-3.5 py-3 text-white outline-none focus:border-gold-400" /></label><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-medium text-sky-200/75">Industry<select value={form.industry} onChange={(event) => updateField('industry', event.target.value)} className="mt-2 w-full rounded-xl border border-ink-500 bg-ink-700 px-3.5 py-3 text-white outline-none focus:border-gold-400">{industries.map((industry) => <option key={industry}>{industry}</option>)}</select></label><label className="text-sm font-medium text-sky-200/75">Business hours<input required value={form.business_hours} onChange={(event) => updateField('business_hours', event.target.value)} placeholder="Mon–Fri, 8am–5pm" className="mt-2 w-full rounded-xl border border-ink-500 bg-ink-700 px-3.5 py-3 text-white outline-none focus:border-gold-400" /></label></div><label className="flex items-start gap-3 rounded-xl border border-ink-500/60 bg-ink-900/50 p-3 text-xs leading-relaxed text-sky-200/70"><input required type="checkbox" checked={form.test_call_consent} onChange={(event) => updateField('test_call_consent', event.target.checked)} className="mt-0.5 h-4 w-4 flex-shrink-0 accent-gold-400" />I agree to let AdminCaptainVA place a few test calls to this number for the audit.</label>{status === 'error' && <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">We could not submit your request. Please try again.</p>}<button disabled={status === 'loading'} className="w-full rounded-xl bg-gold-400 px-5 py-3.5 text-sm font-bold text-ink-950 transition hover:bg-gold-500 disabled:opacity-60">{status === 'loading' ? 'Sending...' : 'Request my free audit'}</button></form>}</div></div></section>
      <section className="border-t border-ink-500/40 bg-ink-800/40 py-16"><div className="mx-auto grid max-w-5xl gap-5 px-5 sm:grid-cols-3 sm:px-8">{[['01', 'We test at lunch'], ['02', 'We test after hours'], ['03', 'We review the results']].map(([number, title]) => <div key={number} className="rounded-2xl border border-ink-500/50 bg-ink-800/60 p-6"><p className="text-sm font-bold text-gold-400">{number}</p><h2 className="mt-3 font-bold text-white">{title}</h2><p className="mt-2 text-sm text-sky-200/60">A clear snapshot of how your callers are handled when your team is unavailable.</p></div>)}</div><div className="mx-auto mt-12 flex max-w-2xl items-start gap-4 px-5 text-center sm:px-8"><ShieldCheck className="mx-auto h-6 w-6 flex-shrink-0 text-gold-400" /><p className="text-sm leading-relaxed text-sky-200/65">Your information is used to coordinate the audit and contact you about your results. We do not sell your information.</p></div></section>
    </main>
  );
}
