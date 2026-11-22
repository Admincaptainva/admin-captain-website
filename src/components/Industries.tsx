import { useReveal } from '../hooks/useReveal';
import { Building2, Scale, Stethoscope, Check, ArrowRight } from 'lucide-react';

const industries = [
  {
    slug: 'dental',
    name: 'Dental Specialty Practices',
    eyebrow: 'Clinical confidence',
    tagline: 'Protect every consult, emergency, and new-patient opportunity.',
    tasks: [
      'New-patient calls qualified and booked',
      'Urgent and post-op calls routed by your rules',
      'Morning summaries delivered to your team',
    ],
    icon: Stethoscope,
    image: 'https://images.pexels.com/photos/6812429/pexels-photo-6812429.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    slug: 'property',
    name: 'Property Management',
    eyebrow: 'Always-on coverage',
    tagline: 'Keep residents supported and maintenance moving after hours.',
    tasks: [
      'Maintenance requests triaged and documented',
      'Emergency issues escalated to the right vendor',
      'Leasing and resident calls answered professionally',
    ],
    icon: Building2,
    image: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    slug: 'legal',
    name: 'Legal Services',
    eyebrow: 'High-value intake',
    tagline: 'Turn first contact into a prepared, qualified opportunity.',
    tasks: [
      'New matters screened against your criteria',
      'Consultations scheduled without phone tag',
      'Urgent messages sent securely to your team',
    ],
    icon: Scale,
    image: 'https://images.pexels.com/photos/7876154/pexels-photo-7876154.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export default function Industries() {
  const { ref, visible } = useReveal();

  return (
    <section id="industries" className="relative bg-ink-950 py-28 sm:py-36 lg:py-40 overflow-hidden">
      <div className="absolute top-0 -left-32 w-[500px] h-[500px] rounded-full bg-gold-400/8 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] rounded-full bg-sky-400/8 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />

      <div className="relative max-w-[88rem] mx-auto px-5 sm:px-8 lg:px-12">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center mb-16 lg:mb-20`}>
          <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-widest mb-5">
            <span className="w-8 h-px bg-gold-400/50 inline-block" />
            Who We Serve
            <span className="w-8 h-px bg-gold-400/50 inline-block" />
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight font-display">
            One answering partner.{' '}
            <span className="text-gradient-gold">Built around your industry.</span>
          </h2>
          <p className="text-sky-400/80 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Trained teams, thoughtful workflows, and reliable coverage for businesses where every call matters.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((industry, i) => (
            <div
              key={industry.name}
              className={`reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="group relative overflow-hidden rounded-2xl border border-ink-500/30 hover:border-gold-400/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-400/10 h-full bg-gradient-to-b from-ink-800 to-ink-900">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={industry.image}
                    alt={industry.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/45 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gold-400/15 border border-gold-400/25 backdrop-blur-sm flex items-center justify-center flex-shrink-0 group-hover:bg-gold-400/25 transition-all duration-300">
                      <industry.icon className="w-6 h-6 text-gold-400" strokeWidth={1.8} />
                    </div>
                    <h3 className="text-white text-xl font-extrabold tracking-tight font-display leading-tight">
                      {industry.name}
                    </h3>
                  </div>
                </div>

                <div className="relative p-7">
                  <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-3">{industry.eyebrow}</p>
                  <p className="text-white text-lg font-semibold leading-snug mb-6">{industry.tagline}</p>
                  <ul className="space-y-3.5">
                    {industry.tasks.map((task) => (
                      <li key={task} className="flex items-start gap-3 text-sm text-sky-300/75 group-hover:text-sky-200 transition-colors duration-200 leading-relaxed">
                        <span className="mt-0.5 w-5 h-5 rounded-lg bg-sky-400/10 border border-sky-400/20 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-400/20 group-hover:border-sky-400/40 transition-all duration-300">
                          <Check className="w-3 h-3 text-sky-400" strokeWidth={3} />
                        </span>
                        {task}
                      </li>
                    ))}
                  </ul>
                  <a href={`#/industries/${industry.slug}`} className="inline-flex items-center gap-2 mt-7 text-gold-400 hover:text-gold-300 text-sm font-bold transition-colors">
                    See how it works <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400/0 to-transparent group-hover:via-gold-400/60 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 lg:mt-16">
          <p className="text-sky-400/70 text-lg">
            Need coverage for another service business?{' '}
            <a href="#contact" className="text-gold-400 font-semibold hover:text-gold-500 transition-colors underline decoration-gold-400/40 underline-offset-4">
              Let&apos;s build the right workflow.
            </a>
          </p>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />
    </section>
  );
}
