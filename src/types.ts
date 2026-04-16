export interface Offer {
  otaName: string;
  price: number;
  conditions: string[];
  isBestDeal?: boolean;
  link: string;
}

export type ReviewPlatform = 'Booking' | 'Airbnb' | 'Google' | 'Expedia';

export interface Property {
  id: string;
  name: string;
  location: string;
  priceTotal: number;
  rating: number;
  quietScore: number;
  image: string;
  gallery: string[];
  guestPhotos: string[];
  aiInsight: string;
  pros: string[];
  cons: string[];
  redFlags: { text: string; severity: 'critical' | 'minor' }[];
  reviewSources: {
    platform: ReviewPlatform;
    rating: number;
    reviewCount: number;
  }[];
  reviews: {
    author: string;
    comment: string;
    rating: number;
    source: ReviewPlatform;
  }[];
  offers: Offer[];
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    name: 'Azure Bay Retreat',
    location: 'Santorini, Greece',
    priceTotal: 1240,
    rating: 4.9,
    quietScore: 9.5,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
    ],
    guestPhotos: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=800&sig=1',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800&sig=2',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800&sig=3',
    ],
    aiInsight: 'Perfect for deep relaxation. Synthesized reviews highlight the soundproof walls and private terrace.',
    pros: [
      'Exceptional soundproofing',
      'Private infinity pool',
      'Walking distance to Oia center',
      'Daily organic breakfast included'
    ],
    cons: [
      'Limited parking availability',
      'Steps are steep (typical for Oia)'
    ],
    redFlags: [
      { text: 'Noise risk: Construction nearby (ends May 2024)', severity: 'critical' },
    ],
    reviewSources: [
      { platform: 'Booking', rating: 4.9, reviewCount: 450 },
      { platform: 'Google', rating: 4.8, reviewCount: 1200 },
      { platform: 'Expedia', rating: 4.7, reviewCount: 320 },
    ],
    reviews: [
      { author: 'Elena R.', comment: 'The quietest place I have ever stayed in Greece. Truly a sanctuary.', rating: 5, source: 'Booking' },
      { author: 'Mark T.', comment: 'Stunning views, though the walk up from the port is a workout!', rating: 4, source: 'Google' },
    ],
    offers: [
      { otaName: 'Booking.com', price: 1240, conditions: ['Breakfast included', 'Free cancellation'], isBestDeal: true, link: '#' },
      { otaName: 'Expedia', price: 1290, conditions: ['Breakfast included'], link: '#' },
      { otaName: 'Agoda', price: 1310, conditions: ['Pay at property'], link: '#' },
      { otaName: 'Hotels.com', price: 1325, conditions: ['Free cancellation'], link: '#' },
      { otaName: 'Trip.com', price: 1340, conditions: ['Instant confirmation'], link: '#' },
      { otaName: 'Priceline', price: 1355, conditions: ['Non-refundable'], link: '#' },
      { otaName: 'Kayak', price: 1370, conditions: ['Free cancellation'], link: '#' },
      { otaName: 'Trivago', price: 1385, conditions: ['Breakfast included'], link: '#' },
      { otaName: 'Orbitz', price: 1400, conditions: ['Member deal'], link: '#' },
    ]
  },
  {
    id: '2',
    name: 'Pine Shadow Villa',
    location: 'Tuscany, Italy',
    priceTotal: 980,
    rating: 4.7,
    quietScore: 9.2,
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
    ],
    guestPhotos: [
      'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=800&sig=4',
      'https://images.unsplash.com/photo-1464146072230-91cabc968266?auto=format&fit=crop&q=80&w=800&sig=5',
    ],
    aiInsight: 'Highly recommended for pet owners. The enclosed garden is a top-rated feature in recent guest feedback.',
    pros: [
      'Large enclosed garden',
      'Authentic rustic interior',
      'Excellent local wine selection',
      'Pet-friendly amenities'
    ],
    cons: [
      'Weak Wi-Fi in the bedrooms',
      'Requires a car for groceries'
    ],
    redFlags: [
      { text: 'Location inaccuracy: 15 mins further from Florence than listed', severity: 'minor' },
    ],
    reviewSources: [
      { platform: 'Airbnb', rating: 4.8, reviewCount: 85 },
      { platform: 'Google', rating: 4.6, reviewCount: 150 },
      { platform: 'Booking', rating: 4.7, reviewCount: 210 },
    ],
    reviews: [
      { author: 'Sarah L.', comment: 'Our golden retriever loved the garden! Very peaceful stay.', rating: 5, source: 'Airbnb' },
      { author: 'James B.', comment: 'Beautiful villa, but the internet was a bit frustrating for work.', rating: 4, source: 'Booking' },
    ],
    offers: [
      { otaName: 'Airbnb', price: 980, conditions: ['Entire home', 'Free cancellation'], isBestDeal: true, link: '#' },
      { otaName: 'Vrbo', price: 1020, conditions: ['Entire home'], link: '#' },
      { otaName: 'Booking.com', price: 1050, conditions: ['Breakfast included'], link: '#' },
      { otaName: 'Expedia', price: 1075, conditions: ['Free cancellation'], link: '#' },
      { otaName: 'Agoda', price: 1090, conditions: ['Pay at property'], link: '#' },
      { otaName: 'Hotels.com', price: 1105, conditions: ['Member price'], link: '#' },
      { otaName: 'TripAdvisor', price: 1120, conditions: ['Best value'], link: '#' },
      { otaName: 'Priceline', price: 1135, conditions: ['Instant book'], link: '#' },
      { otaName: 'Orbitz', price: 1150, conditions: ['Free cancellation'], link: '#' },
    ]
  },
  {
    id: '3',
    name: 'The Glass House',
    location: 'Lofoten, Norway',
    priceTotal: 1560,
    rating: 5.0,
    quietScore: 9.8,
    image: 'https://images.unsplash.com/photo-1449156001935-d2863fb72690?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1449156001935-d2863fb72690?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    ],
    guestPhotos: [
      'https://images.unsplash.com/photo-1449156001935-d2863fb72690?auto=format&fit=crop&q=80&w=800&sig=6',
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800&sig=7',
    ],
    aiInsight: 'Unmatched privacy. AI analysis of 500+ photos confirms no neighboring properties within 1km.',
    pros: [
      '360-degree mountain views',
      'Private sauna',
      'Northern lights viewing deck',
      'Zero light pollution'
    ],
    cons: [
      'High price point',
      'Remote location (2h from airport)'
    ],
    redFlags: [
      { text: 'Hidden cleaning fees: $150 extra not shown on some platforms', severity: 'critical' },
    ],
    reviewSources: [
      { platform: 'Expedia', rating: 5.0, reviewCount: 45 },
      { platform: 'Google', rating: 4.9, reviewCount: 110 },
      { platform: 'Booking', rating: 5.0, reviewCount: 60 },
    ],
    reviews: [
      { author: 'Lars O.', comment: 'The most incredible architectural feat. Total silence.', rating: 5, source: 'Expedia' },
      { author: 'Mia K.', comment: 'A once-in-a-lifetime experience. Worth every penny.', rating: 5, source: 'Google' },
    ],
    offers: [
      { otaName: 'Hotels.com', price: 1560, conditions: ['Free cancellation', 'Collect stamps'], isBestDeal: true, link: '#' },
      { otaName: 'Expedia', price: 1560, conditions: ['Free cancellation'], link: '#' },
      { otaName: 'Booking.com', price: 1620, conditions: ['Breakfast included'], link: '#' },
      { otaName: 'Agoda', price: 1645, conditions: ['Pay at property'], link: '#' },
      { otaName: 'Trip.com', price: 1660, conditions: ['Instant confirmation'], link: '#' },
      { otaName: 'Priceline', price: 1675, conditions: ['Non-refundable'], link: '#' },
      { otaName: 'Kayak', price: 1690, conditions: ['Free cancellation'], link: '#' },
      { otaName: 'Trivago', price: 1705, conditions: ['Breakfast included'], link: '#' },
      { otaName: 'Orbitz', price: 1720, conditions: ['Member deal'], link: '#' },
    ]
  },
  {
    id: '4',
    name: 'Ocean Mist Villa',
    location: 'Algarve, Portugal',
    priceTotal: 850,
    rating: 4.6,
    quietScore: 8.8,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    ],
    guestPhotos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800&sig=8',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800&sig=9',
    ],
    aiInsight: 'Great for remote work. High-speed fiber internet confirmed by 90% of business travelers.',
    pros: ['Fiber internet', 'Beach access', 'Modern kitchen'],
    cons: ['Small balcony'],
    redFlags: [
      { text: 'Street noise during weekends', severity: 'critical' },
    ],
    reviewSources: [
      { platform: 'Booking', rating: 4.6, reviewCount: 320 },
      { platform: 'Google', rating: 4.5, reviewCount: 500 },
      { platform: 'Expedia', rating: 4.4, reviewCount: 150 },
    ],
    reviews: [{ author: 'John D.', comment: 'Perfect for work and play.', rating: 5, source: 'Booking' }],
    offers: [{ otaName: 'Booking.com', price: 850, conditions: ['Free cancellation'], isBestDeal: true, link: '#' }]
  },
  {
    id: '5',
    name: 'Mountain Peak Lodge',
    location: 'Zermatt, Switzerland',
    priceTotal: 2100,
    rating: 4.9,
    quietScore: 9.7,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800',
    ],
    guestPhotos: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=800&sig=10',
    ],
    aiInsight: 'Ultimate ski-in/ski-out experience. AI suggests booking 3 months in advance.',
    pros: ['Ski-in/ski-out', 'Matterhorn view', 'Luxury spa'],
    cons: ['Very expensive'],
    redFlags: [
      { text: 'Limited availability', severity: 'minor' },
    ],
    reviewSources: [
      { platform: 'Expedia', rating: 4.9, reviewCount: 200 },
      { platform: 'Google', rating: 4.8, reviewCount: 450 },
      { platform: 'Booking', rating: 4.9, reviewCount: 310 },
    ],
    reviews: [{ author: 'Heidi S.', comment: 'Unbelievable views.', rating: 5, source: 'Expedia' }],
    offers: [{ otaName: 'Expedia', price: 2100, conditions: ['Breakfast included'], isBestDeal: true, link: '#' }]
  },
  {
    id: '6',
    name: 'Urban Oasis Loft',
    location: 'Tokyo, Japan',
    priceTotal: 720,
    rating: 4.5,
    quietScore: 8.5,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800',
    ],
    guestPhotos: [
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800&sig=11',
    ],
    aiInsight: 'Surprisingly quiet for Shinjuku. Double-glazed windows perform exceptionally well.',
    pros: ['Central location', 'Quiet interior', 'Minimalist design'],
    cons: ['Compact space'],
    redFlags: [
      { text: 'Difficult to find entrance', severity: 'minor' },
    ],
    reviewSources: [
      { platform: 'Expedia', rating: 4.5, reviewCount: 800 },
      { platform: 'Google', rating: 4.4, reviewCount: 1200 },
      { platform: 'Booking', rating: 4.5, reviewCount: 600 },
    ],
    reviews: [{ author: 'Kenji M.', comment: 'A peaceful retreat in the city.', rating: 4, source: 'Google' }],
    offers: [{ otaName: 'Agoda', price: 720, conditions: ['Pay at property'], isBestDeal: true, link: '#' }]
  },
  {
    id: '7',
    name: 'Desert Mirage Resort',
    location: 'Dubai, UAE',
    priceTotal: 1800,
    rating: 4.8,
    quietScore: 9.0,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800',
    ],
    guestPhotos: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=800&sig=12',
    ],
    aiInsight: 'Luxury in the dunes. AI notes high guest satisfaction with the private butler service.',
    pros: ['Private pool', 'Desert excursions', 'World-class dining'],
    cons: ['Far from city center'],
    redFlags: [
      { text: 'Sandstorms possible in summer', severity: 'minor' },
    ],
    reviewSources: [
      { platform: 'Booking', rating: 4.8, reviewCount: 1500 },
      { platform: 'Expedia', rating: 4.7, reviewCount: 600 },
      { platform: 'Google', rating: 4.9, reviewCount: 2200 },
    ],
    reviews: [{ author: 'Ahmed K.', comment: 'Pure luxury.', rating: 5, source: 'Booking' }],
    offers: [{ otaName: 'Booking.com', price: 1800, conditions: ['All-inclusive'], isBestDeal: true, link: '#' }]
  },
  {
    id: '8',
    name: 'Coral Reef Bungalow',
    location: 'Maldives',
    priceTotal: 2500,
    rating: 5.0,
    quietScore: 9.9,
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800',
    ],
    guestPhotos: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800&sig=13',
    ],
    aiInsight: 'Breathtaking marine life. AI confirms over-water bungalows offer best privacy.',
    pros: ['Over-water', 'Snorkeling from deck', 'Romantic setting'],
    cons: ['Requires seaplane transfer'],
    redFlags: [
      { text: 'High transfer costs', severity: 'critical' },
    ],
    reviewSources: [
      { platform: 'Expedia', rating: 5.0, reviewCount: 80 },
      { platform: 'Google', rating: 5.0, reviewCount: 200 },
      { platform: 'Booking', rating: 4.9, reviewCount: 150 },
    ],
    reviews: [{ author: 'Chloe W.', comment: 'Paradise found.', rating: 5, source: 'Google' }],
    offers: [{ otaName: 'Hotels.com', price: 2500, conditions: ['Free cancellation'], isBestDeal: true, link: '#' }]
  },
  {
    id: '9',
    name: 'Bamboo Forest Villa',
    location: 'Kyoto, Japan',
    priceTotal: 1100,
    rating: 4.7,
    quietScore: 9.4,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=1000',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
    ],
    guestPhotos: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800&sig=14',
    ],
    aiInsight: 'Zen-like atmosphere. AI analysis of guest sentiment shows high praise for the tea ceremony.',
    pros: ['Traditional ryokan style', 'Garden views', 'Cultural experiences'],
    cons: ['Futon bedding only'],
    redFlags: [
      { text: 'Curfew at 10 PM', severity: 'minor' },
    ],
    reviewSources: [
      { platform: 'Booking', rating: 4.7, reviewCount: 400 },
      { platform: 'Airbnb', rating: 4.8, reviewCount: 120 },
      { platform: 'Google', rating: 4.6, reviewCount: 300 },
    ],
    reviews: [{ author: 'Yuki S.', comment: 'Very peaceful and authentic.', rating: 5, source: 'Booking' }],
    offers: [{ otaName: 'Booking.com', price: 1100, conditions: ['Half board'], isBestDeal: true, link: '#' }]
  }
];
