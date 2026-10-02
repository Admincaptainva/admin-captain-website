import { ArrowRight } from 'lucide-react';
import { useReveal } from '../hooks/useReveal';

const trades = [
  {
    name: 'HVAC',
    img: 'https://images.pexels.com/photos/3637786/pexels-photo-3637786.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['Emergency calls answered and sent to your on-call tech', 'Tune-up and maintenance reminders to past customers', 'Every new lead followed up fast'],
    badge: 'Most Popular',
  },
  {
    name: 'Plumbing',
    img: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['Emergency calls sent straight to your on-call plumber', 'Missed calls returned and jobs booked', 'Estimates followed up until they close'],
    badge: null,
  },
  {
    name: 'Electrical',
    img: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['Calls answered and service visits booked', 'Inspection and permit dates kept on track', 'Follow-ups on panel upgrades and recommended work'],
    badge: null,
  },
  {
    name: 'Roofing',
    img: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['Fast response to storm leads', 'Inspections booked right on your calendar', 'Follow-ups on estimates that haven\u2019t closed'],
    badge: 'High Demand',
  },
  {
    name: 'Landscaping',
    img: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['Calls answered and estimates booked', 'Seasonal contract renewals and reminders', 'Follow-ups to win back past customers'],
    badge: null,
  },
  {
    name: 'General Contracting',
    img: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['New project inquiries answered and followed up', 'Estimates and proposals tracked until they close', 'Change orders and paperwork kept organized'],
    badge: null,
  },
];

export default function Industries() {
  const { ref, visible } = useReveal();

  return (
    <section id="industries" className="relative bg-ink-950 py-24 sm:py-32 overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-gold-400/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-sky-400/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} text-center mb-16`}>
          <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-widest mb-4">
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
            Industries Served
            <span className="w-6 h-px bg-gold-400/50 inline-block" />
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight font-display">
            We know your trade
          </h2>
          <p className="text-sky-400 text-lg max-w-2xl mx-auto">
            Our team is trained in the workflows, terminology, and software unique to each trade — not just generic admin work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trades.map((trade, i) => (
            <div
              key={trade.name}
              className={`reveal ${visible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <a
                href="#contact"
                className="group relative overflow-hidden rounded-2xl border border-ink-500/40 hover:border-gold-400/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-400/10 cursor-pointer block h-full"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={trade.img}
                    alt={trade.name}
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={208}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out will-change-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-900/50 to-transparent" />

                  {trade.badge && (
                    <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-gold-400 text-ink-900 shadow-lg">
                      {trade.badge}
                    </span>
                  )}

                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                    <h3 className="text-white text-xl font-extrabold tracking-tight drop-shadow-lg font-display">{trade.name}</h3>
                    <div className="w-8 h-8 rounded-full bg-gold-400/0 group-hover:bg-gold-400 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                      <ArrowRight className="w-4 h-4 text-ink-900" />
                    </div>
                  </div>
                </div>

                <div className="bg-ink-700 p-5 group-hover:bg-ink-600/60 transition-colors duration-300">
                  <ul className="space-y-2.5">
                    {trade.tasks.map((task) => (
                      <li
                        key={task}
                        className="flex items-center gap-3 text-sm text-sky-400/70 group-hover:text-sky-400 transition-colors duration-200"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400 flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-sky-400/50 text-sm mt-12">
          Don't see your trade?{' '}
          <a href="#contact" className="text-gold-400 hover:text-gold-500 font-semibold transition-colors underline underline-offset-2">
            We cover those too — let's talk.
          </a>
        </p>
      </div>
    </section>
  );
}
