import { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  HelpCircle,
  ArrowRight,
  Phone,
  Users,
  CreditCard,
  ShieldCheck,
  Clock,
  PhoneCall,
  Calendar,
  Zap,
  Sparkles,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

function goToIntake(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  window.location.hash = '';
  window.setTimeout(() => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }, 150);
}

type Faq = { q: string; a: string };

const categories: {
  id: string;
  label: string;
  icon: typeof Phone;
  blurb: string;
  items: Faq[];
}[] = [
  {
    id: 'how-it-works',
    label: 'How It Works',
    icon: Phone,
    blurb: 'The day-to-day of working with us.',
    items: [
      {
        q: 'Will this replace my front desk staff?',
        a: 'No. We pick up the calls your team can\u2019t get to: after hours, over lunch, and when every line is busy.',
      },
      {
        q: 'Is a real person answering, or AI?',
        a: 'Depending on your plan and coverage hours, calls may be answered by a trained receptionist, an AI receptionist, or routed according to the call flow your team approves.'
      },
      {
        q: 'Will callers know they\u2019re talking to AI?',
        a: 'When AI answers, it can be configured to identify itself clearly. Your approved greeting, scripts, and escalation rules determine how each call is handled.'
      },
      {
        q: 'Can you schedule calls, appointments, or next steps?',
        a: 'We can capture requests and follow approved scheduling or handoff instructions. Any workflow is configured around the permissions and process your team provides.'
      },
      {
        q: 'How long does it take to get started?',
        a: 'Timing depends on your call flow, greeting, escalation rules, and any systems that need to be connected. We confirm the launch plan during onboarding.'
      },
    ],
  },
  {
    id: 'emergency-safety',
    label: 'Urgent Calls & Escalation',
    icon: PhoneCall,
    blurb: 'How we handle urgent requests and escalation rules.',
    items: [
      {
        q: 'What happens when an urgent call comes in after hours?',
        a: 'We follow the escalation plan you approve, capturing the right details and sending the call or alert to the appropriate person, vendor, manager, or on-call team member.',
      },
      {
        q: 'Will your team make decisions outside our instructions?',
        a: 'No. We follow the scripts, boundaries, and escalation rules your team approves, and route anything outside them to the person you designate.',
      },
    ],
  },
  {
    id: 'billing-plans',
    label: 'Billing & Plans',
    icon: CreditCard,
    blurb: 'Pricing, contracts, and what you\u2019re paying for.',
    items: [
      {
        q: 'What counts as a call, and what if we go over?',
        a: 'Your plan explains the included call volume and the rate for additional usage. We review the details with you before service begins so there are no surprises.',
      },
      {
        q: 'Are we locked into a long contract?',
        a: 'The agreement and cancellation terms depend on the plan you select. We review those terms before you start, so you know exactly what you are agreeing to.',
      },
      {
        q: 'How does billing work?',
        a: 'Billing details are outlined in your service agreement. We review the plan price, included usage, and any additional charges before activation.'
      },
      {
        q: 'Can we try it before we pay?',
        a: 'The available free coverage is described in the current plan presented to you. We will explain what is included and what changes if you add more calls or live receptionist coverage.'
      },
    ],
  },
  {
    id: 'compliance',
    label: 'Data & Security',
    icon: ShieldCheck,
    blurb: 'Thoughtful handling of caller information and access.',
    items: [
      {
        q: 'Can you support HIPAA-related call workflows?',
        a: 'We can discuss HIPAA-related workflows, the information your team needs collected, and the safeguards required for your use case. HIPAA responsibilities depend on the services and information involved, so we confirm the appropriate setup before launch.',
      },
      {
        q: 'Do you sign a BAA?',
        a: 'A Business Associate Agreement may be appropriate when we handle protected health information on behalf of a covered entity. We review your workflow and relationship with you and can discuss a BAA when applicable before any covered work begins.',
      },
      {
        q: 'How do you handle sensitive caller information?',
        a: 'We use the access, documentation, and escalation procedures agreed with your team. Your call flow should collect only the information needed for the approved next step, and sensitive information should be handled according to your organization’s policies and agreement with us.',
      },
      {
        q: 'Are you HIPAA compliant?',
        a: 'HIPAA compliance is a shared responsibility and depends on the specific services, systems, policies, and information involved. We do not want to make a blanket claim without reviewing your workflow. Contact us to discuss whether a HIPAA-supporting setup and BAA are appropriate for your organization.',
      },
    ],
  },
];

const stats = [
  { value: '24/7', label: 'Call coverage', icon: Clock },
  { value: '< 30s', label: 'Average answer time', icon: Zap },
  { value: '30', label: 'Free calls per month', icon: PhoneCall },
  { value: 'Clear', label: 'Handoffs for every call', icon: ShieldCheck },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'Security-minded workflows' },
  { icon: Users, label: 'Real receptionists' },
  { icon: Calendar, label: 'Plan terms explained clearly' }
];

function FaqItem({ faq, index, isOpen, onToggle }: {
  faq: Faq;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div
      className={`rounded-xl border transition-all duration-300 ${
        isOpen
          ? 'bg-gradient-to-br from-ink-800/60 to-ink-900/60 border-gold-400/30 shadow-lg shadow-gold-400/5'
          : 'bg-ink-800/35 border-ink-500/30 hover:border-gold-400/25 hover:bg-ink-800/55'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left py-5 px-5 sm:px-6"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <span className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            isOpen ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30' : 'bg-ink-500/40 text-sky-300/60'
          }`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`text-sm sm:text-[15px] font-semibold leading-snug transition-colors duration-300 ${
            isOpen ? 'text-white' : 'text-sky-200/90'
          }`}>
            {faq.q}
          </span>
        </div>
        <div className={`flex-shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-gold-400/15 text-gold-400' : 'text-sky-300/50'
        }`}>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>
      <div
        className="overflow-hidden transition-all duration-400 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div ref={contentRef}>
          <div className="pb-5 pl-[3.75rem] pr-5 sm:pr-6">
            <div className="w-8 h-px bg-gold-400/30 mb-3" />
            <p className="text-sky-300/75 text-sm leading-relaxed">
              {faq.a}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const { ref, visible } = useReveal();
  const [openId, setOpenId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
    );

    categories.forEach((cat) => {
      const el = sectionRefs.current[cat.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleCategoryClick = (id: string) => {
    const el = sectionRefs.current[id];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen bg-ink-950 pt-28 pb-24 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] rounded-full bg-gold-400/10 blur-[150px] pointer-events-none drift-slow" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-sky-400/8 blur-[150px] pointer-events-none drift-slow-reverse" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Hero ── */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center mb-12`}>
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gold-400 mb-5">
            <span className="h-px w-8 bg-gold-400/50 inline-block" />
            <HelpCircle className="w-4 h-4" />
            FAQ
            <span className="h-px w-8 bg-gold-400/50 inline-block" />
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 tracking-tight leading-[1.05]">
            Frequently Asked Questions
          </h1>
          <p className="text-sky-200/75 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about how we keep your team connected.
          </p>
        </div>

        {/* ── Stats bar ── */}
        <div
          className={`reveal ${visible ? 'is-visible' : ''} grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-16`}
          style={{ transitionDelay: '80ms' }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-ink-800/45 border border-ink-500/30 px-4 py-5 text-center hover:border-gold-400/30 transition-colors duration-300"
            >
              <s.icon className="w-5 h-5 text-gold-400/80 mx-auto mb-2.5" strokeWidth={1.8} />
              <div className="text-2xl font-extrabold text-white font-display tracking-tight">{s.value}</div>
              <div className="text-sky-300/60 text-xs mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Main two-column layout ── */}
        <div className={`reveal ${visible ? 'is-visible' : ''} lg:grid lg:grid-cols-[240px_1fr] lg:gap-12`} style={{ transitionDelay: '150ms' }}>
          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              <p className="text-sky-300/50 text-xs font-bold uppercase tracking-widest mb-4 px-3">
                Topics
              </p>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                    activeCategory === cat.id
                      ? 'bg-gold-400/10 text-gold-400 border border-gold-400/20'
                      : 'text-sky-300/70 hover:text-sky-100 hover:bg-ink-800/50 border border-transparent'
                  }`}
                >
                  <cat.icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                  <span className="flex-1">{cat.label}</span>
                  <span className={`text-xs ${activeCategory === cat.id ? 'text-gold-400/50' : 'text-sky-300/40'}`}>
                    {cat.items.length}
                  </span>
                </button>
              ))}

              {/* Trust badges */}
              <div className="pt-6 mt-6 border-t border-ink-500/30 space-y-2.5">
                {trustBadges.map((b) => (
                  <div key={b.label} className="flex items-center gap-2.5 px-3">
                    <b.icon className="w-4 h-4 text-gold-400/60 flex-shrink-0" strokeWidth={2} />
                    <span className="text-sky-300/55 text-xs">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* FAQ sections */}
          <div className="space-y-14">
            {categories.map((cat) => (
              <div
                key={cat.id}
                id={cat.id}
                ref={(el) => { sectionRefs.current[cat.id] = el; }}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400/15 to-gold-400/5 border border-gold-400/25 flex items-center justify-center flex-shrink-0">
                    <cat.icon className="w-5 h-5 text-gold-400" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight font-display">
                      {cat.label}
                    </h3>
                    <p className="text-sky-300/60 text-sm">{cat.blurb}</p>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {cat.items.map((faq, i) => {
                    const id = `${cat.id}-${i}`;
                    return (
                      <FaqItem
                        key={id}
                        faq={faq}
                        index={i}
                        isOpen={openId === id}
                        onToggle={() => setOpenId(openId === id ? null : id)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA ── */}
        <div
          className={`reveal ${visible ? 'is-visible' : ''} mt-20`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="relative rounded-2xl overflow-hidden">
            {/* Gradient border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400/25 via-gold-400/10 to-sky-400/25" />
            <div className="relative m-[1px] rounded-2xl bg-gradient-to-br from-ink-800 to-ink-900 px-6 sm:px-12 py-12">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gold-400/10 blur-[100px] pointer-events-none" />

              <div className="relative text-center">
                <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/25 rounded-full px-4 py-1.5 mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">Get Started</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mb-4">
                  Still have questions?
                </h3>
                <p className="text-sky-300/80 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                  Tell us about your business and the calls you need covered. We will shape the right plan around your hours and team.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="#contact"
                    onClick={goToIntake}
                    className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-ink-900 font-bold text-sm px-7 py-3.5 rounded-full transition-all shadow-lg shadow-gold-400/20 hover:shadow-gold-400/35 hover:-translate-y-0.5"
                  >
                    Book a 15-Min Call
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="#contact"
                    onClick={goToIntake}
                    className="inline-flex items-center gap-2 bg-ink-700/60 hover:bg-ink-700 text-white border border-ink-500 hover:border-gold-400/40 font-bold text-sm px-7 py-3.5 rounded-full transition-all hover:-translate-y-0.5"
                  >
                    <Phone className="w-4 h-4" />
                    Contact Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
