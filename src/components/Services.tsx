import { Phone, BookOpen, Megaphone, Users, Check, Plus, ArrowRight, Bot } from 'lucide-react';

const services = [
  {
    icon: Phone,
    label: 'AS',
    title: 'Appointment Setting',
    tagline: 'Never miss a job again — 24/7',
    desc: 'Live professional dispatchers during peak hours paired with an advanced voice AI agent for nights, weekends, and overflow. Every call answered, every job booked — zero voicemails, zero missed opportunities.',
    features: [
      '24/7 Hybrid Phone Coverage — live dispatchers + voice AI agent',
      'Real-time job booking into Jobber, Housecall Pro, or ServiceTitan',
      'Instant missed-call text-back within 60 seconds',
      'Smart geographic dispatching by tech location and availability',
      'Appointment reminders & "on the way" notifications sent automatically',
      'Escalation Management — AI books routine jobs, complex calls transfer live to a human agent',
      'Proactive Outbound Growth — human agents call back old leads and follow up on unsigned quotes',
      'Weekly call report every Monday — answered, missed, recovered, booked',
    ],
    theme: 'blue',
    isAddon: false,
  },
  {
    icon: BookOpen,
    label: 'VA',
    title: 'Virtual Assistants',
    tagline: 'Your full back office — handled',
    desc: 'From bookkeeping to permit tracking, our team manages every administrative task so your operation runs clean, compliant, and on time — with AI bridging overnight messages to your admin team first thing in the morning.',
    features: [
      'Daily QuickBooks / Xero management — receipts matched and accounts reconciled weekly',
      'Estimates sent within 24 hours and invoices pushed out automatically',
      'Active collections follow-up — calls and texts on day 3 and day 7',
      'Permit filing, tracking, and deadline management',
      'Fleet maintenance tracking and technician hour audits for clean payroll',
      'License and insurance expiry tracking — we alert you before anything lapses',
      'AI-to-Admin Workflow Bridge — overnight voice AI messages alert your admin to file permits, source parts, or build custom invoices',
      'Monthly profit and loss snapshot delivered to your inbox',
    ],
    theme: 'gold',
    isAddon: false,
  },
  {
    icon: Megaphone,
    label: 'MKT',
    title: 'Marketing',
    tagline: 'Own your local market',
    desc: 'We build, run, and optimize your local ad campaigns and online reputation — turning your name into the one every homeowner recognizes. Fully integrated with your AI and human dispatch team for a closed-loop growth engine.',
    features: [
      'Hyper-local Meta and Google ad campaigns targeting your highest-margin zip codes',
      '3–5 branded before-and-after posts per week to Instagram and Facebook',
      'Automated Google review request via text within 30 minutes of every paid invoice',
      'Every review responded to within 24 hours — positive and negative',
      'Google Business Profile optimization — photos, hours, services, weekly posts',
      'Complete Operations & Marketing Loop — ads bring in leads, AI + human dispatchers book them, admin handles billing, marketing auto-texts the 5-star review',
      'Monthly ad performance report — spend, leads, cost per lead, booked jobs',
      'Monthly reputation report — new reviews, star rating, Google ranking trend',
    ],
    theme: 'blue',
    isAddon: false,
  },
  {
    icon: Users,
    label: 'Add-On',
    title: 'Recruiting & Hiring Support',
    tagline: 'Find your next great tech faster',
    desc: 'We handle the entire hiring funnel — from posting the job to first-day paperwork — so you stay focused on the crew you already have.',
    features: [
      'Job posting across trade job boards',
      'Applicant screening and shortlisting',
      'Interview scheduling and coordination',
      'Candidate follow-up and communication',
      'Onboarding paperwork preparation',
    ],
    theme: 'gold',
    isAddon: true,
  },
];

const themeMap = {
  blue: {
    band: 'from-[#99daff]/20 to-transparent',
    iconBg: 'bg-[#99daff]/15 text-[#99daff]',
    iconGlow: 'shadow-[0_0_24px_rgba(153,218,255,0.25)]',
    label: 'text-[#99daff]',
    labelBg: 'bg-[#99daff]/10 border-[#99daff]/20',
    border: 'border-[#1e3d6e] hover:border-[#99daff]/50',
    topBar: 'from-[#99daff]/60 via-[#99daff]/90 to-[#99daff]/60',
    checkBg: 'bg-[#99daff]/15 text-[#99daff]',
    tagline: 'text-[#99daff]',
    shadow: 'hover:shadow-[#99daff]/12',
    divider: 'bg-[#99daff]/10',
  },
  gold: {
    band: 'from-[#FFA800]/15 to-transparent',
    iconBg: 'bg-[#FFA800]/15 text-[#FFA800]',
    iconGlow: 'shadow-[0_0_24px_rgba(238,186,43,0.25)]',
    label: 'text-[#FFA800]',
    labelBg: 'bg-[#FFA800]/10 border-[#FFA800]/20',
    border: 'border-[#1e3d6e] hover:border-[#FFA800]/50',
    topBar: 'from-[#FFA800]/60 via-[#FFA800]/90 to-[#FFA800]/60',
    checkBg: 'bg-[#FFA800]/15 text-[#FFA800]',
    tagline: 'text-[#FFA800]',
    shadow: 'hover:shadow-[#FFA800]/12',
    divider: 'bg-[#FFA800]/10',
  },
};

export default function Services() {
  return (
    <section id="services" className="relative bg-[#0b1829] py-24 sm:py-32 overflow-hidden">

      {/* Background glows */}
      <div className="absolute -top-48 -left-48 w-[800px] h-[800px] rounded-full bg-[#99daff]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-48 -right-48 w-[800px] h-[800px] rounded-full bg-[#FFA800]/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[500px] rounded-full bg-[#1e3d6e]/35 blur-3xl pointer-events-none" />

      {/* Dot grids */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.08] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #FFA800 1px, transparent 1px)', backgroundSize: '22px 22px' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #99daff 1px, transparent 1px)', backgroundSize: '22px 22px' }}
      />

      {/* Diagonal stripes */}
      <div
        className="absolute -top-20 -right-20 w-[360px] h-[360px] opacity-[0.04] pointer-events-none"
        style={{ background: 'repeating-linear-gradient(-45deg, #FFA800, #FFA800 1px, transparent 1px, transparent 28px)' }}
      />
      <div
        className="absolute -bottom-20 -left-20 w-[360px] h-[360px] opacity-[0.04] pointer-events-none"
        style={{ background: 'repeating-linear-gradient(-45deg, #99daff, #99daff 1px, transparent 1px, transparent 28px)' }}
      />

      {/* Horizontal rules */}
      <div className="absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e3d6e]/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1e3d6e]/70 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="relative inline-flex items-center gap-2 text-[#FFA800] text-sm font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-[#FFA800]/50 inline-block" />
            Our Services
            <span className="w-6 h-px bg-[#FFA800]/50 inline-block" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            AI-powered operations for Service Professionals
          </h2>
          <p className="text-[#99daff] text-lg max-w-2xl mx-auto">
            Three core service lines — supercharged by AI and backed by human experts — plus a hiring add-on, built specifically for Service Professionals ready to scale without the overhead.
          </p>
        </div>

        {/* Cards layout: left col = AS + Marketing, right col = VA + Recruiting (smaller) */}
        <div className="grid sm:grid-cols-2 gap-6 items-start">

          {/* Left column: Appointment Setting + Marketing */}
          <div className="flex flex-col gap-6">
            {services.filter(s => !s.isAddon && s.label !== 'VA').map((s) => {
              const t = themeMap[s.theme as keyof typeof themeMap];
              return (
                <div
                  key={s.title}
                  className={`group relative bg-[#0e2242] border rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-200 ${t.border}`}
                >
                  <div className={`h-1 w-full bg-gradient-to-r ${t.topBar}`} />
                  <div className={`absolute top-1 left-0 right-0 h-32 bg-gradient-to-b ${t.band} pointer-events-none`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.025] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200 ${t.iconBg} ${t.iconGlow}`}>
                        <s.icon className="w-7 h-7" />
                      </div>
                      <span className={`inline-flex items-center gap-1.5 border text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full ${t.labelBg} ${t.label}`}>
                        <Bot className="w-3 h-3" />
                        {s.label}
                      </span>
                    </div>
                    <h3 className="text-white font-extrabold text-xl mb-1 tracking-tight">{s.title}</h3>
                    <p className={`text-sm font-semibold mb-3 ${t.tagline}`}>{s.tagline}</p>
                    <p className="text-[#99daff]/70 text-sm leading-relaxed group-hover:text-[#99daff]/90 transition-colors duration-300">{s.desc}</p>
                    <div className={`h-px w-full my-6 ${t.divider}`} />
                    <ul className="space-y-3">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${t.checkBg}`}>
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </span>
                          <span className="text-[#99daff]/75 text-sm leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right column: Virtual Assistants + Recruiting (smaller add-on) */}
          <div className="flex flex-col gap-6">
            {services.filter(s => s.label === 'VA').map((s) => {
              const t = themeMap[s.theme as keyof typeof themeMap];
              return (
                <div
                  key={s.title}
                  className={`group relative bg-[#0e2242] border rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-200 ${t.border}`}
                >
                  <div className={`h-1 w-full bg-gradient-to-r ${t.topBar}`} />
                  <div className={`absolute top-1 left-0 right-0 h-32 bg-gradient-to-b ${t.band} pointer-events-none`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.025] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-200 ${t.iconBg} ${t.iconGlow}`}>
                        <s.icon className="w-7 h-7" />
                      </div>
                      <span className={`inline-flex items-center gap-1.5 border text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full ${t.labelBg} ${t.label}`}>
                        <Bot className="w-3 h-3" />
                        {s.label}
                      </span>
                    </div>
                    <h3 className="text-white font-extrabold text-xl mb-1 tracking-tight">{s.title}</h3>
                    <p className={`text-sm font-semibold mb-3 ${t.tagline}`}>{s.tagline}</p>
                    <p className="text-[#99daff]/70 text-sm leading-relaxed group-hover:text-[#99daff]/90 transition-colors duration-300">{s.desc}</p>
                    <div className={`h-px w-full my-6 ${t.divider}`} />
                    <ul className="space-y-3">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${t.checkBg}`}>
                            <Check className="w-3 h-3" strokeWidth={3} />
                          </span>
                          <span className="text-[#99daff]/75 text-sm leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}

            {/* Recruiting add-on — smaller card */}
            {services.filter(s => s.isAddon).map((s) => {
              const t = themeMap[s.theme as keyof typeof themeMap];
              return (
                <div
                  key={s.title}
                  className={`group relative bg-[#0e2242] border rounded-2xl overflow-hidden hover:-translate-y-1 transition-transform duration-200 ${t.border}`}
                >
                  <div className={`h-1 w-full bg-gradient-to-r ${t.topBar}`} />
                  <div className={`absolute top-1 left-0 right-0 h-24 bg-gradient-to-b ${t.band} pointer-events-none`} />
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.025] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="relative p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors duration-200 ${t.iconBg} ${t.iconGlow}`}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <span className={`inline-flex items-center gap-1.5 border text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-full ${t.labelBg} ${t.label}`}>
                        <Plus className="w-3 h-3" />
                        Add-On
                      </span>
                    </div>
                    <h3 className="text-white font-extrabold text-lg mb-1 tracking-tight">{s.title}</h3>
                    <p className={`text-xs font-semibold mb-2 ${t.tagline}`}>{s.tagline}</p>
                    <p className="text-[#99daff]/70 text-xs leading-relaxed group-hover:text-[#99daff]/90 transition-colors duration-300">{s.desc}</p>
                    <div className={`h-px w-full my-4 ${t.divider}`} />
                    <ul className="space-y-2">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5">
                          <span className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${t.checkBg}`}>
                            <Check className="w-2.5 h-2.5" strokeWidth={3} />
                          </span>
                          <span className="text-[#99daff]/75 text-xs leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="text-[#99daff]/50 text-sm">All services are scoped to your business on your discovery call.</p>
          <a
            href="https://calendly.com/contact-admincaptainva/15-minute-phone-audit"
            target="_blank"
            rel="noopener noreferrer"
            className="group/cta inline-flex items-center gap-2 bg-[#FFA800] hover:bg-[#E09600] text-[#0b1829] font-bold text-sm px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#FFA800]/25 hover:shadow-[#FFA800]/40 hover:-translate-y-0.5"
          >
            Get Your Free Consultation
            <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
