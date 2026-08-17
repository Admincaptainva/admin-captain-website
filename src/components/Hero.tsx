import { ArrowRight, Star, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0b1829] overflow-hidden flex items-center">
      {/* Background photo — trade workers on a job site */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600")`, transform: 'translateZ(0)' }}
      />
      {/* Dark navy overlay to keep text readable and on-brand */}
      <div className="absolute inset-0 bg-[#0b1829]/85" />
      {/* Subtle gold glow top-right */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#FFA800]/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-32 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-4 h-4 text-[#99daff]" />
            <span className="text-[#99daff] text-sm font-semibold tracking-wide uppercase">Serving the Greater Twin Cities</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            Outsourced Operations Agency
            <span className="block text-[#FFA800]">for Service Professionals</span>
          </h1>

          <p className="text-[#99daff] text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            We handle your scheduling, estimates, follow-ups, and admin — so you can focus on the work that pays. Our team speaks the language of HVAC, plumbing, electrical, roofing, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://calendly.com/contact-admincaptainva/15-minute-phone-audit"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-[#FFA800] hover:bg-[#E09600] text-[#0b1829] font-bold text-base px-8 py-4 rounded-xl transition-colors shadow-lg shadow-[#FFA800]/20 hover:-translate-y-0.5 transition-transform"
            >
              Get Your Free Consultation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 border border-[#1e3d6e] hover:border-[#99daff]/50 text-[#99daff] hover:text-white font-semibold text-base px-8 py-4 rounded-xl transition-colors"
            >
              See What We Do
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <div className="flex items-center gap-1.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-4 h-4 fill-[#FFA800] text-[#FFA800]" />
              ))}
              <span className="text-[#99daff] text-sm ml-1">Built specifically for Service Professionals</span>
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Operations team at work"
              loading="eager"
              decoding="async"
              width={900}
              height={1125}
              className="rounded-2xl shadow-2xl shadow-black/50 w-full object-cover aspect-[4/5]"
            />
            <div className="absolute -bottom-6 -left-6 bg-[#0e2242] border border-[#1e3d6e] rounded-2xl p-5 shadow-xl">
              <p className="text-[#99daff]/70 text-xs font-medium uppercase tracking-wide mb-1">Hours back in your week</p>
              <p className="text-white text-2xl font-extrabold">Starting day one!</p>
            </div>
            <div className="absolute -top-6 -right-6 bg-[#FFA800] rounded-2xl p-5 shadow-xl">
              <p className="text-[#0b1829] text-xs font-bold uppercase tracking-wide mb-1">Response time</p>
              <p className="text-[#0b1829] text-2xl font-extrabold">Same-day response</p>
              <p className="text-[#0b1829]/70 text-sm font-semibold mt-0.5">— every time!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
