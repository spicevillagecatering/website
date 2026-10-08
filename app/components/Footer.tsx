const QUICK_LINKS = [
  { href: '#home',      label: 'Home'      },
  { href: '#about',     label: 'About Us'  },
  { href: '#services',  label: 'Services'  },
  { href: '#menu',      label: 'Our Menu'  },
  { href: '#gallery',   label: 'Gallery'   },
  { href: '#locations', label: 'Locations' },
  { href: '#contact',   label: 'Contact'   },
];

const SERVICES_LINKS = [
  'Wedding Catering',
  'Corporate Events',
  'Birthday Parties',
  'Family Gatherings',
  'Outdoor Catering',
  'Holy Communion',
];

const BRANCHES = [
  {
    name: 'Clondalkin (Main)',
    addr: 'C4 Station Rd Business Park, Crag Ave, D22 DX52',
    tel: '+353 85 818 9052',
  },
  {
    name: 'Lucan',
    addr: 'Unit 1 Fonthill Retail Park, Dublin 22',
    tel: '+353 1 413 0573',
  },
  {
    name: 'Rialto',
    addr: '471 South Circular Rd, D08 W56A',
    tel: '+353 1 563 5282',
  },
  {
    name: 'Naas, Co. Kildare',
    addr: 'Wolfe Tone St, Naas West, W91 VK52',
    tel: '045 889 505',
  },
];

const SOCIALS = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/spicevillagecatering',
    icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/spicevillagecatering/',
    icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@spicevillagecatering',
    icon: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@spicevillagecatering',
    icon: <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.21 8.21 0 004.79 1.52V6.76a4.85 4.85 0 01-1.03-.07z" />,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/353858189052',
    icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />,
  },
];

export default function Footer() {
  return (
    <footer className="bg-sv-dark text-gray-300">
      {/* ── Top CTA Band ── */}
      <div className="bg-sv-red py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="font-display text-xl md:text-2xl font-bold text-white">
              Ready to Book Your Catering?
            </h3>
            <p className="text-white/80 text-sm mt-1">
              Call or WhatsApp us today — we&apos;re happy to discuss your event.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="tel:+353858189052"
              className="inline-flex items-center gap-2 bg-white text-sv-red font-bold px-6 py-3 rounded-full text-sm hover:bg-gray-100 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              Call Now
            </a>
            <a
              href="https://wa.me/353858189052"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sv-dark hover:bg-sv-red text-white font-bold px-6 py-3 rounded-full text-sm transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1 — Brand */}
        <div className="lg:col-span-1">
          {/*
            ┌──────────────────────────────────────────────────────────┐
            │  LOGO PLACEHOLDER — replace when you share the file     │
            │                                                          │
            │  Footer needs a WHITE / transparent-bg version.         │
            │  Once you share it, drop it in public/ as               │
            │  logo-white.png, then replace the div below with:       │
            │                                                          │
            │    import Image from 'next/image';                       │
            │    <Image                                                │
            │      src="/logo-white.png"                              │
            │      alt="Spice Village Catering"                       │
            │      width={140} height={56}                            │
            │      className="object-contain mb-4"                    │
            │    />                                                    │
            └──────────────────────────────────────────────────────────┘
          */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full border-2 border-sv-orange/60 flex items-center justify-center shrink-0">
              <span className="font-display font-bold text-sv-orange text-base">SV</span>
            </div>
            <div>
              <p className="font-display font-bold text-white text-base leading-tight">Spice Village</p>
              <p className="text-sv-orange text-[10px] tracking-[0.22em] uppercase font-medium">Catering</p>
            </div>
          </div>
          <p className="text-gray-400 text-[13px] leading-relaxed mb-5">
            Authentic South Indian catering for every celebration — bringing warmth, flavour and hospitality to your events since 2018.
          </p>
          {/* Social icons */}
          <div className="flex gap-2.5 flex-wrap">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-sv-red text-white flex items-center justify-center transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div>
          <h4 className="text-white font-bold text-[13px] uppercase tracking-widest mb-5">Quick Links</h4>
          <ul className="space-y-2.5">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-gray-400 hover:text-sv-orange text-[13px] transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-sv-red shrink-0" />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Services */}
        <div>
          <h4 className="text-white font-bold text-[13px] uppercase tracking-widest mb-5">Our Services</h4>
          <ul className="space-y-2.5">
            {SERVICES_LINKS.map((s) => (
              <li key={s}>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-sv-orange text-[13px] transition-colors flex items-center gap-2"
                >
                  <span className="w-1 h-1 rounded-full bg-sv-orange shrink-0" />
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Locations */}
        <div>
          <h4 className="text-white font-bold text-[13px] uppercase tracking-widest mb-5">Our Locations</h4>
          <div className="space-y-4">
            {BRANCHES.map((b) => (
              <div key={b.name} className="border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <p className="text-sv-orange text-[12px] font-semibold mb-1">{b.name}</p>
                <p className="text-gray-400 text-[12px] leading-snug mb-1">{b.addr}</p>
                <a href={`tel:${b.tel.replace(/\s/g, '')}`} className="text-gray-300 hover:text-sv-orange text-[12px] transition-colors">
                  {b.tel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-[12px]">
            &copy; {new Date().getFullYear()} Spice Village Catering. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-[12px] transition-colors">Privacy Policy</a>
            <span className="text-gray-600">·</span>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-[12px] transition-colors">Terms of Service</a>
            <span className="text-gray-600">·</span>
            <a href="#contact" className="text-gray-500 hover:text-gray-300 text-[12px] transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
