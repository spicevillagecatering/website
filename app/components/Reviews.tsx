/* Customer Review Videos + Written Testimonials */

const VIDEO_SLOTS = [
  {
    id: 'v1',
    platform: 'YouTube',
    title: 'Wedding Catering Review',
    reviewer: 'Sarah & James',
    date: 'March 2025',
    gradient: 'linear-gradient(145deg, #1a0a0a 0%, #2d1010 100%)',
    platformColor: '#E11D2E',
    /* Replace src with actual YouTube embed URL */
    embedUrl: '',
  },
  {
    id: 'v2',
    platform: 'Instagram',
    title: 'Birthday Party Feedback',
    reviewer: 'Priya M.',
    date: 'April 2025',
    gradient: 'linear-gradient(145deg, #1a0a0a 0%, #2d1010 100%)',
    platformColor: '#B22222',
    embedUrl: '',
  },
  {
    id: 'v3',
    platform: 'TikTok',
    title: 'Corporate Event Review',
    reviewer: 'Dublin Tech Co.',
    date: 'May 2025',
    gradient: 'linear-gradient(145deg, #0a0a0a 0%, #1a1010 100%)',
    platformColor: '#B22222',
    embedUrl: '',
  },
  {
    id: 'v4',
    platform: 'YouTube',
    title: 'Holy Communion Catering',
    reviewer: 'Murphy Family',
    date: 'February 2025',
    gradient: 'linear-gradient(145deg, #0a0a0a 0%, #1a1010 100%)',
    platformColor: '#E11D2E',
    embedUrl: '',
  },
];

const TESTIMONIALS = [
  {
    name: 'Aisha R.',
    event: 'Wedding Reception — 200 Guests',
    stars: 5,
    text: 'Spice Village made our wedding day absolutely perfect. The food was exceptional — every single guest complimented the biryani and curries. The team was professional, punctual and incredibly helpful from start to finish.',
    avatar: 'A',
    color: '#B22222',
  },
  {
    name: 'Declan O\'Brien',
    event: 'Corporate Dinner — 80 Guests',
    stars: 5,
    text: 'We have used Spice Village for three consecutive company events now. Consistently outstanding food quality, impeccable presentation and a team that goes above and beyond every single time. Highly recommended.',
    avatar: 'D',
    color: '#111111',
  },
  {
    name: 'Meera & Arjun',
    event: 'Family Gathering — 60 Guests',
    stars: 5,
    text: 'The authentic South Indian food brought back so many memories of home. Guests could not stop talking about the flavours. The service was seamless and the team cleaned up beautifully. 10 out of 10!',
    avatar: 'M',
    color: '#111111',
  },
];

/* Platform icon SVGs */
function PlatformIcon({ platform, color }: { platform: string; color: string }) {
  if (platform === 'YouTube') {
    return (
      <svg className="w-5 h-5" fill={color} viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (platform === 'Instagram') {
    return (
      <svg className="w-5 h-5" fill={color} viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    );
  }
  /* TikTok */
  return (
    <svg className="w-5 h-5" fill={color} viewBox="0 0 24 24">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.21 8.21 0 004.79 1.52V6.76a4.85 4.85 0 01-1.03-.07z" />
    </svg>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="section-label justify-center">Customer Stories</div>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold text-sv-dark leading-tight mt-2 mb-4">
            Hear From Our<br />
            <span className="text-sv-red">Happy Customers</span>
          </h2>
          <p className="text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed">
            Real people, real celebrations, real reactions. Our customers share their Spice Village experience.
          </p>
        </div>

        {/* ── Video Review Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {VIDEO_SLOTS.map((v) => (
            <div
              key={v.id}
              className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
              style={{ aspectRatio: '9/16' }}
            >
              {/*
                TO ADD A VIDEO:
                Option A — YouTube embed:
                  <iframe
                    src="https://www.youtube.com/embed/VIDEO_ID"
                    title={v.title}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                Option B — Thumbnail + link:
                  <Image src="/images/review-thumbnail-1.jpg" alt={v.title} fill className="object-cover" />

                Remove the placeholder div once you embed.
              */}
              {/* Placeholder thumbnail */}
              <div
                className="absolute inset-0 img-ph"
                style={{ background: v.gradient }}
              >
                <span>Video Thumbnail<br />Vertical (9:16)</span>
              </div>

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              {/* Platform badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1.5 rounded-full">
                <PlatformIcon platform={v.platform} color={v.platformColor} />
                <span className="text-white text-[11px] font-medium">{v.platform}</span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-[13px] leading-snug">{v.title}</p>
                <p className="text-white/70 text-[11px] mt-0.5">{v.reviewer} · {v.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Written Testimonials ── */}
        <div className="bg-sv-warm rounded-3xl p-6 md:p-10">
          <h3 className="font-display text-xl md:text-2xl font-bold text-sv-dark text-center mb-8">
            What Our Clients Say
          </h3>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.stars)].map((_, s) => (
                    <svg key={s} className="w-4 h-4 text-sv-orange" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-600 text-[13px] leading-relaxed mb-5 italic">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Reviewer */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                    style={{ backgroundColor: t.color }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sv-dark text-sm">{t.name}</p>
                    <p className="text-gray-400 text-[11px]">{t.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://www.google.com/search?q=Spice+Village+Catering+Dublin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-sv-border hover:border-sv-orange text-gray-700 hover:text-sv-orange font-medium px-6 py-3 rounded-full transition-all text-[13px]"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#B22222"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#111111"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#E11D2E"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#B22222"/>
              </svg>
              Read All Google Reviews
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
