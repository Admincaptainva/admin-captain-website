import { UserCheck, MessageCircle, Zap, TrendingUp } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: UserCheck,
    title: 'Free Discovery Call',
    desc: "We learn your business inside and out — your software, your customers, your busiest pain points. No generic solutions.",
  },
  {
    number: '02',
    icon: MessageCircle,
    title: 'Team Match & Onboarding',
    desc: "We pair you with a specialist with trade industry experience. Full onboarding in 5 business days or less.",
  },
  {
    number: '03',
    icon: Zap,
    title: 'Seamless Integration',
    desc: 'Our team works inside your existing tools — Jobber, ServiceTitan, Housecall Pro, QuickBooks, Google Workspace, and more.',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Grow with Confidence',
    desc: "Monthly check-ins, performance reports, and the flexibility to scale our team's hours as your business grows.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background photo — professional team collaboration */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600")`, transform: 'translateZ(0)' }}
      />
      <div className="absolute inset-0 bg-[#0b1829]/80" />
      {/* Gold glow top-left */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#FFA800]/10 blur-3xl pointer-events-none" />
      {/* Sky blue glow bottom-right */}
      <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-[#99daff]/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block text-[#FFA800] text-sm font-bold uppercase tracking-widest mb-4">The Process</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Up and running in days, not months
          </h2>
          <p className="text-[#99daff] text-lg max-w-2xl mx-auto">
            No lengthy contracts, no steep learning curves. We handle the setup so you can focus on running your crew.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-6xl font-black text-white/5 leading-none select-none absolute -top-2 -left-1">{step.number}</span>
                  <div className="w-14 h-14 rounded-2xl bg-[#FFA800]/15 border border-[#FFA800]/30 flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#FFA800]/10">
                    <step.icon className="w-7 h-7 text-[#FFA800]" />
                  </div>
                </div>
                <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                <p className="text-[#99daff]/70 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}
