import { useState, useRef, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle, Wrench, Clock } from 'lucide-react';

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

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', trade: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [bump, setBump] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open || bump) return;
    const t = setTimeout(() => setBump(true), 8000);
    return () => clearTimeout(t);
  }, [open, bump]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/notify-lead`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
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
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }

      setStatus('success');
      setForm({ name: '', email: '', phone: '', trade: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again or call us at (612) 568-0566.');
    }
  }

  const inputClass =
    'w-full bg-[#0e2242] border border-[#1e3d6e] focus:border-[#FFA800] outline-none text-white text-sm rounded-lg px-3.5 py-2.5 placeholder:text-[#5a7ba8] transition-colors';
  const labelClass = 'block text-[#99daff] text-xs font-semibold mb-1.5';

  return (
    <>
      {/* Floating toggle button with label */}
      <button
        onClick={() => {
          setOpen((v) => !v);
          setBump(false);
        }}
        aria-label={open ? 'Close free admin audit form' : 'Open free admin audit form'}
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#FFA800] hover:bg-[#E09600] text-[#0b1829] pl-4 pr-5 py-3.5 shadow-lg shadow-[#FFA800]/30 transition-all duration-300 hover:scale-105 active:scale-95 ${bump && !open ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''}`}
      >
        {open ? (
          <X className="w-5 h-5 flex-shrink-0" />
        ) : (
          <Wrench className="w-5 h-5 flex-shrink-0" />
        )}
        <span className="font-bold text-sm whitespace-nowrap">
          {open ? 'Close' : 'Free Admin Audit'}
        </span>
        {!open && bump && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-[#0b1829]" />
        )}
      </button>

      {/* Chat panel */}
      <div
        ref={panelRef}
        className={`fixed bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-1.5rem)] max-w-sm origin-bottom-right transition-all duration-300 ${
          open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
        }`}
      >
        <div className="bg-[#0b1829] border border-[#1e3d6e] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[78vh]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0e2242] to-[#13325f] px-5 py-5 border-b border-[#1e3d6e]">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#FFA800]/15 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-[#FFA800]" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base leading-tight">Free Admin Audit</h3>
                <p className="text-[#99daff] text-xs leading-snug mt-1">
                  See exactly where your admin hours are going — and how to get them back.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-[#99daff]/60 text-[11px]">
              <Clock className="w-3.5 h-3.5" />
              <span>Available 24/7 · We reply within 1 business day</span>
            </div>
          </div>

          {/* Body */}
          <div className="overflow-y-auto px-5 py-5">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-green-400" />
                </div>
                <h4 className="text-white text-base font-bold mb-2">Got it — check your inbox!</h4>
                <p className="text-[#99daff]/80 text-sm leading-relaxed mb-5">
                  We just sent you a confirmation email with next steps. No matter the hour, your request is in and we'll follow up fast.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-[#FFA800] hover:text-[#E09600] text-sm font-medium transition-colors"
                >
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={labelClass} htmlFor="cw-name">
                    Full Name <span className="text-[#FFA800]">*</span>
                  </label>
                  <input
                    id="cw-name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Mike Larsen"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="cw-email">
                    Email <span className="text-[#FFA800]">*</span>
                  </label>
                  <input
                    id="cw-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="mike@larsenhvac.com"
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass} htmlFor="cw-phone">
                      Phone
                    </label>
                    <input
                      id="cw-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(612) 555-0100"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="cw-trade">
                      Your Trade
                    </label>
                    <select
                      id="cw-trade"
                      name="trade"
                      value={form.trade}
                      onChange={handleChange}
                      className={`w-full bg-[#0e2242] border border-[#1e3d6e] focus:border-[#FFA800] outline-none text-sm rounded-lg px-3 py-2.5 transition-colors ${form.trade === '' ? 'text-[#5a7ba8]' : 'text-white'}`}
                    >
                      <option value="">Select…</option>
                      {trades.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="cw-message">
                    What's eating up your evenings? <span className="text-[#99daff]/40 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="cw-message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="e.g. I can't keep up with estimate follow-ups…"
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <div className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-red-300 text-xs leading-relaxed">{errorMsg}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-[#FFA800] hover:bg-[#E09600] disabled:opacity-60 disabled:cursor-not-allowed text-[#0b1829] font-bold text-sm px-5 py-3.5 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FFA800]/20"
                >
                  {status === 'loading' ? (
                    <>Sending…</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Get my free audit
                    </>
                  )}
                </button>

                <p className="text-[#99daff]/50 text-[11px] text-center leading-relaxed">
                  No spam. No obligation. We respond fast — even after hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
