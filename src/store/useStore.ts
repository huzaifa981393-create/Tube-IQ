import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ChannelData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  subscriberCount: string;
  viewCount: string;
  videoCount: string;
  uploadsPlaylistId: string;
  publishedAt: string;
}

interface VideoData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  views: string;
  likes: string;
  comments: string;
  duration: string;
  tags?: string[];
  privacyStatus: string;
}

interface AnalyticsData {
  views: number;
  watchTimeHours: number;
  subsGained: number;
  subsLost: number;
  revenue: number;
  avgCTR: number;
  dayByDayViews: { date: string, value: number }[];
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface TubeIQState {
  // Auth
  token: string | null;
  tokenExpiry: number | null;
  isAuthenticated: boolean;
  
  // Channel
  channel: ChannelData | null;
  videos: VideoData[];
  analytics: AnalyticsData | null;
  
  // UI
  activeTab: string;
  isLoading: boolean;
  error: string | null;
  
  // Chat
  chatMessages: ChatMessage[];
  isChatOpen: boolean;
  
  // Setters
  setToken: (token: string | null, expiry: number | null) => void;
  setChannel: (channel: ChannelData | null) => void;
  setVideos: (videos: VideoData[]) => void;
  setAnalytics: (analytics: AnalyticsData | null) => void;
  setActiveTab: (tab: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setChatOpen: (open: boolean) => void;
  addChatMessage: (msg: ChatMessage) => void;
  logout: () => void;
}

export const useTubeIQStore = create<TubeIQState>()(
  persist(
    (set) => ({
      token: null,
      tokenExpiry: null,
      isAuthenticated: false,
      channel: null,
      videos: [],
      analytics: null,
      activeTab: 'home',
      isLoading: false,
      error: null,
      chatMessages: [],
      isChatOpen: false,

      setToken: (token, expiry) => set({ 
        token, 
        tokenExpiry: expiry, 
        isAuthenticated: !!token && !!expiry && Date.now() < expiry 
      }),
      setChannel: (channel) => set({ channel }),
      setVideos: (videos) => set({ videos }),
      setAnalytics: (analytics) => set({ analytics }),
      setActiveTab: (activeTab) => set({ activeTab }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setChatOpen: (isChatOpen) => set({ isChatOpen }),
      addChatMessage: (msg) => set((state) => ({ 
        chatMessages: [...state.chatMessages, msg] 
      })),
      logout: () => set({
        token: null,
        tokenExpiry: null,
        isAuthenticated: false,
        channel: null,
        videos: [],
        analytics: null,
        chatMessages: [],
        activeTab: 'home'
      })
    }),
    {
      name: 'tube-iq-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        tokenExpiry: state.tokenExpiry,
        isAuthenticated: state.isAuthenticated,
        channel: state.channel,
        videos: state.videos,
        analytics: state.analytics
      }),
    }
  )
);
