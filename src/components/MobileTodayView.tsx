import React from "react";
import { 
  Menu, 
  Wifi, 
  Battery, 
  Rocket, 
  CircleCheck, 
  ChevronRight, 
  Puzzle, 
  Target, 
  Medal, 
  Play, 
  Calendar, 
  Sparkles, 
  LayoutDashboard, 
  Search, 
  Lightbulb 
} from "lucide-react";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Sidebar } from "@/components/Sidebar";

export function MobileTodayView({ onTabChange, activeTab }: { onTabChange: (tab: string) => void, activeTab: string }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="flex flex-col h-full bg-black text-white font-sans selection:bg-primary/30 relative">
      {/* Status Bar (Hide on very small screens or real mobile? keep for 'screenshot' look) */}
      <div className="flex justify-between items-center px-6 pt-3 pb-1 text-[12px] font-medium opacity-90 shrink-0">
        <span>5:11</span>
        <div className="flex items-center gap-1.5">
          <Wifi className="h-3 w-3" />
          <div className="flex gap-0.5 items-end h-3">
             <div className="w-0.5 h-1 bg-white" />
             <div className="w-0.5 h-1.5 bg-white" />
             <div className="w-0.5 h-2 bg-white" />
             <div className="w-0.5 h-2.5 bg-white opacity-40" />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-[10px]">41%</span>
            <div className="relative w-5 h-2.5 border border-white/40 rounded-[2px] p-[1px]">
              <div className="h-full bg-white w-[41%] rounded-[1px]" />
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-0.5 h-1 bg-white/40 rounded-r-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shrink-0">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <button className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors outline-none">
              <Menu className="h-6 w-6" />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-white/10 bg-black w-72">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={(tab) => {
                onTabChange(tab);
                setIsMenuOpen(false);
              }} 
              className="border-none bg-transparent"
            />
          </SheetContent>
        </Sheet>
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center bg-gradient-to-br from-zinc-800 to-black shadow-inner">
            <span className="text-sm font-black tracking-tighter italic">HK</span>
          </div>
          <span className="text-[8px] font-bold tracking-[0.2em] mt-1 text-zinc-500 uppercase">Pro Plays</span>
        </div>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-6 space-y-8 pb-32 no-scrollbar">
        {/* Optimize Heading */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚀</span>
            <h1 className="text-2xl font-black tracking-tight">Optimize Recent Video</h1>
          </div>
          <button className="px-5 py-1.5 bg-zinc-800/80 rounded-full text-sm font-bold text-zinc-300 hover:bg-zinc-700 transition-colors">
            See all
          </button>
        </section>

        {/* Featured Card */}
        <div className="p-5 rounded-3xl bg-zinc-900 border border-white/5 flex gap-4 items-center shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-16 h-16 rounded-2xl bg-black border border-white/10 flex items-center justify-center shrink-0 shadow-lg">
            <div className="text-xl font-black italic bg-gradient-to-br from-blue-400 via-orange-500 to-red-500 bg-clip-text text-transparent">HK</div>
          </div>
          <div className="flex-1 space-y-2">
             <h3 className="font-bold text-lg leading-tight">HK PRO PLAYS is live</h3>
             <div className="flex gap-2">
                <span className="px-3 py-0.5 rounded-full bg-yellow-500 text-black text-[10px] font-black uppercase tracking-wider">Title 52</span>
                <span className="px-3 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider">Thumbnail 17</span>
             </div>
          </div>
        </div>

        {/* Daily Tasks Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-red-500/10 rounded-lg">
              <Target className="h-5 w-5 text-red-500" />
            </div>
            <h2 className="text-lg font-black tracking-tight italic">Daily Tasks 1/2</h2>
          </div>

          <div className="space-y-3">
            {/* Task 1 */}
            <div className="p-5 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-between group hover:bg-zinc-800/50 transition-all">
               <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                    <Puzzle className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Channel Management</p>
                    <p className="font-bold text-sm">Connect Your YouTube Channel</p>
                  </div>
               </div>
               <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                  <CircleCheck className="h-4 w-4 text-white" />
               </div>
            </div>

            {/* Task 2 */}
            <div className="p-5 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-between group hover:bg-zinc-800/50 transition-all">
               <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center relative">
                    <Target className="h-6 w-6 text-purple-500" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                       <div className="w-1 h-1 bg-yellow-400 rounded-full" />
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Personal Growth</p>
                    <p className="font-bold text-sm">Add Your Goal</p>
                  </div>
               </div>
               <ChevronRight className="h-5 w-5 text-zinc-700 group-hover:text-white transition-colors" />
            </div>
          </div>
        </section>

        {/* Growth Plan Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-yellow-500/10 rounded-lg">
              <Medal className="h-5 w-5 text-yellow-500" />
            </div>
            <h2 className="text-lg font-black tracking-tight italic">Today's Growth Plan 0/2</h2>
          </div>

          <div className="p-5 rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-between group hover:bg-zinc-800/50 transition-all">
             <div className="flex gap-4 items-center">
                <div className="w-12 h-12 rounded-2xl bg-red-600/20 flex items-center justify-center">
                   <Play className="h-6 w-6 text-red-600 fill-red-600" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Foundations for Success - 3 MIN</p>
                  <p className="font-bold text-sm text-zinc-200">The Key for</p>
                </div>
             </div>
             <ChevronRight className="h-5 w-5 text-zinc-700 group-hover:text-white transition-colors" />
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <footer className="fixed bottom-0 w-full bg-black/80 backdrop-blur-3xl border-t border-white/5 px-4 pt-4 pb-8 z-20">
        <div className="flex justify-around items-end max-w-md mx-auto">
          <div 
            className={cn(
              "flex flex-col items-center gap-1 cursor-pointer transition-all",
              activeTab === "today" ? "opacity-100 scale-110" : "opacity-40 hover:opacity-100"
            )}
            onClick={() => onTabChange("today")}
          >
             <div className="h-6 flex items-center justify-center relative">
                <Calendar className={cn("h-5 w-5", activeTab === "today" ? "text-purple-500" : "text-white")} />
                {activeTab === "today" && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full blur-[4px] animate-pulse" />
                )}
             </div>
             <span className={cn("text-[10px] font-black uppercase tracking-wider", activeTab === "today" ? "text-purple-500" : "text-zinc-500")}>Today</span>
          </div>

          <div 
            className={cn(
               "flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-pointer",
               activeTab === "coach" && "opacity-100"
            )}
            onClick={() => onTabChange("coach")}
          >
             <div className="h-6 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-wider">Coach</span>
          </div>

          <div 
             className={cn(
               "flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-pointer",
               activeTab === "optimize" && "opacity-100"
             )}
            onClick={() => onTabChange("optimize")}
          >
             <div className="h-6 flex items-center justify-center">
                <Rocket className="h-5 w-5" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-wider">Optimize</span>
          </div>

          <div 
             className={cn(
               "flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-pointer",
               activeTab === "keywords" && "opacity-100"
             )}
            onClick={() => onTabChange("keywords")}
          >
             <div className="h-6 flex items-center justify-center">
                <Search className="h-5 w-5" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-wider">Keywords</span>
          </div>

          <div 
             className={cn(
               "flex flex-col items-center gap-1 opacity-40 hover:opacity-100 transition-opacity cursor-pointer",
               activeTab === "ideas" && "opacity-100"
             )}
            onClick={() => onTabChange("ideas")}
          >
             <div className="h-6 flex items-center justify-center">
                <Lightbulb className="h-5 w-5" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-wider">Ideas</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
