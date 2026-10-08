import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PAGES, byGroup, getPage } from '../lib/pages';
import { SITE, SITE_URL } from '../lib/site';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsApp from '../components/WhatsApp';

export const dynamicParams = false;

export function generateStaticParams() {
  return PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const page = getPage(params.slug);
  if (!page) return {};
  const url = `/${page.slug}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${page.title} | ${SITE.name}`,
      description: page.description,
      url,
      type: 'website',
      locale: 'en_IE',
      siteName: SITE.name,
      images: [{ url: page.image, alt: page.h1 }],
    },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: [page.image] },
  };
}

const GROUP_TITLE = { service: 'Our catering services', cuisine: 'South Indian specialities', area: 'Areas we serve' } as const;

export default function LandingPage({ params }: { params: { slug: string } }) {
  const page = getPage(params.slug);
  if (!page) notFound();

  const url = `${SITE_URL}/${page.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: page.label, item: url },
        ],
      },
      {
        '@type': page.group === 'area' ? 'WebPage' : 'Service',
        '@id': `${url}#main`,
        name: page.h1,
        description: page.description,
        url,
        image: `${SITE_URL}${page.image}`,
        ...(page.group === 'area' ? {} : { serviceType: page.label, areaServed: { '@type': 'Country', name: 'Ireland' } }),
        provider: { '@id': `${SITE_URL}/#org` },
      },
      {
        '@type': 'FAQPage',
        mainEntity: page.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
    ],
  };

  const related = byGroup(page.group).filter((p) => p.slug !== page.slug);
  const others = PAGES.filter((p) => p.slug !== page.slug && p.group !== page.group).slice(0, 6);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />

      <section className="relative bg-sv-dark text-white pt-36 md:pt-48 pb-16 md:pb-24">
        <Image src={page.image} alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 md:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-white/70 mb-4">
            <Link href="/" className="hover:text-white">Home</Link> <span aria-hidden>/</span> <span>{page.label}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-bold leading-tight">{page.h1}</h1>
          <p className="mt-5 text-lg text-white/85 max-w-2xl">{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/#contact" className="bg-sv-orange hover:bg-red-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors">Get a Quote</Link>
            <a href="https://wa.me/353858189052" target="_blank" rel="noopener noreferrer" className="bg-white text-sv-red font-semibold px-7 py-3.5 rounded-full hover:bg-gray-100 transition-colors">WhatsApp Us</a>
            <a href="tel:+353858189052" className="border border-white/50 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-white/10 transition-colors">Call 085 818 9052</a>
          </div>
        </div>
      </section>

      <article className="bg-sv-warm py-14 md:py-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <ul className="grid sm:grid-cols-2 gap-3 mb-12">
            {page.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 bg-white rounded-xl shadow-card px-5 py-4 text-sv-dark font-medium">
                <span className="w-2 h-2 rounded-full bg-sv-red shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          {page.sections.map((s) => (
            <section key={s.h} className="mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-sv-dark mb-3">{s.h}</h2>
              <p className="text-gray-700 leading-relaxed text-[17px]">{s.p}</p>
            </section>
          ))}

          <section className="mt-14">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-sv-dark mb-5">Frequently asked questions</h2>
            <div className="space-y-4">
              {page.faqs.map((f) => (
                <div key={f.q} className="bg-white rounded-xl shadow-card p-5">
                  <h3 className="font-semibold text-sv-dark mb-1.5">{f.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14 bg-sv-red text-white rounded-2xl p-8 text-center">
            <h2 className="font-display text-2xl font-bold">Planning an event?</h2>
            <p className="mt-2 text-white/85">Tell us the date, numbers and venue and we will send a menu and quote.</p>
            <Link href="/#contact" className="inline-block mt-5 bg-white text-sv-red font-bold px-7 py-3 rounded-full hover:bg-gray-100 transition-colors">Request a Quote</Link>
          </section>

          <section className="mt-14">
            <h2 className="font-display text-xl font-bold text-sv-dark mb-4">{GROUP_TITLE[page.group]}</h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {related.map((p) => (
                <Link key={p.slug} href={`/${p.slug}`} className="px-4 py-2 rounded-full bg-white border border-sv-border text-sm font-medium text-sv-dark hover:border-sv-red hover:text-sv-red transition-colors">{p.label}</Link>
              ))}
            </div>
            <h2 className="font-display text-xl font-bold text-sv-dark mb-4">More from Spice Village</h2>
            <div className="flex flex-wrap gap-2">
              {others.map((p) => (
                <Link key={p.slug} href={`/${p.slug}`} className="px-4 py-2 rounded-full bg-white border border-sv-border text-sm font-medium text-sv-dark hover:border-sv-red hover:text-sv-red transition-colors">{p.label}</Link>
              ))}
            </div>
          </section>
        </div>
      </article>

      <Footer />
      <WhatsApp />
    </main>
  );
}
