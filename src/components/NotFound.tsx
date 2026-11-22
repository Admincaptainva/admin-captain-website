import { Link } from 'lucide-react';
import Logo from './Logo';

export default function NotFound() {
  function goHome(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.location.hash = '';
    window.scrollTo(0, 0);
  }

  return (
    <div className="min-h-screen bg-ink-950 flex flex-col items-center justify-center px-5 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold-400/10 blur-[150px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-400/8 blur-[150px] pointer-events-none" />

      <div className="relative text-center max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <div className="mb-6">
          <span className="text-7xl font-extrabold text-gradient-gold font-display tracking-tight">404</span>
        </div>

        <h1 className="text-2xl font-extrabold text-white tracking-tight font-display mb-3">
          Page not found
        </h1>
        <p className="text-sky-400/70 text-sm leading-relaxed mb-8">
          The page you're looking for may have moved or no longer exists. Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            onClick={goHome}
            className="inline-flex items-center gap-2 bg-gold-400 hover:bg-gold-500 text-ink-900 font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-gold-400/20 hover:shadow-gold-400/30"
          >
            <Link className="w-4 h-4" />
            Back to Home
          </a>
          <a
            href="tel:17634966613"
            className="inline-flex items-center gap-2 bg-ink-700/60 hover:bg-ink-700 text-white border border-ink-500 hover:border-gold-400/40 font-bold text-sm px-6 py-3.5 rounded-xl transition-all"
          >
            Call (763) 496-6613
          </a>
        </div>
      </div>
    </div>
  );
}
