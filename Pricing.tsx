import { Check, ArrowRight, Sparkles, Moon, Sailboat, Anchor, Gift } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const plans = [
  {
    id: 'night-watch',
    icon: Moon,
    badge: null,
    name: 'Night Watch',
    tagline: 'A real person answers your evening calls, and your line never goes to voicemail after that.',
    cta: 'Get Your Free Consultation',
    ctaHref: 'https://calendly.com/contact-admincaptainva/15-minute-phone-audit',
    featured: false,
    bestFor: 'Owners who want every after-hours call answered and a clear view of the work coming in.',
    upgradeNote: null,
    features: [
      'Live agent for your evening calls',
      'Booking line for late nights and weekends',
      'Emergencies sent straight to you or your on-call tech',
      'Appointments booked into your calendar',
      'Morning summary of overnight calls',
      'Weekly call & lead scorecard',
    ],
  },
  {
    id: 'all-hands',
    icon: Sailboat,
    badge: 'Most Popular',
    name: 'All Hands On Deck',
    tagline: 'Every call answered. Every lead followed up. A live receptionist covers your days, evenings, and weekends.',
    cta: 'Get Your Free Consultation',
    ctaHref: 'https://calendly.com/contact-admincaptainva/15-minute-phone-audit',
    featured: true,
    bestFor: 'Owners who want every call answered and every lead followed up, without handling the phones themselves.',
    upgradeNote: null,
    features: [
      'Live receptionist from morning to night, 7 days a week',
      'Booking line overnight, with callbacks first thing',
      'Fast follow-up on every new lead',
      'Scheduling, confirmations, and reminders',
      'Weekly performance scorecard',
      '1 service of your choice from our Service Menu',
      'Monthly Office Credits for additional tasks',
    ],
  },
  {
    id: 'captain',
    icon: Anchor,
    badge: null,
    name: 'Captain Coverage',
    tagline: 'Your front office, handled. Everything in All Hands On Deck, plus the services that grow revenue and protect profit — for less than a part-time office hire.',
    cta: 'Get Your Free Consultation',
    ctaHref: 'https://calendly.com/contact-admincaptainva/15-minute-phone-audit',
    featured: false,
    bestFor: 'Owners who want their entire office handled, so they can focus on the field and growing the business.',
    upgradeNote: null,
    features: [
      'Everything in "All Hands On Deck"',
      '4 services of your choice from our Service Menu',
      'Larger monthly Office Credits balance',
      'Priority support',
    ],
  },
];

export default function Pricing() {
  const { ref, visible } = useReveal();

  return (
    <section id="bundles" className="relative bg-ink-900 py-24 sm:py-32 overflow-hidden">
      <div className="absolute -top-64 -left-64 w-[800px] h-[800px] rounded-full bg-gold-400/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-64 -right-64 w-[800px] h-[800px] rounded-full bg-sky-400/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center mb-16`}>
          <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
            Bundles
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight font-display">
            Support that scales with your business
          </h2>
          <p className="text-sky-400 text-lg max-w-2xl mx-auto">
            Your operation runs on execution. So do we. Start with the support you need today and scale up as your business grows.
          </p>
        </div>

        {/* Free 30-Day Pilot banner */}
        <div className={`reveal ${visible ? 'is-visible' : ''} mb-12`}>
          <div className="max-w-3xl mx-auto rounded-2xl bg-gradient-to-r from-gold-400/15 via-gold-400/10 to-sky-400/15 border border-gold-400/30 px-6 py-5 flex items-center gap-4 shadow-lg shadow-gold-400/10">
            <div className="w-12 h-12 rounded-xl bg-gold-400/20 flex items-center justify-center flex-shrink-0">
              <Gift className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <p className="text-white font-bold text-base">
                Free 30-Day Pilot for Night Watch!
              </p>
              <p className="text-sky-400/80 text-sm mt-0.5">
                Try our AI Receptionist for free!
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              className={`reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className={`relative rounded-2xl flex flex-col h-full transition-all duration-300 group ${
                  plan.featured
                    ? 'bg-gradient-to-b from-ink-600 to-ink-700 border-2 border-gold-400 shadow-2xl shadow-gold-400/20 lg:-mt-5'
                    : 'bg-ink-700 border border-ink-500/50 hover:border-ink-400/60 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full" />
                )}

                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-gold-400 text-ink-900 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-gold-400/30">
                      <Sparkles className="w-3 h-3" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="p-8 pb-0">
                  {/* Icon + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      plan.featured ? 'bg-gold-400/15 border border-gold-400/30' : 'bg-ink-500/40 border border-ink-500/60'
                    }`}>
                      <plan.icon className={`w-6 h-6 ${plan.featured ? 'text-gold-400' : 'text-sky-400'}`} />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white tracking-tight font-display">{plan.name}</h3>
                  </div>

                  <p className={`text-sm leading-relaxed mb-6 ${plan.featured ? 'text-gold-400/90' : 'text-sky-400/75'}`}>
                    {plan.tagline}
                  </p>

                </div>

                {/* Features */}
                <div className="px-8 flex-1">
                  <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${plan.featured ? 'text-gold-400/65' : 'text-sky-400/35'}`}>
                    What's included
                  </p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.featured ? 'bg-gold-400/15 text-gold-400' : 'bg-sky-400/10 text-sky-400'
                        }`}>
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span className={`text-sm leading-snug ${
                          f.startsWith('Everything in')
                            ? 'text-white font-semibold'
                            : 'text-sky-400/70'
                        }`}>
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Upgrade note */}
                  {plan.upgradeNote && (
                    <div className="mb-8 rounded-xl bg-sky-400/5 border border-sky-400/15 px-4 py-3">
                      <p className="text-sky-400/70 text-xs leading-relaxed">
                        {plan.upgradeNote}
                      </p>
                    </div>
                  )}
                </div>

                {/* Best for + CTA */}
                <div className="p-8 pt-0">
                  <div className={`rounded-xl px-4 py-3 mb-6 border ${
                    plan.featured
                      ? 'bg-ink-600/35 border-ink-500/70'
                      : 'bg-ink-600/15 border-ink-500/40'
                  }`}>
                    <p className="text-sky-400/40 text-xs font-bold uppercase tracking-widest mb-1">Best for</p>
                    <p className="text-sky-400/80 text-sm leading-snug">{plan.bestFor}</p>
                  </div>

                  <a
                    href={plan.ctaHref}
                    target={plan.ctaHref.startsWith('http') ? '_blank' : undefined}
                    rel={plan.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={`group/btn w-full inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-4 rounded-xl transition-all duration-200 ${
                      plan.featured
                        ? 'bg-gold-400 hover:bg-gold-500 text-ink-900 shadow-lg shadow-gold-400/25 hover:shadow-gold-400/40 hover:-translate-y-0.5'
                        : 'bg-ink-600/60 hover:bg-ink-600 text-white border border-ink-500 hover:border-sky-400/40 hover:-translate-y-0.5'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          {['We ask for 2 months to prove our value', 'After that, we earn your business every month', 'Cancel anytime with 30 days notice'].map((note) => (
            <div key={note} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-400/60 flex-shrink-0" />
              <span className="text-sky-400/60 text-sm">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
