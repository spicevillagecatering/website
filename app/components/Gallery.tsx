/* Gallery uses CSS columns for a true masonry layout — no JS needed. */

const GALLERY_ITEMS = [
  /* Each item: gradient (placeholder colour), label, aspect class */
  {
    id: 1,
    label: 'Ghee Rice',
    hint: '1200 × 800',
    gradient: 'linear-gradient(145deg, #7a1010 0%, #B22222 80%)',
    aspect: 'aspect-video',
  },
  {
    id: 2,
    label: 'Parotta & Beef Roast',
    hint: '800 × 1000',
    gradient: 'linear-gradient(160deg, #111111 0%, #111111 100%)',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 3,
    label: 'Parotta & Fried Chicken',
    hint: '800 × 600',
    gradient: 'linear-gradient(145deg, #B22222 0%, #E11D2E 100%)',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 4,
    label: 'Appam & Egg Curry',
    hint: '1000 × 1000',
    gradient: 'linear-gradient(145deg, #111111 0%, #333333 100%)',
    aspect: 'aspect-square',
  },
  {
    id: 5,
    label: 'Pomfret Fry',
    hint: '1200 × 700',
    gradient: 'linear-gradient(145deg, #8B0000 0%, #E11D2E 100%)',
    aspect: 'aspect-video',
  },
  {
    id: 6,
    label: 'Mutton Curry Meal',
    hint: '800 × 1000',
    gradient: 'linear-gradient(160deg, #111111 0%, #B22222 100%)',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 7,
    label: 'Idli, Vada & Sambar',
    hint: '1200 × 900',
    gradient: 'linear-gradient(145deg, #111111 0%, #B22222 100%)',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 8,
    label: 'Dosa Platter',
    hint: '800 × 800',
    gradient: 'linear-gradient(145deg, #111111 0%, #B22222 100%)',
    aspect: 'aspect-square',
  },
  {
    id: 9,
    label: 'Spicy Dahi Vada',
    hint: '900 × 1100',
    gradient: 'linear-gradient(160deg, #B22222 0%, #8B0000 100%)',
    aspect: 'aspect-[3/4]',
  },
  {
    id: 10,
    label: 'Coconut Chutney',
    hint: '1200 × 800',
    gradient: 'linear-gradient(145deg, #37474F 0%, #78909C 100%)',
    aspect: 'aspect-video',
  },
  {
    id: 11,
    label: 'Banana Fritters',
    hint: '800 × 1000',
    gradient: 'linear-gradient(160deg, #E11D2E 0%, #FFB300 100%)',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 12,
    label: 'Rice & Kerala Curry',
    hint: '900 × 700',
    gradient: 'linear-gradient(145deg, #111111 0%, #B22222 100%)',
    aspect: 'aspect-[4/3]',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="section-label justify-center">Our Gallery</div>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold text-sv-dark leading-tight mt-2 mb-4">
            A Visual Feast of<br />
            <span className="text-sv-red">Memories We&apos;ve Created</span>
          </h2>
          <p className="text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed">
            Every photo tells the story of a celebration we helped make special. Explore our catering events, setups and culinary creations.
          </p>
        </div>

        {/* ── Masonry Grid (CSS columns) ── */}
        {/*
          HOW TO REPLACE PLACEHOLDERS:
          Each .gallery-cell div contains an .img-ph placeholder.
          Replace the inner div with:
            <Image
              src={`/images/gallery-${item.id}.jpg`}
              alt={item.label}
              fill
              className="object-cover"
            />
          Make the parent div `relative` and remove the aspect class from it —
          the image's natural dimensions will drive the height.
        */}
        <div
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
          style={{ columnGap: '16px' }}
        >
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="gallery-cell mb-4 break-inside-avoid"
            >
              <div className="relative w-full rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/images/gallery-${item.id}.jpg`}
                  alt={item.label}
                  loading="lazy"
                  className="w-full h-auto block"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/25 transition-colors duration-300 flex items-end p-3 opacity-0 hover:opacity-100">
                  <span className="text-white text-xs font-semibold tracking-wide bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm mb-4">
            More photos available on our social media pages
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.instagram.com/spicevillage_catering/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-sv-border hover:border-sv-orange text-gray-700 hover:text-sv-orange font-medium px-5 py-2.5 rounded-full transition-all text-[13px]"
            >
              {/* Instagram icon */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Follow on Instagram
            </a>
            <a
              href="https://www.facebook.com/spicevillagecatering"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-sv-border hover:border-sv-red text-gray-700 hover:text-sv-red font-medium px-5 py-2.5 rounded-full transition-all text-[13px]"
            >
              {/* Facebook icon */}
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Like on Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
