import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface UserProfile {
  id: string;
  phone: string;
  name?: string;
  interests?: string[];
  role: 'buyer' | 'creator' | 'brand';
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isOnboardingCompleted: boolean;
  isLoading: boolean;
  login: (token: string, user: UserProfile) => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: (interests: string[]) => Promise<void>;
  checkAuth: () => Promise<void>;
}

const TOKEN_KEY = 'woohl_access_token';
const USER_KEY = 'woohl_user_profile';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isOnboardingCompleted: false,
  isLoading: true,

  login: async (token, user) => {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
      set({ token, user, isAuthenticated: true, isOnboardingCompleted: !!user.interests?.length });
    } catch (error) {
      console.error('Error securely storing auth info', error);
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_KEY);
      set({ token: null, user: null, isAuthenticated: false, isOnboardingCompleted: false });
    } catch (error) {
      console.error('Error deleting auth info', error);
    }
  },

  completeOnboarding: async (interests) => {
    try {
      const { user } = get();
      if (!user) return;
      const updatedUser = { ...user, interests };
      await SecureStore.setItemAsync(USER_KEY, JSON.stringify(updatedUser));
      set({ user: updatedUser, isOnboardingCompleted: true });
    } catch (error) {
      console.error('Error saving onboarding info', error);
    }
  },

  checkAuth: async () => {
    try {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userStr = await SecureStore.getItemAsync(USER_KEY);
      if (token && userStr) {
        const user = JSON.parse(userStr) as UserProfile;
        set({ token, user, isAuthenticated: true, isOnboardingCompleted: !!user.interests?.length });
      } else {
        set({ isAuthenticated: false });
      }
    } catch (error) {
      set({ isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
