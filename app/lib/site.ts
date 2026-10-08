export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.spicevillagecatering.ie').replace(/\/$/, '');

export const SITE = {
  name: 'Spice Village Catering',
  tagline: 'Authentic South Indian Catering in Dublin',
  description:
    'Spice Village Catering serves authentic South Indian food in Dublin, Ireland for weddings, corporate events, birthdays, Holy Communions and family gatherings across Dublin, Clondalkin, Lucan, Rialto and Naas. Over 16 years and 5,000+ events catered.',
  email: 'info@spicevillagecatering.ie',
  phone: '+353858189052',
  social: [
    'https://www.facebook.com/spicevillagecatering',
    'https://www.instagram.com/spicevillage_catering/',
  ],
};

export const BRANCHES = [
  { id: 'clondalkin', name: 'Clondalkin', street: 'C4 Station Rd Business Park, Crag Ave', locality: 'Clondalkin, Dublin 22', postal: 'D22 DX52', phone: '+353858189052', geo: { lat: 53.3309234, lng: -6.3948285 } },
  { id: 'lucan', name: 'Lucan', street: 'Unit 1 Fonthill Retail Park', locality: 'Lucan, Dublin 22', postal: undefined, phone: '+35314130573' },
  { id: 'rialto', name: 'Rialto', street: 'Above The Bird Flanagan Pub, 471 South Circular Rd', locality: 'Rialto, Dublin 8', postal: 'D08 W56A', phone: '+35315635282' },
  { id: 'naas', name: 'Naas', street: 'Wolfe Tone St, Naas West', locality: 'Naas, Co. Kildare', postal: 'W91 VK52', phone: '+35345889505' },
];

export const FAQS = [
  {
    q: 'What kind of food does Spice Village Catering serve?',
    a: 'We specialise in authentic South Indian cuisine — starters, breads such as appam, paratha and idiyappam, biryani and main courses, salads, kids’ options and desserts like payasam and gulab jamun. See the full list in our Menu section.',
  },
  {
    q: 'What events do you cater for?',
    a: 'Weddings and receptions, corporate events and office lunches, birthday parties, family gatherings, outdoor catering, Holy Communions and other special occasions.',
  },
  {
    q: 'Where do you operate?',
    a: 'We have branches in Clondalkin (main branch), Lucan, Rialto in Dublin 8, and Naas in Co. Kildare, and cater for events across Dublin and the surrounding area.',
  },
  {
    q: 'Can the menu be customised for my event?',
    a: 'Yes. We can tailor a menu to your event size, tastes and dietary requirements, including vegetarian and non-vegetarian options. Use the "Request Custom Menu" button or contact us directly.',
  },
  {
    q: 'How do I book catering or get a quote?',
    a: 'Call us on 085 818 9052, message us on WhatsApp, email info@spicevillagecatering.ie or use the booking form on this page, and we will get back to you.',
  },
  {
    q: 'How long has Spice Village been catering?',
    a: 'Over 16 years, with more than 5,000 events catered for families, businesses and communities.',
  },
];
