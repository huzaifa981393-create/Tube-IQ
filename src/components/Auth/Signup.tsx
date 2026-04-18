import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Play, Tv, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export function Signup({ onSignup, onGoToLogin }: { onSignup: () => void; onGoToLogin: () => void }) {
  return (
    <div className="h-full flex flex-col p-8 bg-background relative overflow-hidden overflow-y-auto no-scrollbar">
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />

      <motion.header 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 pt-6"
      >
        <button onClick={onGoToLogin} className="p-2 -ml-2 mb-4 text-muted-foreground hover:text-white transition-colors">
            <ChevronLeft className="h-6 w-6" />
        </button>
        <h2 className="text-4xl font-black font-heading mb-2">Create Account</h2>
        <p className="text-muted-foreground">Start growing your audience today.</p>
      </motion.header>

      <div className="space-y-5 pb-10">
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <input 
              placeholder="John Doe"
              className="w-full h-14 bg-card border border-white/5 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
            />
          </div>
        </div>
        
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <input 
              type="email" 
              placeholder="john@example.com"
              className="w-full h-14 bg-card border border-white/5 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full h-14 bg-card border border-white/5 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Channel URL (Optional)</label>
          <div className="relative group">
            <Tv className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <input 
              placeholder="youtube.com/@channelName"
              className="w-full h-14 bg-card border border-white/5 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-accent/50 transition-all text-sm"
            />
          </div>
        </div>

        <div className="flex items-start gap-3 px-1 py-1">
            <input type="checkbox" className="mt-1 w-4 h-4 rounded bg-card border-white/10 text-accent focus:ring-accent" />
            <p className="text-xs text-muted-foreground leading-relaxed">
                By signing up, you agree to our <span className="text-accent font-bold">Terms of Service</span> and <span className="text-accent font-bold">Privacy Policy</span>.
            </p>
        </div>

        <button 
          onClick={() => { toast.success("Account created successfully!"); onSignup(); }}
          className="w-full py-5 tube-iq-gradient rounded-2xl text-white font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform shadow-[0_0_20px_rgba(16,244,160,0.1)]"
        >
          Create Account
        </button>

        <p className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <button onClick={onGoToLogin} className="text-accent font-bold hover:underline">Sign In</button>
        </p>
      </div>
    </div>
  );
}
