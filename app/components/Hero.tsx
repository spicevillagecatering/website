'use client';

import { useEffect, useState } from 'react';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-40 pb-24">

      {/* ── Background Image ──────────────────────────────────────
          REPLACE THIS DIV with a real image:
          <Image
            src="/images/hero-banner.jpg"
            alt="Spice Village Catering"
            fill
            priority
            className="object-cover object-center"
          />
          Recommended size: 1920 × 1080 px
      ─────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(145deg, #1a0f07 0%, #2d1810 25%, #1a2510 50%, #0f1a0f 75%, #1a0a0a 100%)',
        }}
      />

      {/* Background video — put the file at public/videos/hero.mp4 (keep it under ~10 MB, muted, 1080p) */}
      <video
        className="absolute left-0 right-0 -top-12 -bottom-12 w-full h-[calc(100%+6rem)] object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75 pointer-events-none" />

      {/* Warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(245,124,0,0.18), transparent 60%)' }}
      />

      {/* Decorative grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Content ── */}
      <div
        className={`relative z-10 text-center px-5 max-w-4xl mx-auto transition-all duration-1000 ease-out ${
          loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Logo badge */}
        <div className="mb-8 flex flex-col items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.png" alt="Spice Village Catering" className="h-40 md:h-52 w-auto object-contain" />
        </div>

        {/* Heading */}
        <h1 className="font-display text-[clamp(2.25rem,6vw,4.75rem)] font-bold text-white leading-[1.08] tracking-tight mb-5">
          Authentic Catering Experience<br />
          <span className="text-sv-orange">by Spice Village</span>
        </h1>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-16 bg-sv-orange/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-sv-orange/70" />
          <div className="h-px w-16 bg-sv-orange/50" />
        </div>

        {/* Subheading */}
        <p className="text-white/80 text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Premium Catering Services for Weddings, Parties,<br className="hidden sm:block" />
          Corporate Events &amp; Family Gatherings
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 bg-sv-red hover:bg-red-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 text-[15px] tracking-wide shadow-red hover:-translate-y-0.5 min-w-[210px]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Book Catering
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white hover:bg-white hover:text-sv-dark font-semibold px-8 py-4 rounded-full transition-all duration-300 text-[15px] tracking-wide min-w-[210px]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            View Services
          </a>
        </div>

        {/* Trust signals */}
        <div className="mt-12 inline-flex flex-wrap justify-center gap-x-8 gap-y-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
          {[
            { icon: '★', value: '5-Star Rated',   color: 'text-sv-orange' },
            { icon: '✓', value: '1000+ Events',   color: 'text-white'  },
            { icon: '📍', value: '4 Locations',    color: 'text-sv-orange' },
            { icon: '🍽', value: 'Authentic Menu', color: 'text-white'  },
          ].map((t) => (
            <div key={t.value} className="flex items-center gap-1.5 text-white/70 text-[13px]">
              <span className={`${t.color} text-base`}>{t.icon}</span>
              <span>{t.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50">
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
