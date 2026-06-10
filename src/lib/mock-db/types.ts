export interface HomeTab {
  id: string;
  label: string;
  active?: boolean;
}

export interface HeroBanner {
  id: string;
  image: string;
  title: string;
  subtitle: string;
}

export interface QuickLink {
  id: string;
  icon: string;
  label: string;
  route: string;
}

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
  avatarUrl?: string;
  images?: string[];
}

export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  colorCode?: string;
}

export interface Product {
  id: string;
  brandName: string;
  brandId?: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: "Skincare" | "Fashion" | "Home" | "Accessories" | "Tech";
  images: string[];
  variants?: ProductVariant[];
  videoReelUrl?: string; // Local asset or remote URL
  sustainabilityScore: number; // 0-100 for Eco Impact
  co2SavedKg: number;
  isWoohlVerified: boolean;
  stockAvailable: number;
  reviews: Review[];
  features: string[]; // e.g., ["Handcrafted", "Vegan"]
  fabric?: string;
}

export interface LiveIntelData {
  processing: boolean;
  missingClaims: string[]; // e.g., ["Fabric: GSM not mentioned"]
  verifiedReviews: number;
  confidenceScore: number; // 0-100
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  likes: number;
  timestamp: string;
  replies?: Comment[];
}

export interface VideoFeedItem {
  id: string;
  creator: Creator;
  product: Product;
  videoUrl: string;
  views: number;
  likes: number;
  comments: Comment[];
  aiLiveIntel: LiveIntelData;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  coverVideo?: string;
  coverImage?: string;
  ourStory: string;
  tags: string[];
  featuredProductId: string;
  isLive: boolean;
  followersCount: number;
  isFollowing: boolean;
}

export interface StartupBrand extends Brand {
  location?: string;
  isWomenLed?: boolean;
  isSustainable?: boolean;
  founder?: {
    name: string;
    photo: string;
    videoUrl?: string; // Founder introduction video
  };
}

export interface LiveEvent {
  id: string;
  title: string;
  startupId: string;
  thumbnail: string;
  viewerCount: number;
  scheduledAt?: string;
  isLive: boolean;
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

export interface Address {
  id: string;
  type: "Home" | "Work";
  fullAddress: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: "Card" | "UPI";
  details: string;
  isDefault: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface TrackingStep {
  status: string;
  date: string;
  isCompleted: boolean;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: "Ordered" | "Shipped" | "Out for Delivery" | "Delivered";
  items: CartItem[];
  trackingSteps: TrackingStep[];
}
