import { ArrowRight, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-ink-900 overflow-hidden flex items-center">
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600")`, transform: 'translateZ(0)' }}
      />
      {/* Layered overlays for depth — brighter */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink-950/85 via-ink-900/75 to-ink-700/65" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      {/* Gold glow top-right */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold-400/15 blur-[120px] pointer-events-none" />
      {/* Sky glow bottom-left */}
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-400/12 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-32 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <div className="animate-fade-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
            Front Office Agency
            <span className="block text-gradient-gold mt-2">for Service Professionals &amp; More</span>
          </h1>

          <p className="text-sky-400/90 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            We answer your calls, schedule your jobs, send your estimates and invoices, and follow up on every lead. Our team knows HVAC, plumbing, electrical, roofing, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://calendly.com/contact-admincaptainva/15-minute-phone-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-500 text-ink-900 font-bold text-base px-8 py-4 rounded-xl transition-all shadow-lg shadow-gold-400/25 hover:shadow-gold-400/40 hover:-translate-y-0.5"
            >
              Get Your Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 glass border border-ink-500/50 hover:border-sky-400/40 text-sky-400 hover:text-white font-semibold text-base px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5"
            >
              See How It Works
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-sky-400/80 text-sm">Built specifically for Service Professionals</span>
          </div>
        </div>

        {/* Right — image with decorative compass */}
        <div className="hidden lg:block relative">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Operations team at work"
              loading="eager"
              decoding="async"
              width={900}
              height={1125}
              className="rounded-2xl shadow-2xl shadow-black/50 w-full object-cover aspect-[4/5] ring-1 ring-white/15"
            />
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-ink-950 to-transparent pointer-events-none" />
    </section>
  );
}
