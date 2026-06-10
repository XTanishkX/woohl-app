import { Creator, Product, VideoFeedItem, GroupBuyLobby, Comment, Brand, StartupBrand, Address, PaymentMethod, Order, CartItem, HomeTab, HeroBanner, QuickLink } from './types';

export const HOME_TABS: HomeTab[] = [
  { id: '1', label: 'For You', active: true },
  { id: '2', label: 'Fashion' },
  { id: '3', label: 'Home Decor' },
  { id: '4', label: 'Beauty' },
  { id: '5', label: 'Startups' },
  { id: '6', label: 'Eco-Friendly' },
];

export const HERO_BANNERS: HeroBanner[] = [
  { id: 'b1', image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800', title: 'Crafted for the modern home', subtitle: 'Artisan decor up to 40% off' },
  { id: 'b2', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800', title: 'Festive Ready', subtitle: 'Curated apparel' },
  { id: 'b3', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800', title: 'The Gifting Studio', subtitle: 'Perfect presents for every occasion' }
];

export const QUICK_LINKS: QuickLink[] = [
  { id: 'q1', icon: 'Sparkles', label: 'New Drops', route: '/categories' },
  { id: 'q2', icon: 'Users', label: 'Group Buys', route: '/categories' },
  { id: 'q3', icon: 'ShieldCheck', label: 'Woohl Assured', route: '/categories' },
  { id: 'q4', icon: 'Gift', label: 'Gifting', route: '/categories' },
  { id: 'q5', icon: 'Leaf', label: 'Eco Impact', route: '/categories' },
];

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

export const mockBrands: StartupBrand[] = [
  {
    id: "b1",
    name: "Urban Earth",
    logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?q=80&w=200",
    coverImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=800",
    coverVideo: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    ourStory: "Urban Earth started in a small room in Jaipur with a big dream: to make sustainable fashion accessible. We use 100% organic linen and partner with local artisans to craft every piece with love.",
    tags: ["Sustainable", "Handcrafted", "Women-Led"],
    featuredProductId: "p1",
    isLive: false,
    followersCount: 15400,
    isFollowing: false,
    location: "Jaipur, India",
    isWomenLed: true,
    isSustainable: true,
    founder: {
      name: "Aditi Sharma",
      photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200"
    }
  },
  {
    id: "b2",
    name: "Glow & Co",
    logo: "https://images.unsplash.com/photo-1556228720-1c2a462ad9ce?q=80&w=200",
    coverImage: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=800",
    coverVideo: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    ourStory: "Bringing the purity of the Himalayas to your daily skincare routine.",
    tags: ["Cruelty-Free", "Vegan"],
    featuredProductId: "p2",
    isLive: true,
    followersCount: 8900,
    isFollowing: true,
    location: "Manali, India",
    isWomenLed: true,
    isSustainable: true,
  },
  {
    id: "b3",
    name: "Artisan Loom",
    logo: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=200",
    coverImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721?q=80&w=800",
    ourStory: "Reviving traditional hand block printing techniques from Rajasthan.",
    tags: ["Handloom", "Heritage"],
    featuredProductId: "p10",
    isLive: false,
    followersCount: 21000,
    isFollowing: false,
    location: "Udaipur, India",
    isWomenLed: false,
    isSustainable: true,
  }
];

export const mockProducts: Product[] = [
  {
    id: "p1",
    brandName: "Urban Earth",
    brandId: "b1",
    name: "Oversized Linen Resort Shirt",
    description: "A breathable, sustainable oversized linen shirt perfect for the summer.",
    price: 1299,
    originalPrice: 1999,
    category: "Fashion",
    images: ["https://images.unsplash.com/photo-1596755094514-f87e32f85e23?q=80&w=600"],
    sustainabilityScore: 92,
    co2SavedKg: 2.4,
    isWoohlVerified: true,
    stockAvailable: 45,
    features: ["100% Organic", "Handcrafted", "Vegan Dyes"],
    reviews: []
  },
  {
    id: "p2",
    brandName: "Glow & Co",
    brandId: "b2",
    name: "Himalayan Glacial Serum",
    description: "Hydrate your skin instantly with pure glacial water and hyaluronic acid.",
    price: 899,
    originalPrice: 1100,
    category: "Skincare",
    images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600"],
    sustainabilityScore: 85,
    co2SavedKg: 1.1,
    isWoohlVerified: true,
    stockAvailable: 120,
    features: ["Cruelty Free", "Sulfate Free"],
    reviews: []
  },
  {
    id: "p3",
    brandName: "Neon Streets",
    name: "Cyberpunk Cargo Pants",
    description: "Reflective and water-resistant. Perfect for night outs and urban exploration.",
    price: 2499,
    originalPrice: 3000,
    category: "Fashion",
    images: ["https://images.unsplash.com/photo-1517423738875-5ce310aca3eb?q=80&w=600"],
    sustainabilityScore: 70,
    co2SavedKg: 0.8,
    isWoohlVerified: false,
    stockAvailable: 15,
    features: ["Water-Resistant"],
    reviews: []
  },
  {
    id: "p4",
    brandName: "Aura Home",
    name: "Ceramic Minimalist Vase",
    description: "A beautifully hand-thrown vase for modern homes.",
    price: 599,
    originalPrice: 899,
    category: "Home",
    images: ["https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600"],
    sustainabilityScore: 95,
    co2SavedKg: 3.2,
    isWoohlVerified: true,
    stockAvailable: 8,
    features: ["Hand-Thrown"],
    reviews: []
  },
  {
    id: "p5",
    brandName: "Artisan Loom",
    brandId: "b3",
    name: "Hand Block Print Cushions",
    description: "Set of 2 authentic hand block printed cushions from Rajasthan.",
    price: 899,
    originalPrice: 1299,
    category: "Home",
    images: ["https://images.unsplash.com/photo-1584145952924-f7b5dfeb891e?q=80&w=600"],
    sustainabilityScore: 90,
    co2SavedKg: 1.5,
    isWoohlVerified: true,
    stockAvailable: 30,
    features: ["Handmade", "100% Cotton"],
    reviews: []
  },
  {
    id: "p6",
    brandName: "Neon Streets",
    name: "Reflective Windbreaker",
    description: "Stand out in the dark with this hyper-reflective jacket.",
    price: 3499,
    originalPrice: 4999,
    category: "Fashion",
    images: ["https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=600"],
    sustainabilityScore: 65,
    co2SavedKg: 0.5,
    isWoohlVerified: true,
    stockAvailable: 10,
    features: ["Waterproof", "Reflective"],
    reviews: []
  },
  {
    id: "p7",
    brandName: "Glow & Co",
    brandId: "b2",
    name: "Rose Quartz Roller Set",
    description: "Authentic rose quartz facial roller and gua sha set.",
    price: 1199,
    originalPrice: 1599,
    category: "Skincare",
    images: ["https://images.unsplash.com/photo-1596755389378-c31d21fd1273?q=80&w=600"],
    sustainabilityScore: 90,
    co2SavedKg: 0,
    isWoohlVerified: true,
    stockAvailable: 50,
    features: ["Natural Stone", "Cruelty Free"],
    reviews: []
  },
  {
    id: "p8",
    brandName: "Urban Earth",
    brandId: "b1",
    name: "Hemp Tote Bag",
    description: "Everyday carry tote bag made from durable, eco-friendly hemp.",
    price: 499,
    originalPrice: 799,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=600"],
    sustainabilityScore: 98,
    co2SavedKg: 4.1,
    isWoohlVerified: true,
    stockAvailable: 100,
    features: ["100% Hemp", "Biodegradable"],
    reviews: []
  },
  {
    id: "p9",
    brandName: "Aura Home",
    name: "Soy Wax Scented Candles",
    description: "Lavender and Chamomile hand-poured soy wax candle.",
    price: 399,
    originalPrice: 599,
    category: "Home",
    images: ["https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600"],
    sustainabilityScore: 88,
    co2SavedKg: 0.9,
    isWoohlVerified: true,
    stockAvailable: 60,
    features: ["Soy Wax", "Lead-free wick"],
    reviews: []
  },
  {
    id: "p10",
    brandName: "Artisan Loom",
    brandId: "b3",
    name: "Indigo Dabu Print Saree",
    description: "Traditional Dabu mud resist printed saree in pure indigo.",
    price: 3200,
    originalPrice: 4500,
    category: "Fashion",
    images: ["https://images.unsplash.com/photo-1610189013063-80b18128362d?q=80&w=600"],
    sustainabilityScore: 94,
    co2SavedKg: 2.8,
    isWoohlVerified: true,
    stockAvailable: 12,
    features: ["Handloom", "Natural Dye"],
    reviews: []
  },
  {
    id: "p11",
    brandName: "TechNova",
    name: "Minimalist Desk Mat",
    description: "Vegan leather desk mat for a clean, organized workspace.",
    price: 899,
    originalPrice: 1299,
    category: "Tech",
    images: ["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600"],
    sustainabilityScore: 75,
    co2SavedKg: 1.2,
    isWoohlVerified: true,
    stockAvailable: 40,
    features: ["Vegan Leather", "Water Resistant"],
    reviews: []
  },
  {
    id: "p12",
    brandName: "Glow & Co",
    brandId: "b2",
    name: "Vitamin C Brightening Drops",
    description: "Powerful antioxidant serum for radiant, glowing skin.",
    price: 1499,
    originalPrice: 1899,
    category: "Skincare",
    images: ["https://images.unsplash.com/photo-1629198688000-71f23e745b6e?q=80&w=600"],
    sustainabilityScore: 82,
    co2SavedKg: 0.8,
    isWoohlVerified: true,
    stockAvailable: 85,
    features: ["Vitamin C", "Paraben Free"],
    reviews: []
  },
  {
    id: "p13",
    brandName: "Urban Earth",
    brandId: "b1",
    name: "Bamboo Fiber Socks",
    description: "Odor-resistant, super soft bamboo socks. Pack of 3.",
    price: 599,
    originalPrice: 899,
    category: "Fashion",
    images: ["https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=600"],
    sustainabilityScore: 96,
    co2SavedKg: 3.5,
    isWoohlVerified: true,
    stockAvailable: 150,
    features: ["Bamboo Fiber", "Anti-Odor"],
    reviews: []
  },
  {
    id: "p14",
    brandName: "Neon Streets",
    name: "Tactical Crossbody Bag",
    description: "Compact, durable crossbody bag with multiple utility pockets.",
    price: 1299,
    originalPrice: 1999,
    category: "Accessories",
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600"],
    sustainabilityScore: 68,
    co2SavedKg: 0.6,
    isWoohlVerified: false,
    stockAvailable: 25,
    features: ["Water Repellent"],
    reviews: []
  },
  {
    id: "p15",
    brandName: "Aura Home",
    name: "Macrame Wall Hanging",
    description: "Hand-knotted macrame wall art to bring boho vibes to your room.",
    price: 1199,
    originalPrice: 1599,
    category: "Home",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600"],
    sustainabilityScore: 91,
    co2SavedKg: 1.0,
    isWoohlVerified: true,
    stockAvailable: 20,
    features: ["100% Cotton Cord", "Handmade"],
    reviews: []
  }
];

export const mockComments: Comment[] = [
  {
    id: "c_1",
    userId: "u101",
    username: "style_guru",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    text: "The fit is absolutely perfect! Highly recommend.",
    likes: 124,
    timestamp: "2h",
  }
];

export const mockVideoFeed: VideoFeedItem[] = [
  {
    id: "v1",
    creator: mockCreators[0],
    product: mockProducts[0],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    views: 125000,
    likes: 4500,
    comments: mockComments,
    aiLiveIntel: { processing: true, missingClaims: [], verifiedReviews: 881, confidenceScore: 92 }
  },
  {
    id: "v2",
    creator: mockCreators[1],
    product: mockProducts[1],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    views: 89000,
    likes: 2100,
    comments: [],
    aiLiveIntel: { processing: true, missingClaims: ["pH level not explicitly stated"], verifiedReviews: 432, confidenceScore: 86 }
  },
  {
    id: "v3",
    creator: mockCreators[0],
    product: mockProducts[2],
    videoUrl: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    views: 45000,
    likes: 1200,
    comments: [],
    aiLiveIntel: { processing: false, missingClaims: [], verifiedReviews: 12, confidenceScore: 78 }
  }
];

export const mockAddresses: Address[] = [
  { id: "a1", type: "Home", fullAddress: "123, Palm Grove Apartments, Indiranagar, Bangalore - 560038", isDefault: true },
  { id: "a2", type: "Work", fullAddress: "WeWork Galaxy, 43 Residency Road, Bangalore - 560025", isDefault: false }
];

export const mockPaymentMethods: PaymentMethod[] = [
  { id: "pm1", type: "UPI", details: "user@okhdfcbank", isDefault: true },
  { id: "pm2", type: "Card", details: "**** **** **** 4242", isDefault: false }
];

export const mockOrders: Order[] = [
  {
    id: "ord_1001",
    date: "2023-10-15T10:00:00Z",
    total: 1299,
    status: "Out for Delivery",
    items: [{ ...mockProducts[0], quantity: 1 }],
    trackingSteps: [
      { status: "Ordered", date: "Oct 15, 10:00 AM", isCompleted: true },
      { status: "Shipped", date: "Oct 16, 2:30 PM", isCompleted: true },
      { status: "Out for Delivery", date: "Oct 17, 9:00 AM", isCompleted: true },
      { status: "Delivered", date: "Expected Today", isCompleted: false },
    ]
  }
];

export const mockGroupBuys: GroupBuyLobby[] = [];
