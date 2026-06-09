import { create } from 'zustand';

interface VideoFeedState {
  activeVideoIndex: number;
  isMuted: boolean;
  setActiveVideoIndex: (index: number) => void;
  toggleMute: () => void;
  setMuted: (muted: boolean) => void;
}

export const useVideoFeedStore = create<VideoFeedState>((set) => ({
  activeVideoIndex: 0,
  isMuted: false,
  setActiveVideoIndex: (index) => set({ activeVideoIndex: index }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setMuted: (muted) => set({ isMuted: muted }),
}));
