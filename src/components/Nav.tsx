import { useState, useEffect } from 'react';
import { Menu, X, Anchor, Wrench } from 'lucide-react';
import Logo from './Logo';

const links = [
  { label: 'Industries', href: '#industries' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Bundles', href: '#bundles' },
  { label: 'Service Menu', href: '#service-menu' },
  { label: 'Free Consultation', href: '#contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-ink-500/30 shadow-lg shadow-black/20' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between py-4">
        <a href="#" className="group flex items-center gap-2">
          <Anchor className="w-6 h-6 text-gold-400 group-hover:rotate-12 transition-transform duration-300" />
          <Logo />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sky-400/90 hover:text-white text-sm font-medium transition-colors after:absolute after:bottom-[-6px] after:left-0 after:w-0 after:h-0.5 after:bg-gold-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className="flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-ink-900 font-bold text-sm px-5 py-2.5 rounded-full transition-all shadow-md shadow-gold-400/20 hover:shadow-gold-400/30 hover:-translate-y-0.5"
          >
            <Wrench className="w-4 h-4" />
            Free 30-Day Pilot
          </a>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden glass border-t border-ink-500/30 px-5 pb-6 pt-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sky-400 hover:text-white py-3 text-sm font-medium border-b border-ink-500/40"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-4 flex items-center justify-center gap-2 bg-gold-400 hover:bg-gold-500 text-ink-900 font-bold text-sm px-5 py-3 rounded-full transition-colors"
          >
            <Wrench className="w-4 h-4" />
            Free 30-Day Pilot
          </a>
        </div>
      )}
    </header>
  );
}
