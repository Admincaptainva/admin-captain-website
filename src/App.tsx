import Nav from './components/Nav';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Industries from './components/Industries';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

export default function App() {
  return (
    <div className="antialiased">
      <Nav />
      <Hero />
      <Stats />
      <Services />
      <HowItWorks />
      <Industries />
      <Testimonials />
      <About />
      <Pricing />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
}
