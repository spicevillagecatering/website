export type LandingPage = {
  slug: string;
  group: 'service' | 'cuisine' | 'area';
  /** short label for nav/footer/cross-links */
  label: string;
  /** <title> (template appends brand) */
  title: string;
  description: string;
  h1: string;
  intro: string;
  image: string;
  sections: { h: string; p: string }[];
  highlights: string[];
  faqs: { q: string; a: string }[];
};

const BOOK = 'Call 085 818 9052, WhatsApp us or send an enquiry and we will tailor a menu and quote to your event.';

export const PAGES: LandingPage[] = [
  /* ───────────── Services ───────────── */
  {
    slug: 'wedding-catering-dublin',
    group: 'service',
    label: 'Wedding Catering',
    title: 'South Indian Wedding Catering Dublin',
    description:
      'Authentic South Indian wedding catering in Dublin and across Ireland — Kerala-style feasts, biryani, appam and live counters for receptions of every size. Get a quote from Spice Village Catering.',
    h1: 'South Indian Wedding Catering in Dublin',
    intro:
      'From intimate receptions to large celebrations, Spice Village Catering prepares fresh, authentic South Indian wedding menus for couples and families across Dublin, Kildare and the rest of Ireland.',
    image: '/images/service-01.jpg',
    sections: [
      {
        h: 'A wedding menu built around your families',
        p: 'We design every wedding menu with you — vegetarian and non-vegetarian spreads, traditional Kerala dishes, biryani, breads such as appam, paratha and idiyappam, and desserts like payasam. We cater for mixed guest lists so everyone, from grandparents to friends who are new to South Indian food, finds something to love.',
      },
      {
        h: 'Reception, engagement and mehndi events',
        p: 'We cater full wedding days as well as engagement parties, pre-wedding gatherings and receptions. Food is prepared fresh and delivered and set up for your venue, whether that is a hotel, a hall, a marquee or a family home.',
      },
      {
        h: 'Planning with venues across Ireland',
        p: 'We work with venues across Dublin, Kildare and nearby counties. If you are still choosing a venue, ask us — we can advise on what works for hot-food service and numbers.',
      },
    ],
    highlights: ['Custom menus for any guest count', 'Veg and non-veg options', 'Fresh food, delivered and set up', 'Dietary and allergy requirements handled'],
    faqs: [
      { q: 'Do you provide South Indian wedding catering in Dublin?', a: `Yes. We cater weddings, engagements and receptions across Dublin and the surrounding counties with authentic South Indian menus. ${BOOK}` },
      { q: 'Can we customise the wedding menu?', a: 'Yes. Every wedding menu is tailored to your guest numbers, tastes, budget and dietary needs, including vegetarian, vegan and allergy-aware options.' },
      { q: 'How far in advance should we book wedding catering?', a: 'As early as you can — popular weekends fill up. Contact us as soon as your date and venue are confirmed, and we will hold a tasting and menu planning conversation with you.' },
    ],
  },
  {
    slug: 'corporate-catering-dublin',
    group: 'service',
    label: 'Corporate Catering',
    title: 'Corporate & Office Catering Dublin',
    description:
      'Indian corporate and office catering in Dublin — team lunches, meetings, conferences and company events. Fresh South Indian food with vegetarian options, delivered on time.',
    h1: 'Corporate & Office Catering in Dublin',
    intro:
      'Feed your team something better than sandwiches. Spice Village Catering delivers fresh South Indian lunches and event catering to offices, conferences and company events across Dublin.',
    image: '/images/service-02.jpg',
    sections: [
      {
        h: 'Office lunches and team meetings',
        p: 'Hot, flavourful lunch spreads for team meetings, training days and client lunches, delivered ready to serve with the right quantities for your headcount.',
      },
      {
        h: 'Conferences, launches and festive events',
        p: 'Larger events, product launches, cultural days and Diwali or Christmas parties are all catered. We scale menus to your numbers and handle vegetarian, vegan and allergy requirements clearly labelled.',
      },
      {
        h: 'Reliable and easy to book',
        p: 'A single point of contact, clear quotes, and on-time delivery from our Dublin branches. Recurring weekly lunch arrangements are available — just ask.',
      },
    ],
    highlights: ['Delivered across Dublin', 'Clearly labelled dietary options', 'Recurring lunch arrangements', 'Menus scaled to your headcount'],
    faqs: [
      { q: 'Do you deliver office lunches in Dublin?', a: `Yes, we deliver corporate lunches and event catering across Dublin. ${BOOK}` },
      { q: 'Can you cater for vegetarian, vegan and allergy needs?', a: 'Yes. We offer vegetarian and vegan dishes and label them clearly. Tell us about any allergies when you enquire.' },
      { q: 'What is the minimum order for corporate catering?', a: 'It depends on the menu and location. Contact us with your headcount and date and we will confirm availability and a quote.' },
    ],
  },
  {
    slug: 'birthday-party-catering-dublin',
    group: 'service',
    label: 'Birthday Party Catering',
    title: 'Birthday Party Catering Dublin',
    description:
      'Birthday party catering in Dublin — South Indian starters, biryani, kids’ options and desserts for home parties, halls and milestone celebrations. Easy menus, fresh food.',
    h1: 'Birthday Party Catering in Dublin',
    intro:
      'Whether it is a child’s first birthday or a 50th milestone, we bring fresh, generous South Indian food to your party at home, in a hall or at a venue anywhere in Dublin.',
    image: '/images/service-03.jpg',
    sections: [
      {
        h: 'Menus that suit every age',
        p: 'Starters to share, biryani and curries for the adults, mild kids’ options and desserts to finish. We keep menus simple to serve and easy for guests to enjoy.',
      },
      {
        h: 'Home parties and hall hire',
        p: 'We cater house parties, community halls and function rooms. Tell us your numbers and set-up and we will advise on quantities, serving and what to order.',
      },
    ],
    highlights: ['Kids’ friendly options', 'Starters, mains and desserts', 'For homes, halls and venues', 'Flexible group sizes'],
    faqs: [
      { q: 'Do you cater small birthday parties?', a: `Yes — we cater small family parties as well as large celebrations. ${BOOK}` },
      { q: 'Do you have food for children?', a: 'Yes. We include kids’ options and can keep spice levels mild on request.' },
    ],
  },
  {
    slug: 'holy-communion-catering-dublin',
    group: 'service',
    label: 'Holy Communion Catering',
    title: 'Holy Communion & Confirmation Catering Dublin',
    description:
      'Holy Communion and Confirmation catering in Dublin — South Indian buffets, biryani, starters and desserts delivered to your home, hall or venue. Book Spice Village Catering.',
    h1: 'Holy Communion & Confirmation Catering in Dublin',
    intro:
      'Take the stress out of Communion and Confirmation day. We prepare and deliver generous South Indian spreads so you can enjoy the celebration with family and friends.',
    image: '/images/service-04.jpg',
    sections: [
      {
        h: 'Easy, generous buffets',
        p: 'Choose from starters, biryani, curries, breads and desserts. We plan quantities around your guest list so there is plenty for everyone.',
      },
      {
        h: 'Delivered to your home or hall',
        p: 'Food is ready to serve on arrival at your home, parish hall or function room across Dublin and nearby areas such as Clondalkin, Lucan, Rialto and Naas.',
      },
    ],
    highlights: ['Buffets sized to your guest list', 'Home and hall delivery', 'Veg and non-veg options', 'Book early for spring weekends'],
    faqs: [
      { q: 'Do you cater First Holy Communion parties?', a: `Yes. We cater Communion, Confirmation and similar family occasions across Dublin. Spring weekends book up quickly, so enquire early. ${BOOK}` },
    ],
  },
  {
    slug: 'outdoor-catering-dublin',
    group: 'service',
    label: 'Outdoor & Event Catering',
    title: 'Outdoor & Event Catering Dublin',
    description:
      'Outdoor and large-event catering in Dublin and Ireland — festivals, garden parties, community and cultural events with authentic South Indian food.',
    h1: 'Outdoor & Event Catering in Dublin',
    intro:
      'Festivals, garden parties, sports days and community events — we cater large and outdoor gatherings with hot South Indian food, planned around your site and numbers.',
    image: '/images/service-05.jpg',
    sections: [
      {
        h: 'Cultural and community events',
        p: 'We regularly cater cultural celebrations such as Onam, Diwali, Eid, Pongal and association gatherings, as well as school and club events.',
      },
      {
        h: 'Planned around your site',
        p: 'Tell us about the location, power and cover available and we will propose a menu and set-up that works on the day.',
      },
    ],
    highlights: ['Large group catering', 'Cultural and festival menus', 'Site-based planning', 'Serving and set-up support'],
    faqs: [
      { q: 'Can you cater large community events?', a: `Yes. We cater large and outdoor events across Dublin and Kildare. ${BOOK}` },
    ],
  },

  /* ───────────── Cuisine ───────────── */
  {
    slug: 'south-indian-catering-ireland',
    group: 'cuisine',
    label: 'South Indian Catering Ireland',
    title: 'South Indian & Indian Catering Ireland — Dublin, Near Me',
    description:
      'Indian food catering in Dublin and across Ireland — authentic South Indian and Kerala catering, near you. Appam, idiyappam, parotta, biryani, curries and payasam for weddings, parties and events from Dublin-based Spice Village Catering.',
    h1: 'Indian Catering in Dublin & Across Ireland',
    intro:
      'Searching for Indian catering near you? Spice Village Catering has served South Indian food in Ireland for over 16 years and more than 5,000 events. Our kitchens in Dublin and Kildare cook the flavours of Kerala and South India fresh for your celebration.',
    image: '/images/about-food.jpg',
    sections: [
      {
        h: 'What South Indian catering includes',
        p: 'Crisp starters, soft breads like appam, parotta and idiyappam, aromatic biryani, coconut-based curries, vegetarian thalis, fresh salads and traditional desserts such as payasam and gulab jamun.',
      },
      {
        h: 'Serving Dublin, Kildare and beyond',
        p: 'Our branches in Clondalkin, Lucan, Rialto and Naas let us serve Dublin and the surrounding counties. For events further afield, contact us to discuss delivery and set-up.',
      },
      {
        h: 'Fresh and allergy-aware',
        p: 'We prepare food fresh for each event and can adapt menus for vegetarian, vegan and allergy requirements. Tell us about any specific requirements when you enquire.',
      },
    ],
    highlights: ['16+ years of catering', '5,000+ events', 'Kerala and South Indian specialities', 'Four branches'],
    faqs: [
      { q: 'Is there an Indian caterer near me in Dublin?', a: 'Yes. Spice Village Catering has branches in Clondalkin, Lucan, Rialto (Dublin 8) and Naas (Co. Kildare), serving Indian food catering across Dublin. Call 085 818 9052.' },
      { q: 'Do you cater outside Dublin?', a: 'Yes, we regularly cater across Dublin and Co. Kildare and can discuss events in other counties. Contact us with the venue and date.' },
      { q: 'What South Indian dishes can I order?', a: 'Starters, appam, parotta, idiyappam, biryani, meat, fish and vegetarian curries, salads and desserts. See the Menu section for the full list.' },
    ],
  },
  {
    slug: 'onam-sadhya-dublin',
    group: 'cuisine',
    label: 'Onam Sadhya Dublin',
    title: 'Onam Sadhya Dublin, Ireland — Order Kerala Sadya',
    description:
      'Order Onam sadhya in Dublin and across Ireland — a traditional vegetarian Kerala sadya with payasam, for families, associations and community events. Spice Village Catering, Dublin.',
    h1: 'Onam Sadhya in Dublin & Ireland',
    intro:
      'Looking for an Onam sadhya near you? Spice Village Catering prepares a traditional vegetarian Kerala sadhya (sadya) for families, Malayali associations and community events in Dublin and across Ireland.',
    image: '/images/gallery-3.jpg',
    sections: [
      {
        h: 'Onam sadhya near you in Dublin',
        p: 'Our kitchens in Clondalkin, Lucan, Rialto and Naas let us prepare sadhya for Dublin and Co. Kildare. Order for your family, your office or your whole association, and tell us your numbers so we can plan quantities.',
      },
      {
        h: 'Onam sadhya Ireland — associations and community events',
        p: 'Many Malayali associations and cultural groups in Ireland choose us for their Onam celebrations. We can plan a full sadhya with the traditional dishes, accompaniments and payasam, served buffet-style or to suit your venue.',
      },
      {
        h: 'Also for Vishu, weddings and housewarmings',
        p: 'The same traditional sadya is popular for Vishu, weddings, housewarmings and other family celebrations throughout the year. Ask us about custom menus.',
      },
    ],
    highlights: ['Fully vegetarian sadhya', 'Onam, Vishu, weddings', 'Association and group orders', 'Payasam included'],
    faqs: [
      { q: 'Where can I get Onam sadhya in Dublin?', a: `Spice Village Catering prepares Onam sadhya for Dublin and Co. Kildare from our branches in Clondalkin, Lucan, Rialto and Naas. ${BOOK}` },
      { q: 'Do you provide Onam sadhya in Ireland outside Dublin?', a: 'We regularly cater across Dublin and Kildare and can discuss events in other counties. Contact us with the venue, date and numbers.' },
      { q: 'Is sadhya vegetarian?', a: 'Yes, a traditional Kerala sadhya (sadya) is fully vegetarian.' },
      { q: 'How early should I order Onam sadhya?', a: 'Onam weekends fill up quickly, so order as early as you can — ideally several weeks before. Orders from associations and large groups should be placed even earlier.' },
    ],
  },
  {
    slug: 'christmas-catering-dublin',
    group: 'service',
    label: 'Christmas Catering',
    title: 'Christmas Catering Dublin — Indian Festive Menus',
    description:
      'Christmas catering in Dublin — Indian and South Indian festive menus for family dinners, office Christmas lunches and Christmas parties. Order early from Spice Village Catering.',
    h1: 'Christmas Catering in Dublin',
    intro:
      'Skip the cooking this Christmas. Spice Village Catering prepares festive South Indian and Indian menus for family gatherings, office lunches and Christmas parties across Dublin and Kildare.',
    image: '/images/service-04.jpg',
    sections: [
      {
        h: 'Christmas catering for families and offices',
        p: 'Order trays for the Christmas dinner table or feed the whole team: biryani, curries, Kerala-style starters, breads and desserts, in quantities planned around your guest list.',
      },
      {
        h: 'Festive menus with a South Indian twist',
        p: 'Bring something different to the festive table — celebration biryani, roasts and starters in South Indian style, vegetarian dishes and sweet endings. We build menus around your tastes and dietary needs.',
      },
      {
        h: 'Order early',
        p: 'December dates book up fast. Contact us as soon as you know your date and numbers so we can confirm availability and a menu.',
      },
    ],
    highlights: ['Family and office Christmas orders', 'Veg and non-veg festive menus', 'Delivered across Dublin and Kildare', 'Custom menus'],
    faqs: [
      { q: 'Do you offer Christmas catering in Dublin?', a: `Yes. We cater Christmas family meals, office lunches and parties across Dublin and Kildare. ${BOOK}` },
      { q: 'How early should I book Christmas catering?', a: 'December dates fill quickly, so book as early as possible — ideally in November.' },
    ],
  },
  {
    slug: 'christmas-party-catering-dublin',
    group: 'service',
    label: 'Christmas Party Catering',
    title: 'Christmas Party Catering Dublin — Office & Family',
    description:
      'Christmas party catering in Dublin — Indian buffets for office parties, staff dinners, community and family Christmas parties. Fresh South Indian food from Spice Village Catering.',
    h1: 'Christmas Party Catering in Dublin',
    intro:
      'From the office Christmas party to a big family get-together, we cater festive parties of every size in Dublin with fresh, generous Indian buffets.',
    image: '/images/service-02.jpg',
    sections: [
      {
        h: 'Office and staff Christmas parties',
        p: 'Easy-to-serve buffets for staff parties and team lunches, delivered on time with clearly labelled vegetarian, vegan and allergy-aware dishes.',
      },
      {
        h: 'Community and family Christmas parties',
        p: 'Parish, club, school and family parties in halls and homes. Tell us your numbers and venue and we will recommend a menu and quantities.',
      },
    ],
    highlights: ['Buffets for office and family parties', 'Clear dietary labelling', 'Delivered ready to serve', 'Book early for December'],
    faqs: [
      { q: 'Can you cater a Christmas party for my office in Dublin?', a: `Yes. We cater staff and office Christmas parties across Dublin. ${BOOK}` },
    ],
  },
  {
    slug: 'biryani-catering-dublin',
    group: 'cuisine',
    label: 'Biryani Catering',
    title: 'Biryani Catering Dublin',
    description:
      'Biryani catering in Dublin — chicken, mutton and vegetable biryani by the tray for parties, weddings and events. Fresh, aromatic South Indian biryani from Spice Village Catering.',
    h1: 'Biryani Catering in Dublin',
    intro:
      'Biryani is the centre of many celebrations. Order fresh, fragrant South Indian biryani by the tray for parties, weddings and office events anywhere in Dublin.',
    image: '/images/gallery-1.jpg',
    sections: [
      {
        h: 'Biryani for any group size',
        p: 'Order a single tray for a family gathering or plan a full menu around biryani for a larger event. We will help you work out portions for your headcount.',
      },
      {
        h: 'Pair it with starters, curries and desserts',
        p: 'Add raita, salad, starters and desserts to complete the meal. Vegetarian biryani options are available.',
      },
    ],
    highlights: ['Chicken, mutton and veg options', 'Trays for any group size', 'Delivered fresh', 'Add sides and desserts'],
    faqs: [
      { q: 'Can I order biryani by the tray in Dublin?', a: `Yes. Contact us with your headcount and date and we will confirm the best tray size and price. ${BOOK}` },
    ],
  },
  {
    slug: 'vegetarian-indian-catering-dublin',
    group: 'cuisine',
    label: 'Vegetarian & Vegan Catering',
    title: 'Vegetarian & Vegan Indian Catering Dublin',
    description:
      'Vegetarian and vegan Indian catering in Dublin — South Indian veg thalis, sadya, curries and starters for weddings, offices and events. Allergy-aware menus.',
    h1: 'Vegetarian & Vegan Indian Catering in Dublin',
    intro:
      'South Indian cuisine is naturally rich in vegetarian dishes. We cook full vegetarian and vegan menus for weddings, offices and community events in Dublin.',
    image: '/images/gallery-5.jpg',
    sections: [
      {
        h: 'Full vegetarian menus',
        p: 'From dosa-style starters to vegetable curries, sambar, rice and traditional desserts, we can build a complete vegetarian menu or add veg options alongside non-veg dishes.',
      },
      {
        h: 'Vegan and allergy requirements',
        p: 'Tell us about vegan or allergy needs when you enquire and we will label dishes clearly and plan the menu around them.',
      },
    ],
    highlights: ['Complete veg menus', 'Vegan options', 'Clearly labelled dishes', 'Allergy-aware planning'],
    faqs: [
      { q: 'Do you offer vegan Indian catering?', a: 'Yes. We can provide vegan dishes and label them clearly. Tell us your requirements when you enquire.' },
    ],
  },

  /* ───────────── Areas ───────────── */
  {
    slug: 'indian-catering-clondalkin',
    group: 'area',
    label: 'Clondalkin',
    title: 'Indian Caterer in Clondalkin, Dublin 22',
    description:
      'Indian caterer in Clondalkin, Dublin 22 — Spice Village Catering’s main branch at Crag Ave. South Indian catering for weddings, parties and offices. Call 085 818 9052.',
    h1: 'Indian Catering in Clondalkin, Dublin 22',
    intro:
      'Our main branch is at C4 Station Rd Business Park, Crag Ave, Clondalkin (D22 DX52). Local families, offices and venues in Clondalkin, Ballyfermot, Tallaght and Lucan order from us for weddings, parties and daily catering.',
    image: '/images/about-main.jpg',
    sections: [
      { h: 'Catering from Clondalkin', p: 'Being based in Clondalkin means fresh food, short delivery times and easy tastings for customers in west Dublin.' },
      { h: 'Nearby areas we serve', p: 'Clondalkin, Lucan, Palmerstown, Ballyfermot, Tallaght, Rathcoole, Citywest and the wider Dublin area.' },
    ],
    highlights: ['Main branch', 'Crag Ave, D22 DX52', 'Phone 085 818 9052', 'Open 9am–10pm daily'],
    faqs: [{ q: 'Where is the Clondalkin branch?', a: 'C4 Station Rd Business Park, Crag Ave, Clondalkin, Dublin 22 (D22 DX52). Call 085 818 9052.' }],
  },
  {
    slug: 'indian-catering-lucan',
    group: 'area',
    label: 'Lucan',
    title: 'Indian Caterer in Lucan, Dublin',
    description:
      'Indian caterer in Lucan, Co. Dublin — South Indian catering for weddings, parties and offices from Spice Village at Fonthill Retail Park. Call 01 413 0573.',
    h1: 'Indian Catering in Lucan, Dublin',
    intro:
      'Spice Village’s Lucan branch at Unit 1 Fonthill Retail Park serves Lucan, Clonsilla, Leixlip, Palmerstown and surrounding areas with authentic South Indian catering.',
    image: '/images/about-food.jpg',
    sections: [
      { h: 'Catering in west Dublin', p: 'Weddings, Communions, birthdays and corporate lunches for homes, halls and offices in and around Lucan.' },
      { h: 'Nearby areas we serve', p: 'Lucan, Clonsilla, Leixlip, Celbridge, Palmerstown, Adamstown and Castleknock.' },
    ],
    highlights: ['Fonthill Retail Park', 'Phone 01 413 0573', 'West Dublin delivery'],
    faqs: [{ q: 'Do you cater in Lucan?', a: 'Yes. Our Lucan branch is at Unit 1 Fonthill Retail Park. Call 01 413 0573 or message us on WhatsApp.' }],
  },
  {
    slug: 'indian-catering-rialto',
    group: 'area',
    label: 'Rialto & Dublin 8',
    title: 'Indian Caterer in Rialto, Dublin 8',
    description:
      'Indian caterer in Rialto, Dublin 8 — South Indian catering for weddings, parties and offices from Spice Village on the South Circular Road. Call 01 563 5282.',
    h1: 'Indian Catering in Rialto, Dublin 8',
    intro:
      'Our Rialto branch is at 471 South Circular Rd (D08 W56A), serving Dublin 8, the city centre and south Dublin with fresh South Indian catering.',
    image: '/images/gallery-2.jpg',
    sections: [
      { h: 'Catering in Dublin 8 and the city', p: 'Convenient for Rialto, Kilmainham, the Liberties, Inchicore, Portobello and Dublin city centre offices and venues.' },
      { h: 'Nearby areas we serve', p: 'Rialto, Dublin 8, Dublin 6, Inchicore, Crumlin, Drimnagh and the city centre.' },
    ],
    highlights: ['471 South Circular Rd', 'D08 W56A', 'Phone 01 563 5282', 'City centre reach'],
    faqs: [{ q: 'Where is the Rialto branch?', a: 'Above The Bird Flanagan Pub, 471 South Circular Rd, Rialto, Dublin 8 (D08 W56A). Call 01 563 5282.' }],
  },
  {
    slug: 'indian-catering-naas-kildare',
    group: 'area',
    label: 'Naas & Kildare',
    title: 'Indian Caterer in Naas, Co. Kildare',
    description:
      'Indian caterer in Naas and Co. Kildare — South Indian catering for weddings, Communions and events from Spice Village on Wolfe Tone St. Call 045 889 505.',
    h1: 'Indian Catering in Naas & Co. Kildare',
    intro:
      'Our Naas branch at Wolfe Tone St (W91 VK52) serves Naas, Newbridge, Kildare Town, Sallins and across Co. Kildare with South Indian catering for every kind of event.',
    image: '/images/gallery-4.jpg',
    sections: [
      { h: 'Catering across Kildare', p: 'Weddings, Communions, birthdays and community events in Naas, Newbridge, Kildare Town, Maynooth, Celbridge and Athy.' },
      { h: 'Nearby areas we serve', p: 'Naas, Newbridge, Sallins, Kilcullen, Maynooth, Celbridge, Kildare Town and Athy.' },
    ],
    highlights: ['Wolfe Tone St, Naas', 'W91 VK52', 'Phone 045 889 505', 'Kildare-wide catering'],
    faqs: [{ q: 'Do you cater in Co. Kildare?', a: 'Yes. Our Naas branch at Wolfe Tone St serves Naas, Newbridge, Kildare Town and surrounding areas. Call 045 889 505.' }],
  },
];

export const getPage = (slug: string) => PAGES.find((p) => p.slug === slug);
export const byGroup = (g: LandingPage['group']) => PAGES.filter((p) => p.group === g);
