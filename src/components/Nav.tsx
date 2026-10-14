import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';

type NavLink = {
  label: string;
  href: string;
  sectionId?: string;
  isRoute?: boolean;
};

const links: NavLink[] = [
  { label: 'Industries', href: '#industries', sectionId: 'industries' },
  { label: 'Why Us', href: '#why-us', sectionId: 'why-us' },
  { label: 'How It Works', href: '#how-it-works', sectionId: 'how-it-works' },
  { label: 'Bundles', href: '#bundles', sectionId: 'bundles' },
  { label: 'Compare Plans', href: '#/compare', isRoute: true },
  { label: 'FAQ', href: '#/faq', isRoute: true },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [route, setRoute] = useState<string>(window.location.hash);

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

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (href: string) => {
    if (href === '#industries') return route === '#industries' || route === '' || route === '#';
    return route === href;
  };

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) {
    e.preventDefault();
    setOpen(false);

    if (link.isRoute) {
      window.location.hash = link.href;
      window.scrollTo(0, 0);
      return;
    }

    // For section links: if we're on a sub-route (#/compare or #/faq),
    // navigate home first, then scroll after React renders.
    const currentHash = window.location.hash;
    const onSubRoute = currentHash === '#/compare' || currentHash === '#/faq';

    if (onSubRoute) {
      // Clear the route so App renders the home page, then scroll once it's in the DOM
      window.location.hash = '';
      // Wait for React to render home sections, then scroll
      setTimeout(() => {
        const el = document.getElementById(link.sectionId!);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
        setRoute('');
      }, 120);
    } else {
      // Already on home page — just scroll
      const el = document.getElementById(link.sectionId!);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
      setRoute('');
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'glass border-b border-ink-500/30 shadow-xl shadow-black/30'
          : 'bg-gradient-to-b from-ink-950/60 to-transparent'
      }`}
    >
      {/* Top accent line when scrolled */}
      <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between py-3.5">

        {/* Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 flex-shrink-0"
          onClick={(e) => {
            e.preventDefault();
            const currentHash = window.location.hash;
            if (currentHash === '#/compare' || currentHash === '#/faq') {
              window.location.hash = '';
              setRoute('');
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <Logo />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavClick(e, l)}
                className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                  active
                    ? 'text-white'
                    : 'text-sky-300/70 hover:text-white'
                }`}
              >
                {l.label}
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-gold-400 rounded-full transition-all duration-300 ${
                  active ? 'w-5 opacity-100' : 'w-0 opacity-0'
                }`} />
              </a>
            );
          })}
        </nav>

        {/* Desktop phone — pushed to the far right */}
        <div className="hidden lg:flex items-center gap-2.5 flex-shrink-0 ml-6">
          <a
            href="tel:17634966613"
            className="group flex items-center gap-2.5 rounded-full border border-ink-500/40 hover:border-gold-400/30 px-4 py-2 transition-all duration-200"
          >
            <span className="w-7 h-7 rounded-full bg-gold-400/10 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
            </span>
            <span className="text-sky-200/80 group-hover:text-white text-sm font-medium transition-colors">
              (763) 496-6613
            </span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden relative w-10 h-10 rounded-lg flex items-center justify-center text-white hover:bg-ink-700/50 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-in-out ${
          open ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass border-t border-ink-500/20 px-5 pt-5 pb-7">
          {/* Nav links */}
          <div className="space-y-1">
            {links.map((l, i) => {
              const active = isActive(l.href);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l)}
                  className={`flex items-center justify-between py-3 px-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    active
                      ? 'bg-gold-400/10 text-white border-l-2 border-gold-400'
                      : 'text-sky-300/70 hover:text-white hover:bg-ink-700/40'
                  }`}
                  style={{
                    transitionDelay: open ? `${i * 40}ms` : '0ms',
                  }}
                >
                  {l.label}
                  <span className={`w-1.5 h-1.5 rounded-full transition-opacity ${active ? 'bg-gold-400 opacity-100' : 'opacity-0'}`} />
                </a>
              );
            })}
          </div>

          {/* Divider */}
          <div className="my-5 h-px bg-ink-500/30" />

          {/* Phone */}
          <a
            href="tel:17634966613"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 text-sky-200/80 hover:text-white text-sm font-medium py-3 px-3 rounded-lg hover:bg-ink-700/40 transition-colors"
          >
            <span className="w-8 h-8 rounded-full bg-gold-400/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-gold-400" />
            </span>
            (763) 496-6613
          </a>
        </div>
      </div>
    </header>
  );
}
