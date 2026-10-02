import { UserCheck, MessageCircle, Zap, TrendingUp } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const steps = [
  {
    number: '1',
    icon: UserCheck,
    title: 'Free Discovery Call',
    desc: 'We learn how your business runs and where calls and jobs are slipping through the cracks.',
  },
  {
    number: '2',
    icon: MessageCircle,
    title: 'Meet Your Front Office Team',
    desc: 'We set you up with a team that knows your trade and is trained on your business.',
  },
  {
    number: '3',
    icon: Zap,
    title: 'We Work in Your Tools',
    desc: 'We use the software you already have, like Jobber, Housecall Pro, and ServiceTitan. Nothing new for you to learn.',
  },
  {
    number: '4',
    icon: TrendingUp,
    title: 'Grow with Confidence',
    desc: 'You get a weekly scorecard and monthly check-ins. As your business grows, we add coverage.',
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

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
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
              <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="relative z-10 mb-6">
                  <div className="relative w-14 h-14 rounded-2xl bg-gold-400/10 border border-gold-400/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-gold-400/10">
                    <step.icon className="w-7 h-7 text-gold-400" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-3 font-display">{step.title}</h3>
                <p className="text-sky-400/80 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
