export type ClientSite = {
  leadId: number;
  slug: string;
  businessName: string;
  niche: string;
  city: string;
  phone: string;
  email: string;
  tagline: string;
  heroTitle: string;
  heroSubtitle: string;
  primaryCta: string;
  serviceHighlights: string[];
  services: Array<{ title: string; description: string }>;
  testimonials: Array<{ quote: string; author: string }>;
  hours: string;
  address: string;
  accentClass: string;
  receptionistName: string;
};

export const CLOSED_DEAL_SITES: ClientSite[] = [
  {
    leadId: 1,
    slug: "mama-mia-pizzeria",
    businessName: "Mama Mia Pizzeria",
    niche: "Restaurant",
    city: "San Francisco",
    phone: "415-555-0101",
    email: "mamamiasf@example.com",
    tagline: "Neighborhood Pizza, Family Hospitality",
    heroTitle: "Hand-tossed pizza and Italian comfort food made fresh daily.",
    heroSubtitle:
      "From weeknight dinner to family celebrations, Mama Mia Pizzeria brings authentic flavor and fast service to every table.",
    primaryCta: "Reserve Your Table",
    serviceHighlights: ["Dine-In", "Takeout", "Family Catering"],
    services: [
      {
        title: "Signature Pizza Menu",
        description:
          "Wood-fired favorites, house-made sauces, and fresh toppings crafted for classic and modern tastes.",
      },
      {
        title: "Fast Pickup & Delivery",
        description:
          "Order in minutes and enjoy consistent, hot delivery across nearby San Francisco neighborhoods.",
      },
      {
        title: "Catering Trays",
        description:
          "Party-ready platters and customizable group packages for offices, birthdays, and private events.",
      },
    ],
    testimonials: [
      {
        quote: "Best local pizza spot in the city. Great service and the crust is incredible.",
        author: "A. Romano",
      },
      {
        quote: "Reliable for team lunches and always delivered on time.",
        author: "SOMA Office Manager",
      },
    ],
    hours: "Mon–Sun: 11:00 AM – 10:00 PM",
    address: "123 Main Street, San Francisco, CA",
    accentClass: "from-red-600 to-orange-500",
    receptionistName: "Mia",
  },
  {
    leadId: 2,
    slug: "golden-gate-grill",
    businessName: "Golden Gate Grill",
    niche: "Restaurant",
    city: "San Francisco",
    phone: "415-555-0102",
    email: "contact@goldengategrill.com",
    tagline: "Modern Grill, Local Ingredients",
    heroTitle: "Classic grill dishes elevated with Bay Area ingredients.",
    heroSubtitle:
      "Golden Gate Grill serves premium steaks, seasonal sides, and chef specials in a warm, upscale-casual setting.",
    primaryCta: "Book Dinner",
    serviceHighlights: ["Chef Specials", "Private Dining", "Cocktail Menu"],
    services: [
      {
        title: "Dinner Service",
        description:
          "Steaks, seafood, and curated entrées paired with seasonal produce and house-crafted sauces.",
      },
      {
        title: "Private Events",
        description:
          "Flexible event packages for birthdays, business dinners, and celebration nights.",
      },
      {
        title: "Weekend Brunch",
        description:
          "Brunch classics, fresh pastries, and signature drinks available every weekend.",
      },
    ],
    testimonials: [
      {
        quote: "Outstanding food and atmosphere. Great date-night destination.",
        author: "L. Patel",
      },
      {
        quote: "Their private dining service made our team event effortless.",
        author: "K. Nguyen",
      },
    ],
    hours: "Tue–Sun: 10:00 AM – 10:30 PM",
    address: "245 Marina Blvd, San Francisco, CA",
    accentClass: "from-amber-500 to-yellow-400",
    receptionistName: "Gigi",
  },
  {
    leadId: 4,
    slug: "sunset-smiles-dentistry",
    businessName: "Sunset Smiles Dentistry",
    niche: "Dentist",
    city: "San Francisco",
    phone: "415-555-0104",
    email: "hello@sunsetsmiles.com",
    tagline: "Comfort-First Dental Care",
    heroTitle: "Healthy, confident smiles with gentle modern dentistry.",
    heroSubtitle:
      "Sunset Smiles combines preventive care, cosmetic options, and clear treatment planning in a calm, patient-first environment.",
    primaryCta: "Schedule a Visit",
    serviceHighlights: ["Checkups", "Cosmetic Care", "Emergency Visits"],
    services: [
      {
        title: "Preventive Dentistry",
        description:
          "Routine exams, digital imaging, and personalized hygiene plans to protect long-term oral health.",
      },
      {
        title: "Smile Enhancements",
        description:
          "Whitening, veneers, and cosmetic options customized for natural, confident results.",
      },
      {
        title: "Urgent Dental Care",
        description:
          "Same-day support for tooth pain, chips, and other time-sensitive dental concerns.",
      },
    ],
    testimonials: [
      {
        quote: "The team is patient, professional, and made me feel comfortable immediately.",
        author: "M. Chen",
      },
      {
        quote: "Best dental experience I've had in San Francisco.",
        author: "D. Alvarez",
      },
    ],
    hours: "Mon–Fri: 8:00 AM – 6:00 PM | Sat: 9:00 AM – 2:00 PM",
    address: "88 Sunset Ave, San Francisco, CA",
    accentClass: "from-sky-600 to-cyan-500",
    receptionistName: "Sunny",
  },
  {
    leadId: 7,
    slug: "chic-cuts-salon",
    businessName: "Chic Cuts Salon",
    niche: "Hair Salon",
    city: "San Francisco",
    phone: "415-555-0107",
    email: "booking@chiccuts.com",
    tagline: "Premium Style, Everyday Confidence",
    heroTitle: "Expert cuts, color, and styling designed around you.",
    heroSubtitle:
      "From routine refreshes to special-event glam, Chic Cuts Salon delivers trend-aware looks with personalized service.",
    primaryCta: "Book Styling",
    serviceHighlights: ["Cuts & Blowouts", "Color Services", "Bridal Styling"],
    services: [
      {
        title: "Precision Haircuts",
        description:
          "Customized cuts based on face shape, texture, and lifestyle for easy day-to-day styling.",
      },
      {
        title: "Color & Treatments",
        description:
          "Balayage, highlights, and restorative treatments using premium salon products.",
      },
      {
        title: "Event Styling",
        description:
          "Bridal and special-event styling packages for polished, camera-ready results.",
      },
    ],
    testimonials: [
      {
        quote: "Always leave feeling amazing. The stylists really listen to what you want.",
        author: "R. Davis",
      },
      {
        quote: "Great experience from booking to final style.",
        author: "T. Brooks",
      },
    ],
    hours: "Tue–Sun: 9:00 AM – 7:00 PM",
    address: "501 Market Street, San Francisco, CA",
    accentClass: "from-fuchsia-600 to-pink-500",
    receptionistName: "Chloe",
  },
  {
    leadId: 10,
    slug: "north-beach-trattoria",
    businessName: "North Beach Trattoria",
    niche: "Restaurant",
    city: "San Francisco",
    phone: "415-555-0110",
    email: "ciao@northbeachtrattoria.com",
    tagline: "Italian Classics in the Heart of North Beach",
    heroTitle: "House-made pasta, regional wines, and old-world charm.",
    heroSubtitle:
      "North Beach Trattoria blends traditional Italian recipes with contemporary hospitality for memorable lunches and dinners.",
    primaryCta: "Reserve a Table",
    serviceHighlights: ["House Pasta", "Wine Pairings", "Private Parties"],
    services: [
      {
        title: "Trattoria Favorites",
        description:
          "Daily pasta specials, signature sauces, and chef-curated Italian comfort dishes.",
      },
      {
        title: "Group Dining",
        description:
          "Flexible prix-fixe menus and event support for birthdays, anniversaries, and business dinners.",
      },
      {
        title: "Takeout Family Meals",
        description:
          "Generous family portions ready for pickup with simple online ordering.",
      },
    ],
    testimonials: [
      {
        quote: "Authentic flavor and excellent service every time we visit.",
        author: "C. Russo",
      },
      {
        quote: "Our favorite neighborhood date spot in North Beach.",
        author: "J. Park",
      },
    ],
    hours: "Mon–Sun: 12:00 PM – 10:00 PM",
    address: "720 Columbus Ave, San Francisco, CA",
    accentClass: "from-emerald-600 to-lime-500",
    receptionistName: "Nora",
  },
];

export const CLOSED_DEAL_SITES_BY_SLUG = Object.fromEntries(
  CLOSED_DEAL_SITES.map((site) => [site.slug, site]),
) as Record<string, ClientSite>;
