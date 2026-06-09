import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../lib/mock-db/types';

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
}

// Wallet Slice
interface WalletSlice {
  referralBalance: number;
  referralThreshold: number;
  addReferralBonus: (amount: number) => void;
  useWalletBalance: (amount: number) => void;
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

// Mega Store Type combining all slices
type StoreState = AuthSlice & CartSlice & WalletSlice & EcoSlice & ClosetSlice & AnalyticsSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Auth implementation
      isAuthenticated: false,
      user: null,
      login: (name) => set({ isAuthenticated: true, user: { id: 'u1', name, avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200' } }),
      logout: () => set({ isAuthenticated: false, user: null }),

      // Cart implementation
      cart: [],
      addToCart: (product) => set((state) => {
        get().logCartAddition();
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

      // Wallet implementation
      referralBalance: 120, // Start with some mock balance
      referralThreshold: 600,
      addReferralBonus: (amount) => set((state) => ({ referralBalance: state.referralBalance + amount })),
      useWalletBalance: (amount) => set((state) => ({ referralBalance: Math.max(0, state.referralBalance - amount) })),

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
