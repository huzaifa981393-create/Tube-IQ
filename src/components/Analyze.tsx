import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Play, 
  BarChart, 
  Target, 
  Link as LinkIcon, 
  Zap, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle,
  ThumbsUp,
  Share2,
  Users,
  Eye,
  ArrowUpRight,
  Sparkles,
  Bot
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function Analyze() {
  const [activeSubTab, setActiveSubTab] = useState("video");
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const startAnalysis = () => {
    if (!url) return;
    setIsAnalyzing(true);
    setTimeout(() => {
        setIsAnalyzing(false);
        setShowResult(true);
        toast.success("Analysis complete!");
    }, 2000);
  };

  return (
    <div className="min-h-full pb-20">
      {/* Sub Tabs */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-lg pt-12 p-6 z-20 space-y-4">
        <header className="space-y-1">
          <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Strategy Center</h2>
          <h1 className="text-3xl font-black font-heading tracking-tight">Intelligence</h1>
        </header>

        <div className="flex bg-card p-1.5 rounded-2xl border border-white/5 shadow-inner">
            <button 
                onClick={() => { setActiveSubTab("video"); setShowResult(false); }}
                className={cn(
                    "flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                    activeSubTab === "video" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-white"
                )}
            >
                Video Analyzer
            </button>
            <button 
                onClick={() => { setActiveSubTab("competitor"); setShowResult(false); }}
                className={cn(
                    "flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                    activeSubTab === "competitor" ? "bg-primary text-white shadow-lg" : "text-muted-foreground hover:text-white"
                )}
            >
                Competitor Spy
            </button>
        </div>
      </div>

      <div className="px-6 space-y-8">
          {!showResult ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 pt-10"
              >
                  <div className="space-y-2 text-center">
                    <div className="w-16 h-16 tube-iq-gradient rounded-3xl flex items-center justify-center mx-auto mb-4 animate-bounce">
                        {activeSubTab === "video" ? <LinkIcon className="h-8 w-8 text-white" /> : <Target className="h-8 w-8 text-white" />}
                    </div>
                    <h3 className="text-xl font-black font-heading tracking-tight">
                        {activeSubTab === "video" ? "Deep Video Analysis" : "Spy on a Creator"}
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-[280px] mx-auto">
                        {activeSubTab === "video" ? "Paste a video URL to get SEO scores, tag improvements and CTR predictions." : "Enter a channel URL to see their best performing content and tags."}
                    </p>
                  </div>

                  <div className="space-y-4">
                        <div className="relative group">
                            <input 
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="w-full h-16 bg-card border border-white/5 rounded-3xl pl-6 pr-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium text-sm"
                                placeholder={activeSubTab === "video" ? "https://youtube.com/watch?v=..." : "youtube.com/@competitor"}
                            />
                        </div>
                        <button 
                            disabled={!url || isAnalyzing}
                            onClick={startAnalysis}
                            className="w-full py-5 tube-iq-gradient rounded-2xl text-white font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-all disabled:opacity-50"
                        >
                            {isAnalyzing ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Run Intelligence"}
                        </button>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center mb-4">Popular Channels Analysed</p>
                      <div className="flex justify-center -space-x-3 overflow-hidden">
                          {[1,2,3,4,5].map(i => (
                              <img key={i} src={`https://picsum.photos/seed/face-${i}/40`} className="inline-block h-10 w-10 rounded-full ring-2 ring-background" alt="" />
                          ))}
                      </div>
                  </div>
              </motion.div>
          ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8 pb-10"
              >
                  {activeSubTab === "video" ? <VideoResult /> : <CompetitorResult />}
                  
                  <button onClick={() => setShowResult(false)} className="w-full py-4 border border-white/5 rounded-2xl text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-white transition-colors">
                      Run Another Analysis
                  </button>
              </motion.div>
          )}
      </div>
    </div>
  );
}

function VideoResult() {
    return (
        <div className="space-y-6">
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="https://picsum.photos/seed/ana/800/450" className="w-full h-full object-cover" alt="" />
                <div className="absolute top-4 right-4 px-3 py-1.5 glass rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 border-accent/20 text-accent">
                    <Zap className="h-3 w-3 fill-accent" /> SEO Score: 92/100
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <MetricBox label="CTR Prediction" value="HIGH" color="text-accent" />
                <MetricBox label="Est. Retention" value="74%" color="text-primary" />
                <MetricBox label="Tag Score" value="A+" color="text-accent" />
                <MetricBox label="Keyword Strength" value="High" color="text-primary" />
            </div>

            <section className="bg-card p-6 rounded-3xl border border-white/5 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" /> AI Insights
                </h3>
                <div className="space-y-3">
                    <InsightItem type="good" text="Excellent title length and keyword placement." />
                    <InsightItem type="good" text="Tags are highly relevant to current trends." />
                    <InsightItem type="warn" text="Description lacks structured timestamps for SEO." />
                    <InsightItem type="warn" text="Thumbnail faces are slightly too small for mobile." />
                </div>
            </section>

            <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-heading font-black">Suggested Tags</h3>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">34 Tags Generated</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {["reactjs tutorials", "web dev 2026", "front-end performance", "coding tips", "js secrets"].map(tag => (
                        <div key={tag} className="px-3 py-1.5 bg-secondary/50 rounded-xl text-xs font-medium border border-white/5 flex items-center gap-2">
                            {tag} <span className="text-[8px] font-bold text-accent">88%</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

function CompetitorResult() {
    return (
        <div className="space-y-6">
            <header className="flex items-center gap-4 bg-card p-4 rounded-3xl border border-white/5">
                <img src="https://picsum.photos/seed/comp/100" className="w-16 h-16 rounded-2xl" alt="" />
                <div>
                    <h3 className="font-black font-heading text-lg">TechMaster Pro</h3>
                    <p className="text-xs text-muted-foreground">1.2M Subscribers • 452 Videos</p>
                </div>
                <ArrowUpRight className="ml-auto h-6 w-6 text-primary" />
            </header>

            <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 glass rounded-2xl border-white/5">
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Growth</p>
                    <p className="text-sm font-black text-accent">+12K</p>
                </div>
                <div className="p-3 glass rounded-2xl border-white/5">
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Frequency</p>
                    <p className="text-sm font-black text-primary">3/wk</p>
                </div>
                <div className="p-3 glass rounded-2xl border-white/5">
                    <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-1">ER</p>
                    <p className="text-sm font-black text-accent">14.2%</p>
                </div>
            </div>

            <section className="space-y-4">
                <h3 className="font-heading font-black">Top Ranking Keywords</h3>
                <div className="space-y-3">
                    {[
                        { k: "nextjs 15 setup", s: "88%" },
                        { k: "react vs vue 2026", s: "74%" },
                        { k: "coding setups", s: "62%" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-secondary/40 rounded-2xl border border-white/5">
                            <span className="text-sm font-bold">{item.k}</span>
                            <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-background rounded-full overflow-hidden">
                                     <div className="h-full bg-primary" style={{width: item.s}} />
                                </div>
                                <span className="text-[10px] font-black">{item.s}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-primary/10 border border-primary/20 rounded-3xl p-6">
                <h4 className="font-heading font-black text-primary mb-2 flex items-center gap-2">Beat this channel strategy</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    This competitor is weak in <b>'Shorts'</b> and <b>'Project Based Tutorials'</b>. If you publish a 10-minute project walkthrough every Tuesday at 2 PM, you can capture ~15% of their active audience.
                </p>
            </section>
        </div>
    );
}

function MetricBox({ label, value, color }: { label: string, value: string, color: string }) {
    return (
        <div className="p-4 bg-card border border-white/5 rounded-2xl space-y-1">
            <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
            <p className={cn("text-lg font-black font-data tracking-tight", color)}>{value}</p>
        </div>
    );
}

function InsightItem({ type, text }: { type: 'good' | 'warn', text: string }) {
    return (
        <div className="flex items-start gap-3">
            {type === 'good' ? <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" /> : <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />}
            <p className="text-xs text-muted-foreground leading-snug">{text}</p>
        </div>
    );
}
