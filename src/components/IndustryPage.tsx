import { Fragment } from 'react';
import { ArrowLeft, ArrowRight, Building2, Check, Clock3, Scale, ShieldCheck, Stethoscope, Sparkles, X } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';
import LostRevenueCalculator from './LostRevenueCalculator';
import { dentalConfig } from '../lib/calculator-configs';

export type IndustryKey = 'dental' | 'property' | 'legal';

type IndustryContent = {
  name: string;
  shortName: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: typeof Stethoscope;
  accent: string;
  bundles: {
    name: string;
    price: string;
    calls: string;
    extra: string;
    setup: string;
    included: string[];
    badge?: string;
    badgeStyle?: 'filled' | 'outlined';
    headerPrice?: string;
    priceSubtitle?: string;
    pricePill?: string;
  }[];
};

const industryContent: Record<IndustryKey, IndustryContent> = {
  dental: {
    name: 'Dental Specialties',
    shortName: 'dental specialty practices',
    eyebrow: 'Clinical call coverage',
    title: 'Keep every patient opportunity moving forward.',
    description: 'From new-patient consults to urgent post-op calls, your patients reach a trained voice and your team gets the right information at the right time.',
    icon: Stethoscope,
    accent: 'Dental',
    bundles: [
      {
        name: 'Night Watch',
        price: '$0/mo',
        calls: '30 every month',
        extra: '$4.25',
        setup: 'None',
        included: ['Specialist answers after-hours calls', 'Caller\'s name, number and reason captured', 'Life-threatening emergencies directed to 911', 'Standard dental script', 'Weekly call summary'],
      },
      {
        name: 'All Hands On Deck',
        price: '$349/mo',
        calls: '120',
        extra: '$2.49',
        setup: '15% of monthly price',
        included: ['Specialist answers every missed call', 'Specialist answers every after-hours call', 'Appointments booked in your scheduling software', 'Custom dental script', 'Morning call summary'],
      },
      {
        name: 'Captain Coverage',
        price: '$1,500/mo first location',
        calls: '275 per location, shared',
        extra: '$1.25',
        setup: '15% of monthly price, per location',
        included: ['Everything in All Hands On Deck', 'Live receptionist Mon-Fri, opening to 1 pm', 'Appointments booked live by a person', 'Urgent calls sent to your on-call doctor', 'AI covers afternoons, nights and weekends', 'Multi-location discount: $250 off each additional location'],
        headerPrice: '$1,500/mo',
        pricePill: 'Save $250/mo on every additional location',
      },
    ],
  },
  property: {
    name: 'Property Management',
    shortName: 'property management teams',
    eyebrow: 'Resident and maintenance coverage',
    title: 'Keep residents supported after the office closes.',
    description: 'Give residents a dependable point of contact while your team protects response times, routes emergencies, and keeps leasing opportunities from going cold.',
    icon: Building2,
    accent: 'Property',
    bundles: [
      {
        name: 'Night Watch',
        price: '$0/mo',
        calls: '30 every month',
        extra: '$3.69',
        setup: 'None',
        included: ['Specialist answers missed and after-hours calls', 'Emergencies to on-call maintenance', 'Standard property script', 'Weekly call summary'],
      },
      {
        name: 'All Hands On Deck',
        price: '$199/mo',
        calls: '170',
        extra: '$1.75',
        setup: '10% of monthly price',
        included: ['Specialist answers every missed call', 'Specialist answers every after-hours call', 'Missed calls emailed to managers', 'Emergencies sent to on-call maintenance', 'Staff notified of emergencies'],
      },
      {
        name: 'Captain Coverage',
        price: '$2.20/unit (400-unit minimum)',
        calls: 'Unlimited',
        extra: 'None',
        setup: '10% of monthly price',
        included: ['Everything in All Hands On Deck', 'Live receptionist weekday evenings', 'Live emergency handling', 'Emergency follow-up with tenants', 'Leasing callbacks', 'Tours booked', 'Work orders entered', 'Weekly report'],
      },
    ],
  },
  legal: {
    name: 'Legal Services',
    shortName: 'legal teams',
    eyebrow: 'Professional intake coverage',
    title: 'Make the first conversation count.',
    description: 'Your next matter may call after hours. Give prospective clients a professional first response, capture the details your team needs, and keep urgent messages moving.',
    icon: Scale,
    accent: 'Legal',
    bundles: [
      {
        name: 'Night Watch',
        price: 'Free trial',
        calls: '30 total (one time)',
        extra: 'Not available. Choose a plan to continue.',
        setup: 'None',
        included: ['Live receptionist weekday evenings', 'Specialist covers all other hours', 'Urgent calls to your on-call attorney', 'Summary of every call']
      },
      {
        name: 'All Hands On Deck',
        price: '$849/mo',
        calls: '135',
        extra: '$2.99',
        setup: '10% of monthly price',
        included: ['Live receptionist Mon-Fri, 5-9 pm', 'Specialist covers days, weekends and overnight', 'Urgent calls to your on-call attorney', 'Consultations booked', 'Conflict-check details collected', 'Same-evening lead callbacks', 'Weekly lead report'],
      },
      {
        name: 'Captain Coverage',
        price: '$1,899/mo',
        calls: '325',
        extra: '$1.99',
        setup: 'No setup fee',
        included: ['Everything in All Hands On Deck', 'Live daytime backup, Mon-Fri 8 am-5 pm', 'Priority answering', 'Dedicated agents', 'Morning lead callbacks', 'Consultation reminder calls', 'Intake entered into your software', 'Monthly results call'],
      },
    ],
  },
};

const tableRows = [
  { label: 'Price', key: 'price' },
  { label: 'Calls', key: 'calls' },
  { label: 'Extra call', key: 'extra' },
  { label: 'Setup fee', key: 'setup' },
] as const;

type CellValue = 'yes' | 'no' | 'partial' | string;

const dentalComparison: { category: string; feature: string; values: CellValue[] }[] = [
  {
    category: 'Call Coverage',
    feature: 'After-hours calls answered',
    values: ['yes', 'yes', 'yes'],
  },
  {
    category: 'Call Coverage',
    feature: 'Missed daytime calls answered',
    values: ['no', 'yes', 'yes'],
  },
  {
    category: 'Call Coverage',
    feature: 'Live receptionist',
    values: ['no', 'no', 'yes'],
  },
  {
    category: 'Call Coverage',
    feature: 'Weekend & holiday coverage',
    values: ['yes', 'yes', 'yes'],
  },
  {
    category: 'Appointments & Scripts',
    feature: 'Appointments booked in your software',
    values: ['no', 'yes', 'yes'],
  },
  {
    category: 'Appointments & Scripts',
    feature: 'Live appointment booking by a person',
    values: ['no', 'no', 'yes'],
  },
  {
    category: 'Appointments & Scripts',
    feature: 'Custom dental script',
    values: ['no', 'yes', 'yes'],
  },
  {
    category: 'Appointments & Scripts',
    feature: 'Standard dental script',
    values: ['yes', 'no', 'no'],
  },
  {
    category: 'Urgent & Emergency',
    feature: 'Urgent calls to your on-call doctor',
    values: ['no', 'yes', 'yes'],
  },
  {
    category: 'Urgent & Emergency',
    feature: 'Life-threatening emergencies directed to 911',
    values: ['yes', 'yes', 'yes'],
  },
  {
    category: 'Reporting',
    feature: 'Morning call summary',
    values: ['no', 'yes', 'yes'],
  },
  {
    category: 'Reporting',
    feature: 'Weekly call summary',
    values: ['yes', 'no', 'no'],
  },
  {
    category: 'Multi-Location',
    feature: 'Multi-location discount',
    values: ['no', 'no', 'yes'],
  },
];

const dentalPlanNames = ['Night Watch', 'All Hands On Deck', 'Captain Coverage'];

export default function IndustryPage({ industry }: { industry: IndustryKey }) {
  const content = industryContent[industry];
  const { ref, visible } = useReveal();
  const Icon = content.icon;

  function handleContactClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.location.hash = '';
    window.setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink-950 pt-28 pb-24">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-48 left-1/4 h-[600px] w-[600px] rounded-full bg-gold-400/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-sky-400/8 blur-[140px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <a href="#industries" className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400/70 transition-colors hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to industries
        </a>

        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mx-auto mt-12 max-w-4xl text-center`}>
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-400/30 bg-gold-400/10">
            <Icon className="h-7 w-7 text-gold-400" strokeWidth={1.8} />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">{content.eyebrow}</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-sky-300/80 sm:text-xl">{content.description}</p>
        </div>

        {industry === 'dental' && <LostRevenueCalculator config={dentalConfig} />}

        {industry === 'dental' && (
          <section className="mt-16" aria-labelledby="compare-heading">
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-400 mb-3">
                <span className="h-px w-8 bg-gold-400/50 inline-block" />
                Plan Comparison
                <span className="h-px w-8 bg-gold-400/50 inline-block" />
              </span>
              <h2 id="compare-heading" className="font-display text-2xl font-extrabold text-white sm:text-3xl mb-3">
                Compare plans side by side
              </h2>
              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-sky-400/60">
                Every feature across all three plans, so you can find the right level of coverage at a glance.
              </p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-ink-500/40 bg-ink-900/80 shadow-2xl shadow-black/30">
              <table className="w-full min-w-[680px] border-collapse text-left">
                <thead>
                  <tr className="bg-ink-800/80">
                    <th className="w-[34%] border-b border-ink-500/40 px-5 py-5 text-xs font-bold uppercase tracking-widest text-sky-400/45 sm:px-7">
                      Feature
                    </th>
                    {dentalPlanNames.map((name, i) => (
                      <th
                        key={name}
                        className={`relative border-b border-ink-500/40 px-5 py-5 text-center sm:px-7 ${i === 1 ? 'bg-gold-400/[0.06] border-x border-gold-400/30' : ''}`}
                      >
                        {i === 1 && (
                          <span className="absolute left-1/2 -translate-x-1/2 top-0 rounded-b-lg bg-gold-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-ink-900">
                            Most popular
                          </span>
                        )}
                        <div className={i === 1 ? 'pt-3' : ''}>
                          <h3 className="font-display text-base font-extrabold text-white sm:text-lg">{name}</h3>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dentalComparison.map((row, rowIndex) => {
                    const showCategory = rowIndex === 0 || dentalComparison[rowIndex - 1].category !== row.category;
                    return (
                      <Fragment key={`${row.category}-${row.feature}`}>
                        {showCategory && (
                          <tr className="bg-ink-800/40">
                            <td colSpan={4} className="border-b border-ink-500/25 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-gold-400/80 sm:px-7">
                              {row.category}
                            </td>
                          </tr>
                        )}
                        <tr className={`border-b border-ink-500/20 ${rowIndex % 2 === 0 ? 'bg-ink-800/15' : ''}`}>
                          <th className="px-5 py-3.5 text-sm font-medium text-sky-200/85 sm:px-7">
                            {row.feature}
                          </th>
                          {row.values.map((val, i) => (
                            <td
                              key={i}
                              className={`px-5 py-3.5 text-center sm:px-7 ${i === 1 ? 'border-x border-gold-400/20 bg-gold-400/[0.025]' : ''}`}
                            >
                              {val === 'yes' && <Check className="mx-auto h-5 w-5 text-gold-400" strokeWidth={2.5} />}
                              {val === 'no' && <X className="mx-auto h-5 w-5 text-ink-500/60" strokeWidth={2.5} />}
                              {val !== 'yes' && val !== 'no' && (
                                <span className="text-sm text-sky-300/70">{val}</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      </Fragment>
                    );
                  })}
                  <tr>
                    <td className="px-5 py-6 sm:px-7" />
                    {dentalPlanNames.map((_, i) => (
                      <td key={i} className={`px-5 py-6 sm:px-7 ${i === 1 ? 'border-x border-gold-400/20 bg-gold-400/[0.025]' : ''}`}>
                        <a
                          href="#contact"
                          onClick={handleContactClick}
                          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${i === 1 ? 'bg-gold-400 text-ink-900 shadow-lg shadow-gold-400/20 hover:bg-gold-500' : 'border border-ink-500 bg-ink-700/60 text-white hover:border-gold-400/50 hover:bg-ink-700'}`}
                        >
                          Get started <ArrowRight className="h-4 w-4" />
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {industry === 'property' || industry === 'legal' ? (
          <>
            {/* Coming Soon placeholder for How It Works */}
            <section className="mt-16" aria-labelledby="coming-soon-heading">
              <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{content.accent} process</p>
                  <h2 id="coming-soon-heading" className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">See how it works</h2>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl border border-ink-500/40 bg-ink-900/80 shadow-2xl shadow-black/30">
                {/* Blurred silhouette placeholder cards */}
                <div className="grid gap-8 p-10 sm:grid-cols-2 lg:grid-cols-4 blur-[6px] opacity-30 pointer-events-none select-none" aria-hidden="true">
                  {[
                    { n: '1', t: 'Free Discovery Call', d: 'We learn how your team handles calls, urgent requests, scheduling, and after-hours coverage.' },
                    { n: '2', t: 'Meet Your Reception Team', d: 'We train a dedicated team on your scripts, routing rules, scheduling preferences, and escalation plan.' },
                    { n: '3', t: 'We Fit Your Workflow', d: 'We document each interaction clearly and follow the tools, handoffs, and priorities your team already uses.' },
                    { n: '4', t: 'Grow with Confidence', d: 'You get clear reporting and regular check-ins. As your business grows, we adjust coverage around what matters most.' },
                  ].map((s) => (
                    <div key={s.n} className="flex flex-col items-center text-center lg:items-start lg:text-left">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-ink-500/30 bg-ink-800/60">
                        <div className="h-8 w-8 rounded-lg bg-ink-600/50" />
                      </div>
                      <div className="mb-3 h-6 w-3/4 rounded-lg bg-ink-600/40" />
                      <div className="h-16 w-full rounded-xl bg-ink-700/30" />
                    </div>
                  ))}
                </div>

                {/* Coming Soon overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-12 text-center">
                  <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-5 py-2 text-sm font-bold uppercase tracking-widest text-gold-400 shadow-lg shadow-gold-400/10">
                    <Sparkles className="h-4 w-4" />
                    Coming Soon
                  </span>
                  <p className="mt-6 max-w-lg text-sky-300/80 text-base leading-relaxed">
                    We are putting the finishing touches on this walkthrough. In the meantime, our team is happy to show you how it works.
                  </p>
                  <a
                    href="#contact"
                    onClick={handleContactClick}
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold-400 px-6 py-3.5 text-sm font-bold text-ink-900 shadow-lg shadow-gold-400/20 transition-all hover:-translate-y-0.5 hover:bg-gold-500"
                  >
                    Talk With Our Team <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </section>
          </>
        ) : (
        <section className="mt-16" aria-labelledby="bundle-heading">
          <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">{content.accent} bundles</p>
              <h2 id="bundle-heading" className="mt-2 font-display text-2xl font-extrabold text-white sm:text-3xl">Choose your level of coverage</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-sky-400/60 sm:text-right">Every bundle starts with a clear call flow, trained scripts, and a team that knows what to do next.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-ink-500/40 bg-ink-900/80 shadow-2xl shadow-black/30">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="bg-ink-800/80">
                  <th className="w-[18%] border-b border-ink-500/40 px-5 py-6 text-xs font-bold uppercase tracking-widest text-sky-400/45 sm:px-7">Coverage</th>
                  {content.bundles.map((bundle, index) => (
                    <th key={bundle.name} className={`relative border-b border-ink-500/40 px-5 py-6 sm:px-7 ${index === 1 ? 'bg-gold-400/[0.06] border-x border-gold-400/30' : ''}`}>
                      {index === 1 && <span className="absolute left-5 top-0 rounded-b-lg bg-gold-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-ink-900">Most popular</span>}
                      {bundle.badge && index !== 1 && (
                        <span className="absolute left-5 right-5 top-0 rounded-b-lg border border-gold-400/50 bg-ink-900/90 px-2 py-1 text-[8px] font-extrabold uppercase tracking-wider text-gold-400 text-center leading-tight">
                          {bundle.badge}
                        </span>
                      )}
                      <div className={index === 1 || (bundle.badge && index !== 1) ? 'pt-3' : ''}>
                        <h3 className="font-display text-xl font-extrabold text-white">{bundle.name}</h3>
                        <p className="mt-2 text-2xl font-extrabold text-gold-400">{bundle.headerPrice || bundle.price}</p>
                        {bundle.priceSubtitle && (
                          <p className="mt-1 text-xs text-sky-400/60">{bundle.priceSubtitle}</p>
                        )}
                        {bundle.pricePill && (
                          <span className="mt-2 inline-block rounded-full bg-gold-400/15 px-3 py-1 text-xs font-bold text-gold-400">{bundle.pricePill}</span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, rowIndex) => (
                  <tr key={row.key} className={`border-b border-ink-500/25 ${rowIndex % 2 === 0 ? 'bg-ink-800/20' : ''}`}>
                    <th className="px-5 py-5 text-base font-bold text-white sm:px-7">{row.label}</th>
                    {content.bundles.map((bundle, index) => (
                      <td key={bundle.name} className={`px-5 py-5 text-base text-sky-200/85 sm:px-7 ${index === 1 ? 'border-x border-gold-400/20 bg-gold-400/[0.025]' : ''}`}>
                        {bundle[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-b border-ink-500/25 align-top">
                  <th className="px-5 py-5 text-base font-bold text-white sm:px-7">What&apos;s included</th>
                  {content.bundles.map((bundle, index) => (
                    <td key={bundle.name} className={`px-5 py-5 sm:px-7 ${index === 1 ? 'border-x border-gold-400/20 bg-gold-400/[0.025]' : ''}`}>
                      <ul className="space-y-3">
                        {bundle.included.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-sky-200/85">
                            <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold-400" strokeWidth={2.5} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-5 py-7 sm:px-7" />
                  {content.bundles.map((bundle, index) => (
                    <td key={bundle.name} className={`px-5 py-7 sm:px-7 ${index === 1 ? 'border-x border-gold-400/20 bg-gold-400/[0.025]' : ''}`}>
                      <a href="#contact" onClick={handleContactClick} className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 ${index === 1 ? 'bg-gold-400 text-ink-900 shadow-lg shadow-gold-400/20 hover:bg-gold-500' : 'border border-ink-500 bg-ink-700/60 text-white hover:border-gold-400/50 hover:bg-ink-700'}`}>
                        Get started <ArrowRight className="h-4 w-4" />
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        )}

        {industry === 'dental' && (
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ShieldCheck, text: 'Clear workflows built around your rules' },
            { icon: Clock3, text: 'Day, night, and weekend coverage' },
            { icon: Check, text: 'Start with the level you need today' },
          ].map(({ icon: TrustIcon, text }) => (
            <div key={text} className="flex items-center gap-3 rounded-xl border border-ink-500/30 bg-ink-800/40 px-4 py-4">
              <TrustIcon className="h-5 w-5 flex-shrink-0 text-gold-400" strokeWidth={2} />
              <span className="text-sm text-sky-300/70">{text}</span>
            </div>
          ))}
        </div>
        )}

        {industry === 'dental' && (
        <div className="mt-16 rounded-2xl border border-gold-400/25 bg-gradient-to-r from-gold-400/10 via-ink-800/70 to-sky-400/10 px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Need a plan built for your {content.shortName}?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sky-300/75">We can map your hours, escalation rules, and call priorities into one dependable coverage plan.</p>
          {industry === 'dental' ? (
            <a href="/dental-onboarding" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gold-400 px-6 py-3.5 text-sm font-bold text-ink-900 shadow-lg shadow-gold-400/20 transition-all hover:-translate-y-0.5 hover:bg-gold-500">
              Complete dental onboarding <ArrowRight className="h-4 w-4" />
            </a>
          ) : (
            <a href="#contact" onClick={handleContactClick} className="mt-7 inline-flex items-center gap-2 rounded-xl bg-gold-400 px-6 py-3.5 text-sm font-bold text-ink-900 shadow-lg shadow-gold-400/20 transition-all hover:-translate-y-0.5 hover:bg-gold-500">
              Talk with our team <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
        )}
      </div>
    </main>
  );
}
