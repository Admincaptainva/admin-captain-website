import { ArrowRight } from 'lucide-react';

const trades = [
  {
    name: 'HVAC',
    img: 'https://images.pexels.com/photos/3637786/pexels-photo-3637786.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['Seasonal tune-up scheduling', 'Emergency dispatch', 'Warranty follow-ups'],
    badge: 'Most Popular',
    accentColor: 'from-[#FFA800]',
    glowColor: 'group-hover:shadow-[#FFA800]/20',
    badgeStyle: 'bg-[#FFA800] text-[#0b1829]',
  },
  {
    name: 'Plumbing',
    img: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['24/7 inquiry response', 'Permit tracking', 'Quote management'],
    badge: null,
    accentColor: 'from-[#99daff]',
    glowColor: 'group-hover:shadow-[#99daff]/15',
    badgeStyle: '',
  },
  {
    name: 'Electrical',
    img: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['Code compliance reminders', 'Inspection scheduling', 'Material ordering'],
    badge: null,
    accentColor: 'from-[#FFA800]',
    glowColor: 'group-hover:shadow-[#FFA800]/20',
    badgeStyle: '',
  },
  {
    name: 'Roofing',
    img: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['Storm lead response', 'Insurance claim coordination', 'Crew scheduling'],
    badge: 'High Demand',
    accentColor: 'from-[#99daff]',
    glowColor: 'group-hover:shadow-[#99daff]/15',
    badgeStyle: 'bg-[#1e3d6e] text-[#99daff] border border-[#99daff]/30',
  },
  {
    name: 'Landscaping',
    img: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['Seasonal contract renewals', 'Route optimization', 'Customer re-engagement'],
    badge: null,
    accentColor: 'from-[#FFA800]',
    glowColor: 'group-hover:shadow-[#FFA800]/20',
    badgeStyle: '',
  },
  {
    name: 'General Contracting',
    img: 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600',
    tasks: ['Subcontractor coordination', 'Punch list tracking', 'Change order docs'],
    badge: null,
    accentColor: 'from-[#99daff]',
    glowColor: 'group-hover:shadow-[#99daff]/15',
    badgeStyle: '',
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative bg-[#0b1829] py-24 sm:py-32 overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 rounded-full bg-[#FFA800]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 rounded-full bg-[#99daff]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block text-[#FFA800] text-sm font-bold uppercase tracking-widest mb-4">Industries Served</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            We know your trade
          </h2>
          <p className="text-[#99daff] text-lg max-w-2xl mx-auto">
            Our team is trained in the workflows, terminology, and software unique to each trade — not just generic admin work.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trades.map((trade) => (
            <a
              key={trade.name}
              href="#contact"
              className={`group relative overflow-hidden rounded-2xl border border-[#1e3d6e] hover:border-[#FFA800]/50 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-xl ${trade.glowColor} cursor-pointer block`}
            >
              {/* Gold top accent line revealed on hover */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${trade.accentColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`} />

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
                {/* Stronger gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1829] via-[#0b1829]/50 to-transparent group-hover:via-[#0b1829]/30 transition-[background] duration-200" />

                {/* Badge */}
                {trade.badge && (
                  <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${trade.badgeStyle}`}>
                    {trade.badge}
                  </span>
                )}

                {/* Trade name + arrow */}
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <h3 className="text-white text-xl font-extrabold tracking-tight drop-shadow-lg">{trade.name}</h3>
                  <div className="w-8 h-8 rounded-full bg-[#FFA800]/0 group-hover:bg-[#FFA800] flex items-center justify-center transition-[background-color,opacity,transform] duration-200 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0">
                    <ArrowRight className="w-4 h-4 text-[#0b1829]" />
                  </div>
                </div>
              </div>

              <div className="bg-[#0e2242] p-5 group-hover:bg-[#0f2850] transition-colors duration-200">
                <ul className="space-y-2.5">
                  {trade.tasks.map((task) => (
                    <li
                      key={task}
                      className="flex items-center gap-3 text-sm text-[#99daff]/70 group-hover:text-[#99daff] transition-colors duration-200"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFA800] flex-shrink-0 group-hover:scale-125 transition-transform duration-300" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <p className="text-center text-[#99daff]/40 text-sm mt-12">
          Don't see your trade?{' '}
          <a href="#contact" className="text-[#FFA800] hover:text-[#E09600] font-semibold transition-colors underline underline-offset-2">
            We cover those too — let's talk.
          </a>
        </p>
      </div>
    </section>
  );
}
