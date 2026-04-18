import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <TooltipProvider>
      <div className="h-screen w-screen flex items-center justify-center bg-black text-white">
        <p className="text-zinc-500 animate-pulse">Ready for new interface prompt...</p>
      </div>
      <Toaster />
    </TooltipProvider>
  );
}

