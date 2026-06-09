import { Creator, Product, VideoFeedItem, GroupBuyLobby } from './types';

export const mockCreators: Creator[] = [
  {
    id: "c1",
    handle: "priya_style",
    name: "Priya Singh",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200",
    followers: 45200,
    trustScore: 94,
    bio: "Curating the best of sustainable fashion & lifestyle in India. 🌿✨",
  },
  {
    id: "c2",
    handle: "urban_hustle",
    name: "Rahul Verma",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200",
    followers: 12000,
    trustScore: 88,
    bio: "Streetwear drops & tech reviews. Stay loud.",
  }
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    brandName: "Urban Earth",
    name: "Oversized Linen Resort Shirt",
    description: "A breathable, sustainable oversized linen shirt perfect for the summer. Made with 100% organic linen sourced responsibly from Jaipur.",
    price: 1299,
    originalPrice: 1999,
    category: "Fashion",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=600",
      "https://images.unsplash.com/photo-1588359348347-9bc6cbb68cb8?q=80&w=600"
    ],
    videoReelUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    sustainabilityScore: 92,
    co2SavedKg: 2.4,
    isWoohlVerified: true,
    stockAvailable: 45,
    features: ["100% Organic", "Handcrafted", "Vegan Dyes"],
    fabric: "120 GSM Pure Linen",
    reviews: [
      { id: "r1", userName: "Neha", rating: 5, comment: "Absolutely love the fabric!", date: "2023-10-12" }
    ]
  },
  {
    id: "p2",
    brandName: "Glow & Co",
    name: "Himalayan Glacial Serum",
    description: "Hydrate your skin instantly with pure glacial water and hyaluronic acid.",
    price: 899,
    originalPrice: 1100,
    category: "Skincare",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600"
    ],
    videoReelUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    sustainabilityScore: 85,
    co2SavedKg: 1.1,
    isWoohlVerified: true,
    stockAvailable: 120,
    features: ["Cruelty Free", "Sulfate Free"],
    reviews: []
  }
];

export const mockVideoFeed: VideoFeedItem[] = [
  {
    id: "v1",
    creator: mockCreators[0],
    product: mockProducts[0],
    // Using a reliable sample mp4 since expo-video needs a working URL
    videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    views: 125000,
    likes: 4500,
    aiLiveIntel: {
      processing: true,
      missingClaims: [],
      verifiedReviews: 881,
      confidenceScore: 92
    }
  },
  {
    id: "v2",
    creator: mockCreators[1],
    product: mockProducts[1],
    videoUrl: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/360/Jellyfish_360_10s_1MB.mp4",
    views: 89000,
    likes: 2100,
    aiLiveIntel: {
      processing: true,
      missingClaims: ["pH level not explicitly stated"],
      verifiedReviews: 432,
      confidenceScore: 86
    }
  }
];

export const mockGroupBuys: GroupBuyLobby[] = [
  {
    id: "gb1",
    productId: "p1",
    targetParticipants: 5,
    currentParticipants: 2,
    groupPrice: 899,
    expiresAt: new Date(Date.now() + 86400000).toISOString(),
    status: "ACTIVE",
    participants: [
      { userId: "u1", avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100" },
      { userId: "u2", avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100" }
    ]
  }
];
