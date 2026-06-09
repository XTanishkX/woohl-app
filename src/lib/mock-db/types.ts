export interface Creator {
  id: string;
  handle: string;
  name: string;
  avatarUrl: string;
  followers: number;
  trustScore: number;
  bio: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  brandName: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: "Skincare" | "Fashion" | "Home" | "Accessories" | "Tech";
  images: string[];
  videoReelUrl: string;
  sustainabilityScore: number; // 0-100 for Eco Impact
  co2SavedKg: number;
  isWoohlVerified: boolean;
  stockAvailable: number;
  reviews: Review[];
  features: string[]; // e.g., ["Handcrafted", "Vegan"]
  fabric?: string; // For Live Intel checks
}

export interface LiveIntelData {
  processing: boolean;
  missingClaims: string[]; // e.g., ["Fabric: GSM not mentioned"]
  verifiedReviews: number;
  confidenceScore: number; // 0-100
}

export interface VideoFeedItem {
  id: string;
  creator: Creator;
  product: Product;
  videoUrl: string;
  views: number;
  likes: number;
  aiLiveIntel: LiveIntelData;
}

export interface GroupBuyLobby {
  id: string;
  productId: string;
  targetParticipants: number;
  currentParticipants: number;
  groupPrice: number;
  expiresAt: string; // ISO timestamp
  status: "ACTIVE" | "SUCCESSFUL" | "EXPIRED";
  participants: { userId: string; avatarUrl: string }[];
}
