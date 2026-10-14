import Logo from './Logo';

const links = {
  Company: [
    { label: 'Industries', href: '#industries' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Bundles', href: '#bundles' },
    { label: 'Start Free', href: '#contact' },
  ],
  Industries: [
    { label: 'Implant & Denture Centers', href: '#industries' },
    { label: 'Oral Surgeons', href: '#industries' },
    { label: 'Endodontists', href: '#industries' },
    { label: 'Orthodontists', href: '#industries' },
    { label: 'Pediatric Dentists', href: '#industries' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink-950 border-t border-ink-500/40 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-5">
              <Logo />
            </div>
            <p className="text-sky-400/70 text-sm leading-relaxed mb-5 max-w-sm">
              Call answering built for specialty dental practices, so your front desk can focus on the patients in the chair.
            </p>
            <div className="space-y-1">
              <a href="tel:17634966613" className="block text-sky-400/60 hover:text-sky-400 text-xs transition-colors">
                +1 (763) 496-6613
              </a>
              <a href="mailto:Contact@admincaptainva.com" className="block text-sky-400/60 hover:text-sky-400 text-xs transition-colors">
                Contact@admincaptainva.com
              </a>
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm mb-4 font-display">{category}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sky-400/50 hover:text-sky-400 text-sm transition-colors">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-ink-500/40 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sky-400/40 text-sm">
            &copy; {new Date().getFullYear()} AdminCaptainVA. All rights reserved.
          </p>
          <p className="text-sky-400/30 text-xs">
            Serving dental specialty practices nationwide
          </p>
        </div>
      </div>
    </footer>
  );
}
