import { Lightbulb, ThumbsUp, ThumbsDown, Star, Sparkles, Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ideas = [
  {
    title: "5 Tools I use to build Apps in 2026",
    description: "A deep dive into the latest tech stack including AI-powered IDEs and deployment platforms.",
    potential: "Very High",
    competition: "Low",
    reason: "Trending in 'Software Development' niche with rising viewer interest in productivity tools.",
    keywords: ["ai coding", "tech stack 2026", "software engineer tools"]
  },
  {
    title: "React 19 vs. Vanilla JS: Is it worth the switch?",
    description: "Comparing the overhead and benefits of the newest React features against modern browser APIs.",
    potential: "High",
    competition: "Medium",
    reason: "New browser features are making some React patterns obsolete, creating debate.",
    keywords: ["react 19", "vanilla js", "web development"]
  },
  {
    title: "How I grew my channel to 100k subs with AI",
    description: "Revealing the workflow using TubeIQ to optimize every video for the algorithm.",
    potential: "Medium",
    competition: "High",
    reason: "Aspirational content performs consistently well among creator audiences.",
    keywords: ["youtube growth", "ai for creators", "tubeiq review"]
  }
];

export function DailyIdeas() {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daily Ideas</h1>
          <p className="text-muted-foreground">AI-generated topics specifically chosen for your audience.</p>
        </div>
        <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
          Refresh Ideas
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea, index) => (
          <Card key={index} className="bg-card/40 border-primary/10 flex flex-col group hover:border-primary/30 transition-all hover:translate-y-[-4px]">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge className={cn(
                  "border-none",
                  idea.potential === "Very High" ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500"
                )}>
                  {idea.potential} Potential
                </Badge>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full"><ThumbsUp className="h-3 w-3" /></Button>
                   <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-destructive"><ThumbsDown className="h-3 w-3" /></Button>
                </div>
              </div>
              <CardTitle className="text-xl leading-snug group-hover:text-primary transition-colors">{idea.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2 italic">{idea.description}</p>
              
              <div className="p-3 bg-secondary/30 rounded-lg text-xs leading-relaxed border-l-2 border-primary/30">
                <span className="font-bold block mb-1 text-primary lowercase tracking-wider">Why it works:</span>
                {idea.reason}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {idea.keywords.map(k => (
                  <span key={k} className="text-[10px] text-muted-foreground px-2 py-0.5 rounded-full bg-secondary/50 border border-primary/5">
                    {k}
                  </span>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0 p-6">
              <Button className="w-full bg-secondary hover:bg-primary hover:text-primary-foreground transition-all gap-2 group-hover:vidiq-gradient group-hover:border-none group-hover:text-white">
                <Wand2 className="h-4 w-4" />
                Generate Script
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="vidiq-gradient p-1 rounded-2xl overflow-hidden border-none shadow-2xl">
         <CardContent className="bg-card/90 backdrop-blur-3xl p-8 rounded-[calc(1rem-1px)] flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 animate-pulse">
               <Star className="h-10 w-10 text-primary fill-primary" />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h3 className="text-2xl font-bold mb-2">Want more ideas?</h3>
               <p className="text-muted-foreground">Upgrade to **TubeIQ Boost** and get 50+ personalized ideas every single day, plus script generation and thumbnail AI.</p>
            </div>
            <Button size="lg" className="vidiq-gradient text-white border-none px-10 font-bold shadow-xl hover:scale-105 transition-transform">
              Explore Plans
            </Button>
         </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
