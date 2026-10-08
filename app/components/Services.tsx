const SERVICES = [
  {
    id: '01',
    title: 'Wedding Catering',
    desc: 'Elegant catering services for weddings and receptions with authentic flavours and premium presentation for your most special day.',
    gradient: 'linear-gradient(145deg, #7a1010 0%, #B22222 100%)',
    icon: '💍',
    tag: 'Most Popular',
  },
  {
    id: '02',
    title: 'Corporate Events',
    desc: 'Professional catering solutions for office meetings, conferences, product launches and business events of every scale.',
    gradient: 'linear-gradient(145deg, #111111 0%, #333333 100%)',
    icon: '🏢',
    tag: null,
  },
  {
    id: '03',
    title: 'Birthday Parties',
    desc: 'Customised food arrangements for birthday celebrations of all ages and sizes, making every milestone unforgettable.',
    gradient: 'linear-gradient(145deg, #8B0000 0%, #E11D2E 100%)',
    icon: '🎂',
    tag: null,
  },
  {
    id: '04',
    title: 'Family Gatherings',
    desc: 'Traditional and comforting catering for family functions, reunions and private gatherings that feel like home.',
    gradient: 'linear-gradient(145deg, #111111 0%, #B22222 100%)',
    icon: '👨‍👩‍👧‍👦',
    tag: null,
  },
  {
    id: '05',
    title: 'Outdoor Catering',
    desc: 'Full-service outdoor catering setup for festivals, garden parties, open-air events and outdoor celebrations.',
    gradient: 'linear-gradient(145deg, #111111 0%, #B22222 100%)',
    icon: '🌿',
    tag: null,
  },
  {
    id: '06',
    title: 'Special Occasions',
    desc: 'Bespoke catering for anniversaries, engagements, cultural celebrations, and community events with a personal touch.',
    gradient: 'linear-gradient(145deg, #B22222 0%, #E11D2E 100%)',
    icon: '✨',
    tag: null,
  },
  {
    id: '07',
    title: 'Holy Communion',
    desc: 'Traditional and family-focused catering specially arranged for Holy Communion celebrations with warm hospitality.',
    gradient: 'linear-gradient(145deg, #111111 0%, #7a1010 100%)',
    icon: '🕊️',
    tag: null,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <div className="section-label justify-center">Our Services</div>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold text-sv-dark leading-tight mt-2 mb-4">
            Catering for Every<br />
            <span className="text-sv-red">Special Occasion</span>
          </h2>
          <p className="text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed">
            From intimate family dinners to grand wedding banquets, we deliver authentic flavours and flawless presentation for every event.
          </p>
        </div>

        {/* ── Service Cards Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              className={`service-card relative bg-white rounded-2xl overflow-hidden border border-sv-border shadow-card group ${
                /* Make the last card (7th) span 2 cols on lg if odd count */
                i === SERVICES.length - 1 && SERVICES.length % 3 !== 0
                  ? 'lg:col-span-1'
                  : ''
              }`}
            >
              {/* Image placeholder — 16:9 */}
              {/*
                REPLACE the div below with:
                <div className="relative aspect-video">
                  <Image src={`/images/service-${s.id}.jpg`} alt={s.title} fill className="object-cover" />
                </div>
                Recommended: 800 × 450 px per service image
              */}
              <div className="relative aspect-video overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/service-${s.id}.jpg`}
                  alt={s.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Number badge */}
                <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-white/80 text-[11px] font-bold font-display">{s.id}</span>
                </div>
                {/* Tag */}
                {s.tag && (
                  <div className="absolute top-3 right-3 bg-sv-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {s.tag}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 md:p-6">
                <h3 className="font-display font-bold text-[1.125rem] text-sv-dark mb-2 group-hover:text-sv-red transition-colors">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-[13px] leading-relaxed mb-4">{s.desc}</p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-sv-red font-semibold text-[13px] hover:gap-3 transition-all duration-200"
                >
                  Enquire Now
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ── */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Don&apos;t see what you need? We cater for custom events too.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-sv-red hover:bg-red-800 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-red text-[14px] tracking-wide"
          >
            Request a Custom Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
