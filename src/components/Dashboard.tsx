import React from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Eye, 
  Clock, 
  DollarSign, 
  TrendingUp, 
  Zap, 
  Bell, 
  Search, 
  Plus, 
  ChevronRight,
  Play,
  Lightbulb,
  ArrowUpRight,
  Target,
  BarChart,
  Tag
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const data = [
  { name: "Mon", views: 4000 },
  { name: "Tue", views: 3000 },
  { name: "Wed", views: 5000 },
  { name: "Thu", views: 4500 },
  { name: "Fri", views: 6000 },
  { name: "Sat", views: 7500 },
  { name: "Sun", views: 9000 },
];

export function Dashboard() {
  return (
    <div className="min-h-full pb-20">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-10 pb-6 shrink-0 z-20 sticky top-0 bg-background/80 backdrop-blur-lg">
        <div>
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Dashboard</h2>
          <h1 className="text-2xl font-black font-heading tracking-tight">Channel Health</h1>
        </div>
        <div className="flex items-center gap-3">
            <button className="p-2.5 bg-card border border-white/5 rounded-xl hover:bg-white/5 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-background" />
            </button>
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10">
                <img src="https://picsum.photos/seed/tubeiq-user/100" alt="avatar" />
            </div>
        </div>
      </header>

      <div className="px-6 space-y-8">
        {/* Health Score & Stats */}
        <section className="flex flex-col gap-6">
            <div className="relative group">
                <div className="absolute inset-0 tube-iq-gradient blur-3xl opacity-10 rounded-full" />
                <div className="glass p-6 rounded-3xl flex items-center justify-between relative z-10 border-white/10">
                    <div className="space-y-1">
                        <h3 className="text-4xl font-black font-heading">84</h3>
                        <p className="text-xs font-bold text-accent uppercase tracking-widest">Health Score</p>
                        <p className="text-[10px] text-muted-foreground mt-2 max-w-[120px]">Channel momentum is strong this week.</p>
                    </div>
                    {/* Progress Circle Placeholder */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="48" cy="48" r="40" className="stroke-white/5" strokeWidth="8" fill="transparent" />
                            <circle cx="48" cy="48" r="40" className="stroke-accent" strokeWidth="8" fill="transparent" strokeDasharray="251" strokeDashoffset="40" strokeLinecap="round" />
                        </svg>
                        <Zap className="absolute h-8 w-8 text-accent fill-accent/20 animate-pulse" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <StatCard icon={<Eye className="h-4 w-4 text-primary" />} label="Views" value="12.4K" trend="+15%" />
                <StatCard icon={<Users className="h-4 w-4 text-accent" />} label="Subs" value="+842" trend="+8%" />
                <StatCard icon={<Clock className="h-4 w-4 text-warning" />} label="Watch Time" value="420h" trend="+12%" />
                <StatCard icon={<DollarSign className="h-4 w-4 text-green-500" />} label="Avg. CPM" value="$4.2" trend="+2%" />
            </div>
        </section>

        {/* Action Buttons */}
        <section className="grid grid-cols-4 gap-2">
            {[
                { icon: <Search className="h-5 w-5" />, label: "SEO" },
                { icon: <Play className="h-5 w-5" />, label: "Tags" },
                { icon: <Target className="h-5 w-5" />, label: "Spy" },
                { icon: <BarChart className="h-5 w-5" />, label: "Stats" }
            ].map((btn, i) => (
                <button key={i} className="flex flex-col items-center gap-2 p-3 bg-card border border-white/5 rounded-2xl hover:bg-white/5 transition-all text-muted-foreground hover:text-white">
                    <div className="p-2 bg-secondary rounded-xl text-primary">{btn.icon}</div>
                    <span className="text-[10px] font-bold uppercase tracking-wider">{btn.label}</span>
                </button>
            ))}
        </section>

        {/* Featured Video Card */}
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-heading">Top Performing</h3>
                <button className="text-xs font-bold text-primary flex items-center gap-1">View All <ChevronRight className="h-3 w-3" /></button>
            </div>
            <div className="bg-card border border-white/5 rounded-3xl overflow-hidden group">
                <div className="relative aspect-video">
                    <img src="https://picsum.photos/seed/youtube-thumb/800/450" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="thumbnail" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-sm font-bold line-clamp-2 leading-tight">Mastering React 19: Full Course for Developers</p>
                    </div>
                    <div className="absolute top-4 left-4 px-2 py-1 bg-primary text-[10px] font-black uppercase tracking-widest rounded-lg">Top 1</div>
                </div>
                <div className="p-4 flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Views</span>
                        <span className="text-sm font-black">4.2K</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">CTR</span>
                        <span className="text-sm font-black text-accent">12.4%</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">AWD</span>
                        <span className="text-sm font-black">8:12</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Growth Insight AI */}
        <section className="bg-accent/10 border border-accent/20 rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl" />
            <div className="flex items-start gap-4 relative z-10">
                <div className="p-3 bg-accent/20 rounded-2xl">
                    <Lightbulb className="h-6 w-6 text-accent" />
                </div>
                <div>
                    <h4 className="font-bold text-accent mb-1 flex items-center gap-2">
                        AI Growth Tip 
                        <span className="text-[10px] px-1.5 py-0.5 bg-accent/20 rounded-md">NEW</span>
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed italic">
                        "Your audience response to 'Tutorial' titles is 3x higher than 'Vlog' posts. Consider re-framing your next video as a step-by-step guide to boost reach by ~24%."
                    </p>
                </div>
            </div>
        </section>

        {/* Recent Analytics Chart */}
        <section className="space-y-4">
            <h3 className="text-lg font-bold font-heading">Views Over Time</h3>
            <div className="h-[250px] w-full glass rounded-3xl p-4 overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1E2A3A" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 10}} hide />
                        <Tooltip 
                            contentStyle={{backgroundColor: '#111827', border: '1px solid #1E2A3A', borderRadius: '12px'}}
                            itemStyle={{color: '#2563EB'}}
                        />
                        <Area type="monotone" dataKey="views" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </section>

        <section className="pb-10">
            <h3 className="text-lg font-bold font-heading mb-4">Upcoming Schedule</h3>
            <div className="space-y-4">
                <ScheduleItem title="Next.js 15 Deep Dive" date="Tomorrow, 6 PM" status="Scripting" />
                <ScheduleItem title="My Setup 2026" date="Apr 21, 2 PM" status="Idea" />
            </div>
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
    return (
        <div className="bg-card border border-white/5 p-4 rounded-2xl space-y-2 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between">
                <div className="p-2 bg-secondary rounded-xl uppercase tracking-widest">{icon}</div>
                <span className="text-[10px] font-bold text-accent">{trend}</span>
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
                <span className="text-xl font-black font-heading">{value}</span>
            </div>
        </div>
    );
}

function ScheduleItem({ title, date, status }: { title: string, date: string, status: string }) {
    return (
        <div className="flex items-center justify-between p-4 bg-card border border-white/5 rounded-3xl group hover:border-primary/30 transition-all cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center font-black group-hover:tube-iq-gradient group-hover:text-white transition-all">
                    {title[0]}
                </div>
                <div>
                    <h4 className="text-sm font-bold line-clamp-1">{title}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mt-0.5">{date}</p>
                </div>
            </div>
            <div className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-all">
                {status}
            </div>
        </div>
    );
}
