import Navbar    from './components/Navbar';
import Hero       from './components/Hero';
import About      from './components/About';
import Services   from './components/Services';
import Menu       from './components/Menu';
import Gallery    from './components/Gallery';
import Reviews    from './components/Reviews';
import Locations  from './components/Locations';
import FAQ        from './components/FAQ';
import Contact    from './components/Contact';
import Footer     from './components/Footer';
import WhatsApp   from './components/WhatsApp';
import ScrollReveal from './components/ScrollReveal';
import MouseFx from './components/MouseFx';
import TouchFx from './components/TouchFx';
import SiteBackground from './components/SiteBackground';
import { FAQS } from './lib/site';

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <SiteBackground />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Menu />
      <Gallery />
      <Reviews />
      <Locations />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsApp />
      <ScrollReveal />
      <MouseFx />
      <TouchFx />
    </main>
  );
}
