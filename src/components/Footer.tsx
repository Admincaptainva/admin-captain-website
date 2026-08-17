import Logo from './Logo';

const links = {
  Services: [
    { label: 'Scheduling & Dispatch', href: '#services' },
    { label: 'Estimates & Proposals', href: '#services' },
    { label: 'Customer Follow-Up', href: '#services' },
    { label: 'Invoicing & Collections', href: '#services' },
    { label: 'Review Management', href: '#services' },
  ],
  Industries: [
    { label: 'HVAC', href: '#industries' },
    { label: 'Plumbing', href: '#industries' },
    { label: 'Electrical', href: '#industries' },
    { label: 'Roofing', href: '#industries' },
    { label: 'Landscaping', href: '#industries' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Free Consultation', href: '#contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0b1829] border-t border-[#1e3d6e] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-5">
              <Logo />
            </div>
            <p className="text-[#99daff]/70 text-sm leading-relaxed mb-5">
              Outsourced operations agency built exclusively for Service Professionals. We handle the admin so you can focus on the work.
            </p>
            <div className="space-y-1">
              <a href="tel:16125680566" className="block text-[#99daff]/60 hover:text-[#99daff] text-xs transition-colors">
                +1 (612) 568-0566
              </a>
              <a href="mailto:contact@AdminCaptainVA.com" className="block text-[#99daff]/60 hover:text-[#99daff] text-xs transition-colors">
                contact@AdminCaptainVA.com
              </a>
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-[#99daff]/50 hover:text-[#99daff] text-sm transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#1e3d6e] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#99daff]/40 text-sm">
            &copy; {new Date().getFullYear()} AdminCaptainVA. All rights reserved.
          </p>
          <p className="text-[#99daff]/30 text-xs">
            Minneapolis, MN — Serving the greater Twin Cities area
          </p>
        </div>
      </div>
    </footer>
  );
}
