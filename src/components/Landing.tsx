import React from 'react';
import { CheckCircle, Play, Sparkles, TrendingUp, Zap, MousePointer2, ShieldCheck, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Landing({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="bg-[#0B0E14] text-white min-h-screen selection:bg-primary selection:text-black">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0B0E14]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 vidiq-gradient rounded-xl flex items-center justify-center font-bold text-white text-xl">T</div>
            <span className="text-2xl font-black tracking-tighter">TubeIQ</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex text-muted-foreground hover:text-white" onClick={onGetStarted}>Log In</Button>
            <Button className="vidiq-gradient text-white border-none rounded-full px-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform" onClick={onGetStarted}>
              Get Started Free
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse delay-700" />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 mb-8 rounded-full">
            <Sparkles className="h-3 w-3 mr-2" /> AI-Powered YouTube Growth
          </Badge>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Get More <span className="vidiq-text-gradient">Views & Subs</span> on YouTube.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            TubeIQ provides creator-first AI tools designed to help you analyze competition, track keyword performance, and optimize your videos for more reach.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <Button size="lg" className="h-14 px-10 rounded-full vidiq-gradient text-white border-none text-lg font-bold w-full sm:w-auto shadow-2xl shadow-primary/30" onClick={onGetStarted}>
               Sign up with Google
             </Button>
             <Button size="lg" variant="outline" className="h-14 px-10 rounded-full border-white/10 bg-white/5 hover:bg-white/10 w-full sm:w-auto transition-all">
               <Play className="h-4 w-4 mr-2 fill-current" /> Watch Demo
             </Button>
          </div>
          <div className="mt-16 relative">
             <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-transparent to-transparent z-10 h-32 bottom-0" />
             <div className="p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl overflow-hidden group">
                <img 
                  src="https://picsum.photos/seed/dashboard/1600/900" 
                  className="rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
                  alt="TubeIQ Dashboard" 
                  referrerPolicy="no-referrer"
                />
             </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Active Creators", value: "2M+" },
                { label: "Videos Optimized", value: "45M+" },
                { label: "AI Insights Daily", value: "500K+" },
                { label: "Success Rate", value: "94%" },
              ].map((s, i) => (
                <div key={i}>
                   <div className="text-4xl font-black mb-1">{s.value}</div>
                   <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold">{s.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16 px-4">
              <h2 className="text-4xl font-black mb-4">Everything you need to <span className="text-primary italic">win</span>.</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Stop guessing and start growing with evidence-based data insights.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: TrendingUp, title: "Keyword Research", desc: "Uncover high-potential keywords that the YouTube algorithm loves." },
                { icon: Zap, title: "Daily Ideas", desc: "Get fresh, AI-powered video topics tailored specifically to your niche." },
                { icon: MousePointer2, title: "SEO Optimization", desc: "Optimize titles, descriptions, and tags in seconds with our AI engine." },
                { icon: Globe, title: "Competitor Analysis", desc: "Track what's working for others and learn from their success." },
                { icon: ShieldCheck, title: "Channel Health", desc: "Real-time auditing of your channel performance and security." },
                { icon: Sparkles, title: "AI Coach", desc: "Your personal growth strategist available 24/7 to provide deep analysis." },
              ].map((f, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all hover:bg-white/[0.05] group">
                   <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <f.icon className="h-7 w-7 text-primary" />
                   </div>
                   <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                   <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">Start Growing Today</h2>
              <p className="text-muted-foreground">Select a plan that fits your creator journey.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
              {/* Free Plan */}
              <Card className="bg-card border-white/5 p-8 rounded-3xl flex flex-col items-center text-center">
                 <h3 className="text-xl font-bold mb-2">Starter</h3>
                 <div className="text-4xl font-black mb-4">$0 <span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                 <p className="text-sm text-muted-foreground mb-8 min-h-[40px]">Perfect for new creators getting started.</p>
                 <ul className="space-y-4 mb-8 text-left w-full">
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> 3 Daily Ideas</li>
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> Basic Keyword Research</li>
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> TubeIQ Browser Ext.</li>
                 </ul>
                 <Button variant="outline" className="w-full h-12 rounded-full border-white/10 mt-auto" onClick={onGetStarted}>Choose Plan</Button>
              </Card>

              {/* Boost Plan - Most Popular */}
              <Card className="bg-card border-primary p-8 rounded-3xl flex flex-col items-center text-center relative scale-105 shadow-2xl shadow-primary/20">
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 vidiq-gradient px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-lg">Most Popular</div>
                 <h3 className="text-xl font-bold mb-2">Boost</h3>
                 <div className="text-4xl font-black mb-4">$29 <span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                 <p className="text-sm text-muted-foreground mb-8 min-h-[40px]">10x your growth with full AI tools.</p>
                 <ul className="space-y-4 mb-8 text-left w-full">
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> 50+ Daily Ideas</li>
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> Unlimited Keywords</li>
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> SEO Optimization AI</li>
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> Competitor Tracking (5)</li>
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> AI Coach Basic</li>
                 </ul>
                 <Button className="w-full h-12 rounded-full vidiq-gradient text-white border-none font-bold mt-auto" onClick={onGetStarted}>Unlock Boost</Button>
              </Card>

              {/* Max Plan */}
              <Card className="bg-card border-white/5 p-8 rounded-3xl flex flex-col items-center text-center">
                 <h3 className="text-xl font-bold mb-2">Max</h3>
                 <div className="text-4xl font-black mb-4">$79 <span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                 <p className="text-sm text-muted-foreground mb-8 min-h-[40px]">For professional creators and teams.</p>
                 <ul className="space-y-4 mb-8 text-left w-full">
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> Unlimited Everything</li>
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> Deep Analysis Coach</li>
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> 20 Competitor Channels</li>
                    <li className="flex gap-2 text-sm"><CheckCircle className="h-4 w-4 text-primary shrink-0" /> Custom AI Training</li>
                 </ul>
                 <Button variant="outline" className="w-full h-12 rounded-full border-white/10 mt-auto" onClick={onGetStarted}>Choose Plan</Button>
              </Card>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
         <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
            <div className="col-span-2">
               <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 vidiq-gradient rounded-lg flex items-center justify-center font-bold text-white text-lg">T</div>
                <span className="text-xl font-bold tracking-tight">TubeIQ</span>
               </div>
               <p className="text-muted-foreground max-w-sm mb-8">Empowering 2M+ YouTube creators to reach their full potential through cutting-edge AI and data analytics.</p>
               <div className="flex gap-4">
                  {/* Social icons placeholder */}
                  {[1, 2, 3, 4].map(n => <div key={n} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer" />)}
               </div>
            </div>
            <div>
               <h4 className="font-bold mb-6">Product</h4>
               <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">Extension</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Mobile App</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Keyword Tool</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Daily Ideas</a></li>
               </ul>
            </div>
            <div>
               <h4 className="font-bold mb-6">Company</h4>
               <ul className="space-y-4 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Legal</a></li>
               </ul>
            </div>
         </div>
      </footer>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className: string }) {
  return <span className={`inline-flex items-center text-xs font-semibold px-2 py-1 ${className}`}>{children}</span>
}
