import { useState, useRef, useEffect } from 'react';
import { X, Send, CheckCircle, AlertCircle, Clock, Zap } from 'lucide-react';
import { submitLead, SPECIALTIES, CALL_VOLUME_OPTIONS } from '../lib/leads';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMPTY_FORM = { name: '', practice: '', email: '', phone: '', specialty: '', volume: '', message: '' };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
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
      call_volume: form.volume,
      message: form.message,
      source: 'chat_widget',
    });

    if (result.ok) {
      setStatus('success');
      setForm(EMPTY_FORM);
    } else {
      setStatus('error');
      setErrorMsg(result.error);
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
        aria-label={open ? 'Close form' : 'Start today for free'}
        className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 rounded-full bg-[#FFA800] hover:bg-[#E09600] text-[#0b1829] pl-4 pr-5 py-3.5 shadow-lg shadow-[#FFA800]/30 transition-all duration-300 hover:scale-105 active:scale-95 ${bump && !open ? 'animate-[pulse_2s_ease-in-out_infinite]' : ''}`}
      >
        {open ? (
          <X className="w-5 h-5 flex-shrink-0" />
        ) : (
          <span className="relative flex-shrink-0">
            <span className="absolute inset-0 rounded-full bg-red-500/40 blur-[6px] animate-[pulse_1.5s_ease-in-out_infinite]" />
            <Zap className="w-5 h-5 text-red-600 fill-red-500 relative drop-shadow-[0_0_4px_rgba(239,68,68,0.8)]" />
          </span>
        )}
        <span className="font-extrabold text-sm whitespace-nowrap uppercase tracking-wide">
          {open ? 'Close' : 'Start Today for Free!'}
        </span>
        {!open && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 border-2 border-[#0b1829] animate-pulse" />
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
                <Zap className="w-5 h-5 text-[#FFA800]" />
              </div>
              <div>
                <h3 className="text-white font-extrabold text-base leading-tight">Start Today for Free</h3>
                <p className="text-[#99daff] text-xs leading-snug mt-1">
                  Try our AI answering service with 30 free patient calls. No commitment, no card required.
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
                <h4 className="text-white text-base font-bold mb-2">Got it — you're all set!</h4>
                <p className="text-[#99daff]/80 text-sm leading-relaxed mb-5">
                  Your request is in. One of our team members will contact you within 1 business day to get your free plan activated.
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
                    placeholder="Dr. Jane Smith"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass} htmlFor="cw-practice">
                    Practice Name <span className="text-[#FFA800]">*</span>
                  </label>
                  <input
                    id="cw-practice"
                    name="practice"
                    type="text"
                    required
                    value={form.practice}
                    onChange={handleChange}
                    placeholder="Smile Dental Group"
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
                    placeholder="jane@smiledental.com"
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
                    <label className={labelClass} htmlFor="cw-specialty">
                      Specialty <span className="text-[#FFA800]">*</span>
                    </label>
                    <select
                      id="cw-specialty"
                      name="specialty"
                      required
                      value={form.specialty}
                      onChange={handleChange}
                      className={`w-full bg-[#0e2242] border border-[#1e3d6e] focus:border-[#FFA800] outline-none text-sm rounded-lg px-3 py-2.5 transition-colors ${form.specialty === '' ? 'text-[#5a7ba8]' : 'text-white'}`}
                    >
                      <option value="">Select…</option>
                      {SPECIALTIES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="cw-volume">
                    After-hours calls to voicemail per week <span className="text-[#99daff]/40 font-normal">(optional)</span>
                  </label>
                  <select
                    id="cw-volume"
                    name="volume"
                    value={form.volume}
                    onChange={handleChange}
                    className={`w-full bg-[#0e2242] border border-[#1e3d6e] focus:border-[#FFA800] outline-none text-sm rounded-lg px-3 py-2.5 transition-colors ${form.volume === '' ? 'text-[#5a7ba8]' : 'text-white'}`}
                  >
                    <option value="">Select a range…</option>
                    {CALL_VOLUME_OPTIONS.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass} htmlFor="cw-message">
                    Anything we should know? <span className="text-[#99daff]/40 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="cw-message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="e.g. We miss a lot of new-patient calls after 5pm…"
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
                      Claim 30 Free Calls
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
