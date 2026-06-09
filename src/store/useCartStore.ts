import { create } from 'zustand';

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  price: number;
  quantity: number;
  imageUrl: string;
  brand: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (newItem) => {
    set((state) => {
      const existingItemIndex = state.items.findIndex(item => item.productId === newItem.productId);
      if (existingItemIndex >= 0) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += 1;
        return { items: newItems };
      }
      return {
        items: [...state.items, { ...newItem, id: Math.random().toString(), quantity: 1 }]
      };
    });
  },
  removeItem: (id) => {
    set((state) => ({ items: state.items.filter(item => item.id !== id) }));
  },
  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map(item => item.id === id ? { ...item, quantity } : item)
    }));
  },
  clearCart: () => set({ items: [] }),
  getCartTotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}));
