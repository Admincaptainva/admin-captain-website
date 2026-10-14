import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Industries from './components/Industries';
import WhyUs from './components/WhyUs';
import Pricing from './components/Pricing';
import ComparePlans from './components/ComparePlans';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

export default function App() {
  const [route, setRoute] = useState<string>(window.location.hash);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      setRoute(hash);
      if (hash === '#/compare' || hash === '#/faq') {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  if (route === '#/compare') {
    return (
      <div className="antialiased">
        <Nav />
        <ComparePlans />
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (route === '#/faq') {
    return (
      <div className="antialiased">
        <Nav />
        <Faq />
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  return (
    <div className="antialiased">
      <Nav />
      <Hero />
      <Industries />
      <WhyUs />
      <HowItWorks />
      <Pricing />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
}
