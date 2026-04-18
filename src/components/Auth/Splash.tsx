import React from "react";
import { motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";

export function Splash({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="h-full flex flex-col items-center justify-between p-10 py-24 bg-background">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        {/* Animated Logo */}
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
          className="relative"
        >
          <div className="w-24 h-24 tube-iq-gradient rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.3)] neon-border">
            <Play className="h-12 w-12 text-white fill-white ml-1" />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-3 -right-3 p-2 bg-accent rounded-full text-white shadow-lg"
          >
            <Sparkles className="h-4 w-4" />
          </motion.div>
        </motion.div>

        <div className="text-center space-y-2">
          <h1 className="text-5xl font-black tracking-tighter font-heading text-white">Tube IQ</h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg font-medium text-muted-foreground animate-pulse"
          >
            Grow Smarter. Rank Faster.
          </motion.p>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        onClick={onGetStarted}
        className="w-full py-5 tube-iq-gradient rounded-2xl text-white font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group"
      >
        Get Started
        <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
            <Play className="h-4 w-4 fill-white" />
        </motion.div>
      </motion.button>
    </div>
  );
}
