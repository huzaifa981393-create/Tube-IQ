import React, { useEffect, useState } from 'react';
import { useTubeIQStore } from './store/useStore';
import { 
  fetchChannelData, 
  fetchAllVideos, 
  fetchVideoStats, 
  fetchAnalytics 
} from './services/youtube';
import LoginScreen from './screens/LoginScreen';
import MainNavigation from './components/navigation/MainNavigation';
import ChatbotOverlay from './components/ai/ChatbotOverlay';
import AuthCallback from './screens/AuthCallback';
import { Toaster, toast } from 'sonner';

export default function App() {
  const { 
    token, 
    tokenExpiry, 
    isAuthenticated, 
    setToken, 
    setChannel, 
    setVideos, 
    setAnalytics, 
    setLoading,
    setError,
    isLoading
  } = useTubeIQStore();

  const [isInitializing, setIsInitializing] = useState(true);

  // Check if we are on the callback route
  const isCallback = window.location.pathname === '/auth/callback';

  // Initial load
  useEffect(() => {
    if (isCallback) {
      setIsInitializing(false);
      return;
    }
    const init = async () => {
      // Check for token in state/persistence
      if (token && tokenExpiry && Date.now() < tokenExpiry) {
        await loadAllData(token);
      }
      setIsInitializing(false);
    };
    init();
  }, []);

  const loadAllData = async (accessToken: string) => {
    setLoading(true);
    try {
      const channel = await fetchChannelData(accessToken);
      setChannel(channel);

      const rawVideos = await fetchAllVideos(accessToken, channel.uploadsPlaylistId);
      const videoIds = rawVideos.map((v: any) => v.contentDetails.videoId);
      const videoDetails = await fetchVideoStats(accessToken, videoIds);
      setVideos(videoDetails);

      const analytics = await fetchAnalytics(accessToken);
      setAnalytics(analytics);
      
    } catch (err: any) {
      console.error('Data loading error:', err);
      if (err.response?.status === 401) {
        toast.error('Session expired. Please reconnect.');
        setToken(null, null);
      } else {
        setError('Failed to fetch YouTube data.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (isInitializing) {
    return (
      <div className="h-screen w-full bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-blue border-t-transparent rounded-full animate-spin" />
          <p className="text-text2 font-mono text-sm animate-pulse tracking-widest uppercase">Initializing IQ</p>
        </div>
      </div>
    );
  }

  if (isCallback) {
    return <AuthCallback />;
  }

  if (!isAuthenticated) {
    return (
      <>
        <LoginScreen onAuthSuccess={loadAllData} />
        <Toaster position="bottom-center" />
      </>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
      <div className="h-full w-full max-w-[430px] bg-bg relative flex flex-col overflow-hidden shadow-2xl">
        {/* Screen Content Wrapper */}
        <MainNavigation />
        
        {/* Global Chatbot */}
        <ChatbotOverlay />
        
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-x-0 top-0 h-1 bg-surface2 overflow-hidden z-50">
            <div className="h-full bg-primary-blue w-1/3 animate-[shimmer_2s_infinite_linear]" />
          </div>
        )}
      </div>
      <Toaster position="bottom-center" theme="dark" />
    </div>
  );
}
