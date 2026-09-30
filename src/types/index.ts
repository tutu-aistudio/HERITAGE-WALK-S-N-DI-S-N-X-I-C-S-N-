export type CategoryType = 'heritage' | 'food' | 'craft';

export interface LocationItem {
  id: string;
  name: string;
  tagline: string;
  category: CategoryType;
  kietAddress: string;
  district: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  estPrice: number; // in VNĐ, 0 for free heritage
  priceRange: string;
  vibeTags: string[];
  recommendedOutfitColors: string[];
  outfitTip: string;
  imageUrl: string;
  highlights: string[];
  story: string;
  audioStory: {
    title: string;
    narratorName: string;
    duration: string;
    ambientSound: 'royal_court' | 'temple_bell' | 'river_boat' | 'alley_street' | 'craft_hammer';
    transcript: string;
  };
  artisanInfo?: {
    name: string;
    generation: string;
    craftName: string;
    quote: string;
  };
  menuOrTickets?: {
    item: string;
    price: number;
    description?: string;
  }[];
  genZReview: string;
  distanceFromUserMeters?: number;
}

export interface ExpenseRecord {
  id: string;
  locationName: string;
  category: CategoryType;
  title: string;
  amount: number;
  timestamp: string;
  note?: string;
}

export interface Badge {
  id: string;
  name: string;
  royalTitle: string;
  icon: string;
  description: string;
  unlocked: boolean;
  requiredStreak: number;
  unlockedAt?: string;
}

export interface TripItinerary {
  id: string;
  title: string;
  totalBudget: number;
  remainingBudget: number;
  vibe: string;
  outfitColor: string;
  startPoint: string;
  stops: LocationItem[];
  geminiCommentary?: string;
  socialFlexCaption?: string;
}
