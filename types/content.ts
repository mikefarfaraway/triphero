export type AccentColors = {
  primary: string;
  secondary: string;
};

export type SpotType = "main" | "hidden_gem";

export type PersonProfile = {
  name: string;
  role: string;
  shortBio: string;
  heroImage: string;
  heroImagePosition?: string;
  heroImageScale?: number;
  accentColors?: AccentColors;
};

export type ProfileBundle = {
  siteTitle: string;
  subtitle: string;
  introNote: string;
  mapImageUrl?: string;
  guest?: PersonProfile;
  curator: PersonProfile;
};

export type SpotImage = {
  src: string;
  alt: string;
};

export type Spot = {
  id: string;
  type: SpotType;
  name: string;
  koreanName: string;
  neighborhood: string;
  district: string;
  category: string;
  subcategory: string;
  vibeTags: string[];
  shortPitch: string;
  description: string;
  localInsight: string;
  photoUrl?: string;
  bestTime: string;
  priceLevel: "$" | "$$" | "$$$";
  googleMapsUrl: string;
  naverMapUrl?: string;
  priority: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  seed: boolean;
  hiddenGem: boolean;
};

export type RecommendationEdge = {
  fromSpotId: string;
  toSpotId: string;
  reason: string;
};

export type RelatedSpot = Spot & {
  reason: string;
};

export type HomepageData = {
  profile: ProfileBundle;
  featuredSpots: Spot[];
  mainSpots: Spot[];
  hiddenGems: Spot[];
  allSpots: Spot[];
  relatedBySpotId: Record<string, RelatedSpot[]>;
  neighborhoods: Array<{
    name: string;
    count: number;
  }>;
};
