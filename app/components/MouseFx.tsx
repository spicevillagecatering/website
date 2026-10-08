'use client';

import { useEffect, useRef } from 'react';

/*
  Pointer-reactive effects (desktop only, rAF-driven, transform/opacity only):
  - soft red glow + trailing ring follow the cursor; ring grows over links/buttons
  - background layers marked [data-mouse] drift opposite to the pointer (depth)
  - .service-card and .gallery-cell tilt toward the pointer
*/
export default function MouseFx() {
  const glow = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const dot  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduce) return;

    const layers = Array.from(document.querySelectorAll<HTMLElement>('[data-mouse]'));
    const depth = layers.map((l) => Number(l.dataset.mouse) || 22);

    let tx = window.innerWidth / 2, ty = window.innerHeight / 2; // target
    let gx = tx, gy = ty, rx = tx, ry = ty;                       // eased
    let raf = 0, active = false, hovering = false;

    const loop = () => {
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;

      if (glow.current) glow.current.style.transform = `translate3d(${gx - 300}px, ${gy - 300}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0) scale(${hovering ? 1.9 : 1})`;
      if (dot.current)  dot.current.style.transform  = `translate3d(${tx - 3}px, ${ty - 3}px, 0)`;

      const nx = tx / window.innerWidth - 0.5, ny = ty / window.innerHeight - 0.5;
      layers.forEach((l, i) => {
        const r = l.parentElement!.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        l.style.transform = `translate3d(${-nx * depth[i]}px, ${-ny * depth[i]}px, 0) scale(1.08)`;
      });

      raf = requestAnimationFrame(loop);
    };

    const start = () => { if (!active) { active = true; raf = requestAnimationFrame(loop); } };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX; ty = e.clientY;
      const t = e.target as Element | null;
      hovering = !!t?.closest('a, button, input, textarea, select, [role="button"]');
      [glow, ring, dot].forEach((r) => r.current && (r.current.style.opacity = '1'));
      start();
    };
    const onLeave = () => {
      [glow, ring, dot].forEach((r) => r.current && (r.current.style.opacity = '0'));
    };

    /* tilt */
    const tilt = (e: PointerEvent) => {
      const card = (e.target as Element).closest<HTMLElement>('.service-card, .gallery-cell');
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-6px)`;
    };
    const untilt = (e: PointerEvent) => {
      const card = (e.target as Element).closest<HTMLElement>('.service-card, .gallery-cell');
      if (card && !card.contains(e.relatedTarget as Node)) card.style.transform = '';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointermove', tilt, { passive: true });
    document.addEventListener('pointerout', untilt, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointermove', tilt);
      document.removeEventListener('pointerout', untilt);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      layers.forEach((l) => (l.style.transform = ''));
    };
  }, []);

  const base = 'fixed top-0 left-0 pointer-events-none opacity-0 transition-opacity duration-300 will-change-transform hidden [@media(pointer:fine)]:block';
  return (
    <>
      <div ref={glow} aria-hidden="true" className={`${base} z-[5] w-[600px] h-[600px] rounded-full mix-blend-multiply`}
        style={{ background: 'radial-gradient(circle, rgba(225,29,46,.16) 0%, rgba(225,29,46,0) 62%)' }} />
      <div ref={ring} aria-hidden="true" className={`${base} z-[70] w-10 h-10 rounded-full border border-sv-red/70 transition-[opacity,scale]`} />
      <div ref={dot}  aria-hidden="true" className={`${base} z-[70] w-1.5 h-1.5 rounded-full bg-sv-red`} />
    </>
  );
}
