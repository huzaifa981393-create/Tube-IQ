import React, { useEffect, useState } from 'react';
import { useTubeIQStore } from '../store/useStore';
import { toast } from 'sonner';

declare global {
  interface Window {
    google: any;
  }
}

export default function LoginScreen({ onAuthSuccess }: { onAuthSuccess: (token: string) => void }) {
  const { setToken } = useTubeIQStore();

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

    // Open popup
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    window.open(
      oauthUrl,
      'google-oauth',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };


  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-8 bg-bg">
      <div className="flex flex-col items-center gap-6 max-w-sm w-full text-center">
        {/* LOGO */}
        <div className="relative">
          <div className="w-24 h-24 bg-surface border border-border-subtle rounded-3xl flex items-center justify-center text-primary-blue shadow-inner relative overflow-hidden">
             <div className="absolute inset-x-0 bottom-0 h-1/2 bg-primary-blue/5 blur-xl" />
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 22 12 2CZM9 16V8L16 12L9 16Z" fill="currentColor"/>
                <circle cx="12" cy="12" r="3" fill="var(--color-bg)" />
                <path d="M12 9V15M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
             </svg>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-syne font-extrabold tracking-tight text-white mb-2">Tube IQ</h1>
          <p className="text-text2 text-sm tracking-wide font-medium">Manage. Optimize. Dominate.</p>
        </div>

        <button 
          onClick={handleConnect}
          className="mt-8 w-full h-14 bg-[#FF0000] hover:bg-[#CC0000] text-white rounded-xl flex items-center justify-center gap-3 font-semibold transition-all active:scale-95 shadow-[0_0_40px_rgba(255,0,0,0.15)]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
          Connect with YouTube
        </button>

        <p className="mt-4 text-[11px] text-text3 uppercase font-mono tracking-widest px-4 leading-relaxed">
          Growth intelligence powered by Claude 3.5 Sonnet
        </p>
      </div>

      <div className="absolute bottom-12 text-[10px] text-text3 font-mono">
        VERSION 2.1.0-FIXED
      </div>
    </div>
  );
}
