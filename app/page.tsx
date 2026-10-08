import Navbar    from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Services   from './components/Services';
import Menu       from './components/Menu';
import Gallery    from './components/Gallery';
import Reviews    from './components/Reviews';
import Locations  from './components/Locations';
import Contact    from './components/Contact';
import Footer     from './components/Footer';
import WhatsApp   from './components/WhatsApp';
import ScrollReveal from './components/ScrollReveal';
import MouseFx from './components/MouseFx';
import SiteBackground from './components/SiteBackground';

export default function Home() {
  return (
    <main>
      <SiteBackground />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Menu />
      <Gallery />
      <Reviews />
      <Locations />
      <Contact />
      <Footer />
      <WhatsApp />
      <ScrollReveal />
      <MouseFx />
    </main>
  );
}
