import { useState } from "react";
import { Bot, Send, Sparkles, Zap, MessageSquare, History, BrainCircuit, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function AICoach() {
  const [messages, setMessages] = useState([
    { 
      role: "assistant", 
      content: "Hi John! I've analyzed your last 5 videos. Your audience retention peaks during the first 2 minutes but drops significantly during your mid-video sponsors. Want some tips to fix this?",
      time: "2:30 PM"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input, time: "Now" }]);
    setInput("");
    
    // Mock response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "That's a great question. For educational channels like yours, transitioning to sponsors with a themed 'commercial break' graphic usually keeps 15% more viewers than abrupt cuts.",
        time: "Now"
      }]);
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-130px)] flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Growth Coach</h1>
          <p className="text-muted-foreground">Expert strategies powered by deep channel analysis.</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 gap-1 px-3 py-1">
             <BrainCircuit className="h-3 w-3" /> Advanced Analysis Active
           </Badge>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4 flex-1 overflow-hidden min-h-0">
        <div className="lg:col-span-3 flex flex-col min-h-0 bg-card/40 border-primary/10 rounded-2xl overflow-hidden shadow-2xl">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className="h-9 w-9 border-2 border-primary/20">
                    {m.role === "assistant" ? (
                      <div className="w-full h-full vidiq-gradient flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    ) : (
                      <AvatarImage src="https://picsum.photos/seed/user/200" />
                    )}
                  </Avatar>
                  <div className={`flex flex-col gap-1 max-w-[80%] ${m.role === "user" ? "items-end" : ""}`}>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      m.role === "assistant" 
                        ? "bg-secondary/80 text-foreground border-tl-none" 
                        : "vidiq-gradient text-white border-tr-none"
                    }`}>
                      {m.content}
                    </div>
                    <span className="text-[10px] text-muted-foreground px-2">{m.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-card/50 backdrop-blur-md">
            <div className="relative">
              <Input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask your coach anything about channel growth..." 
                className="pr-12 h-12 bg-secondary/50 border-none transition-all focus:ring-2 focus:ring-primary/50"
              />
              <Button 
                onClick={handleSend}
                size="icon" 
                className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 vidiq-gradient text-white border-none rounded-xl"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2 mt-3">
               {["Thumbnail Review", "SEO Check", "Ideas for next video"].map(tip => (
                 <button key={tip} className="text-[10px] bg-secondary/80 hover:bg-primary/20 hover:text-primary px-3 py-1 rounded-full transition-colors font-medium border border-primary/5">
                   {tip}
                 </button>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-6 overflow-y-auto pr-2">
           <Card className="bg-card/40 border-primary/10">
              <CardHeader>
                 <CardTitle className="text-sm flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" /> Strategy Suggestion
                 </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-3 bg-secondary/50 rounded-lg border border-primary/5">
                    <p className="text-xs font-bold mb-1">Double Down on 'React'</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">Your videos about React are performing 3x better than Python videos this month.</p>
                 </div>
                 <Button variant="outline" className="w-full text-xs h-8 border-primary/10">Follow Roadmap</Button>
              </CardContent>
           </Card>

           <Card className="bg-card/40 border-primary/10 opacity-60">
              <CardHeader>
                 <CardTitle className="text-sm flex items-center justify-between">
                    Chat History <History className="h-4 w-4 text-muted-foreground" />
                 </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <div className="text-[11px] truncate cursor-pointer hover:text-primary">How to fix dropping audience retention?</div>
                 <div className="text-[11px] truncate cursor-pointer hover:text-primary">Keyword ideas for "Next.js 15"</div>
                 <div className="text-[11px] truncate cursor-pointer hover:text-primary">Why is my CPM so low this week?</div>
              </CardContent>
           </Card>

           <Card className="vidiq-gradient border-none p-4 text-white">
              <div className="flex items-start gap-3">
                 <Zap className="h-5 w-5 fill-white" />
                 <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-1">Deep Analysis Mode</p>
                    <p className="text-[10px] leading-relaxed opacity-80">Enable Deep Analysis for frame-by-frame retention coaching.</p>
                    <Button variant="secondary" className="w-full mt-3 h-7 text-[10px] font-bold">Try for Free</Button>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
