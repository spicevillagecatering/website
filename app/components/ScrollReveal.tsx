'use client';

import { useEffect } from 'react';

/*
  Scroll animations, kept cheap:
  - IntersectionObserver reveals (fade + slide / zoom), staggered, one-shot
  - one rAF-throttled passive scroll listener drives the progress bar,
    hero video parallax and background-blob parallax (transform only)
*/
const HEADERS = 'section h2, section .section-label';
const GRID_ITEMS = 'section .grid > *, section .columns-1 > *';

type Variant = 'up' | 'left' | 'right' | 'zoom';

export default function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const bar = document.getElementById('scroll-progress');
    const vh = window.innerHeight;
    const notHero = (el: Element) =>
      !el.closest('#home') && !(el.closest('#menu') && !el.matches('h2, .section-label')); // menu animates itself
    const below = (el: Element) => el.getBoundingClientRect().top > vh * 0.92;

    /* ── Reveal setup ── */
    const picked = new Map<HTMLElement, Variant>();
    const stagger = new Map<HTMLElement, number>();

    document.querySelectorAll<HTMLElement>(HEADERS).forEach((el) => picked.set(el, 'up'));

    document.querySelectorAll<HTMLElement>(GRID_ITEMS).forEach((el) => {
      const parent = el.parentElement!;
      const kids = Array.from(parent.children);
      const idx = kids.indexOf(el);
      const cols = parent.classList.contains('lg:grid-cols-2') && kids.length === 2;
      if (cols) {
        picked.set(el, idx === 0 ? 'left' : 'right'); // two-column splits slide in from the sides
      } else {
        picked.set(el, idx % 2 === 0 ? 'up' : 'zoom');
        stagger.set(el, (idx % 4) * 110);
      }
    });

    const els = Array.from(picked.keys()).filter((el) => notHero(el) && below(el));
    // skip children whose ancestor is also animated (avoid double motion)
    const final = els.filter((el) => !els.some((o) => o !== el && o.contains(el)));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          el.classList.add('reveal-in');
          io.unobserve(el);
          // release will-change + stagger delay so hover transitions stay snappy
          window.setTimeout(() => {
            el.classList.remove('reveal');
            el.removeAttribute('data-reveal');
            el.style.transitionDelay = '';
          }, 1600 + (stagger.get(el) ?? 0));
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );

    final.forEach((el) => {
      el.classList.add('reveal');
      el.setAttribute('data-reveal', picked.get(el)!);
      const d = stagger.get(el);
      if (d) el.style.transitionDelay = `${d}ms`;
      io.observe(el);
    });

    /* ── Parallax targets ── */
    const heroVideo = document.querySelector<HTMLElement>('#home video');
    const blobs: { el: HTMLElement; sec: HTMLElement; speed: number }[] = [];
    document.querySelectorAll<HTMLElement>('section > div[aria-hidden="true"]').forEach((wrap) => {
      const sec = wrap.parentElement as HTMLElement;
      wrap.querySelectorAll<HTMLElement>('div[class*="blur-"], div[class*="rounded-full"][class*="border"]').forEach((el, i) => {
        blobs.push({ el, sec, speed: (i % 2 ? -1 : 1) * (0.06 + (i % 3) * 0.04) });
      });
    });

    const visible = new Set<HTMLElement>();
    const secIO = new IntersectionObserver((entries) => {
      entries.forEach((e) =>
        e.isIntersecting ? visible.add(e.target as HTMLElement) : visible.delete(e.target as HTMLElement),
      );
    });
    new Set(blobs.map((b) => b.sec)).forEach((s) => secIO.observe(s));

    /* ── One rAF-throttled scroll loop ── */
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;

      if (heroVideo && y < window.innerHeight * 1.2) {
        heroVideo.style.transform = `translate3d(0, ${Math.min(y * 0.12, 36)}px, 0) scale(1.1)`;
      }
      blobs.forEach(({ el, sec, speed }) => {
        if (!visible.has(sec)) return;
        const r = sec.getBoundingClientRect();
        el.style.transform = `translate3d(0, ${(r.top + r.height / 2 - window.innerHeight / 2) * speed}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      io.disconnect();
      secIO.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return <div id="scroll-progress" aria-hidden="true" />;
}
