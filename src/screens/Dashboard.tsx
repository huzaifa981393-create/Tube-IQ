import React from 'react';
import { useTubeIQStore } from '../store/useStore';
import { 
  Eye, 
  Clock, 
  UserPlus, 
  DollarSign, 
  Bell, 
  ChevronRight,
  TrendingUp,
  Zap,
  Upload,
  Search,
  BarChart3
} from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export default function Dashboard() {
  const { channel, analytics, videos, setActiveTab, setChatOpen } = useTubeIQStore();

  if (!channel || !analytics) return null;

  const latestVideo = videos[0];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-border-subtle">
            <img src={channel.thumbnail} alt="channel" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-bold tracking-tight line-clamp-1">{channel.title}</h3>
            <p className="text-[11px] text-text3 font-mono uppercase tracking-widest">{Number(channel.subscriberCount).toLocaleString()} SUBS</p>
          </div>
        </div>
        <button className="p-2 text-text2 hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-yt-red rounded-full border-2 border-bg" />
        </button>
      </header>

      {/* Health Score & Animated Counter */}
      <section className="flex flex-col items-center gap-4 py-4">
        <HealthScore score={84} />
        <div className="text-center">
            <h2 className="text-4xl font-mono font-bold tracking-tighter text-white">
                {Number(channel.subscriberCount).toLocaleString()}
            </h2>
            <p className="text-[10px] text-text2 uppercase font-mono tracking-[0.2em] mt-1">Total Subscribers</p>
        </div>
      </section>

      {/* 2x2 Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        <StatCard 
            label="Views (28d)" 
            value={analytics.views.toLocaleString()} 
            icon={<Eye size={16} />} 
            color="text-primary-blue" 
        />
        <StatCard 
            label="Watch Time" 
            value={`${analytics.watchTimeHours}h`} 
            icon={<Clock size={16} />} 
            color="text-warning" 
        />
        <StatCard 
            label="Sub Growth" 
            value={`+${analytics.subsGained - analytics.subsLost}`} 
            icon={<UserPlus size={16} />} 
            color="text-success" 
        />
        <StatCard 
            label="Est. Revenue" 
            value={`$${analytics.revenue.toFixed(2)}`} 
            icon={<DollarSign size={16} />} 
            color="text-text1" 
        />
      </section>

      {/* Views Chart */}
      <section className="bg-surface border border-border-subtle rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between">
            <h4 className="text-[12px] uppercase font-mono tracking-widest text-text2">Views Overview</h4>
            <span className="text-[10px] text-success font-mono">+{analytics.avgCTR.toFixed(1)}% CTR</span>
        </div>
        <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.dayByDayViews}>
                    <XAxis dataKey="date" hide />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#18181B', border: '1px solid #3F3F46', color: '#FAFAFA', fontSize: '10px' }}
                        labelStyle={{ display: 'none' }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#3B82F6" 
                        strokeWidth={2} 
                        dot={false}
                        animationDuration={2000}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
      </section>

      {/* Quick Actions (as per request) */}
      <section className="space-y-4">
          <h4 className="text-[12px] uppercase font-mono tracking-widest text-text2 px-1 font-bold">Quick Intelligence</h4>
          <div className="grid grid-cols-4 gap-3">
              <ActionButton icon={<Upload size={20} />} label="Upload" onClick={() => setActiveTab('upload')} />
              <ActionButton icon={<Search size={20} />} label="SEO" onClick={() => setActiveTab('utils')} />
              <ActionButton icon={<BarChart3 size={20} />} label="Growth" onClick={() => setActiveTab('analytics')} />
              <ActionButton icon={<Zap size={20} />} label="AI Hub" onClick={() => setChatOpen(true)} />
          </div>
      </section>

      {/* Latest Video */}
      {latestVideo && (
        <section className="space-y-4">
            <div className="flex items-center justify-between text-text2 px-1">
                <h4 className="text-[12px] uppercase font-mono tracking-widest font-bold">Latest Performance</h4>
                <button className="text-[10px] flex items-center gap-1 hover:text-white transition-colors">SEE ALL <ChevronRight size={12} /></button>
            </div>
            <div className="bg-surface border border-border-subtle rounded-2xl overflow-hidden">
                <div className="aspect-video relative">
                    <img src={latestVideo.thumbnail} alt="thumb" className="w-full h-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                        <p className="text-sm font-bold line-clamp-2 leading-tight">{latestVideo.title}</p>
                    </div>
                </div>
                <div className="p-4 grid grid-cols-3 gap-2">
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] text-text3 font-mono uppercase">Views</span>
                        <span className="text-xs font-mono font-bold text-text1">{Number(latestVideo.views).toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] text-text3 font-mono uppercase">Likes</span>
                        <span className="text-xs font-mono font-bold text-text1">{Number(latestVideo.likes).toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <span className="text-[9px] text-text3 font-mono uppercase">Rank</span>
                        <span className="text-xs font-mono font-bold text-success">#1 of 10</span>
                    </div>
                </div>
            </div>
        </section>
      )}
    </div>
  );
}

function StatCard({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) {
    return (
        <div className="bg-surface border border-border-subtle rounded-2xl p-4 flex flex-col gap-2">
            <div className={`p-1.5 rounded-lg bg-surface2 w-fit ${color}`}>{icon}</div>
            <div className="flex flex-col gap-0.5">
                <span className="text-[10px] text-text3 uppercase font-mono tracking-widest">{label}</span>
                <span className="text-xl font-mono font-bold text-white tracking-tighter">{value}</span>
            </div>
        </div>
    );
}

function ActionButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button 
            onClick={onClick}
            className="flex flex-col items-center gap-2 p-3 bg-surface border border-border-subtle rounded-2xl hover:border-primary-blue/50 transition-all active:scale-95 group"
        >
            <div className="text-text3 group-hover:text-primary-blue transition-colors">{icon}</div>
            <span className="text-[9px] font-mono font-bold text-text3 uppercase tracking-widest group-hover:text-text2">{label}</span>
        </button>
    );
}

function HealthScore({ score }: { score: number }) {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-36 h-36 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="72" cy="72" r={radius}
                    stroke="var(--color-surface2)"
                    strokeWidth="8"
                    fill="transparent"
                />
                <circle
                    cx="72" cy="72" r={radius}
                    stroke="var(--color-primary-blue)"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    style={{ strokeDashoffset: offset }}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <Zap size={24} className="text-primary-blue mb-1" />
                <span className="text-3xl font-syne font-black text-white">{score}</span>
                <span className="text-[10px] text-text3 uppercase font-mono font-bold">HEALTH</span>
            </div>
        </div>
    );
}
