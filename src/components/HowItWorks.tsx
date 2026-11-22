import { PhoneCall, Headset, FileText, TrendingUp } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const steps = [
  {
    number: '1',
    icon: PhoneCall,
    title: 'Free Discovery Call',
    desc: 'We learn how your team handles calls, urgent requests, scheduling, and after-hours coverage.'
  },
  {
    number: '2',
    icon: Headset,
    title: 'Meet Your Reception Team',
    desc: 'We train a dedicated team on your scripts, routing rules, scheduling preferences, and escalation plan.'
  },
  {
    number: '3',
    icon: FileText,
    title: 'We Fit Your Workflow',
    desc: 'We document each interaction clearly and follow the tools, handoffs, and priorities your team already uses.'
  },
  {
    number: '4',
    icon: TrendingUp,
    title: 'Grow with Confidence',
    desc: 'You get clear reporting and regular check-ins. As your business grows, we adjust coverage around what matters most.'
  },
];

export default function HowItWorks() {
  const { ref, visible } = useReveal();

  return (
    <section id="how-it-works" className="relative bg-ink-900 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 anchor-pattern pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-15" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gold-400/12 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-sky-400/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center mb-16`}>
          <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
            The Process
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight font-display">
            Up and running in days, not months
          </h2>
          <p className="text-sky-400 text-lg max-w-2xl mx-auto">
            We handle the setup so you can stay in the field.
          </p>
        </div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ink-400 to-transparent" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`reveal ${visible ? 'is-visible' : ''} relative`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="group relative flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative z-10 mb-6">
                  {/* Number badge behind icon */}
                  <span className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-gold-400 text-ink-900 text-xs font-extrabold flex items-center justify-center shadow-lg shadow-gold-400/30 z-10">{step.number}</span>
                  {/* Glow ring on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gold-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400/15 to-gold-400/5 border border-gold-400/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold-400/10 group-hover:border-gold-400/50 group-hover:scale-105 transition-all duration-300">
                    <step.icon className="w-8 h-8 text-gold-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                <h3 className="text-white font-extrabold text-xl lg:text-2xl mb-3 font-display tracking-tight group-hover:text-gold-400 transition-colors duration-300">{step.title}</h3>
                <div className="inline-flex items-start gap-2 rounded-xl bg-sky-400/8 border border-sky-400/15 px-3.5 py-2.5 max-w-sm">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                  <p className="text-sky-300 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
