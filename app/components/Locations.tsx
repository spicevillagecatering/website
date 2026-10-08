const LOCATIONS = [
  {
    id: 'clondalkin',
    name: 'Clondalkin',
    subtitle: 'Main Branch',
    isMain: true,
    address: 'C4 Station Rd Business Park,\nCrag Ave, Clondalkin, Dublin 22',
    eircode: 'D22 DX52',
    phone: '+353 85 818 9052',
    phoneTel: '+353858189052',
    phone2: null,
    phone2Tel: null,
    hours: 'Mon–Sun: 9:00am – 10:00pm',
    gradient: 'linear-gradient(145deg, #B22222 0%, #E11D2E 100%)',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=53.3309234,-6.3948285',
  },
  {
    id: 'lucan',
    name: 'Lucan',
    subtitle: 'Dublin 22',
    isMain: false,
    address: 'Unit 1 Fonthill Retail Park,\nLucan, Dublin 22',
    eircode: null,
    phone: '+353 1 413 0573',
    phoneTel: '+35314130573',
    phone2: null,
    phone2Tel: null,
    hours: 'Mon–Sun: 9:00am – 10:00pm',
    gradient: 'linear-gradient(145deg, #111111 0%, #333333 100%)',
  },
  {
    id: 'rialto',
    name: 'Rialto',
    subtitle: 'Dublin 08',
    isMain: false,
    address: 'Above The Bird Flanagan Pub,\n471 South Circular Rd',
    eircode: 'D08 W56A',
    phone: '+353 1 563 5282',
    phoneTel: '+35315635282',
    phone2: null,
    phone2Tel: null,
    hours: 'Mon–Sun: 9:00am – 10:00pm',
    gradient: 'linear-gradient(145deg, #111111 0%, #B22222 100%)',
  },
  {
    id: 'naas',
    name: 'Naas',
    subtitle: 'Co. Kildare',
    isMain: false,
    address: 'Wolfe Tone St, Naas West,\nCo. Kildare',
    eircode: 'W91 VK52',
    phone: '045 889 505',
    phoneTel: '045889505',
    phone2: null,
    phone2Tel: null,
    hours: 'Mon–Sun: 9:00am – 10:00pm',
    gradient: 'linear-gradient(145deg, #111111 0%, #7a1010 100%)',
  },
];

/* Pin icon */
function PinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function Locations() {
  return (
    <section id="locations" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <div className="section-label justify-center">Find Us</div>
          <h2 className="font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold text-sv-dark leading-tight mt-2 mb-4">
            Our Branch<br />
            <span className="text-sv-red">Locations</span>
          </h2>
          <p className="text-gray-500 text-[15px] max-w-xl mx-auto leading-relaxed">
            Serving the greater Dublin area and Co. Kildare from four convenient locations — always close to you.
          </p>
        </div>

        {/* ── Location Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {LOCATIONS.map((loc) => (
            <div
              key={loc.id}
              className={`relative bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow group ${
                loc.isMain ? 'ring-2 ring-sv-red/30' : ''
              }`}
            >
              {/* Top colour band with map pin */}
              <div
                className="h-28 flex items-center justify-center relative"
                style={{ background: loc.gradient }}
              >
                {/*
                  REPLACE with a location photo:
                  <Image src={`/images/location-${loc.id}.jpg`} alt={loc.name} fill className="object-cover" />
                  then add a dark overlay div on top
                */}
                <PinIcon className="w-12 h-12 text-white/90" />

                {loc.isMain && (
                  <div className="absolute top-3 right-3 bg-white text-sv-red text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Main Branch
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-4">
                  <h3 className="font-display font-bold text-lg text-sv-dark group-hover:text-sv-red transition-colors">
                    {loc.name}
                  </h3>
                  <p className="text-sv-orange text-[12px] font-semibold uppercase tracking-wider">{loc.subtitle}</p>
                </div>

                {/* Address */}
                <div className="flex gap-2.5 mb-3">
                  <PinIcon className="w-4 h-4 text-sv-red shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-600 text-[13px] leading-snug whitespace-pre-line">{loc.address}</p>
                    {loc.eircode && (
                      <p className="text-gray-400 text-[11px] font-medium mt-0.5">{loc.eircode}</p>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-2.5 mb-3">
                  <PhoneIcon className="w-4 h-4 text-sv-red shrink-0 mt-0.5" />
                  <a
                    href={`tel:${loc.phoneTel}`}
                    className="text-gray-600 text-[13px] hover:text-sv-red transition-colors font-medium"
                  >
                    {loc.phone}
                  </a>
                </div>

                {/* Hours */}
                <div className="flex gap-2.5 mb-5">
                  <ClockIcon className="w-4 h-4 text-sv-red shrink-0 mt-0.5" />
                  <p className="text-gray-500 text-[12px]">{loc.hours}</p>
                </div>

                {/* CTA buttons */}
                <div className="flex gap-2">
                  <a
                    href={`tel:${loc.phoneTel}`}
                    className="flex-1 text-center bg-sv-red hover:bg-red-800 text-white text-[12px] font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    Call Now
                  </a>
                  <a
                    href={('mapsUrl' in loc && loc.mapsUrl) || `https://maps.google.com/?q=${encodeURIComponent(loc.address + ' ' + (loc.eircode || ''))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center border border-sv-border hover:border-sv-orange text-gray-600 hover:text-sv-orange text-[12px] font-semibold py-2.5 rounded-xl transition-all"
                  >
                    Directions
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Map (main branch, Clondalkin) ── */}
        <div className="mt-10 rounded-2xl overflow-hidden shadow-card border border-white">
          <iframe
            src="https://www.google.com/maps?q=53.3309234,-6.3948285&z=16&output=embed"
            width="100%"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Spice Village Catering — Clondalkin"
          />
        </div>
      </div>
    </section>
  );
}
