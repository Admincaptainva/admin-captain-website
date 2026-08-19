import { useState } from 'react';
import { Phone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const trades = [
  'HVAC',
  'Plumbing',
  'Electrical',
  'Roofing',
  'Landscaping',
  'General Contracting',
  'Painting',
  'Flooring',
  'Pest Control',
  'Other',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', trade: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const res = await fetch(
      'https://hooks.zapier.com/hooks/catch/28493492/4treoy3/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          trade: form.trade || null,
          message: form.message || null,
        }),
      }
    );

    if (!res.ok) {
      throw new Error(`Request failed (${res.status})`);
    }

      

      setStatus('success');
      setForm({ name: '', email: '', phone: '', trade: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or call us directly.');
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background — night office workspace */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1600")`, transform: 'translateZ(0)' }}
      />
      <div className="absolute inset-0 bg-[#0b1829]/80" />
      {/* Gold glow around CTA area */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-[#FFA800]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="inline-block text-[#FFA800] text-sm font-bold uppercase tracking-widest mb-4">Free Consultation</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            Let's talk about your business
          </h2>
          <p className="text-[#99daff] text-lg leading-relaxed mb-10">
            Tell us about your trade business and we'll show you exactly how our team can save you time and help you close more jobs. No pressure, no commitments.
          </p>

          <div className="space-y-5 mb-10">
            {[
              { icon: Phone, label: 'Call or Text', value: '+1 (612) 568-0566' },
              { icon: Mail, label: 'Email Us', value: 'contact@AdminCaptainVA.com' },
              { icon: Clock, label: '15 Min Discovery Call', value: 'Quick, no-pressure intro call' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 border-l-2 border-[#FFA800]/40 pl-5">
                <div className="w-11 h-11 rounded-xl bg-[#FFA800]/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#FFA800]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-[#99daff]/80 text-sm">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative bg-[#0b1829]/90 border border-[#1e3d6e] rounded-2xl p-8 shadow-2xl">
          {/* Gold top accent */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-[#FFA800]/60 via-[#FFA800]/30 to-transparent rounded-full" />

          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-white text-xl font-bold mb-2">We'll be in touch soon!</h3>
              <p className="text-[#99daff]/80 text-sm leading-relaxed">
                Thanks for reaching out. One of our team members will contact you within 1 business day to schedule your free consultation.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 text-[#FFA800] hover:text-[#E09600] text-sm font-medium transition-colors"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-white text-xl font-bold mb-1">Get your free consultation</h3>
              <p className="text-[#99daff]/70 text-sm mb-6">We respond within 1 business day.</p>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#99daff] text-sm font-medium mb-2" htmlFor="name">
                    Full Name <span className="text-[#FFA800]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Mike Larsen"
                    className="w-full bg-[#0e2242] border border-[#1e3d6e] focus:border-[#FFA800] outline-none text-white text-sm rounded-xl px-4 py-3 placeholder:text-[#1e3d6e] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#99daff] text-sm font-medium mb-2" htmlFor="email">
                    Email <span className="text-[#FFA800]">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="mike@larsenhvac.com"
                    className="w-full bg-[#0e2242] border border-[#1e3d6e] focus:border-[#FFA800] outline-none text-white text-sm rounded-xl px-4 py-3 placeholder:text-[#1e3d6e] transition-colors"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#99daff] text-sm font-medium mb-2" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(612) 555-0100"
                    className="w-full bg-[#0e2242] border border-[#1e3d6e] focus:border-[#FFA800] outline-none text-white text-sm rounded-xl px-4 py-3 placeholder:text-[#1e3d6e] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[#99daff] text-sm font-medium mb-2" htmlFor="trade">
                    Your Trade
                  </label>
                  <select
                    id="trade"
                    name="trade"
                    value={form.trade}
                    onChange={handleChange}
                    className={`w-full bg-[#0e2242] border border-[#1e3d6e] focus:border-[#FFA800] outline-none text-sm rounded-xl px-4 py-3 transition-colors ${form.trade === '' ? 'text-[#99daff]/40' : 'text-white'}`}
                  >
                    <option value="">Select your trade</option>
                    {trades.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#99daff] text-sm font-medium mb-2" htmlFor="message">
                  What's your biggest admin headache?
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="e.g. I can't keep up with estimate follow-ups and my inbox is out of control..."
                  className="w-full bg-[#0e2242] border border-[#1e3d6e] focus:border-[#FFA800] outline-none text-white text-sm rounded-xl px-4 py-3 placeholder:text-[#1e3d6e] transition-colors resize-none"
                />
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
                className="w-full bg-[#FFA800] hover:bg-[#E09600] disabled:opacity-60 disabled:cursor-not-allowed text-[#0b1829] font-bold text-sm px-6 py-4 rounded-xl transition-all shadow-lg shadow-[#FFA800]/20 hover:shadow-[#FFA800]/30"
              >
                {status === 'loading' ? 'Sending...' : 'Get Your Free Consultation'}
              </button>

              <p className="text-[#99daff]/40 text-xs text-center">
                No spam. No obligation. We respect your privacy.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
