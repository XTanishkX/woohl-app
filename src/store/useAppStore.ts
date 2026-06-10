import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, Address, PaymentMethod, Order } from '../lib/mock-db/types';
import { mockAddresses, mockPaymentMethods, mockOrders } from '../lib/mock-db/data';

// Auth Slice
interface AuthSlice {
  isAuthenticated: boolean;
  user: { id: string; name: string; avatarUrl: string } | null;
  login: (name: string) => void;
  logout: () => void;
}

// Cart Slice
export interface CartItem extends Product {
  quantity: number;
}
interface CartSlice {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Eco Slice
interface EcoSlice {
  totalCo2Saved: number;
  addCo2Saved: (amount: number) => void;
}

// Closet Slice
interface ClosetSlice {
  ownedItems: Product[];
  addToCloset: (product: Product) => void;
}

// Analytics Slice
interface AnalyticsSlice {
  cartAddTimestamps: number[];
  logCartAddition: () => void;
  isHighImpulseZone: () => boolean;
  clearAnalytics: () => void;
}

// Wallet / Coins Slice
interface WalletSlice {
  woohlCoins: number;
  referralCredits: number;
  useCoins: (amount: number) => void;
  useReferralCredits: (amount: number) => void;
}

// User Activity Slice
interface UserActivitySlice {
  wishlist: string[]; // Product IDs
  savedReels: string[]; // Reel IDs
  recentlyViewed: string[]; // Product IDs
  followingBrands: string[]; // Startup IDs
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  orders: Order[];
  toggleWishlist: (productId: string) => void;
  toggleSavedReel: (reelId: string) => void;
  addRecentlyViewed: (productId: string) => void;
  toggleFollowBrand: (startupId: string) => void;
  addAddress: (address: Address) => void;
  removeAddress: (addressId: string) => void;
  addPaymentMethod: (method: PaymentMethod) => void;
  addOrder: (order: Order) => void;
}

// Toast Slice
interface ToastSlice {
  toastMessage: string | null;
  showToast: (message: string) => void;
  hideToast: () => void;
}

// Mega Store Type combining all slices
type StoreState = AuthSlice & CartSlice & EcoSlice & ClosetSlice & AnalyticsSlice & UserActivitySlice & WalletSlice & ToastSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Auth implementation
      isAuthenticated: false,
      user: null,
      login: (name) => set({ isAuthenticated: true, user: { id: 'u1', name, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' } }),
      logout: () => set({ isAuthenticated: false, user: null }),

      // Toast implementation
      toastMessage: null,
      showToast: (message) => set({ toastMessage: message }),
      hideToast: () => set({ toastMessage: null }),

      // User Activity implementation
      wishlist: [],
      savedReels: [],
      recentlyViewed: [],
      followingBrands: [],
      addresses: mockAddresses,
      paymentMethods: mockPaymentMethods,
      orders: mockOrders,
      toggleWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.includes(productId)
          ? state.wishlist.filter(id => id !== productId)
          : [...state.wishlist, productId]
      })),
      toggleSavedReel: (reelId) => set((state) => ({
        savedReels: state.savedReels.includes(reelId)
          ? state.savedReels.filter(id => id !== reelId)
          : [...state.savedReels, reelId]
      })),
      addRecentlyViewed: (productId) => set((state) => {
        const filtered = state.recentlyViewed.filter(id => id !== productId);
        return { recentlyViewed: [productId, ...filtered].slice(0, 20) }; // Keep last 20
      }),
      toggleFollowBrand: (startupId) => set((state) => ({
        followingBrands: state.followingBrands.includes(startupId)
          ? state.followingBrands.filter(id => id !== startupId)
          : [...state.followingBrands, startupId]
      })),
      addAddress: (address) => set((state) => ({ addresses: [...state.addresses, address] })),
      removeAddress: (addressId) => set((state) => ({ addresses: state.addresses.filter(a => a.id !== addressId) })),
      addPaymentMethod: (method) => set((state) => ({ paymentMethods: [...state.paymentMethods, method] })),
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),

      // Wallet / Coins implementation
      woohlCoins: 450,
      referralCredits: 120,
      useCoins: (amount) => set((state) => ({ woohlCoins: Math.max(0, state.woohlCoins - amount) })),
      useReferralCredits: (amount) => set((state) => ({ referralCredits: Math.max(0, state.referralCredits - amount) })),

      // Cart implementation
      cart: [],
      addToCart: (product) => set((state) => {
        get().logCartAddition();
        get().showToast(`Added ${product.name} to Cart`);
        setTimeout(() => get().hideToast(), 3000);
        
        const existingItem = state.cart.find((item) => item.id === product.id);
        if (existingItem) {
          return {
            cart: state.cart.map((item) =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter((item) => item.id !== productId)
      })),
      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        ),
      })),
      clearCart: () => set({ cart: [] }),
      getCartTotal: () => get().cart.reduce((total, item) => total + item.price * item.quantity, 0),
      getCartCount: () => get().cart.reduce((count, item) => count + item.quantity, 0),

      // Eco implementation
      totalCo2Saved: 12.4, // Initial mock amount
      addCo2Saved: (amount) => set((state) => ({ totalCo2Saved: state.totalCo2Saved + amount })),

      // Closet implementation
      ownedItems: [], // Pre-populate later or dynamically
      addToCloset: (product) => set((state) => {
        const exists = state.ownedItems.find(p => p.id === product.id);
        if (exists) return state;
        return { ownedItems: [...state.ownedItems, product] };
      }),

      // Analytics implementation
      cartAddTimestamps: [],
      logCartAddition: () => set((state) => {
        const now = Date.now();
        // keep only timestamps from the last 2 minutes
        const recentTimestamps = state.cartAddTimestamps.filter(t => now - t < 120000);
        return { cartAddTimestamps: [...recentTimestamps, now] };
      }),
      isHighImpulseZone: () => {
        const state = get();
        const now = Date.now();
        const recentTimestamps = state.cartAddTimestamps.filter(t => now - t < 120000);
        // High impulse if > 3 items added in last 2 minutes
        return recentTimestamps.length >= 3;
      },
      clearAnalytics: () => set({ cartAddTimestamps: [] })
    }),
    {
      name: 'woohl-mega-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
