'use client';

import { useEffect, useRef, useState } from 'react';

/* ─────────────────────────────────────────────────────────────────
   Menu Section — on-page display only
───────────────────────────────────────────────────────────────── */

type MenuItem  = { name: string; veg: boolean };
type ComboGroup = { base: string; options: string[] };

type Category = {
  id:          string;
  title:       string;
  emoji:       string;
  accent:      string;
  items?:      MenuItem[];
  combos?:     ComboGroup[];
  fullWidth?:  boolean;
};

const CATEGORIES: Category[] = [
  {
    id: 'starters',
    title: 'Starters',
    emoji: '🍗',
    accent: '#B22222',
    items: [
      { name: 'Beef Cutlet',       veg: false },
      { name: 'Chicken 65',        veg: false },
      { name: 'Chicken Tikka',     veg: false },
      { name: 'Chicken Lollipop',  veg: false },
      { name: 'Chilly Paneer',     veg: true  },
      { name: 'Gobi Manchurian',   veg: true  },
    ],
  },
  {
    id: 'salads',
    title: 'Salads',
    emoji: '🥗',
    accent: '#111111',
    items: [
      { name: 'Fattoush Salad',    veg: true },
      { name: 'Greek Salad',       veg: true },
      { name: 'Fruit Salad',       veg: true },
      { name: 'Mixed Veg Salad',   veg: true },
    ],
  },
  {
    id: 'kids',
    title: 'For Kids',
    emoji: '🧒',
    accent: '#E11D2E',
    items: [
      { name: 'Chicken Nuggets',     veg: false },
      { name: 'Tuna Sandwich',       veg: false },
      { name: 'Egg Sandwich',        veg: false },
      { name: 'Cheese Sandwich',     veg: true  },
      { name: 'Mix Slider Sandwich', veg: false },
    ],
  },
  {
    id: 'breads',
    title: 'Breads',
    emoji: '🫓',
    accent: '#8B0000',
    items: [
      { name: 'Appam',      veg: true },
      { name: 'Paratha',    veg: true },
      { name: 'Idiyappam',  veg: true },
      { name: 'Naan',       veg: true },
    ],
  },
  {
    id: 'main',
    title: 'Main Course',
    emoji: '🍛',
    accent: '#B22222',
    items: [
      { name: 'Chicken Biryani',    veg: false },
      { name: 'Chicken Fried Rice', veg: false },
      { name: 'Chicken Mandhi',     veg: false },
      { name: 'Chicken Kansa',      veg: false },
      { name: 'Mutton Biryani',     veg: false },
    ],
  },
  {
    id: 'dessert',
    title: 'Dessert',
    emoji: '🍮',
    accent: '#7a1010',
    items: [
      { name: 'Mango Pudding',       veg: true },
      { name: 'Gulab Jamun',         veg: true },
      { name: 'Variety of Payasam',  veg: true },
    ],
  },
  {
    id: 'combo',
    title: 'Combo Meals',
    emoji: '🍱',
    accent: '#111111',
    fullWidth: true,
    combos: [
      {
        base: 'Appam with',
        options: ['Chicken Stew', 'Beef Stew', 'Mutton Curry', 'Pork Stew', 'Beef Roast'],
      },
      {
        base: 'Fried Rice with',
        options: ['Chicken Roast', 'Pork Roast', 'Beef Roast', 'Chilli Chicken'],
      },
    ],
  },
];

/* ─── Veg marker: hollow = vegetarian, filled red = non-vegetarian ── */
function VegDot({ veg }: { veg: boolean }) {
  return (
    <span
      className={`inline-block w-2.5 h-2.5 rounded-full shrink-0 transition-transform duration-300 group-hover/item:scale-150 ${
        veg ? 'border-[1.5px] border-white/80' : 'bg-sv-red shadow-[0_0_8px_rgba(225,29,46,.8)]'
      }`}
      title={veg ? 'Vegetarian' : 'Non-Vegetarian'}
    />
  );
}

/* One-shot in-view flag for staggered CSS reveals */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

/* ─── Menu row (no card — just type, lines and motion) ────────── */
function MenuRow({ cat, index }: { cat: Category; index: number }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const num = String(index + 1).padStart(2, '0');

  return (
    <div ref={ref} className="relative py-10 md:py-14">
      {/* animated divider */}
      <span
        className={`absolute top-0 left-0 h-px w-full origin-left bg-gradient-to-r from-sv-red via-white/20 to-transparent transition-transform duration-[1400ms] ease-out ${
          shown ? 'scale-x-100' : 'scale-x-0'
        }`}
      />

      <div className="lg:flex lg:gap-16">
        {/* Title column */}
        <div
          className={`lg:w-[34%] mb-8 lg:mb-0 lg:self-start lg:sticky lg:top-28 transition-all duration-1000 ease-out ${
            shown ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <span
            className="block font-display text-7xl md:text-8xl font-bold leading-none select-none"
            style={{ WebkitTextStroke: '1.5px rgba(225,29,46,.75)', color: 'transparent' }}
          >
            {num}
          </span>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 tracking-tight">
            {cat.title}
          </h3>
          <p className="mt-3 text-[13px] uppercase tracking-[0.2em] text-sv-red font-semibold">
            {cat.items!.length} dishes
          </p>
          <span className="block mt-4 h-0.5 w-14 bg-sv-red" />
        </div>

        {/* Items column */}
        <ul className="lg:flex-1 grid sm:grid-cols-2 gap-x-12">
          {cat.items!.map((item, i) => (
            <li
              key={item.name}
              style={{ transitionDelay: shown ? `${150 + i * 70}ms` : '0ms' }}
              className={`group/item relative flex items-center gap-4 py-4 px-2 -mx-2 rounded-lg border-b border-white/15 cursor-default hover:bg-white/[0.04] transition-all duration-700 ease-out hover:border-sv-red/70 ${
                shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
            >
              <VegDot veg={item.veg} />
              <span className="text-[18px] md:text-[19px] font-medium tracking-[0.01em] text-white/95 group-hover/item:text-white group-hover/item:translate-x-2 transition-all duration-300">
                {item.name}
              </span>
              <span className="ml-auto text-sv-red opacity-0 -translate-x-3 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-300">
                →
              </span>
              <span className="absolute left-0 -bottom-px h-px w-0 bg-sv-red group-hover/item:w-full transition-all duration-500" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ─── Combos ──────────────────────────────────────────────────── */
function ComboRow({ cat, index }: { cat: Category; index: number }) {
  const { ref, shown } = useInView<HTMLDivElement>();
  const num = String(index + 1).padStart(2, '0');

  return (
    <div ref={ref} className="relative py-10 md:py-14">
      <span
        className={`absolute top-0 left-0 h-px w-full origin-left bg-gradient-to-r from-sv-red via-white/20 to-transparent transition-transform duration-[1400ms] ease-out ${
          shown ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
      <div className="lg:flex lg:gap-16">
        <div
          className={`lg:w-[34%] mb-8 lg:mb-0 transition-all duration-1000 ease-out ${
            shown ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <span
            className="block font-display text-7xl md:text-8xl font-bold leading-none select-none"
            style={{ WebkitTextStroke: '1px rgba(225,29,46,.55)', color: 'transparent' }}
          >
            {num}
          </span>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-white mt-3 tracking-tight">{cat.title}</h3>
          <span className="block mt-4 h-0.5 w-14 bg-sv-red" />
        </div>

        <div className="lg:flex-1 grid sm:grid-cols-2 gap-10">
          {cat.combos!.map((group, gi) => (
            <div
              key={group.base}
              style={{ transitionDelay: shown ? `${200 + gi * 200}ms` : '0ms' }}
              className={`transition-all duration-1000 ease-out ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <p className="font-display text-2xl text-sv-red italic mb-4">{group.base}</p>
              <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[18px] text-white/90 leading-9">
                {group.options.map((opt, i) => (
                  <li key={opt} className="group/item flex items-center gap-2 cursor-default">
                    <span className="hover:text-white hover:-translate-y-0.5 inline-block transition-all duration-300">{opt}</span>
                    {i < group.options.length - 1 && <span className="text-sv-red/70">/</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main export ─────────────────────────────────────────────── */
export default function Menu() {
  const regularCats = CATEGORIES.filter((c) => !c.fullWidth);
  const comboCat    = CATEGORIES.find((c) => c.fullWidth)!;

  return (
    <section id="menu" className="relative overflow-hidden py-24 lg:py-32 bg-[#0a0a0a] text-white">
      {/* ── Red / black atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" data-mouse="26">
        <div className="absolute -top-40 -right-40 w-[640px] h-[640px] rounded-full bg-sv-red/35 blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/2 -left-48 w-[560px] h-[560px] rounded-full bg-[#7a1010]/40 blur-[150px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute -bottom-48 right-1/4 w-[600px] h-[600px] rounded-full bg-sv-orange/20 blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'radial-gradient(ellipse at 50% 30%, black, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 50% 30%, black, transparent 75%)',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-10">
          <div>
            <div className="section-label !text-sv-red">Our Menu</div>
            <h2 className="font-display text-[clamp(2.2rem,4.6vw,4rem)] font-bold text-white leading-[1.05] mt-3">
              Authentic Flavours,<br />
              <span className="text-sv-red italic">Crafted for Every Table</span>
            </h2>
            <p className="text-white/80 text-[17px] mt-5 max-w-xl leading-relaxed">
              From spicy starters to rich main courses and sweet endings — a celebration of South Indian cuisine.
            </p>
          </div>

        </div>

        {/* ── Legend ── */}
        <div className="flex items-center gap-6 mb-4 text-[13px] uppercase tracking-[0.18em] text-white/75">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full border border-white/70" />Vegetarian</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sv-red" />Non-Vegetarian</span>
        </div>

        {/* ── Menu rows ── */}
        <div>
          {regularCats.map((cat, i) => (
            <MenuRow key={cat.id} cat={cat} index={i} />
          ))}
          <ComboRow cat={comboCat} index={regularCats.length} />
          <div className="h-px w-full bg-gradient-to-r from-sv-red via-white/20 to-transparent" />
        </div>

        {/* ── Bottom note ── */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5">
          <p className="text-white/80 text-[16px] text-center sm:text-left">
            <span className="text-white font-semibold">Custom menus available</span> — tailored to any event size or dietary requirement.
          </p>
          <a
            href="#contact"
            className="group shrink-0 inline-flex items-center gap-2 bg-sv-red hover:bg-white hover:text-sv-dark text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 text-[14px]"
          >
            Request Custom Menu
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}
