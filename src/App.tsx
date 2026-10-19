import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Industries from './components/Industries';
import WhyUs from './components/WhyUs';
import Faq from './components/Faq';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import IndustryPage, { type IndustryKey } from './components/IndustryPage';
import Careers from './components/Careers';

export default function App() {
  const [route, setRoute] = useState<string>(window.location.hash);

  useEffect(() => {
    const onHash = () => {
      const hash = window.location.hash;
      setRoute(hash);
      if (hash === '#/faq' || hash === '#/careers' || hash.startsWith('#/industries/')) {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const industryMatch = route.match(/^#\/industries\/(dental|property|legal)$/);
  const industry = industryMatch?.[1] as IndustryKey | undefined;

  if (industry) {
    return (
      <div className="antialiased">
        <Nav />
        <IndustryPage industry={industry} />
        <Footer />
        <ChatWidget />
      </div>
    );
  }

  if (route === '#/careers') {
    return (
      <div className="antialiased">
        <Nav />
        <Careers />
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
      <HowItWorks />
      <WhyUs />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
}
