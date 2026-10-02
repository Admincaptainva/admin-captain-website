import { useState } from 'react';
import {
  MessageSquareText,
  FileText,
  CreditCard,
  Users,
  Star,
  Star as StarIcon,
  TrendingUp,
  ShieldCheck,
  HardHat,
  FolderOpen,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Anchor,
  LifeBuoy,
  Lock,
  MonitorSmartphone,
  ShieldAlert,
  ClipboardCheck,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

type BadgeType = 'navy' | 'gold' | null;

interface Service {
  num: string;
  icon: typeof MessageSquareText;
  name: string;
  tagline: string;
  badge: BadgeType;
  badgeLabel?: string;
  intro?: string;
  bullets: string[];
  highlight?: 'platinum-anchor' | 'gold-star' | 'silver-star' | null;
}

const services: Service[] = [
  {
    num: '01',
    icon: MessageSquareText,
    name: 'Lead Response',
    tagline: 'Never miss a job again.',
    badge: 'navy',
    badgeLabel: 'Included in All Hands On Deck & Captain Coverage',
    highlight: 'platinum-anchor',
    bullets: [
      'We reply fast to every lead from your website, Google, Angi, Thumbtack, and Facebook',
      'We return missed calls and book estimates on your calendar',
      'You always know where every lead stands',
    ],
  },
  {
    num: '02',
    icon: FileText,
    name: 'Estimates & Proposals',
    tagline: 'Win more of the jobs you quote.',
    badge: null,
    highlight: 'silver-star',
    bullets: [
      'Your voice notes and job details turned into polished, professional quotes',
      'Good / Better / Best options formatted for you',
      'Follow-ups on unsigned estimates, so jobs don\u2019t go cold',
      'Financing info sent to customers when you offer it',
    ],
  },
  {
    num: '03',
    icon: CreditCard,
    name: 'Invoicing & Payments',
    tagline: 'Get paid faster, without chasing customers.',
    badge: null,
    highlight: 'gold-star',
    bullets: [
      'We prepare your invoices the same day the job is done, and you approve them before they go out',
      'Polite payment reminders sent in your company\u2019s name',
      'You stay in full control. We never touch your money',
    ],
  },
  {
    num: '04',
    icon: Users,
    name: 'Customer Retention & Upsell',
    tagline: 'More work from customers you already have.',
    badge: null,
    highlight: 'gold-star',
    bullets: [
      'Reminders for tune-ups, maintenance, and membership renewals',
      'Follow-ups on old quotes and work your techs recommended',
      'Referral requests and thank-you cards that keep you top of mind',
    ],
  },
  {
    num: '05',
    icon: Star,
    name: 'Reviews & Reputation',
    tagline: 'Grow your 5-star reputation.',
    badge: null,
    highlight: 'silver-star',
    bullets: [
      'Review requests sent to every customer after the job',
      'Unhappy feedback flagged straight to you, so you can make it right',
      'Review responses drafted for your approval',
      'Weekly Google Business Profile updates and job photo posts',
    ],
  },
  {
    num: '06',
    icon: TrendingUp,
    name: 'Profit Recovery',
    tagline: 'Stop losing money you\u2019ve already earned.',
    badge: 'gold',
    badgeLabel: 'New',
    highlight: 'gold-star',
    bullets: [
      'We check supplier bills for overcharges and duplicate charges',
      'We track credits for returns, rebates, and bad leads',
      'Bills entered with due dates so nothing gets paid late (you approve every payment)',
    ],
  },
  {
    num: '07',
    icon: ShieldCheck,
    name: 'Compliance & Paperwork',
    tagline: 'Paperwork handled before it becomes a problem.',
    badge: null,
    highlight: 'silver-star',
    bullets: [
      'W-9s, certificates of insurance, and licenses collected from subcontractors, with expirations tracked',
      'Your own license, bond, insurance, and continuing-ed renewals tracked',
      'COIs sent to commercial clients and general contractors on request',
      'Manufacturer warranty registrations completed for your customers',
      'Utility rebate paperwork prepared for your customers',
      'Permit applications prepared for your review and approval',
    ],
  },
  {
    num: '08',
    icon: HardHat,
    name: 'Crew Support & Job Prep',
    tagline: 'Your crew shows up ready, every time.',
    badge: null,
    highlight: 'silver-star',
    bullets: [
      'Gate codes, parking notes, photos, and pet info collected before your crew arrives, and stored securely in your own software',
      'Next-day schedules and job details sent to each tech the night before',
      'Timesheet collection and time-off calendar',
      'Hiring support: job postings, application collection, and interview scheduling (you make every hiring decision)',
      'Fleet mileage and maintenance tracking, plus tool inventory logs',
    ],
  },
  {
    num: '09',
    icon: FolderOpen,
    name: 'Office Organization',
    tagline: 'Stop hunting for things.',
    badge: null,
    highlight: 'silver-star',
    bullets: [
      'CRM cleanup: duplicate customers merged, job tags standardized, photos filed',
      'Inbox triage and calendar management, at your comfort level',
      'Price book updates when supplier prices change',
      'Written step-by-step processes for your business, so it runs without you',
    ],
  },
  {
    num: '10',
    icon: BarChart3,
    name: 'Weekly Scorecard',
    tagline: 'Know your numbers in 5 minutes.',
    badge: 'navy',
    badgeLabel: 'Included in All Hands On Deck & Captain Coverage',
    highlight: 'silver-star',
    intro: 'Every Monday, you get a simple report of last week:',
    bullets: [
      'Leads and close rate',
      'Booked revenue',
      'Money owed to you',
      'Money recovered (supplier credits, lead credits, rebates)',
      'Most and least profitable jobs',
      'New reviews',
      'Upcoming renewals',
    ],
  },
];

const trustItems = [
  { icon: Lock, label: 'You stay in control' },
  { icon: MonitorSmartphone, label: 'We work inside your systems' },
  { icon: ShieldAlert, label: 'Your data stays protected' },
  { icon: ClipboardCheck, label: 'Clear scope, no surprises' },
];

export default function ServiceMenu() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { ref, visible } = useReveal();

  return (
    <section id="service-menu" className="relative bg-ink-900 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 anchor-pattern pointer-events-none" />
      {/* Decorative glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 rounded-full bg-gold-400/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 rounded-full bg-sky-400/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center mb-16`}>
          <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
            Services
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight font-display">
            Everything your office needs, handled
          </h2>
          <p className="text-sky-400 text-lg max-w-2xl mx-auto">
            Ten services that cover your front office end to end. Pick the ones you need, or let us handle them all.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((svc, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={svc.num}
                className={`reveal ${visible ? 'is-visible' : ''} rounded-xl border transition-colors duration-300 ${
                  isOpen
                    ? 'border-gold-400/40 bg-ink-700'
                    : 'border-ink-500/50 bg-ink-800 hover:border-ink-400/60'
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 flex items-start gap-4"
                >
                  {/* Icon + number */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-0.5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isOpen ? 'bg-gold-400/15 text-gold-400' : 'bg-ink-500/50 text-sky-400'
                    }`}>
                      <svc.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-sky-400/40 tracking-wider">{svc.num}</span>
                  </div>

                  {/* Name + tagline */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-bold text-base leading-snug font-display">{svc.name}</h3>
                        {svc.highlight === 'platinum-anchor' && (
                          <span title="10/10 favorite" className="inline-flex items-center justify-center">
                            <Anchor className="w-6 h-6 text-purple-400 fill-purple-500/30 drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]" />
                          </span>
                        )}
                        {svc.highlight === 'gold-star' && (
                          <span title="Top-tier service" className="inline-flex items-center justify-center">
                            <StarIcon className="w-5 h-5 fill-gold-400 text-gold-400 drop-shadow-[0_0_4px_rgba(255,168,0,0.5)]" />
                          </span>
                        )}
                        {svc.highlight === 'silver-star' && (
                          <span title="Core service" className="inline-flex items-center justify-center">
                            <StarIcon className="w-5 h-5 fill-slate-400 text-slate-300" />
                          </span>
                        )}
                      </div>
                      {svc.badge && (
                        <span
                          className={`flex-shrink-0 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full whitespace-nowrap ${
                            svc.badge === 'navy'
                              ? 'bg-sky-400/15 text-sky-300 border border-sky-400/25'
                              : 'bg-gold-400/15 text-gold-300 border border-gold-400/25'
                          }`}
                        >
                          {svc.badge === 'navy' && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                          {svc.badge === 'gold' && <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />}
                          {svc.badgeLabel}
                        </span>
                      )}
                    </div>
                    <p className="text-sky-300 text-sm mt-1 leading-snug">{svc.tagline}</p>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold mt-3 transition-colors ${
                      isOpen ? 'text-gold-400' : 'text-gold-400/80'
                    }`}>
                      {isOpen ? (
                        <>
                          Show less <ChevronUp className="w-3.5 h-3.5" />
                        </>
                      ) : (
                        <>
                          See what{"\u2019"}s included <ChevronDown className="w-3.5 h-3.5" />
                        </>
                      )}
                    </span>
                  </div>
                </button>

                {/* Accordion body */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pl-[4.5rem]">
                      {svc.intro && (
                        <p className="text-sky-300/70 text-xs italic mb-3 font-medium">{svc.intro}</p>
                      )}
                      <ul className="space-y-2.5 border-l border-gold-400/25 pl-4">
                        {svc.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2.5 text-sm text-sky-200 leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-400/70 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust strip */}
        <div className={`reveal ${visible ? 'is-visible' : ''} mt-16`}>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-xl border border-ink-500/40 bg-ink-800/60 px-6 py-5">
            {trustItems.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="w-5 h-5 text-gold-400/80" />
                <span className="text-sky-300 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nautical footer accent */}
        <div className="mt-14 flex items-center justify-center gap-3 text-sky-400/25">
          <div className="h-px w-16 bg-sky-400/20" />
          <Anchor className="w-5 h-5" />
          <LifeBuoy className="w-5 h-5" />
          <div className="h-px w-16 bg-sky-400/20" />
        </div>
      </div>
    </section>
  );
}
