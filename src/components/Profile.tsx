import React from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Settings, 
  CreditCard, 
  Bell, 
  Shield, 
  HelpCircle, 
  LogOut, 
  ChevronRight,
  Tv,
  Crown,
  ChevronLeft,
  Share2,
  Lock,
  MessageSquare,
  Sparkles,
  Link2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function Profile({ onLogout }: { onLogout: () => void }) {
  const handleLogout = () => {
    toast.info("Logged out successfully");
    onLogout();
  };

  return (
    <div className="min-h-full pb-32">
       {/* Profile Header */}
       <header className="px-6 pt-16 pb-10 bg-gradient-to-b from-primary/10 to-transparent relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
              <Tv className="h-64 w-64" />
          </div>
          
          <div className="flex flex-col items-center gap-6 relative z-10">
              <div className="relative group">
                  <div className="w-28 h-28 rounded-[2rem] overflow-hidden border-4 border-card shadow-2xl relative">
                      <img src="https://picsum.photos/seed/user-p/300" alt="profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 tube-iq-gradient rounded-xl flex items-center justify-center border-4 border-background shadow-lg text-white">
                      <Tv className="h-5 w-5" />
                  </div>
              </div>
              
              <div className="text-center space-y-1">
                  <h2 className="text-2xl font-black font-heading tracking-tight">John Creator</h2>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                       youtube.com/@techjohn <span className="w-1 h-1 bg-muted-foreground rounded-full opacity-30" /> 125K Subs
                  </p>
              </div>

              <div className="px-6 py-2 bg-accent/20 border border-accent/20 rounded-full text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2">
                  <Crown className="h-4 w-4 fill-accent" /> Pro Member
              </div>
          </div>
       </header>

       <div className="px-6 space-y-8">
            <section className="space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Subscription</h3>
                <div className="p-1 tube-iq-gradient rounded-[2.5rem] shadow-xl shadow-primary/10">
                    <div className="bg-card p-6 rounded-[calc(2.5rem-4px)] flex items-center justify-between">
                        <div className="space-y-1">
                            <h4 className="text-lg font-black font-heading text-white">Tube IQ PRO</h4>
                            <p className="text-xs text-muted-foreground">Renewal on May 12, 2026</p>
                        </div>
                        <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest transition-colors">Manage</button>
                    </div>
                </div>
            </section>

            <section className="space-y-2">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Account & Security</h3>
                <div className="bg-card border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
                    <MenuItem icon={<User className="h-5 w-5" />} label="Edit Profile" />
                    <MenuItem icon={<Tv className="h-5 w-5" />} label="Connected Channels" badge="1/3" />
                    <MenuItem icon={<Lock className="h-5 w-5" />} label="Password & Security" />
                    <MenuItem icon={<Bell className="h-5 w-5" />} label="Notifications" />
                    <MenuItem icon={<Link2 className="h-5 w-5" />} label="Team Collaborators" />
                </div>
            </section>

            <section className="space-y-2">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">Support & More</h3>
                <div className="bg-card border border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
                    <MenuItem icon={<HelpCircle className="h-5 w-5" />} label="Help Center & Docs" />
                    <MenuItem icon={<MessageSquare className="h-5 w-5" />} label="Contact Support" />
                    <MenuItem icon={<Share2 className="h-5 w-5" />} label="Refer a Creator" badge="EARN $20" badgeColor="text-accent" />
                </div>
            </section>

            <button 
                onClick={handleLogout}
                className="w-full py-5 bg-destructive/10 border border-destructive/20 rounded-3xl flex items-center justify-center gap-3 text-destructive font-black uppercase tracking-widest text-xs hover:bg-destructive/20 transition-all active:scale-95"
            >
                <LogOut className="h-5 w-5" /> Logout Session
            </button>

            <div className="text-center space-y-2 py-4">
                <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.2em]">Build 2026.4.18 • Made with IQ</p>
                <div className="flex items-center justify-center gap-4 opacity-30">
                    <span className="text-[10px] font-bold underline">Terms</span>
                    <span className="text-[10px] font-bold underline">Privacy</span>
                </div>
            </div>
       </div>
    </div>
  );
}

function MenuItem({ icon, label, badge, badgeColor = "text-muted-foreground" }: { icon: React.ReactNode, label: string, badge?: string, badgeColor?: string }) {
    return (
        <button className="w-full flex items-center gap-4 p-5 hover:bg-white/5 transition-colors group">
            <div className="p-2.5 bg-secondary rounded-xl text-muted-foreground group-hover:text-primary transition-colors">
                {icon}
            </div>
            <span className="flex-1 text-sm font-bold text-left">{label}</span>
            <div className="flex items-center gap-3">
                {badge && <span className={cn("text-[8px] font-black uppercase tracking-widest", badgeColor)}>{badge}</span>}
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
        </button>
    );
}
