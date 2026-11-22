import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Industries from './components/Industries';
import WhyUs from './components/WhyUs';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IndustryPage, { type IndustryKey } from './components/IndustryPage';
import Careers from './components/Careers';
import DentalOnboarding from './components/DentalOnboarding';
import Partners from './components/Partners';
import PartnerLanding from './components/PartnerLanding';
import AdminChats from './components/AdminChats';
import About from './components/About';
import NotFound from './components/NotFound';

export default function App() {
  const [route, setRoute] = useState<string>(window.location.hash);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      setRoute(hash);
      if (hash === '#/faq' || hash === '#/careers' || hash === '#/about' || hash === '#/partners' || hash.startsWith('#/industries/')) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (window.location.pathname === '/dental-onboarding') {
    return <DentalOnboarding />;
  }

  if (window.location.pathname === '/admin/chats') {
    return <AdminChats />;
  }

  if (window.location.pathname.startsWith('/p/')) {
    const partnerSlug = window.location.pathname.slice(3).split('/')[0] || 'demo-partner';
    return <PartnerLanding slug={partnerSlug} />;
  }

  if (window.location.pathname === '/partners') {
    return (
      <div className="antialiased">
        <Nav />
        <Partners />
        <Footer />
      </div>
    );
  }

  const industryMatch = route.match(/^#\/industries\/(dental|property|legal)$/);
  const industry = industryMatch?.[1] as IndustryKey | undefined;

  if (industry) {
    return (
      <div className="antialiased">
        <Nav />
        <IndustryPage industry={industry} />
        <Footer />
      </div>
    );
  }

  if (route === '#/careers') {
    return (
      <div className="antialiased">
        <Nav />
        <Careers />
        <Footer />
      </div>
    );
  }

  if (route === '#/about') {
    return (
      <div className="antialiased">
        <Nav />
        <About />
        <Footer />
      </div>
    );
  }

  if (route === '#/partners') {
    return (
      <div className="antialiased">
        <Nav />
        <Partners />
        <Footer />
      </div>
    );
  }

  if (route === '#/faq') {
    return (
      <div className="antialiased">
        <Nav />
        <Faq />
        <Footer />
      </div>
    );
  }

  if (window.location.pathname !== '/' &&
      !window.location.pathname.startsWith('/p/') &&
      window.location.pathname !== '/partners' &&
      window.location.pathname !== '/dental-onboarding' &&
      window.location.pathname !== '/admin/chats') {
    return <NotFound />;
  }

  return (
    <div className="antialiased">
      <Nav />
      <Hero />
      <Industries />
      <HowItWorks />
      <WhyUs />
      <Contact />
      <Footer />
    </div>
  );
}
