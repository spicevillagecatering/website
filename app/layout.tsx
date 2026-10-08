import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Spice Village Catering | Premium Catering Services Dublin',
  /*
    FAVICON — add once you share the logo files:
    icons: {
      icon:  '/favicon.ico',   (or favicon.png — 32×32)
      apple: '/apple-icon.png' (180×180)
    },
  */
  description:
    'Authentic catering experience for weddings, corporate events, birthday parties and family gatherings. Serving Dublin, Lucan, Rialto and Naas with premium South Indian cuisine.',
  keywords:
    'catering Dublin, wedding catering, corporate catering, Indian catering, birthday catering, Spice Village, Dublin catering service',
  openGraph: {
    title: 'Spice Village Catering',
    description:
      'Premium catering services for all occasions — weddings, parties, corporate events and more.',
    type: 'website',
    locale: 'en_IE',
    siteName: 'Spice Village Catering',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spice Village Catering',
    description: 'Premium authentic catering for all occasions.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
