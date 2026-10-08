const FEATURES = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Authentic Flavors',
    desc: 'Traditional recipes crafted with love, premium spices and time-honoured cooking techniques.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Expert Chef Team',
    desc: 'Professional culinary team with decades of combined catering and event hospitality experience.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'End-to-End Service',
    desc: 'From menu planning and setup to service and cleanup — we handle every single detail.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Every Occasion',
    desc: 'Weddings, corporate dinners, parties, communions — no event is too big or too intimate.',
  },
];

const STATS = [
  { number: '6+',   label: 'Years of Service'  },
  { number: '1K+',  label: 'Events Catered'    },
  { number: '4',    label: 'Branch Locations'  },
  { number: '5★',   label: 'Customer Rating'   },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 lg:py-32 bg-sv-warm">
      {/* ── Blurred red graphic background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" data-mouse="24">
        {/* base warm gradient */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, #fff4ec 0%, #fde3dc 45%, #fff1e6 100%)' }} />

        {/* mesh glows */}
        <div className="absolute -top-40 -left-40 w-[620px] h-[620px] rounded-full bg-sv-red/40 blur-[120px] animate-pulse" style={{ animationDuration: '7s' }} />
        <div className="absolute top-1/4 -right-48 w-[560px] h-[560px] rounded-full bg-red-600/30 blur-[130px] animate-pulse" style={{ animationDuration: '9s' }} />
        <div className="absolute -bottom-48 left-1/3 w-[640px] h-[640px] rounded-full bg-[#8b1414]/30 blur-[140px] animate-pulse" style={{ animationDuration: '11s' }} />
        <div className="absolute top-16 right-1/3 w-64 h-64 rounded-full bg-sv-orange/35 blur-[90px]" />
        <div className="absolute bottom-24 -left-20 w-72 h-72 rounded-full bg-sv-orange/25 blur-[100px]" />

        {/* huge faint watermark */}
        <span className="absolute -bottom-10 left-0 right-0 text-center font-display font-bold text-[18vw] leading-none tracking-tight text-sv-red/[0.06] select-none whitespace-nowrap">
          Spice Village
        </span>

        {/* glass rings */}
        <div className="absolute top-20 left-[6%] w-80 h-80 rounded-full border border-sv-red/25 bg-gradient-to-br from-white/40 to-transparent backdrop-blur-[2px]" />
        <div className="absolute bottom-20 right-[5%] w-[26rem] h-[26rem] rounded-full border border-sv-red/20 bg-gradient-to-tl from-white/30 to-transparent backdrop-blur-[2px]" />
        <div className="absolute top-1/2 right-[18%] w-24 h-24 rounded-full border-2 border-dashed border-sv-orange/40" />

        {/* dotted pattern */}
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: 'radial-gradient(#B22222 1.3px, transparent 1.3px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse at 70% 40%, black, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 70% 40%, black, transparent 70%)',
          }}
        />

        {/* wavy top & bottom edges */}
        <svg className="absolute top-0 left-0 w-full h-16 text-white/70" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,0H1440V30C1200,80 960,0 720,30C480,60 240,10 0,50Z" />
        </svg>
        <svg className="absolute bottom-0 left-0 w-full h-16 text-white/70 rotate-180" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,0H1440V30C1200,80 960,0 720,30C480,60 240,10 0,50Z" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

        {/* ── Grid Layout ── */}
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* Left — Image */}
          <div className="relative">
            {/* Main portrait image
                REPLACE with:
                <Image src="/images/about-main.jpg" alt="Spice Village kitchen" fill className="object-cover" />
                Recommended: 800 × 1000 px (4:5 portrait)
            */}
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '4/5', minHeight: '420px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/about-main.jpg" alt="Kerala style rice and curry served in clay pots" className="absolute inset-0 w-full h-full object-cover" />
            </div>

            {/* Floating accent card */}
            <div className="absolute -bottom-5 -right-4 md:-bottom-6 md:-right-6 bg-sv-red text-white p-5 md:p-6 rounded-2xl shadow-xl text-center z-10">
              <p className="font-display text-3xl md:text-4xl font-bold leading-none">6+</p>
              <p className="text-[11px] font-medium mt-1.5 opacity-90 leading-snug uppercase tracking-wider">
                Years of<br />Excellence
              </p>
            </div>

            {/* Secondary image — small square accent
                REPLACE with:
                <Image src="/images/about-food.jpg" alt="Catering food" fill className="object-cover" />
            */}
            <div className="absolute -left-4 top-8 md:-left-6 w-28 h-28 md:w-36 md:h-36 rounded-xl overflow-hidden shadow-card border-4 border-white hidden sm:block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/about-food.jpg" alt="Crispy fried pomfret" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right — Content */}
          <div className="lg:pl-4">
            <div className="section-label">About Us</div>

            <h2 className="font-display text-[clamp(1.9rem,3.5vw,3rem)] font-bold text-sv-dark leading-tight mb-4">
              The Story Behind<br />
              <span className="text-sv-red">Spice Village</span>
            </h2>

            <div className="w-14 h-1 bg-sv-orange rounded-full mb-6" />

            <p className="text-gray-600 text-[15px] md:text-base leading-relaxed mb-4">
              Spice Village Catering was born from a deep passion for authentic South Indian cuisine and a heartfelt desire to bring genuine flavours to every celebration. For over six years, we have been proudly serving the communities of Dublin and beyond with warm hospitality and culinary excellence.
            </p>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-8">
              Whether you are planning a grand wedding reception, an intimate family gathering, or a corporate dinner for hundreds, our team of expert chefs crafts every dish with premium ingredients and traditional techniques — creating memories that linger long after the last bite.
            </p>

            {/* Feature grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {FEATURES.map((f, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-card hover:shadow-card-hover transition-shadow"
                >
                  <div className="shrink-0 w-9 h-9 rounded-lg bg-sv-red/10 text-sv-red flex items-center justify-center">
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sv-dark text-sm">{f.title}</p>
                    <p className="text-gray-500 text-[12px] mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-sv-dark hover:bg-sv-red text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-105 shadow-md text-[14px] tracking-wide"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div className="mt-16 lg:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="text-center py-7 px-4 bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow"
            >
              <p className="font-display text-4xl md:text-5xl font-bold text-sv-red">{s.number}</p>
              <p className="text-gray-500 text-[13px] mt-2 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
