import { useReveal } from '../hooks/useReveal';
import { Bone, Stethoscope, Microscope, Smile, Sparkles, Baby, Check, ArrowRight } from 'lucide-react';

const specialties = [
  {
    name: 'Implant & Denture Centers',
    tagline: 'Never miss a high-value consult again',
    tasks: [
      'Consult requests booked after hours',
      'Interested callers followed up fast',
      'Financing questions passed to your team',
    ],
    badge: 'High Demand',
    icon: Bone,
    image: 'https://images.pexels.com/photos/6502305/pexels-photo-6502305.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Oral Surgeons & Periodontists',
    tagline: 'Post-op care, handled with confidence',
    tasks: [
      'Post-op calls sent to your on-call doctor',
      'Referral patients scheduled',
      'Summary of every overnight call',
    ],
    badge: null,
    icon: Stethoscope,
    image: 'https://images.pexels.com/photos/27783462/pexels-photo-27783462.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Endodontists',
    tagline: 'Every pain call treated like an emergency',
    tasks: [
      'Pain calls routed by your emergency rules',
      'Referral appointments booked fast',
      'Referring offices kept in the loop',
    ],
    badge: null,
    icon: Microscope,
    image: 'https://images.pexels.com/photos/38909888/pexels-photo-38909888.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Orthodontists',
    tagline: 'After-hours parents, fully covered',
    tasks: [
      'Parents booking consults after work',
      'Broken bracket calls handled your way',
      'Closed Fridays fully covered',
    ],
    badge: 'High Demand',
    icon: Smile,
    image: 'https://images.pexels.com/photos/7787976/pexels-photo-7787976.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Cosmetic & Restorative',
    tagline: 'Turn every inquiry into a booked consult',
    tasks: [
      'Veneer and whitening consults booked',
      'New leads followed up in minutes',
      'No callers lost to voicemail',
    ],
    badge: null,
    icon: Sparkles,
    image: 'https://images.pexels.com/photos/6627572/pexels-photo-6627572.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'Pediatric Dentists',
    tagline: 'Calm, reassuring answers for worried parents',
    tasks: [
      'Parents booking after work hours',
      'Injury calls sent to your on-call doctor',
      'Busy evening calls handled',
    ],
    badge: null,
    icon: Baby,
    image: 'https://images.pexels.com/photos/7800561/pexels-photo-7800561.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export default function Industries() {
  const { ref, visible } = useReveal();

  return (
    <section id="industries" className="relative bg-ink-950 py-28 sm:py-36 lg:py-40 overflow-hidden">
      {/* Layered background glows */}
      <div className="absolute top-0 -left-32 w-[500px] h-[500px] rounded-full bg-gold-400/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-sky-400/8 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-ink-600/10 blur-[160px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Top gradient border line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center mb-16 lg:mb-20`}>
          <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-widest mb-5">
            <span className="w-8 h-px bg-gold-400/50 inline-block" />
            Who We Serve
            <span className="w-8 h-px bg-gold-400/50 inline-block" />
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight font-display">
            Built for dental{' '}
            <span className="text-gradient-gold">specialty practices</span>
          </h2>
          <p className="text-sky-400/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            We know the calls your practice gets, from implant consults to post-op questions.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {specialties.map((s, i) => (
            <div
              key={s.name}
              className={`reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-ink-500/30 hover:border-gold-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-400/10 h-full bg-gradient-to-b from-ink-800 to-ink-900">
                {/* Image header */}
                <div className="relative h-44 overflow-hidden flex-shrink-0">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/50 to-transparent" />
                  {/* Gold glow on hover */}
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gold-400/0 group-hover:bg-gold-400/15 blur-3xl transition-all duration-700" />

                  {/* Badge */}
                  {s.badge && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gold-400 text-ink-900 shadow-lg">
                      {s.badge}
                    </span>
                  )}

                  {/* Icon + name overlay at bottom of image */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-gold-400/15 border border-gold-400/25 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:border-gold-400/50 group-hover:bg-gold-400/25 group-hover:shadow-lg group-hover:shadow-gold-400/20 transition-all duration-300">
                      <s.icon className="w-5 h-5 text-gold-400 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-white text-lg lg:text-xl font-extrabold tracking-tight font-display leading-tight">
                      {s.name}
                    </h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="relative p-6">
                  {/* Tagline pill */}
                  <div className="mb-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-400/10 via-gold-400/5 to-transparent border border-gold-400/20 px-3.5 py-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0" />
                      <p className="text-gold-400 text-sm font-semibold leading-relaxed">
                        {s.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Bullet list with checkmark icons */}
                  <ul className="space-y-3.5">
                    {s.tasks.map((task) => (
                      <li
                        key={task}
                        className="flex items-start gap-3 text-sm lg:text-[15px] text-sky-300/70 group-hover:text-sky-200 transition-colors duration-200 leading-relaxed"
                      >
                        <span className="mt-0.5 w-5 h-5 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-400/20 group-hover:border-sky-400/40 group-hover:scale-110 transition-all duration-300">
                          <Check className="w-3 h-3 text-sky-400" strokeWidth={3} />
                        </span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-400/0 via-gold-400/0 to-gold-400/0 group-hover:from-gold-400/40 group-hover:via-gold-400/60 group-hover:to-gold-400/40 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Don't see your specialty? */}
        <div className="text-center mt-12 lg:mt-16">
          <p className="text-sky-400/70 text-lg">
            Don't see your specialty? We cover those too.{' '}
            <a href="#contact" className="text-gold-400 font-semibold hover:text-gold-500 transition-colors underline decoration-gold-400/40 underline-offset-4">
              Let's talk.
            </a>
          </p>
        </div>
      </div>

      {/* Bottom gradient border line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
    </section>
  );
}
