import { useState } from 'react';
import { ArrowRight, X, Moon, Check, Gift } from 'lucide-react';

const pilotFeatures = [
  'AI answers your first 30 after-hours calls each month',
  'Caller info and reason captured',
  'Emergencies sent to your on-call specialist',
  'Booking link texted to callers',
  'Morning summary on your desk',
];

const checkItems = ['Free plan', 'Doctor-approved scripts', 'Live in days'];

export default function Hero() {
  const [showPilot, setShowPilot] = useState(false);

  return (
    <section className="relative min-h-screen bg-ink-900 overflow-hidden flex items-center">
      {/* Plain dark navy gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-ink-800" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      {/* Gold glow top-right */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold-400/15 blur-[120px] pointer-events-none" />
      {/* Sky glow bottom-left */}
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-400/12 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12 py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <div className="animate-fade-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Every Patient Call{' '}
            <span className="relative inline-block">
              Answered.
              <span className="absolute -bottom-1 left-0 right-0 h-1 bg-sky-400 rounded-full" />
            </span>
            <span className="block text-gradient-gold mt-2">Day, Night &amp; Weekends.</span>
          </h1>

          <p className="text-sky-400/90 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            Live receptionists and AI for dental specialty practices. We catch the calls your front desk can't get to, book new patients, and send emergencies to your on-call specialist.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-500 text-ink-900 font-bold text-base px-8 py-4 rounded-xl transition-all shadow-lg shadow-gold-400/25 hover:shadow-gold-400/40 hover:-translate-y-0.5"
            >
              Book a 15-Min Call
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={() => setShowPilot(true)}
              className="inline-flex items-center justify-center gap-2 glass border border-ink-500/50 hover:border-sky-400/40 text-sky-400 hover:text-white font-semibold text-base px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5"
            >
              Start Free
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {checkItems.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-gold-400/15 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-gold-400" strokeWidth={3} />
                </span>
                <span className="text-sky-400/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — photo of empty dental office reception with floating card */}
        <div className="hidden lg:block relative">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/6809645/pexels-photo-6809645.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Empty modern dental office reception desk with warm evening light"
              loading="eager"
              decoding="async"
              width={900}
              height={1350}
              className="rounded-2xl shadow-2xl shadow-black/50 w-full object-cover aspect-[4/5] ring-1 ring-white/15"
            />
            {/* Soft dark overlay at bottom to blend with navy */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-ink-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Floating "Office closed" card — bottom-left corner */}
            <div className="absolute -bottom-4 -left-4 rounded-xl bg-ink-800/95 backdrop-blur-sm border border-gold-400/30 shadow-xl shadow-black/50 px-5 py-4 flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="relative flex w-2.5 h-2.5">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400/60 animate-ping" />
                  <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Live</span>
              </div>
              <div className="w-px h-8 bg-ink-500/50" />
              <div>
                <p className="text-white text-sm font-bold leading-tight">Office closed.</p>
                <p className="text-gold-400/80 text-xs leading-tight mt-0.5">Phones covered.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />

      {/* Start Free popup */}
      {showPilot && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={() => setShowPilot(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md rounded-2xl bg-ink-800 border border-gold-400/30 shadow-2xl shadow-gold-400/10 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowPilot(false)}
              className="absolute top-4 right-4 text-sky-400/60 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gold-400/15 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
                  <Moon className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-white tracking-tight font-display">Start Free</h3>
                  <p className="text-gold-400/80 text-sm">30 AI-answered calls every month</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-5 rounded-xl bg-gold-400/10 border border-gold-400/20 px-4 py-3">
                <Gift className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <p className="text-white/90 text-sm">Start free with 30 AI-answered calls a month.</p>
              </div>

              <ul className="space-y-3 mb-7">
                {pilotFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gold-400/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-gold-400" strokeWidth={3} />
                    </span>
                    <span className="text-sky-400/80 text-sm leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                onClick={() => setShowPilot(false)}
                className="group w-full inline-flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-500 text-ink-900 font-bold text-sm px-6 py-4 rounded-xl transition-all shadow-lg shadow-gold-400/25 hover:shadow-gold-400/40"
              >
                Start Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-center text-sky-400/40 text-xs mt-4">Upgrade anytime when you need more calls or a live receptionist.</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
