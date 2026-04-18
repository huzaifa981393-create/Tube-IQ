import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Flame, 
  TrendingUp, 
  ChevronRight, 
  Play, 
  Clock, 
  MapPin, 
  Filter,
  ArrowUpRight,
  Target,
  Rocket,
  Globe,
  Music,
  Monitor,
  Gamepad,
  Sparkles,
  Eye
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function Trending() {
  const [niche, setNiche] = useState("Technology");

  const categories = ["Technology", "Gaming", "Music", "Education", "Lifestyle"];

  const trends = [
    { title: "React 19 Server Components", potential: "98/100", velocity: "Fast", views: "2.4M", difficulty: "Medium" },
    { title: "Apple Vision Pro 2 Leaks", potential: "92/100", velocity: "Fast", views: "1.8M", difficulty: "High" },
    { title: "Next.js 15 Alpha Release", potential: "85/100", velocity: "Stable", views: "450K", difficulty: "Low" },
    { title: "Cursor AI IDE Review", potential: "82/100", velocity: "Rising", views: "850K", difficulty: "Medium" },
    { title: "LLM local with Ollama", potential: "78/100", velocity: "Rising", views: "320K", difficulty: "Low" },
  ];

  return (
    <div className="min-h-full pb-20 p-6 pt-12 space-y-8">
      <header className="space-y-1">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Market Radar</h2>
        <h1 className="text-3xl font-black font-heading tracking-tight flex items-center gap-2">
            Trending Topics <Flame className="h-8 w-8 text-accent fill-accent/20" />
        </h1>
      </header>

      {/* Categories Scroller */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-6 px-6">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setNiche(cat)}
            className={cn(
                "px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap border border-white/5",
                niche === cat ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-card text-muted-foreground hover:bg-white/5"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured Trend Card */}
      <section className="relative overflow-hidden group">
          <div className="absolute inset-0 tube-iq-gradient opacity-20 group-hover:opacity-30 transition-opacity" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
          <div className="glass p-8 rounded-3xl border-primary/20 relative z-10 flex flex-col gap-6">
              <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-accent flex items-center gap-2">
                      <Sparkles className="h-3 w-3 fill-accent" /> Opportunity of the Day
                  </span>
                  <h3 className="text-2xl font-black font-heading">Generative AI Video</h3>
              </div>
              <div className="flex items-center gap-8">
                  <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Est. Reach</span>
                      <span className="text-xl font-data font-black">5.2M</span>
                  </div>
                  <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Difficulty</span>
                      <span className="text-xl font-data font-black text-accent">LOW</span>
                  </div>
              </div>
              <button className="w-full py-4 bg-white/10 hover:bg-white/20 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 group">
                  Plan Video <Rocket className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
          </div>
      </section>

      {/* Trend List */}
      <section className="space-y-4">
          <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Niche Top Trends</h3>
              <Globe className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-4">
              {trends.map((trend, i) => (
                  <TrendItem key={i} {...trend} />
              ))}
          </div>
      </section>

      {/* Niche Global Stats */}
      <section className="grid grid-cols-2 gap-4">
          <div className="bg-card border border-white/5 p-5 rounded-3xl space-y-4">
              <div className="p-3 bg-accent/20 rounded-2xl w-fit">
                  <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Top Geo</h4>
                  <p className="text-sm font-black">United States, India</p>
              </div>
          </div>
          <div className="bg-card border border-white/5 p-5 rounded-3xl space-y-4">
              <div className="p-3 bg-primary/20 rounded-2xl w-fit">
                  <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Best Push</h4>
                  <p className="text-sm font-black">Tue • 4:00 PM</p>
              </div>
          </div>
      </section>
    </div>
  );
}

function TrendItem({ title, potential, velocity, views, difficulty }: any) {
    return (
        <div className="flex items-center justify-between p-5 bg-card border border-white/5 rounded-3xl group hover:border-accent/30 transition-all cursor-pointer">
            <div className="flex flex-col gap-1.5 flex-1">
                <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold line-clamp-1 group-hover:text-accent transition-colors">{title}</h4>
                    {velocity === "Fast" && <TrendingUp className="h-3 w-3 text-accent" />}
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                         <Eye className="h-3 w-3" /> {views}
                    </span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                         <Target className="h-3 w-3" /> Dif: {difficulty}
                    </span>
                </div>
            </div>
            <div className="text-right pl-4">
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5">Score</div>
                <div className="text-base font-black font-data text-accent">{potential}</div>
            </div>
        </div>
    );
}
