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
  Stethoscope,
  Calendar,
  Zap,
  Sparkles,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

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
        a: 'Both. Our trained receptionists answer live during your covered hours, and our AI receptionist handles the rest.',
      },
      {
        q: 'Will patients know they\u2019re talking to AI?',
        a: 'Yes. It introduces itself as your practice\u2019s call answering service for dental specialty. Most callers just want their question answered and a time booked.',
      },
      {
        q: 'Can you book appointments in our scheduling software?',
        a: 'To start, we take the request and your team confirms it in the morning. Once you\u2019re comfortable, we can book directly in your system.',
      },
      {
        q: 'How long does it take to get started?',
        a: 'Most practices go live within a few days of their onboarding call.',
      },
    ],
  },
  {
    id: 'emergency-safety',
    label: 'Emergency & Safety',
    icon: Stethoscope,
    blurb: 'How we handle urgent calls and patient safety.',
    items: [
      {
        q: 'What happens if a patient calls with an emergency at 2 a.m.?',
        a: 'We follow your emergency plan, sending urgent calls to your on-call doctor or, if you don\u2019t have one, to the emergency clinic or ER you choose, and flagging them for your team in the morning. For anything life-threatening, we tell the caller to hang up and dial 911.',
      },
      {
        q: 'Will you give patients medical or dental advice?',
        a: 'Never. We only use scripts your doctor has approved.',
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
        a: 'Extra calls are billed at your plan\u2019s rate. Hang-ups, spam, calls under 30 seconds, and emergency transfers never count.',
      },
      {
        q: 'Are we locked into a long contract?',
        a: 'No. We ask for 2 months to prove our value. After that, cancel anytime with 30 days\u2019 notice.',
      },
      {
        q: 'How does billing work?',
        a: 'Monthly by ACH bank transfer through a simple service agreement.',
      },
      {
        q: 'Can we try it before we pay?',
        a: 'Yes. Our AI receptionist answers your first 25 after-hours calls every month for free. Upgrade anytime when you need more calls or a live receptionist.',
      },
    ],
  },
  {
    id: 'compliance',
    label: 'Compliance & Security',
    icon: ShieldCheck,
    blurb: 'HIPAA, patient data, and security.',
    items: [
      {
        q: 'Is this HIPAA compliant?',
        a: 'We sign a Business Associate Agreement with every practice and handle patient information on secure, access-controlled systems.',
      },
    ],
  },
];

const stats = [
  { value: '24/7', label: 'Call coverage', icon: Clock },
  { value: '< 30s', label: 'Average answer time', icon: Zap },
  { value: '25', label: 'Free calls per month', icon: PhoneCall },
  { value: 'BAA', label: 'Signed with every practice', icon: ShieldCheck },
];

const trustBadges = [
  { icon: ShieldCheck, label: 'HIPAA Compliant' },
  { icon: Users, label: 'Real receptionists' },
  { icon: Calendar, label: 'No long contracts' },
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
          ? 'bg-gradient-to-br from-ink-700/50 to-ink-800/50 border-gold-400/25 shadow-lg shadow-gold-400/5'
          : 'bg-ink-800/25 border-ink-500/25 hover:border-ink-400/40 hover:bg-ink-800/40'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left py-5 px-5 sm:px-6"
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-4 flex-1 min-w-0">
          <span className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            isOpen ? 'bg-gold-400/20 text-gold-400 border border-gold-400/30' : 'bg-ink-500/30 text-sky-400/50'
          }`}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className={`text-sm sm:text-[15px] font-semibold leading-snug transition-colors duration-300 ${
            isOpen ? 'text-white' : 'text-sky-100/85'
          }`}>
            {faq.q}
          </span>
        </div>
        <div className={`flex-shrink-0 mt-0.5 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
          isOpen ? 'bg-gold-400/15 text-gold-400' : 'text-sky-400/40'
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
    <section className="relative min-h-screen bg-ink-900 pt-28 pb-24 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 wave-circle-dots opacity-[0.25] pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] rounded-full bg-gold-400/5 blur-[140px] pointer-events-none drift-slow" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-sky-400/5 blur-[140px] pointer-events-none drift-slow-reverse" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* ── Hero ── */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center mb-12`}>
          <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-widest mb-5">
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
            <HelpCircle className="w-4 h-4" />
            FAQ
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-5 tracking-tight font-display leading-[1.1]">
            Frequently Asked Questions
          </h1>
          <p className="text-sky-400/90 text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about how we keep your practice connected.
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
              className="rounded-xl bg-ink-800/30 border border-ink-500/25 px-4 py-5 text-center hover:border-gold-400/20 transition-colors duration-300"
            >
              <s.icon className="w-5 h-5 text-gold-400/70 mx-auto mb-2.5" strokeWidth={1.8} />
              <div className="text-2xl font-extrabold text-white font-display tracking-tight">{s.value}</div>
              <div className="text-sky-400/50 text-xs mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Main two-column layout ── */}
        <div className={`reveal ${visible ? 'is-visible' : ''} lg:grid lg:grid-cols-[240px_1fr] lg:gap-12`} style={{ transitionDelay: '150ms' }}>
          {/* Sticky sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-1">
              <p className="text-sky-400/40 text-xs font-bold uppercase tracking-widest mb-4 px-3">
                Topics
              </p>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                    activeCategory === cat.id
                      ? 'bg-gold-400/10 text-gold-400 border border-gold-400/20'
                      : 'text-sky-400/60 hover:text-sky-200 hover:bg-ink-800/40 border border-transparent'
                  }`}
                >
                  <cat.icon className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
                  <span className="flex-1">{cat.label}</span>
                  <span className={`text-xs ${activeCategory === cat.id ? 'text-gold-400/50' : 'text-sky-400/30'}`}>
                    {cat.items.length}
                  </span>
                </button>
              ))}

              {/* Trust badges */}
              <div className="pt-6 mt-6 border-t border-ink-500/20 space-y-2.5">
                {trustBadges.map((b) => (
                  <div key={b.label} className="flex items-center gap-2.5 px-3">
                    <b.icon className="w-4 h-4 text-gold-400/50 flex-shrink-0" strokeWidth={2} />
                    <span className="text-sky-400/40 text-xs">{b.label}</span>
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
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400/15 to-gold-400/5 border border-gold-400/20 flex items-center justify-center flex-shrink-0">
                    <cat.icon className="w-5 h-5 text-gold-400" strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight font-display">
                      {cat.label}
                    </h3>
                    <p className="text-sky-400/50 text-sm">{cat.blurb}</p>
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
            <div className="absolute inset-0 bg-gradient-to-r from-gold-400/20 via-gold-400/8 to-sky-400/20" />
            <div className="relative m-[1px] rounded-2xl bg-gradient-to-br from-ink-800 to-ink-900 px-6 sm:px-12 py-12">
              <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gold-400/8 blur-[100px] pointer-events-none" />

              <div className="relative text-center">
                <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/20 rounded-full px-4 py-1.5 mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                  <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">Get Started</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display mb-4">
                  Still have questions?
                </h3>
                <p className="text-sky-400/80 text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
                  Book a quick call and we'll walk you through exactly how it works for your practice — no pressure, no obligation.
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
