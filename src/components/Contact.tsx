import { useState } from 'react';
import { Phone, Mail, Clock, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import { submitLead, SPECIALTIES, CALL_VOLUME_OPTIONS } from '../lib/leads';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    practice: '',
    email: '',
    phone: '',
    specialty: '',
    voicemail: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const { ref, visible } = useReveal();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorMsg('');

    // submitLead never throws; it logs failures and returns a UI-safe message.
    const result = await submitLead({
      full_name: form.name,
      practice_name: form.practice,
      email: form.email,
      phone: form.phone,
      specialty: form.specialty,
      call_volume: form.voicemail,
      source: 'contact_form',
    });

    if (result.ok) {
      setStatus('success');
      setForm({ name: '', practice: '', email: '', phone: '', specialty: '', voicemail: '' });
    } else {
      setStatus('error');
      setErrorMsg(result.error);
    }
  }

  const inputClass =
    'w-full bg-ink-600 border border-ink-500 focus:border-gold-400 outline-none text-white text-sm rounded-xl px-4 py-3 placeholder:text-ink-400/60 transition-colors';

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden bg-ink-950">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600")`,
          transform: 'translateZ(0)',
        }}
      />
      <div className="absolute inset-0 bg-ink-950/75" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-gold-400/8 blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — copy */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
          <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
            Start Free
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight font-display">
            Start Free: 30 Calls Every Month
          </h2>
          <p className="text-sky-400 text-lg leading-relaxed mb-8">
            Our AI receptionist answers your first 30 after-hours calls each month, free. No contract, no card required.
          </p>

          {/* Highlight card */}
          <div className="rounded-2xl bg-gradient-to-r from-gold-400/12 via-gold-400/6 to-transparent border border-gold-400/25 px-5 py-4 mb-10 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-gold-400/15 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-gold-400" />
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              <span className="font-bold">Start free with 30 AI-answered calls a month.</span>{' '}
              Upgrade anytime when you need more calls or a live receptionist.
            </p>
          </div>

          {/* Contact links */}
          <div className="space-y-5">
            {[
              { icon: Phone, label: 'Call or Text', value: '+1 (763) 496-6613', href: 'tel:17634966613' },
              { icon: Mail, label: 'Email Us', value: 'Contact@admincaptainva.com', href: 'mailto:Contact@admincaptainva.com' },
              { icon: Clock, label: '15 Min Discovery Call', value: 'Quick, no-pressure intro call', href: 'https://calendly.com/contact-admincaptainva/15-minute-phone-audit' },
            ].map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 border-l-2 border-gold-400/40 pl-5 hover:border-gold-400 transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-gold-400/10 group-hover:bg-gold-400/20 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-sky-400/80 text-sm">{value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form card */}
        <div
          className={`reveal ${visible ? 'is-visible' : ''} relative glass border border-gold-400/25 rounded-2xl p-8 shadow-2xl shadow-gold-400/10 bg-ink-700/70`}
        >
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-gold-400 via-gold-400/50 to-transparent rounded-full" />

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2 font-display">You're all set!</h3>
              <p className="text-sky-400/80 text-sm leading-relaxed">
                Thanks for signing up. One of our team members will contact you within 1 business day to get your free plan activated.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-gold-400 hover:text-gold-500 text-sm font-medium transition-colors"
              >
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="text-white text-xl font-bold mb-1 font-display">Start your free plan</h3>
                <p className="text-sky-400/70 text-sm">30 AI-answered calls every month. No card required.</p>
              </div>

              {/* Full Name + Practice Name */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sky-400 text-sm font-medium mb-2" htmlFor="name">
                    Full Name <span className="text-gold-400">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Dr. Jane Smith"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sky-400 text-sm font-medium mb-2" htmlFor="practice">
                    Practice Name <span className="text-gold-400">*</span>
                  </label>
                  <input
                    id="practice"
                    name="practice"
                    type="text"
                    required
                    value={form.practice}
                    onChange={handleChange}
                    placeholder="Smile Dental Group"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sky-400 text-sm font-medium mb-2" htmlFor="email">
                    Email <span className="text-gold-400">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jane@smiledental.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sky-400 text-sm font-medium mb-2" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(612) 555-0100"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Specialty */}
              <div>
                <label className="block text-sky-400 text-sm font-medium mb-2" htmlFor="specialty">
                  Your Specialty <span className="text-gold-400">*</span>
                </label>
                <select
                  id="specialty"
                  name="specialty"
                  required
                  value={form.specialty}
                  onChange={handleChange}
                  className={`w-full bg-ink-700 border border-ink-500 focus:border-gold-400 outline-none text-sm rounded-xl px-4 py-3 transition-colors ${
                    form.specialty === '' ? 'text-sky-400/40' : 'text-white'
                  }`}
                >
                  <option value="">Select your specialty</option>
                  {SPECIALTIES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Voicemail question */}
              <div>
                <label className="block text-sky-400 text-sm font-medium mb-2" htmlFor="voicemail">
                  About how many calls go to voicemail after hours each week?{' '}
                  <span className="text-sky-400/40 font-normal">(optional)</span>
                </label>
                <select
                  id="voicemail"
                  name="voicemail"
                  value={form.voicemail}
                  onChange={handleChange}
                  className={`w-full bg-ink-700 border border-ink-500 focus:border-gold-400 outline-none text-sm rounded-xl px-4 py-3 transition-colors ${
                    form.voicemail === '' ? 'text-sky-400/40' : 'text-white'
                  }`}
                >
                  <option value="">Select a range</option>
                  {CALL_VOLUME_OPTIONS.map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <p className="text-red-300 text-sm">{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-gold-400 hover:bg-gold-500 disabled:opacity-60 disabled:cursor-not-allowed text-ink-900 font-bold text-sm px-6 py-4 rounded-xl transition-all shadow-lg shadow-gold-400/20 hover:shadow-gold-400/30"
              >
                {status === 'loading' ? 'Starting...' : 'Start Free'}
              </button>

              <p className="text-sky-400/40 text-xs text-center">
                No contract. No card required. Cancel anytime.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
