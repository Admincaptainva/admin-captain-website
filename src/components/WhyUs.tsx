import {
  PhoneOff,
  CalendarCheck,
  Stethoscope,
  FileText,
  MessageSquareQuote,
  Smile,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const benefits = [
  {
    icon: PhoneOff,
    title: 'No More Voicemail',
    desc: 'Every call gets answered — live during business hours, AI after hours. No patient ever hears a beep again.',
    stat: '80%',
    statLabel: 'of callers hang up on voicemail',
  },
  {
    icon: CalendarCheck,
    title: 'Patients Booked, Not Just Messages',
    desc: 'We book appointments directly into your schedule, fill emergency slots, and handle intake on the call.',
    stat: '1st call',
    statLabel: 'new patients confirmed instantly',
  },
  {
    icon: Stethoscope,
    title: 'Emergencies to Your On-Call Doctor',
    desc: 'Urgent calls routed instantly following your exact escalation protocol. The call reaches the doctor, not voicemail.',
    stat: '24/7',
    statLabel: 'emergency routing active',
  },
  {
    icon: FileText,
    title: 'Morning Summary + Instant Texts',
    desc: 'Walk in knowing exactly what happened overnight. Urgent matters get texted the moment they happen.',
    stat: '6 AM',
    statLabel: 'summary on your desk daily',
  },
  {
    icon: MessageSquareQuote,
    title: 'Doctor-Approved Scripts',
    desc: 'Every word follows scripts you review and approve. We handle logistics — never clinical advice.',
    stat: '100%',
    statLabel: 'script-compliant interactions',
  },
  {
    icon: Smile,
    title: 'Dental Only',
    desc: 'We don\'t answer for plumbers or law firms. Every receptionist is trained in dental specialty workflows.',
    stat: '6',
    statLabel: 'specialties we serve',
  },
];

const trustStats = [
  { icon: TrendingUp, value: '80%', label: 'of callers hang up on voicemail' },
  { icon: ShieldCheck, value: 'HIPAA', label: 'compliant with signed BAA' },
  { icon: Clock, value: '< 30s', label: 'average call answer time' },
];

export default function WhyUs() {
  const { ref, visible } = useReveal();

  return (
    <section id="why-us" className="relative bg-ink-800 py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-[0.07] pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-gold-400/6 blur-[180px] pointer-events-none drift-slow" />
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-sky-400/5 blur-[180px] pointer-events-none drift-slow-reverse" />

      {/* Edge blends */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-ink-900/40 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ink-900/40 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center mb-14`}>
          <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
            Why Us
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white mb-5 tracking-tight font-display leading-[1.1]">
            Why practices choose{' '}
            <span className="text-gradient-gold">AdminCaptainVA</span>
          </h2>
          <p className="text-sky-400/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Six reasons specialty practices trust us to answer every patient call — day, night, and weekend.
          </p>
        </div>

        {/* Trust stats bar */}
        <div
          className={`reveal ${visible ? 'is-visible' : ''} grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14`}
          style={{ transitionDelay: '80ms' }}
        >
          {trustStats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-4 rounded-xl bg-ink-700/30 border border-ink-500/20 px-5 py-4 hover:border-gold-400/20 transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-gold-400/10 flex items-center justify-center flex-shrink-0">
                <s.icon className="w-5 h-5 text-gold-400" strokeWidth={1.8} />
              </div>
              <div>
                <div className="text-xl font-extrabold text-white font-display tracking-tight">{s.value}</div>
                <div className="text-sky-400/50 text-xs leading-tight">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className={`reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="group relative h-full rounded-2xl border border-ink-500/25 bg-gradient-to-br from-ink-700/50 to-ink-800/50 p-6 transition-all duration-400 hover:border-gold-400/30 hover:from-ink-700/70 hover:to-ink-800/70 hover:shadow-2xl hover:shadow-black/30 hover:-translate-y-1 overflow-hidden">
                {/* Top accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Corner glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gold-400/0 group-hover:bg-gold-400/8 blur-3xl transition-all duration-700" />

                <div className="relative">
                  {/* Icon + number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/15 to-gold-400/5 border border-gold-400/20 flex items-center justify-center transition-all duration-300 group-hover:border-gold-400/40 group-hover:shadow-lg group-hover:shadow-gold-400/15 group-hover:scale-105">
                      <b.icon className="w-6 h-6 text-gold-400" strokeWidth={1.8} />
                    </div>
                    <span className="text-4xl font-extrabold text-ink-500/30 group-hover:text-gold-400/15 transition-colors duration-500 font-display tracking-tight">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-lg font-extrabold tracking-tight font-display mb-3 leading-snug">
                    {b.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sky-300/70 text-sm leading-relaxed mb-5">
                    {b.desc}
                  </p>

                  {/* Stat highlight */}
                  <div className="flex items-center gap-3 pt-4 border-t border-ink-500/20">
                    <span className="text-2xl font-extrabold text-gold-400 font-display tracking-tight">
                      {b.stat}
                    </span>
                    <span className="text-sky-400/50 text-xs leading-tight">
                      {b.statLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className={`reveal ${visible ? 'is-visible' : ''} text-center mt-14`}
          style={{ transitionDelay: '600ms' }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-ink-900 font-bold text-sm px-7 py-3.5 rounded-full transition-all shadow-lg shadow-gold-400/20 hover:shadow-gold-400/30 hover:-translate-y-0.5"
          >
            Start Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
