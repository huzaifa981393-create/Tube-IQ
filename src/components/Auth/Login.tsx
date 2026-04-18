import React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ChevronLeft, Code } from "lucide-react";
import { toast } from "sonner";

export function Login({ onLogin, onGoToSignup }: { onLogin: () => void; onGoToSignup: () => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Welcome back to Tube IQ!");
    onLogin();
  };

  return (
    <div className="h-full flex flex-col p-8 bg-background relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-primary/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-[10%] left-[-10%] w-64 h-64 bg-accent/10 rounded-full blur-[80px]" />

      <motion.header 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12 pt-8"
      >
        <h2 className="text-4xl font-black font-heading mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">Sign in to continue your growth journey.</p>
      </motion.header>

      <div className="space-y-6 relative z-10">
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full h-14 bg-card border border-white/5 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full h-14 bg-card border border-white/5 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
            <div className="flex justify-end">
                <button className="text-xs font-bold text-primary hover:underline">Forgot Password?</button>
            </div>
          </div>
        </div>

        <button 
          onClick={onLogin}
          className="w-full py-5 tube-iq-gradient rounded-2xl text-white font-bold text-lg shadow-xl shadow-primary/20 flex items-center justify-center gap-2 hover:translate-y-[-2px] active:translate-y-[0px] transition-all"
        >
          Sign In
        </button>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="flex-shrink mx-4 text-xs font-bold text-muted-foreground uppercase tracking-widest">Or continue with</span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button onClick={onLogin} className="h-14 bg-card border border-white/5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-colors group">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            </div>
            <span className="text-sm font-bold">Google</span>
          </button>
          <button onClick={onLogin} className="h-14 bg-card border border-white/5 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/5 transition-colors group">
            <Code className="h-6 w-6" />
            <span className="text-sm font-bold">GitHub</span>
          </button>
        </div>
      </div>

      <footer className="mt-auto pt-8 text-center pb-4">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{" "}
          <button onClick={onGoToSignup} className="text-primary font-bold hover:underline">Sign Up</button>
        </p>
      </footer>
    </div>
  );
}
