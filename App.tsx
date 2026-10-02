import Nav from './components/Nav';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Industries from './components/Industries';

import Pricing from './components/Pricing';
import ServiceMenu from './components/ServiceMenu';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

export default function App() {
  return (
    <div className="antialiased">
      <Nav />
      <Hero />
      <Industries />
      <HowItWorks />

      <Pricing />
      <ServiceMenu />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
}
