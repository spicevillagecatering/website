'use client';

import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '#home',      label: 'Home'      },
  { href: '#about',     label: 'About'     },
  { href: '#services',  label: 'Services'  },
  { href: '#menu',      label: 'Menu'      },
  { href: '#gallery',   label: 'Gallery'   },
  { href: '#locations', label: 'Locations' },
  { href: '#contact',   label: 'Contact'   },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.classList.toggle('nav-open', menuOpen);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-[#7a1010]/95 backdrop-blur-sm shadow-[0_2px_20px_rgba(0,0,0,0.25)]'
            : 'bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        {/* ── Top contact bar ── */}
        <div
          className={`hidden md:block overflow-hidden bg-[#111] text-white/85 text-[13.5px] transition-all duration-400 ${
            scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-10 flex items-center justify-center gap-x-6 whitespace-nowrap">
            <a href="https://wa.me/353858189052" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sv-red transition-colors">
              <svg className="w-4 h-4 text-sv-red" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              085 818 9052
            </a>
            <a href="tel:+35314130573" className="flex items-center gap-2 hover:text-sv-red transition-colors">
              <svg className="w-4 h-4 text-sv-red" fill="currentColor" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" /></svg>
              01 413 0573
            </a>
            <span className="text-white/25">|</span>
            <a href="mailto:info@spicevillagecatering.ie" className="flex items-center gap-2 hover:text-sv-red transition-colors">
              <svg className="w-4 h-4 text-sv-red" fill="currentColor" viewBox="0 0 24 24"><path d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 17.5v-11zm2.2-.2L12 12l7.8-5.7a.5.5 0 00-.3-.1h-15a.5.5 0 00-.3.1z"/></svg>
              info@spicevillagecatering.ie
            </a>
            <a href="mailto:spicevillagecatering22@gmail.com" className="hidden lg:flex items-center gap-2 hover:text-sv-red transition-colors">
              <svg className="w-4 h-4 text-sv-red" fill="currentColor" viewBox="0 0 24 24"><path d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 012 17.5v-11zm2.2-.2L12 12l7.8-5.7a.5.5 0 00-.3-.1h-15a.5.5 0 00-.3.1z"/></svg>
              spicevillagecatering22@gmail.com
            </a>
            <span className="hidden lg:inline text-white/25">|</span>
            <span className="hidden lg:inline text-white/55">Follow Us:</span>
            <a href="https://www.instagram.com/spicevillage_catering/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-sv-red hover:scale-110 transition-all">
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="https://www.facebook.com/spicevillagecatering" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-sv-red hover:scale-110 transition-all">
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M13.5 22v-8h2.7l.5-3.3h-3.2V8.6c0-.9.4-1.7 1.8-1.7h1.5V4.100S15.600 3.900 14.400 3.900c-2.500 0-4.100 1.500-4.100 4.200v2.600H7.600V14h2.700v8h3.200z"/></svg>
            </a>
          </div>
        </div>

        <div className={`max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>

          {/* ── Logo ── */}
          <a href="#home" onClick={closeMenu} className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-white.png"
              alt="Spice Village Catering"
              className="h-16 md:h-20 w-auto object-contain transition-all"
            />
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[16px] font-medium tracking-wide relative group transition-colors text-white hover:text-sv-orange"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-sv-orange rounded-full transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+353858189052"
              className="hidden md:flex items-center gap-1.5 text-[16px] font-medium transition-colors text-white hover:text-sv-orange"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
              </svg>
              +353 85 818 9052
            </a>

            <a
              href="#contact"
              className="hidden lg:inline-flex items-center bg-sv-orange hover:bg-red-700 text-white text-[15px] font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-red"
            >
              Book Catering
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                'hover:bg-white/10'
              }`}
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span
                  className={`block h-[1.5px] w-full transition-all duration-300 origin-center ${
                    'bg-white'
                  } ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}
                />
                <span
                  className={`block h-[1.5px] w-full transition-all duration-300 ${
                    'bg-white'
                  } ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
                />
                <span
                  className={`block h-[1.5px] w-full transition-all duration-300 origin-center ${
                    'bg-white'
                  } ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Panel ── */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-350 ${
            menuOpen ? 'max-h-[480px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white border-t border-sv-border px-6 py-4">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className="flex items-center justify-between py-3.5 text-gray-700 hover:text-sv-red font-medium border-b border-gray-50 last:border-0 transition-colors text-[15px]"
              >
                {l.label}
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}
            <div className="mt-5 space-y-3">
              <a
                href="#contact"
                onClick={closeMenu}
                className="block text-center bg-sv-red hover:bg-red-800 text-white font-semibold py-3.5 rounded-full transition-colors text-[15px]"
              >
                Book Catering
              </a>
              <a
                href="tel:+353858189052"
                className="flex items-center justify-center gap-2 text-sv-dark font-medium py-2.5 text-sm"
              >
                <svg className="w-4 h-4 text-sv-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
                </svg>
                +353 85 818 9052
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
