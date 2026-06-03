import React, { useEffect } from 'react';
import { useTubeIQStore } from '../store/useStore';
import { toast } from 'sonner';
import { ImageUp, Sparkles, TrendingUp, Wand2 } from 'lucide-react';

declare global {
  interface Window {
    google: any;
  }
}

export default function LoginScreen({ onAuthSuccess }: { onAuthSuccess: (token: string) => void }) {
  const { setToken, setChannel, setVideos, setAnalytics, setActiveTab } = useTubeIQStore();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      if (event.data?.type === 'OAUTH_SUCCESS') {
        const { accessToken, expiresIn } = event.data;
        const expiry = Date.now() + (expiresIn * 1000);
        setToken(accessToken, expiry);
        onAuthSuccess(accessToken);
        toast.success('Connected successfully!');
      } else if (event.data?.type === 'OAUTH_ERROR') {
        toast.error(`Auth failed: ${event.data.error}`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onAuthSuccess, setToken]);

  const handleConnect = () => {
    const clientId = (import.meta as any).env.VITE_GOOGLE_CLIENT_ID || '839997503790-vscv1slcsbvsd838lesgqsj8d5fkn6ug.apps.googleusercontent.com';

    if (!clientId) {
      toast.error('Missing Google Client ID. Please add VITE_GOOGLE_CLIENT_ID to your environment variables in the Settings menu.');
      return;
    }

    const scopes = [
      'https://www.googleapis.com/auth/youtube',
      'https://www.googleapis.com/auth/youtube.upload',
      'https://www.googleapis.com/auth/youtube.readonly',
      'https://www.googleapis.com/auth/youtube.force-ssl',
      'https://www.googleapis.com/auth/yt-analytics.readonly',
      'https://www.googleapis.com/auth/yt-analytics-monetary.readonly',
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ];

    const redirectUri = window.location.origin + '/auth/callback';
    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${encodeURIComponent(scopes.join(' '))}&include_granted_scopes=true&prompt=consent`;
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    window.open(oauthUrl, 'google-oauth', `width=${width},height=${height},left=${left},top=${top}`);
  };

  const handleDemo = () => {
    const expiry = Date.now() + 1000 * 60 * 60 * 24;
    setToken('tubeiq-demo-token', expiry);
    setChannel({
      id: 'demo-channel',
      title: 'TubeIQ Hindi Creator',
      description: 'Gaming, facts and Shorts growth demo channel.',
      thumbnail: 'https://picsum.photos/seed/tubeiq-hindi-creator/200',
      subscriberCount: '128400',
      viewCount: '18450000',
      videoCount: '312',
      uploadsPlaylistId: 'demo-uploads',
      publishedAt: '2022-01-14T00:00:00Z',
    });
    setVideos([
      { id: 'v1', title: 'Train Ramp Challenge Gone Wrong!', description: 'High retention ramp challenge', thumbnail: 'https://picsum.photos/seed/train-ramp/640/360', publishedAt: '2026-06-01T18:30:00Z', views: '485000', likes: '42000', comments: '3100', duration: 'PT38S', tags: ['shorts', 'challenge', 'viral'], privacyStatus: 'public' },
      { id: 'v2', title: '99% Log Ye AI Fact Nahi Jante', description: 'AI facts in Hindi', thumbnail: 'https://picsum.photos/seed/ai-facts-hindi/640/360', publishedAt: '2026-05-30T18:30:00Z', views: '312000', likes: '28000', comments: '1900', duration: 'PT44S', tags: ['ai', 'facts', 'hindi'], privacyStatus: 'public' },
      { id: 'v3', title: '₹0 Gaming Setup Hack', description: 'Budget gaming hack', thumbnail: 'https://picsum.photos/seed/gaming-hack/640/360', publishedAt: '2026-05-27T18:30:00Z', views: '224000', likes: '16500', comments: '980', duration: 'PT52S', tags: ['gaming', 'hack'], privacyStatus: 'public' },
    ]);
    setAnalytics({
      views: 1840000,
      watchTimeHours: 22900,
      subsGained: 14800,
      subsLost: 420,
      revenue: 1840.75,
      avgCTR: 8.7,
      dayByDayViews: [
        { date: 'Mon', value: 182000 }, { date: 'Tue', value: 210000 }, { date: 'Wed', value: 195000 },
        { date: 'Thu', value: 260000 }, { date: 'Fri', value: 310000 }, { date: 'Sat', value: 338000 }, { date: 'Sun', value: 345000 },
      ],
    });
    setActiveTab('utils');
    toast.success('TubeIQ demo workspace ready');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top,rgba(255,0,51,0.22),transparent_34%),linear-gradient(180deg,#09090B,#000)] overflow-hidden relative">
      <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-yt-red/20 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-primary-blue/15 blur-3xl" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        <div className="glass-card rounded-[2rem] p-7 text-center tubeiq-red-glow">
          <div className="mx-auto w-24 h-24 rounded-[2rem] bg-yt-red border border-yt-red/40 flex items-center justify-center text-white shadow-[0_20px_60px_rgba(255,0,51,0.32)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
            <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor" className="relative">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>

          <p className="mt-6 text-[10px] text-yt-red font-mono uppercase tracking-[0.3em]">India's AI YouTube Growth Assistant</p>
          <h1 className="mt-2 text-5xl font-syne font-extrabold tracking-tight text-white">TubeIQ</h1>
          <p className="mt-3 text-text2 text-sm leading-relaxed">YouTubers ke liye AI video ideas, viral titles, thumbnail analyzer, SEO score, tags, trends, competitor spy, scripts aur Shorts predictor — all in one app.</p>

          <div className="grid grid-cols-2 gap-3 mt-7 text-left">
            <FeaturePill icon={<Wand2 size={16} />} title="1 Tap Viral" />
            <FeaturePill icon={<ImageUp size={16} />} title="Thumbnail AI" />
            <FeaturePill icon={<TrendingUp size={16} />} title="India Trends" />
            <FeaturePill icon={<Sparkles size={16} />} title="Hindi Support" />
          </div>

          <div className="mt-8 space-y-3">
            <button onClick={handleDemo} className="w-full h-14 bg-yt-red hover:bg-red-700 text-white rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-wider transition-all active:scale-95 shadow-[0_18px_45px_rgba(255,0,51,0.28)]">
              <Sparkles size={20} /> Explore TubeIQ Demo
            </button>
            <button onClick={handleConnect} className="w-full h-13 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all active:scale-95">
              Connect with YouTube Studio
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-text3 font-mono uppercase tracking-widest leading-relaxed px-4">OpenAI/Gemini-ready architecture • Firebase/Node ready • Mobile first dark glass UI</p>
      </div>
    </div>
  );
}

function FeaturePill({ icon, title }: { icon: React.ReactNode; title: string }) {
  return <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-3 flex items-center gap-2 text-xs font-bold text-white"><span className="text-yt-red">{icon}</span>{title}</div>;
}
