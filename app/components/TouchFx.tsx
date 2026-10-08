'use client';

import { useEffect } from 'react';

/* Touch feedback (phones/tablets): a red ripple + ring burst where you tap,
   and a soft glow that trails the finger while dragging. Pure CSS animation, auto-cleaned. */
export default function TouchFx() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const layer = document.createElement('div');
    layer.setAttribute('aria-hidden', 'true');
    layer.className = 'touch-layer';
    document.body.appendChild(layer);

    const spawn = (cls: string, x: number, y: number, life: number) => {
      const el = document.createElement('span');
      el.className = cls;
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      layer.appendChild(el);
      window.setTimeout(() => el.remove(), life);
    };

    const onDown = (e: PointerEvent) => {
      spawn('touch-ripple', e.clientX, e.clientY, 700);
      spawn('touch-ring', e.clientX, e.clientY, 800);
    };

    let last = 0;
    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - last < 70) return; // throttle trail
      last = now;
      spawn('touch-trail', e.clientX, e.clientY, 600);
    };

    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      layer.remove();
    };
  }, []);

  return null;
}
