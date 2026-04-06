export interface Property {
  id: string;
  name: string;
  location: string;
  priceTotal: number;
  rating: number;
  quietScore: number;
  image: string;
  gallery: string[];
  aiInsight: string;
  pros: string[];
  cons: string[];
  redFlags: string[];
  reviews: {
    author: string;
    comment: string;
    rating: number;
  }[];
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
      'Noise risk: Construction nearby (ends May 2024)',
    ],
    reviews: [
      { author: 'Elena R.', comment: 'The quietest place I have ever stayed in Greece. Truly a sanctuary.', rating: 5 },
      { author: 'Mark T.', comment: 'Stunning views, though the walk up from the port is a workout!', rating: 4 },
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
      'Location inaccuracy: 15 mins further from Florence than listed',
    ],
    reviews: [
      { author: 'Sarah L.', comment: 'Our golden retriever loved the garden! Very peaceful stay.', rating: 5 },
      { author: 'James B.', comment: 'Beautiful villa, but the internet was a bit frustrating for work.', rating: 4 },
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
      'Hidden cleaning fees: $150 extra not shown on some platforms',
    ],
    reviews: [
      { author: 'Lars O.', comment: 'The most incredible architectural feat. Total silence.', rating: 5 },
      { author: 'Mia K.', comment: 'A once-in-a-lifetime experience. Worth every penny.', rating: 5 },
    ]
  }
];
