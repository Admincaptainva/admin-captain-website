import { Check, ArrowRight, Sparkles, Phone } from 'lucide-react';

const plans = [
  {
    id: 'growth',
    badge: null,
    name: 'Stop Missing Calls',
    sub: 'Appointment Setting Agent (AS)',
    tagline: 'Every missed call is a job booked for your competitor',
    description: null,
    priceLabel: 'Contact Us',
    priceSub: 'Pricing shared on your discovery call',
    cta: 'Get Your Free Consultation',
    ctaHref: 'https://calendly.com/contact-admincaptainva/15-minute-phone-audit',
    featured: false,
    bestFor: 'Owner-operators and growing Service Professionals who can\'t afford to miss a single call',
    features: [
      '24/7 Hybrid Phone Coverage — Live professional dispatchers during peak hours paired with an advanced voice AI agent for night, weekend, and overflow calls. Zero voicemails, zero missed jobs.',
      'Real-time appointment booking directly into your field software (Jobber, Housecall Pro, ServiceTitan)',
      'Instant missed-call text-back — every hang-up gets a text within 60 seconds',
      'Smart geographic dispatching — jobs assigned to the right tech based on location and availability',
      '24-hour appointment reminders and "on the way" notifications sent automatically to customers',
      'Weekly call report every Monday — calls answered, missed, recovered, and booked',
      'Escalation Management — The AI books the routine jobs; any complex issues, complaints, or emergency calls are immediately transferred live to your human agent.',
      'Proactive Outbound Growth — Your human agent spends their shift calling back old leads and following up on unsigned quotes to win you extra revenue.',
    ],
  },
  {
    id: 'established',
    badge: 'Most Popular',
    name: 'Run Without You',
    sub: 'AS + Virtual Assistant (VA)',
    tagline: 'Full back-office operations — handled end to end',
    description: null,
    priceLabel: 'Contact Us',
    priceSub: 'Pricing shared on your discovery call',
    cta: 'Get Your Free Consultation',
    ctaHref: 'https://calendly.com/contact-admincaptainva/15-minute-phone-audit',
    featured: true,
    bestFor: 'Businesses ready to hand off the entire back office and get their time back',
    features: [
      'Everything in "Stop Missing Calls" — 24/7 hybrid phone booking, AI receptionist, and weekly reporting.',
      'Daily QuickBooks or Xero management — receipts matched, expenses categorized, and accounts reconciled weekly',
      'Estimates sent within 24 hours of job completion and invoices pushed out automatically',
      'Active collections follow-up — we call and text overdue customers on day 3 and day 7',
      'Municipal permit filing, tracking, and deadline management so no job gets held up on paperwork',
      'Fleet maintenance tracking and technician hour audits for clean, accurate payroll every period',
      'License and insurance expiry tracking — we alert you before anything lapses',
      'AI-to-Admin Workflow Bridge — When your 24/7 Voice AI takes a detailed message for a custom job overnight, it instantly alerts your human Admin Agent to file permits, source parts, or build out the custom QuickBooks invoice first thing in the morning.',
      'Monthly profit and loss snapshot delivered straight to your inbox',
    ],
  },
  {
    id: 'full',
    badge: null,
    name: 'Dominate Your Market',
    sub: 'AS + VA + Marketing',
    tagline: 'Full operations plus local market domination',
    description: null,
    priceLabel: 'Custom Quote',
    priceSub: 'Scoped around your operation',
    cta: 'Get Your Free Consultation',
    ctaHref: '#contact',
    featured: false,
    bestFor: 'Established operations ready to outrank and outspend every competitor in their market',
    features: [
      'Everything in "Run Without You" — 24/7 hybrid phone booking, full back-office VAA support, bookkeeping, and permit tracking.',
      'Hyper-local Meta and Google ad campaigns targeting your highest-margin zip codes — we build, launch, and manage everything',
      '3–5 branded before-and-after posts per week to Instagram and Facebook — we source photos and handle all editing and captions',
      'Automated Google review request via text within 30 minutes of every paid invoice',
      'Every new review responded to within 24 hours — positive and negative — to protect and build your reputation',
      'Google Business Profile kept fully updated — photos, hours, services, and weekly posts to maximize local SEO',
      'The Complete Operations & Marketing Loop — Your marketing agent brings in new leads via Google and Meta ads; your 24/7 AI and human dispatcher answers them instantly to book the jobs; your Admin Agent handles the billing and tracking; and your marketing system automatically text-harvests the 5-star review. Fully automated local domination.',
      'Monthly ad performance report — spend, leads generated, cost per lead, and booked jobs',
      'Monthly reputation report — new reviews, average star rating, and Google ranking trend',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="relative bg-[#0b1829] py-24 sm:py-32 overflow-hidden">

      {/* ── Deep background glows ────────────────────────────── */}
      <div className="absolute -top-64 -left-64 w-[900px] h-[900px] rounded-full bg-[#FFA800]/8 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-64 -right-64 w-[900px] h-[900px] rounded-full bg-[#99daff]/8 blur-3xl pointer-events-none" />
      {/* Gold mid-page pulse directly behind the featured card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FFA800]/5 blur-3xl pointer-events-none" />

      {/* ── Dot grid — top-right ─────────────────────────────── */}
      <div
        className="absolute top-0 right-0 w-[480px] h-[480px] opacity-[0.07] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #FFA800 1px, transparent 1px)', backgroundSize: '22px 22px' }}
      />
      {/* ── Dot grid — bottom-left ───────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 w-[480px] h-[480px] opacity-[0.055] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #99daff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
      />

      {/* ── Diagonal stripe texture — corners ───────────────── */}
      <div
        className="absolute -top-20 -left-20 w-[420px] h-[420px] opacity-[0.035] pointer-events-none"
        style={{ background: 'repeating-linear-gradient(-45deg, #99daff, #99daff 1px, transparent 1px, transparent 28px)' }}
      />
      <div
        className="absolute -bottom-20 -right-20 w-[420px] h-[420px] opacity-[0.035] pointer-events-none"
        style={{ background: 'repeating-linear-gradient(-45deg, #FFA800, #FFA800 1px, transparent 1px, transparent 28px)' }}
      />

      {/* ── Horizontal rules framing the section ────────────── */}
      <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e3d6e]/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e3d6e]/70 to-transparent pointer-events-none" />

      {/* ── Vertical side accents ────────────────────────────── */}
      <div className="absolute top-24 bottom-24 left-6 w-px bg-gradient-to-b from-transparent via-[#FFA800]/15 to-transparent pointer-events-none hidden xl:block" />
      <div className="absolute top-24 bottom-24 right-6 w-px bg-gradient-to-b from-transparent via-[#99daff]/15 to-transparent pointer-events-none hidden xl:block" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16 relative">
          <span className="relative inline-flex items-center gap-2 text-[#FFA800] text-sm font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-[#FFA800]/50 inline-block" />
            Pricing
            <span className="w-6 h-px bg-[#FFA800]/50 inline-block" />
          </span>
          <h2 className="relative text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Support that scales with your business
          </h2>
          <p className="relative text-[#99daff] text-lg max-w-2xl mx-auto">
            Your operation runs on execution. So do we. Start with the support you need today and scale up as your business grows.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl flex flex-col transition-[transform,box-shadow] duration-200 group ${
                plan.featured
                  ? 'bg-gradient-to-b from-[#0f2847] to-[#0e2242] border-2 border-[#FFA800] shadow-2xl shadow-[#FFA800]/20 lg:-mt-5'
                  : 'bg-[#0e2242] border border-[#1e3d6e] hover:border-[#1e3d6e]/80 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-1'
              }`}
            >
              {/* Shimmer top edge on featured */}
              {plan.featured && (
                <>
                  <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#FFA800] to-transparent rounded-full" />
                  {/* Corner sparkles */}
                  <div className="absolute top-3 left-3 w-1.5 h-1.5 rounded-full bg-[#FFA800]/50" />
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[#FFA800]/50" />
                </>
              )}

              {/* Non-featured: faint hover top glow */}
              {!plan.featured && (
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#99daff]/0 to-transparent group-hover:via-[#99daff]/35 transition-colors duration-200 rounded-full" />
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-[#FFA800] text-[#0b1829] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-[#FFA800]/30">
                    <Sparkles className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Top section */}
              <div className="p-8 pb-0">
                <div className="mb-5">
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">{plan.name}</h3>
                  {plan.sub && (
                    <p className="text-[#FFA800] text-xs font-bold uppercase tracking-widest mt-0.5">{plan.sub}</p>
                  )}
                  <p className={`text-sm font-semibold mt-2 ${plan.featured ? 'text-[#FFA800]' : 'text-[#99daff]/75'}`}>
                    {plan.tagline}
                  </p>
                  {plan.description && (
                    <p className="text-[#99daff]/60 text-sm leading-relaxed mt-3">
                      {plan.description}
                    </p>
                  )}
                </div>

                {/* Price box */}
                <div className={`relative rounded-xl px-5 py-4 mb-7 border overflow-hidden ${
                  plan.featured
                    ? 'bg-[#FFA800]/10 border-[#FFA800]/30'
                    : 'bg-[#1e3d6e]/20 border-[#1e3d6e]'
                }`}>
                  {plan.featured && (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFA800]/5 to-transparent pointer-events-none" />
                  )}
                  <div className="relative flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${plan.featured ? 'bg-[#FFA800]/15' : 'bg-[#1e3d6e]/50'}`}>
                      <Phone className={`w-4 h-4 ${plan.featured ? 'text-[#FFA800]' : 'text-[#99daff]'}`} />
                    </div>
                    <div>
                      <p className="font-extrabold text-xl leading-tight text-white">
                        {plan.priceLabel}
                      </p>
                      <p className={`text-xs mt-0.5 ${plan.featured ? 'text-[#99daff]/60' : 'text-[#99daff]/40'}`}>
                        {plan.priceSub}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="px-8 flex-1">
                <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${plan.featured ? 'text-[#FFA800]/65' : 'text-[#99daff]/35'}`}>
                  What's included
                </p>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.featured ? 'bg-[#FFA800]/15 text-[#FFA800]' : 'bg-[#99daff]/10 text-[#99daff]'
                      }`}>
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </span>
                      <span className={`text-sm leading-snug ${
                        f.startsWith('Everything in')
                          ? 'text-white font-semibold'
                          : 'text-[#99daff]/70'
                      }`}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best for + CTA */}
              <div className="p-8 pt-0">
                <div className={`rounded-xl px-4 py-3 mb-6 border ${
                  plan.featured
                    ? 'bg-[#1e3d6e]/35 border-[#1e3d6e]/70'
                    : 'bg-[#1e3d6e]/15 border-[#1e3d6e]/40'
                }`}>
                  <p className="text-[#99daff]/40 text-xs font-bold uppercase tracking-widest mb-1">Best for</p>
                  <p className="text-[#99daff]/80 text-sm leading-snug">{plan.bestFor}</p>
                </div>

                <a
                  href={plan.ctaHref}
                  target={plan.ctaHref.startsWith('http') ? '_blank' : undefined}
                  rel={plan.ctaHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group/btn w-full inline-flex items-center justify-center gap-2 font-bold text-sm px-6 py-4 rounded-xl transition-all duration-200 ${
                    plan.featured
                      ? 'bg-[#FFA800] hover:bg-[#E09600] text-[#0b1829] shadow-lg shadow-[#FFA800]/25 hover:shadow-[#FFA800]/40 hover:-translate-y-0.5'
                      : 'bg-[#1e3d6e]/60 hover:bg-[#1e3d6e] text-white border border-[#1e3d6e] hover:border-[#99daff]/40 hover:-translate-y-0.5'
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom trust strip */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-center">
          {['We ask for 2 months to prove our value', 'After that, we earn your business every month', 'Cancel anytime with 30 days notice'].map((note) => (
            <div key={note} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFA800]/60 flex-shrink-0" />
              <span className="text-[#99daff]/45 text-sm">{note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
