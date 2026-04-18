import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  TrendingUp, 
  Info, 
  ArrowUpRight, 
  Filter, 
  Download,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Flame,
  Globe,
  Tag,
  History,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function Research() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!query) return;
    setIsSearching(true);
    // Mocking search results
    setTimeout(() => {
        setResults([
            { keyword: "how to use react 19", volume: "450K", competition: "Low", score: 88, trending: true },
            { keyword: "react 19 new features", volume: "125K", competition: "Medium", score: 72, trending: true },
            { keyword: "next.js 15 tutorial", volume: "310K", competition: "Low", score: 92, trending: true },
            { keyword: "javascript vs typescript 2026", volume: "50K", competition: "High", score: 45, trending: false },
            { keyword: "best ai tools for react", volume: "220K", competition: "Medium", score: 68, trending: false },
        ]);
        setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="min-h-full pb-20 p-6 pt-12 space-y-8">
      {/* Header */}
      <header className="space-y-1">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">SEO Engine</h2>
        <h1 className="text-3xl font-black font-heading tracking-tight">Keyword Research</h1>
      </header>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full h-16 bg-card border border-white/5 rounded-3xl pl-12 pr-28 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg font-medium shadow-xl shadow-black/20"
          placeholder="Enter a keyword..."
        />
        <button 
          onClick={handleSearch}
          className={cn(
            "absolute right-2 top-2 bottom-2 px-6 tube-iq-gradient rounded-2xl text-white font-bold text-sm transition-all flex items-center justify-center min-w-[100px]",
            isSearching ? "opacity-70 cursor-wait" : ""
          )}
        >
          {isSearching ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "Search"}
        </button>
      </div>

      <AnimatePresence>
        {!results.length && !isSearching && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center space-y-4"
          >
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                <History className="h-10 w-10 text-muted-foreground/30" />
            </div>
            <div className="space-y-1">
                <p className="font-bold text-muted-foreground">No recent searches</p>
                <p className="text-xs text-muted-foreground/60 max-w-[200px]">Find high-volume, low-competition keywords for your next masterpiece.</p>
            </div>
          </motion.div>
        )}

        {results.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold font-heading">Popular Results</h3>
                <div className="flex gap-2">
                    <button className="p-2 bg-card border border-white/5 rounded-xl text-muted-foreground hover:text-white"><Filter className="h-4 w-4" /></button>
                    <button className="p-2 bg-card border border-white/5 rounded-xl text-muted-foreground hover:text-white"><Download className="h-4 w-4" /></button>
                </div>
            </div>

            <div className="space-y-4">
              {results.map((res, i) => (
                <KeywordCard key={i} {...res} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggested Topics AI */}
      {!isSearching && (
        <section className="pt-4">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" /> 
                Topics You Migh Like
            </h3>
            <div className="flex flex-wrap gap-2">
                {["Tailwind v4", "React Server Components", "AI Video Editing", "Cloud Engineering", "Fullstack in 2026"].map(tag => (
                    <button 
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-4 py-2 bg-secondary/50 border border-white/5 rounded-2xl text-xs font-bold hover:bg-primary/20 hover:text-primary transition-all"
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </section>
      )}
    </div>
  );
}

function KeywordCard({ keyword, volume, competition, score, trending }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card border border-white/5 rounded-3xl overflow-hidden group">
      <div className="p-5 flex items-center justify-between gap-4">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-base leading-tight group-hover:text-primary transition-colors">{keyword}</h4>
            {trending && <div className="px-1.5 py-0.5 bg-accent/20 text-accent rounded-md text-[8px] font-black uppercase tracking-widest flex items-center gap-1"><Flame className="h-2 w-2 fill-accent" /> Trending</div>}
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Volume: {volume}/mo</p>
        </div>
        
        <div className="text-right">
            <div className={cn(
                "inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter mb-1",
                score > 70 ? "bg-accent/20 text-accent" : competition === "High" ? "bg-destructive/20 text-destructive" : "bg-warning/20 text-warning"
            )}>
                SEO: {score}
            </div>
            <p className="text-[10px] text-muted-foreground font-bold">{competition} Competition</p>
        </div>

        <button 
            onClick={() => { toast.success("Keyword saved to collection!"); }}
            className="p-2.5 bg-secondary rounded-2xl text-muted-foreground hover:text-primary transition-all"
        >
          <Bookmark className="h-5 w-5" />
        </button>
      </div>
      
      <div className="px-5 pb-5 pt-0 border-t border-white/5 flex items-center justify-between">
         <button onClick={() => setExpanded(!expanded)} className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors">
            {expanded ? "Hide Related" : "Show Related"} {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
         </button>
         <button className="text-[10px] font-bold text-primary uppercase tracking-widest flex items-center gap-1">
            Copy Tags <ArrowUpRight className="h-3 w-3" />
         </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden bg-secondary/30"
          >
            <div className="p-5 border-t border-white/5 flex flex-wrap gap-2">
                {[keyword + " basics", "learn " + keyword + " fast", keyword + " tips"].map(k => (
                    <span key={k} className="text-[10px] font-medium bg-secondary px-3 py-1.5 rounded-xl border border-white/5">{k}</span>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
