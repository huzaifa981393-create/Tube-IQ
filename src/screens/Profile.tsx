import React from 'react';
import { useTubeIQStore } from '../store/useStore';
import { 
  LogOut, 
  Settings, 
  Tv, 
  ExternalLink, 
  ChevronRight,
  Shield,
  HelpCircle,
  CreditCard,
  Target
} from 'lucide-react';

export default function Profile() {
  const { channel, logout } = useTubeIQStore();

  if (!channel) return null;

  return (
    <div className="flex flex-col">
       {/* Hero Header */}
       <header className="px-6 pt-12 pb-10 bg-gradient-to-b from-primary-blue/10 to-transparent flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-[2rem] border-4 border-surface overflow-hidden shadow-2xl">
                <img src={channel.thumbnail} alt="profile" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-yt-red p-1.5 rounded-xl border-4 border-bg text-white">
                <Tv size={16} />
            </div>
          </div>
          
          <div className="text-center space-y-1">
              <h2 className="text-2xl font-black font-syne tracking-tight text-white">{channel.title}</h2>
              <p className="text-text3 text-sm font-mono uppercase tracking-widest">{Number(channel.subscriberCount).toLocaleString()} Subscribers</p>
          </div>

          <div className="mt-4 flex bg-surface2 px-4 py-2 rounded-2xl border border-border-subtle items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
              <span className="text-[10px] font-mono font-black text-text2 uppercase tracking-[0.1em]">YouTube Connected</span>
          </div>
       </header>

       <div className="px-6 space-y-8 pb-10">
            <section className="space-y-4">
                <h4 className="text-[10px] uppercase font-mono font-black text-text3 tracking-widest px-1">Subscription & Perks</h4>
                <div className="bg-surface border border-border-subtle p-5 rounded-3xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary-blue/10 rounded-xl flex items-center justify-center text-primary-blue">
                             <CreditCard size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-black text-white">Tube IQ Pro Plan</span>
                            <span className="text-[10px] text-text3 font-mono uppercase">Renews in 12 days</span>
                        </div>
                    </div>
                    <ChevronRight size={18} className="text-text3" />
                </div>
            </section>

            <section className="space-y-3">
                <h4 className="text-[10px] uppercase font-mono font-black text-text3 tracking-widest px-1">Settings</h4>
                <div className="bg-surface border border-border-subtle rounded-3xl overflow-hidden divide-y divide-border-subtle">
                    <ProfileItem icon={<Settings size={18} />} label="App Preferences" />
                    <ProfileItem icon={<Shield size={18} />} label="Privacy & Security" />
                    <ProfileItem icon={<HelpCircle size={18} />} label="Help Center" />
                    <ProfileItem icon={<Target size={18} />} label="Niche Tracking" badge="TECH" />
                </div>
            </section>

            <button 
                onClick={logout}
                className="w-full h-14 bg-danger/10 border border-danger/20 text-danger rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-[11px] transition-all active:scale-95"
            >
                <LogOut size={18} /> Disconnect Channel
            </button>

            <div className="text-center space-y-2 pt-4 opacity-50">
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-text3">Tube IQ Application • v2.1.0-FIXED</p>
                <p className="text-[8px] font-mono text-text3">© 2026 IQ INTELLIGENCE SYSTEMS</p>
            </div>
       </div>
    </div>
  );
}

function ProfileItem({ icon, label, badge }: { icon: React.ReactNode, label: string, badge?: string }) {
    return (
        <button className="w-full p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group">
            <div className="p-2 bg-surface2 rounded-xl text-text3 group-hover:text-primary-blue transition-colors">{icon}</div>
            <span className="flex-1 text-left text-xs font-bold text-text2 uppercase tracking-wide">{label}</span>
            {badge && <span className="bg-primary-blue/20 text-primary-blue text-[8px] font-black px-2 py-0.5 rounded-md">{badge}</span>}
            <ChevronRight size={16} className="text-text3 group-hover:translate-x-1 transition-transform" />
        </button>
    );
}
