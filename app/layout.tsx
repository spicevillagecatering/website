import type { Metadata, Viewport } from 'next';
import { SITE, SITE_URL, BRANCHES, FAQS } from './lib/site';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#7a1010',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Spice Village Catering | South Indian Catering Dublin — Weddings, Events & Parties',
    template: '%s | Spice Village Catering',
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    'South Indian catering Dublin', 'Indian catering Dublin', 'wedding catering Dublin', 'Kerala catering Ireland',
    'corporate catering Dublin', 'birthday party catering', 'Holy Communion catering', 'biryani catering Dublin',
    'Indian caterer Clondalkin', 'Indian caterer Lucan', 'Indian caterer Naas', 'Indian caterer Rialto', 'Spice Village', 'catering Ireland', 'Indian catering Ireland', 'South Indian food Dublin', 'caterer near me Dublin',
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: '/', languages: { 'en-IE': '/' } },
  other: {
    'geo.region': 'IE-D',
    'geo.placename': 'Dublin, Ireland',
    'geo.position': '53.3309234;-6.3948285',
    ICBM: '53.3309234, -6.3948285',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    title: 'Spice Village Catering | Authentic South Indian Catering in Dublin',
    description: SITE.description,
    url: '/',
    type: 'website',
    locale: 'en_IE',
    siteName: SITE.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Spice Village Catering — authentic South Indian catering' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spice Village Catering | South Indian Catering Dublin',
    description: SITE.description,
    images: ['/og-image.png'],
  },
  formatDetection: { telephone: true, email: true, address: true },
};

/* Structured data — one @graph: organisation, each branch, website, FAQ */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE.name,
      inLanguage: 'en-IE',
      publisher: { '@id': `${SITE_URL}/#org` },
    },
    {
      '@type': ['CateringBusiness', 'FoodEstablishment'],
      '@id': `${SITE_URL}/#org`,
      name: SITE.name,
      url: SITE_URL,
      logo: `${SITE_URL}/logo-color.png`,
      image: `${SITE_URL}/og-image.png`,
      description: SITE.description,
      email: SITE.email,
      telephone: SITE.phone,
      servesCuisine: ['South Indian', 'Indian', 'Kerala'],
      priceRange: '€€',
      areaServed: [
        { '@type': 'City', name: 'Dublin', containedInPlace: { '@type': 'Country', name: 'Ireland' } },
        ...['Clondalkin', 'Lucan', 'Rialto', 'Naas', 'County Kildare'].map((n) => ({ '@type': 'Place', name: n })),
      ],
      sameAs: SITE.social,
      hasMenu: `${SITE_URL}/#menu`,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '09:00',
        closes: '22:00',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: BRANCHES[0].street,
        addressLocality: 'Clondalkin',
        addressRegion: 'Dublin',
        postalCode: BRANCHES[0].postal,
        addressCountry: 'IE',
      },
      geo: { '@type': 'GeoCoordinates', latitude: BRANCHES[0].geo!.lat, longitude: BRANCHES[0].geo!.lng },
      department: BRANCHES.map((b) => ({
        '@type': 'CateringBusiness',
        name: `${SITE.name} — ${b.name}`,
        telephone: b.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: b.street,
          addressLocality: b.locality,
          ...(b.postal ? { postalCode: b.postal } : {}),
          addressCountry: 'IE',
        },
      })),
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
