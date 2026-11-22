import {
  Target,
  Eye,
  ShieldCheck,
  Users,
  Clock,
  HeartHandshake,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Check,
  Award,
  Headset,
  TrendingUp,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const values = [
  {
    icon: ShieldCheck,
    title: 'Every Call Matters',
    desc: 'A missed call can be a lost patient, a frustrated resident, or a potential client who moved on. We treat every ring as an opportunity worth protecting.',
  },
  {
    icon: Headset,
    title: 'Real People, Trained Right',
    desc: 'Our receptionist teams are industry-trained, not generic operators. They know the difference between a dental emergency and a routine question.',
  },
  {
    icon: Clock,
    title: 'Always Available',
    desc: 'Day, night, weekends, and holidays. When your office closes, our coverage keeps going so your callers never reach voicemail.',
  },
  {
    icon: HeartHandshake,
    title: 'Partners, Not Vendors',
    desc: 'We learn your workflow, fit your tools, and follow your rules. The goal is coverage that feels like an extension of your own team.',
  },
];

const milestones = [
  {
    icon: Phone,
    title: 'Founded in Minneapolis, MN',
    desc: 'AdminCaptainVA was built to solve a problem every service business faces: calls that go unanswered when the team is busy or the office is closed.',
  },
  {
    icon: Users,
    title: 'Industry-Focused Teams',
    desc: 'We trained receptionist teams specifically for dental, property management, and legal workflows rather than offering generic answering services.',
  },
  {
    icon: TrendingUp,
    title: 'Live + AI Coverage',
    desc: 'We combined live receptionists with AI call answering to deliver 24/7 coverage at a price point that works for growing practices and firms.',
  },
  {
    icon: Award,
    title: 'Built on Trust',
    desc: 'Our growth comes from referrals and partners who recommend us because their callers get a professional, reliable experience every time.',
  },
];

const stats = [
  { value: '24/7', label: 'Coverage, all year' },
  { value: '< 30s', label: 'Average answer time' },
  { value: '3', label: 'Industries served' },
  { value: '100%', label: 'Scripted to your rules' },
];

const checklist = [
  'Industry-trained receptionist teams',
  'Custom scripts and escalation rules',
  'Live + AI coverage for after-hours',
  'Clear summaries and handoffs',
  'HIPAA-supporting workflows available',
  'No long-term contract surprises',
];

export default function About() {
  const { ref, visible } = useReveal();

  function scrollToContact(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.location.hash = '';
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  }

  return (
    <section className="relative min-h-screen bg-ink-950 pt-28 pb-24 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-32 right-1/4 w-[550px] h-[550px] rounded-full bg-gold-400/10 blur-[150px] pointer-events-none drift-slow" />
      <div className="absolute top-1/3 left-1/4 w-[450px] h-[450px] rounded-full bg-sky-400/8 blur-[150px] pointer-events-none drift-slow-reverse" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Hero */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center mb-16`}>
          <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-gold-400 mb-5">
            <span className="h-px w-8 bg-gold-400/50 inline-block" />
            <Users className="w-4 h-4" />
            About Us
            <span className="h-px w-8 bg-gold-400/50 inline-block" />
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.05]">
            An answering partner built for{' '}
            <span className="text-gradient-gold">service teams</span>
          </h1>
          <p className="text-sky-200/75 text-lg max-w-2xl mx-auto leading-relaxed">
            AdminCaptainVA helps dental practices, property management companies, and law firms answer every important call with a blend of live receptionists and AI coverage.
          </p>
        </div>

        {/* Stats bar */}
        <div
          className={`reveal ${visible ? 'is-visible' : ''} grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-20`}
          style={{ transitionDelay: '80ms' }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl bg-ink-800/45 border border-ink-500/30 px-4 py-5 text-center hover:border-gold-400/30 transition-colors duration-300"
            >
              <div className="text-2xl font-extrabold text-white font-display tracking-tight">{s.value}</div>
              <div className="text-sky-300/60 text-xs mt-1 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-6 mb-20">
          <div className={`reveal ${visible ? 'is-visible' : ''} rounded-2xl bg-gradient-to-br from-ink-800/60 to-ink-900/60 border border-ink-500/30 p-8`} style={{ transitionDelay: '120ms' }}>
            <div className="w-12 h-12 rounded-xl bg-gold-400/15 border border-gold-400/25 flex items-center justify-center mb-5">
              <Target className="w-6 h-6 text-gold-400" strokeWidth={1.8} />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-display mb-3">Our Mission</h2>
            <p className="text-sky-300/70 text-sm leading-relaxed">
              To ensure that no service business ever loses an opportunity, a patient, or a client because a call went unanswered. We combine trained receptionists with smart AI coverage so every caller reaches a professional, knowledgeable voice, day or night.
            </p>
          </div>

          <div className={`reveal ${visible ? 'is-visible' : ''} rounded-2xl bg-gradient-to-br from-ink-800/60 to-ink-900/60 border border-ink-500/30 p-8`} style={{ transitionDelay: '200ms' }}>
            <div className="w-12 h-12 rounded-xl bg-sky-400/15 border border-sky-400/25 flex items-center justify-center mb-5">
              <Eye className="w-6 h-6 text-sky-400" strokeWidth={1.8} />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-display mb-3">Our Vision</h2>
            <p className="text-sky-300/70 text-sm leading-relaxed">
              A future where every service business, regardless of size, has access to professional, reliable call coverage, where after-hours calls are never a liability but an opportunity to build trust and grow.
            </p>
          </div>
        </div>

        {/* Story / Milestones */}
        <div className="mb-20">
          <div className={`reveal ${visible ? 'is-visible' : ''} text-center mb-12`}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-4">Our Story</h2>
            <p className="text-sky-400/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Built in Minneapolis, MN, serving service businesses across the country.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {milestones.map((m, i) => (
              <div
                key={m.title}
                className={`reveal ${visible ? 'is-visible' : ''} group relative rounded-2xl border border-ink-500/25 bg-gradient-to-br from-ink-800/50 to-ink-900/50 p-6 transition-all duration-400 hover:border-gold-400/30`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gold-400/12 border border-gold-400/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <m.icon className="w-5 h-5 text-gold-400" strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-extrabold tracking-tight font-display mb-2">{m.title}</h3>
                    <p className="text-sky-300/70 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className={`reveal ${visible ? 'is-visible' : ''} text-center mb-12`}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-4">What We Stand For</h2>
            <p className="text-sky-400/70 text-lg max-w-2xl mx-auto leading-relaxed">
              The principles that shape every call we answer.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`reveal ${visible ? 'is-visible' : ''} group rounded-2xl border border-ink-500/25 bg-gradient-to-br from-ink-800/50 to-ink-900/50 p-6 transition-all duration-400 hover:border-gold-400/30 hover:-translate-y-1`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/15 to-gold-400/5 border border-gold-400/20 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                  <v.icon className="w-6 h-6 text-gold-400" strokeWidth={1.8} />
                </div>
                <h3 className="text-white text-base font-extrabold tracking-tight font-display mb-2">{v.title}</h3>
                <p className="text-sky-300/65 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why choose us checklist */}
        <div className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`reveal ${visible ? 'is-visible' : ''}`}>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display mb-5">
                Why teams choose AdminCaptainVA
              </h2>
              <p className="text-sky-400/70 text-base leading-relaxed mb-8">
                We are not a generic answering service. Every workflow is built around your industry, your hours, and your rules.
              </p>
              <ul className="space-y-4">
                {checklist.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-gold-400/15 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-gold-400" strokeWidth={3} />
                    </span>
                    <span className="text-sky-200/80 text-sm leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`reveal ${visible ? 'is-visible' : ''} rounded-2xl bg-gradient-to-br from-ink-800/60 to-ink-900/60 border border-gold-400/25 p-8`} style={{ transitionDelay: '120ms' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-xl bg-gold-400/15 border border-gold-400/25 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-gold-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm font-display">Based in Minneapolis, MN</h3>
                  <p className="text-sky-400/60 text-xs">Serving businesses nationwide</p>
                </div>
              </div>

              <div className="space-y-4">
                <a href="tel:17634966613" className="flex items-center gap-3 border-l-2 border-gold-400/40 pl-4 hover:border-gold-400 transition-colors group">
                  <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="text-sky-200/80 text-sm group-hover:text-white transition-colors">(763) 496-6613</span>
                </a>
                <a href="mailto:Contact@admincaptainva.com" className="flex items-center gap-3 border-l-2 border-gold-400/40 pl-4 hover:border-gold-400 transition-colors group">
                  <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  <span className="text-sky-200/80 text-sm group-hover:text-white transition-colors">Contact@admincaptainva.com</span>
                </a>
              </div>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="mt-8 group inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-ink-900 font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-gold-400/20 hover:shadow-gold-400/30 w-full justify-center"
              >
                Talk With Our Team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
