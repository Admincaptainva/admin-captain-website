import { Check, Minus, ArrowRight, Anchor, Moon, Sailboat, Sparkles, Phone, MessageSquare, TrendingUp, ShieldCheck, Clock, RotateCcw } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

type Cell = 'yes' | 'no';

const plans = [
  {
    id: 'night-watch',
    icon: Moon,
    name: 'Night Watch',
    tagline: 'Never send a caller to voicemail again.',
    bestFor: 'Practices that want every call answered without adding staff.',
    featured: false,
    badge: null,
    ctaHref: 'https://calendly.com/contact-admincaptainva/15-minute-phone-audit',
  },
  {
    id: 'all-hands',
    icon: Sailboat,
    name: 'All Hands On Deck',
    tagline: 'A real person answers your evening calls. AI covers the rest of the night.',
    bestFor: 'Practices losing new patients to voicemail after closing time.',
    featured: true,
    badge: 'Most Coverage',
    ctaHref: 'https://calendly.com/contact-admincaptainva/15-minute-phone-audit',
  },
  {
    id: 'captain',
    icon: Anchor,
    name: 'Captain Coverage',
    tagline: 'Every call caught, day and night. We back up your front desk, not replace it.',
    bestFor: "Busy practices whose front desk can't get to every call.",
    featured: false,
    badge: null,
    ctaHref: 'https://calendly.com/contact-admincaptainva/15-minute-phone-audit',
  },
];

const categories: {
  label: string;
  icon: typeof Phone;
  rows: { label: string; values: [Cell, Cell, Cell] }[];
}[] = [
  {
    label: 'Call Coverage',
    icon: Phone,
    rows: [
      { label: 'Answer after-hours calls', values: ['yes', 'yes', 'yes'] },
      { label: 'Emergency routing to on-call doctor', values: ['yes', 'yes', 'yes'] },
      { label: 'Backup for missed daytime calls', values: ['no', 'no', 'yes'] },
      { label: 'Missed-call callbacks', values: ['no', 'no', 'yes'] },
    ],
  },
  {
    label: 'Patient Communication',
    icon: MessageSquare,
    rows: [
      { label: 'Morning summary', values: ['yes', 'yes', 'yes'] },
      { label: 'Live new-patient booking requests', values: ['no', 'yes', 'yes'] },
      { label: 'Confirmations and reminders', values: ['no', 'no', 'yes'] },
      { label: 'Consult and treatment follow-up', values: ['no', 'no', 'yes'] },
    ],
  },
  {
    label: 'Practice Growth',
    icon: TrendingUp,
    rows: [
      { label: 'Weekly scorecard', values: ['no', 'yes', 'yes'] },
      { label: 'Recall and reactivation calls', values: ['no', 'no', 'yes'] },
      { label: 'Review requests', values: ['no', 'no', 'yes'] },
    ],
  },
];

const trustItems = [
  { icon: ShieldCheck, text: '2 months to prove our value' },
  { icon: Clock, text: 'After that, we earn your business every month' },
  { icon: RotateCcw, text: 'Cancel anytime with 30 days notice' },
];

function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <span className={`inline-flex w-6 h-6 rounded-full items-center justify-center transition-transform duration-200 ${
      featured ? 'bg-gold-400/20' : 'bg-gold-400/12'
    }`}>
      <Check className={`w-3.5 h-3.5 ${featured ? 'text-gold-300' : 'text-gold-400'}`} strokeWidth={3} />
    </span>
  );
}

function DashIcon() {
  return (
    <span className="inline-flex w-6 h-6 items-center justify-center">
      <Minus className="w-4 h-4 text-sky-400/20" strokeWidth={2.5} />
    </span>
  );
}

export default function ComparePlans() {
  const { ref, visible } = useReveal();

  return (
    <section className="relative min-h-screen bg-ink-900 pt-32 pb-24 overflow-hidden">
      {/* Faint background layers */}
      <div className="absolute inset-0 wave-circle-dots opacity-[0.3] pointer-events-none" />
      <div className="absolute -top-48 left-1/4 w-[600px] h-[600px] rounded-full bg-gold-400/6 blur-[140px] pointer-events-none drift-slow" />
      <div className="absolute -bottom-48 right-1/4 w-[600px] h-[600px] rounded-full bg-sky-400/6 blur-[140px] pointer-events-none drift-slow-reverse" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Heading */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center mb-14`}>
          <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
            Plan Comparison
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight font-display">
            Compare Plans
          </h2>
          <p className="text-sky-400 text-lg max-w-2xl mx-auto leading-relaxed">
            See exactly what each plan covers — side by side.
          </p>
        </div>

        {/* ════════════════════════════════════════════
            DESKTOP TABLE (md and up)
            ════════════════════════════════════════════ */}
        <div className={`reveal ${visible ? 'is-visible' : ''} hidden md:block`}>
          <div className="rounded-2xl border border-ink-500/40 overflow-hidden bg-ink-800/30 shadow-2xl shadow-black/40">
            <table className="w-full">
              {/* ── Plan header row ── */}
              <thead>
                <tr>
                  <th className="text-left py-8 px-6 bg-ink-800/60 w-[28%]">
                    <span className="text-sky-400/40 text-xs font-bold uppercase tracking-widest">Feature</span>
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`py-8 px-5 text-center relative ${
                        plan.featured
                          ? 'bg-gradient-to-b from-gold-400/12 via-gold-400/4 to-transparent border-x-2 border-t-2 border-gold-400'
                          : 'bg-ink-800/40 border-b border-ink-500/40'
                      }`}
                    >
                      {plan.featured && plan.badge && (
                        <span className="absolute top-0 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 bg-gold-400 text-ink-900 text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1.5 rounded-b-lg shadow-lg shadow-gold-400/30 whitespace-nowrap">
                          <Sparkles className="w-3 h-3" />
                          {plan.badge}
                        </span>
                      )}
                      <div className="flex flex-col items-center gap-3 mt-2">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 ${
                          plan.featured
                            ? 'bg-gradient-to-br from-gold-400/25 to-gold-400/5 border border-gold-400/40'
                            : 'bg-ink-500/40 border border-ink-500/60'
                        }`}>
                          <plan.icon className={`w-6 h-6 ${plan.featured ? 'text-gold-400' : 'text-sky-400'}`} />
                        </div>
                        <span className={`text-lg font-extrabold tracking-tight font-display ${plan.featured ? 'text-white' : 'text-white/90'}`}>
                          {plan.name}
                        </span>
                        <p className={`text-xs leading-relaxed max-w-[14rem] ${plan.featured ? 'text-gold-300/80' : 'text-sky-400/60'}`}>
                          {plan.tagline}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {categories.map((cat) => (
                  <>
                    {/* Category divider row */}
                    <tr key={cat.label}>
                      <td colSpan={4} className="py-3 px-6 bg-ink-800/50 border-y border-ink-500/30">
                        <div className="flex items-center gap-2.5">
                          <cat.icon className="w-4 h-4 text-gold-400/70" strokeWidth={2} />
                          <span className="text-gold-400/80 text-xs font-bold uppercase tracking-widest">{cat.label}</span>
                      </div>
                      </td>
                    </tr>
                    {/* Feature rows */}
                    {cat.rows.map((row, ri) => (
                      <tr
                        key={row.label}
                        className={`border-b border-ink-500/15 ${ri % 2 === 0 ? 'bg-ink-800/15' : ''} hover:bg-ink-700/25 transition-colors`}
                      >
                        <td className="text-left py-4 px-6 text-sky-300/90 text-sm font-medium">
                          {row.label}
                        </td>
                        {row.values.map((val, vi) => {
                          const plan = plans[vi];
                          return (
                            <td
                              key={vi}
                              className={`text-center py-4 px-5 ${
                                plan.featured ? 'border-x-2 border-gold-400/50 bg-gold-400/[0.03]' : ''
                              }`}
                            >
                              {val === 'yes' ? <CheckIcon featured={plan.featured} /> : <DashIcon />}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </>
                ))}

                {/* Best-for row */}
                <tr>
                  <td className="text-left py-5 px-6 bg-ink-800/40">
                    <span className="text-sky-400/40 text-xs font-bold uppercase tracking-widest">Best for</span>
                  </td>
                  {plans.map((plan) => (
                    <td
                      key={plan.id}
                      className={`text-center py-5 px-5 ${
                        plan.featured ? 'border-x-2 border-gold-400/50 bg-gold-400/[0.03]' : 'bg-ink-800/20'
                      }`}
                    >
                      <p className={`text-xs leading-relaxed ${plan.featured ? 'text-gold-300/70' : 'text-sky-400/50'}`}>
                        {plan.bestFor}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* CTA row */}
                <tr>
                  <td className="py-6 px-6 bg-ink-800/40" />
                  {plans.map((plan) => (
                    <td
                      key={plan.id}
                      className={`text-center py-6 px-5 ${
                        plan.featured ? 'border-x-2 border-b-2 border-gold-400/50 bg-gold-400/[0.04]' : 'bg-ink-800/20'
                      }`}
                    >
                      <a
                        href={plan.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200 ${
                          plan.featured
                            ? 'bg-gold-400 hover:bg-gold-500 text-ink-900 shadow-lg shadow-gold-400/20 hover:shadow-gold-400/35 hover:-translate-y-0.5'
                            : 'bg-ink-600/60 hover:bg-ink-600 text-white border border-ink-500 hover:border-gold-400/40 hover:-translate-y-0.5'
                        }`}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            MOBILE TABLE (below md) — scrollable, sticky first column
            ════════════════════════════════════════════ */}
        <div className={`reveal ${visible ? 'is-visible' : ''} md:hidden`}>
          <div className="overflow-x-auto -mx-5 px-5 pb-2">
            <table className="w-full min-w-[520px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="sticky left-0 z-20 bg-ink-900 text-left py-5 px-3 w-28 min-w-[7rem] align-bottom">
                    <span className="text-sky-400/40 text-[10px] font-bold uppercase tracking-widest">Feature</span>
                  </th>
                  {plans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`py-5 px-3 text-center min-w-[8rem] align-top ${
                        plan.featured
                          ? 'bg-gradient-to-b from-gold-400/12 to-transparent border-x-2 border-t-2 border-gold-400'
                          : 'bg-ink-800/60'
                      }`}
                    >
                      {plan.featured && plan.badge && (
                        <span className="inline-flex items-center gap-1 bg-gold-400 text-ink-900 text-[8px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-full whitespace-nowrap mb-2 shadow-md shadow-gold-400/20">
                          <Sparkles className="w-2.5 h-2.5" />
                          {plan.badge}
                        </span>
                      )}
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          plan.featured
                            ? 'bg-gradient-to-br from-gold-400/25 to-gold-400/5 border border-gold-400/40'
                            : 'bg-ink-500/40 border border-ink-500/60'
                        }`}>
                          <plan.icon className={`w-5 h-5 ${plan.featured ? 'text-gold-400' : 'text-sky-400'}`} />
                        </div>
                        <span className="text-xs font-extrabold tracking-tight font-display text-white text-center leading-tight">
                          {plan.name}
                        </span>
                        <p className={`text-[10px] leading-relaxed ${plan.featured ? 'text-gold-300/70' : 'text-sky-400/50'}`}>
                          {plan.tagline}
                        </p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <>
                    {/* Category divider */}
                    <tr key={cat.label}>
                      <td
                        colSpan={4}
                        className="sticky left-0 z-10 py-2.5 px-3 bg-ink-800/80 border-y border-ink-500/30"
                      >
                        <div className="flex items-center gap-2">
                          <cat.icon className="w-3.5 h-3.5 text-gold-400/70" strokeWidth={2} />
                          <span className="text-gold-400/80 text-[10px] font-bold uppercase tracking-widest">{cat.label}</span>
                        </div>
                      </td>
                    </tr>
                    {cat.rows.map((row, ri) => (
                      <tr key={row.label}>
                        <td
                          className={`sticky left-0 z-10 text-left py-3 px-3 text-sky-300/90 text-xs font-medium border-b border-ink-500/15 ${
                            ri % 2 === 0 ? 'bg-ink-800/80' : 'bg-ink-900'
                          }`}
                        >
                          {row.label}
                        </td>
                        {row.values.map((val, vi) => {
                          const plan = plans[vi];
                          return (
                            <td
                              key={vi}
                              className={`text-center py-3 px-3 border-b border-ink-500/15 ${
                                plan.featured ? 'bg-gold-400/[0.04] border-x-2 border-gold-400/50' : ''
                              }`}
                            >
                              {val === 'yes' ? <CheckIcon featured={plan.featured} /> : <DashIcon />}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </>
                ))}

                {/* Best-for row */}
                <tr>
                  <td className="sticky left-0 z-10 py-4 px-3 bg-ink-800/80">
                    <span className="text-sky-400/40 text-[10px] font-bold uppercase tracking-widest">Best for</span>
                  </td>
                  {plans.map((plan) => (
                    <td
                      key={plan.id}
                      className={`text-center py-4 px-3 ${plan.featured ? 'bg-gold-400/[0.04] border-x-2 border-gold-400/50' : 'bg-ink-800/40'}`}
                    >
                      <p className={`text-[10px] leading-relaxed ${plan.featured ? 'text-gold-300/70' : 'text-sky-400/50'}`}>
                        {plan.bestFor}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* CTA row */}
                <tr>
                  <td className="sticky left-0 z-10 bg-ink-900" />
                  {plans.map((plan) => (
                    <td
                      key={plan.id}
                      className={`text-center py-5 px-3 ${plan.featured ? 'bg-gold-400/[0.04] border-x-2 border-b-2 border-gold-400/50' : 'bg-ink-800/40'}`}
                    >
                      <a
                        href={plan.ctaHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 font-bold text-xs px-4 py-2.5 rounded-xl transition-all duration-200 ${
                          plan.featured
                            ? 'bg-gold-400 hover:bg-gold-500 text-ink-900 shadow-md shadow-gold-400/20'
                            : 'bg-ink-600/60 hover:bg-ink-600 text-white border border-ink-500'
                        }`}
                      >
                        Get Started
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            Bottom CTA section
            ════════════════════════════════════════════ */}
        <div
          className={`reveal ${visible ? 'is-visible' : ''} mt-16`}
          style={{ transitionDelay: '150ms' }}
        >
          <div className="rounded-2xl bg-gradient-to-r from-ink-700/80 via-ink-700/50 to-ink-700/80 border border-ink-500/40 px-6 sm:px-10 py-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mb-3">
              Still not sure which plan is right?
            </h3>
            <p className="text-sky-400/80 text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Book a quick call and we'll help you pick the right level of coverage for your practice.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://calendly.com/contact-admincaptainva/15-minute-phone-audit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-ink-900 font-bold text-sm px-7 py-3.5 rounded-full transition-all shadow-lg shadow-gold-400/20 hover:shadow-gold-400/35 hover:-translate-y-0.5"
              >
                Book a 15-Min Call
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-ink-600/50 hover:bg-ink-600 text-white border border-ink-500 hover:border-gold-400/40 font-bold text-sm px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5"
              >
                Start Free
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Trust bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
            {trustItems.map((item) => (
              <div key={item.text} className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4 text-gold-400/60 flex-shrink-0" strokeWidth={2} />
                <span className="text-sky-400/60 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
