import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Mike Larsen',
    role: 'Owner, Larsen Mechanical HVAC',
    location: 'Plymouth, MN',
    avatar: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote:
      "I was drowning in callbacks and missed estimates. Within two weeks, their team had everything organized and we closed three jobs I would have lost. Best investment I've made in five years.",
    stars: 5,
    topColor: 'from-[#FFA800]',
  },
  {
    name: 'Sandra Torres',
    role: 'Owner, All-Star Plumbing Services',
    location: 'Bloomington, MN',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote:
      'My rep handles all my Jobber scheduling, invoicing follow-ups, and Google reviews. My revenue is up 22% this year and I finally have evenings back with my family.',
    stars: 5,
    topColor: 'from-[#99daff]',
  },
  {
    name: 'Derek Nystrom',
    role: 'Owner, Nystrom Electric',
    location: 'Eden Prairie, MN',
    avatar: 'https://images.pexels.com/photos/936043/pexels-photo-936043.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote:
      "I was skeptical about someone else answering my phones. AdminCaptainVA trained their team on exactly how I like things done. Customers don't even know they're not in my office.",
    stars: 5,
    topColor: 'from-[#FFA800]',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background — city skyline at dusk */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("https://images.pexels.com/photos/1519088/pexels-photo-1519088.jpeg?auto=compress&cs=tinysrgb&w=1600")`, transform: 'translateZ(0)' }}
      />
      <div className="absolute inset-0 bg-[#0b1829]/90" />
      {/* Large decorative quote mark */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
        <Quote className="w-[500px] h-[500px] text-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block text-[#FFA800] text-sm font-bold uppercase tracking-widest mb-4">Real Results</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Contractors love us
          </h2>
          <p className="text-[#99daff] text-lg max-w-2xl mx-auto">
            Don't take our word for it. Here's what Twin Cities trade business owners say.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="relative bg-[#0b1829]/90 border border-[#1e3d6e] rounded-2xl p-8 flex flex-col gap-6 hover:border-[#FFA800]/30 hover:-translate-y-1 transition-transform duration-200"
            >
              {/* Colored top accent bar */}
              <div className={`absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r ${t.topColor} to-transparent rounded-full`} />

              <Quote className="w-8 h-8 text-[#FFA800]/50" />
              <p className="text-[#99daff] text-base leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFA800] text-[#FFA800]" />
                ))}
              </div>
              <div className="flex items-center gap-4 border-t border-[#1e3d6e] pt-5">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  decoding="async"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0 ring-2 ring-[#FFA800]/20"
                />
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-[#99daff]/60 text-xs mt-0.5">{t.role}</p>
                  <p className="text-[#FFA800]/70 text-xs">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
