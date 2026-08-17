import { MapPin, Users, Award } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative bg-[#0b1829] py-24 sm:py-32 overflow-hidden">

      {/* ── Background layer ─────────────────────────────────── */}
      {/* Large gold sweep top-left */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-[#FFA800]/8 blur-3xl pointer-events-none" />
      {/* Sky-blue sweep bottom-right */}
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#99daff]/8 blur-3xl pointer-events-none" />
      {/* Subtle mid-page gold pulse */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[300px] bg-[#FFA800]/3 blur-3xl pointer-events-none rounded-full" />

      {/* ── Decorative grid dots (top-right quadrant) ─────────── */}
      <div
        className="absolute top-0 right-0 w-80 h-80 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #99daff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* ── Decorative grid dots (bottom-left quadrant) ────────── */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #FFA800 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* ── Diagonal accent stripe ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] opacity-[0.03]"
          style={{
            background: 'repeating-linear-gradient(45deg, #FFA800, #FFA800 1px, transparent 1px, transparent 32px)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">

        {/* ── Left: image column ─────────────────────────────────── */}
        <div className="relative">
          {/* Glowing border ring around image */}
          <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-[#FFA800]/25 via-[#99daff]/10 to-transparent blur-xl pointer-events-none" />
          {/* Outer decorative rings */}
          <div className="absolute -inset-4 rounded-3xl border border-[#FFA800]/10 pointer-events-none" />
          <div className="absolute -inset-8 rounded-3xl border border-[#1e3d6e]/50 pointer-events-none" />

          <img
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=900"
            alt="Our team"
            loading="lazy"
            decoding="async"
            width={900}
            height={506}
            className="relative rounded-2xl w-full object-cover aspect-video shadow-2xl shadow-black/50"
          />

          {/* Floating location card */}
          <div className="absolute -bottom-6 -right-6 bg-[#0e2242] border border-[#1e3d6e] rounded-2xl p-6 shadow-2xl hidden sm:block">
            <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-[#FFA800]/60 via-[#FFA800]/30 to-transparent rounded-full" />
            <div className="flex items-center gap-3 mb-1">
              <MapPin className="w-5 h-5 text-[#FFA800]" />
              <span className="text-white font-bold">Minneapolis, MN</span>
            </div>
            <p className="text-[#99daff]/70 text-sm">Founded right here in the Twin Cities</p>
          </div>

          {/* Floating stat chip — top-left */}
          <div className="absolute -top-5 -left-5 bg-[#FFA800] rounded-xl px-4 py-2.5 shadow-xl hidden sm:block">
            <p className="text-[#0b1829] text-xs font-bold uppercase tracking-widest leading-none mb-0.5">Since Day One</p>
            <p className="text-[#0b1829] text-xl font-extrabold leading-none">Trade-Only</p>
          </div>
        </div>

        {/* ── Right: text column ─────────────────────────────────── */}
        <div className="relative">
          {/* Vertical gold accent line */}
          <div className="absolute -left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#FFA800]/70 via-[#FFA800]/25 to-transparent hidden lg:block" />
          {/* Faint horizontal rule above label */}
          <div className="w-12 h-px bg-[#FFA800]/50 mb-4 hidden lg:block" />

          <span className="inline-block text-[#FFA800] text-sm font-bold uppercase tracking-widest mb-4">Our Story</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            We don't serve everyone. We serve Service Professionals.
          </h2>
          <p className="text-[#99daff] text-lg leading-relaxed mb-6">
            AdminCaptainVA was founded after watching too many great tradespeople fail not because of their skills, but because of the paperwork pile-up. We built an outsourced operations agency that specializes exclusively in Service Professionals — because admin for a roofer is nothing like admin for a tech startup.
          </p>
          <p className="text-[#99daff]/80 text-base leading-relaxed mb-10">
            Everyone on our team goes through trade-specific training covering industry software, seasonal demand patterns, and the lingo your customers use. We're your back office — not a call center.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-4 bg-[#0e2242]/80 border border-[#1e3d6e] hover:border-[#FFA800]/40 rounded-xl p-4 transition-colors duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#FFA800]/10 group-hover:bg-[#FFA800]/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                <Users className="w-6 h-6 text-[#FFA800]" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Trade-Trained Team Only</h4>
                <p className="text-[#99daff]/70 text-sm">Every team member is trained exclusively on trade business operations.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-[#0e2242]/80 border border-[#1e3d6e] hover:border-[#FFA800]/40 rounded-xl p-4 transition-colors duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-[#FFA800]/10 group-hover:bg-[#FFA800]/20 flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                <Award className="w-6 h-6 text-[#FFA800]" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base mb-1">Quality Guaranteed</h4>
                <p className="text-[#99daff]/70 text-sm">Not satisfied in your first 30 days? We'll make it right, no questions asked.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
