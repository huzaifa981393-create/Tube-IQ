import { Camera, Type, FileText, Hash, CheckCircle2, ChevronRight, Wand2, Sparkles, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function Optimize() {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Optimization</h1>
          <p className="text-muted-foreground">Level up your SEO and reach with precision AI-tuned metadata.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="gap-2 border-primary/10">History</Button>
           <Button className="vidiq-gradient text-white border-none gap-2">
             <RefreshCw className="h-4 w-4" /> Reset
           </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
           <Card className="bg-card/40 border-primary/10">
              <CardHeader>
                <CardTitle>Video Input</CardTitle>
                <CardDescription>Tell us about your video or provide a draft.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label>Target Keyword</Label>
                    <Input placeholder="e.g. React 19 Tutorial" className="bg-secondary/50 border-none" />
                 </div>
                 <div className="space-y-2">
                    <Label>Draft Title</Label>
                    <Input placeholder="Mastering React 19" className="bg-secondary/50 border-none" />
                 </div>
                 <div className="space-y-2">
                    <Label>What is the video about?</Label>
                    <Textarea 
                      placeholder="Describe your video in detail..." 
                      className="min-h-[120px] bg-secondary/50 border-none resize-none" 
                    />
                 </div>
                 <Button className="w-full vidiq-gradient text-white border-none h-12 text-lg font-bold gap-2">
                    <Wand2 className="h-5 w-5" /> 
                    Optimize Metadata
                 </Button>
              </CardContent>
           </Card>

           <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-card/40 border-primary/10">
                 <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                       <Type className="h-5 w-5 text-primary" />
                       <CardTitle className="text-lg">Titles</CardTitle>
                    </div>
                    <Badge variant="outline" className="text-[10px] border-primary/20">5 Drafts</Badge>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {[
                      "React 19: The ONLY Course You Need (2026)",
                      "Stop Using useEffect: React 19 Change Everything!",
                      "Mastering React 19 in 15 Minutes"
                    ].map((t, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 cursor-pointer flex items-center justify-between group">
                         <span className="text-sm truncate mr-2">{t}</span>
                         <CheckCircle2 className="h-4 w-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                    ))}
                 </CardContent>
              </Card>

              <Card className="bg-card/40 border-primary/10">
                 <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <div className="flex items-center gap-2">
                       <Camera className="h-5 w-5 text-yellow-500" />
                       <CardTitle className="text-lg">Thumbnails</CardTitle>
                    </div>
                 </CardHeader>
                 <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                       {[1, 2, 3, 4].map(n => (
                         <div key={n} className="aspect-video rounded-md bg-secondary/50 overflow-hidden relative group cursor-pointer">
                            <img src={`https://picsum.photos/seed/thumb${n}/200`} className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 text-xs font-bold text-white uppercase italic">
                               Preview
                            </div>
                         </div>
                       ))}
                    </div>
                 </CardContent>
              </Card>
           </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <Card className="bg-card/40 border-primary/10 overflow-hidden">
              <CardHeader className="bg-secondary/50 py-4">
                 <CardTitle className="text-center text-4xl font-black text-primary">82</CardTitle>
                 <CardDescription className="text-center text-[10px] font-bold uppercase tracking-widest">Calculated SEO Score</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                 <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                       {[
                         { label: "Title Strength", score: 90, status: "Good" },
                         { label: "Desc. Keywords", score: 65, status: "Low" },
                         { label: "Tag Relevance", score: 85, status: "Good" },
                         { label: "Engagement Hub", score: 40, status: "Low" },
                       ].map((check, i) => (
                         <div key={i} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-medium">
                               <span>{check.label}</span>
                               <span className={check.status === "Low" ? "text-red-500" : "text-green-500"}>{check.score}%</span>
                            </div>
                            <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
                               <div 
                                 className={cn("h-full rounded-full transition-all duration-1000", check.status === "Low" ? "bg-red-500" : "bg-green-500")}
                                 style={{ width: `${check.score}%` }}
                               />
                            </div>
                         </div>
                       ))}
                       
                       <div className="pt-4 border-t border-primary/10 mt-4">
                          <p className="text-xs font-bold text-primary mb-2 flex items-center gap-1">
                             <Sparkles className="h-3 w-3" /> Critical Advice:
                          </p>
                          <p className="text-[11px] text-muted-foreground leading-relaxed italic">
                             "Your description is missing your target keyword in the first sentence. YouTube's search algo prioritizes the first 150 characters."
                          </p>
                       </div>
                    </div>
                 </ScrollArea>
              </CardContent>
           </Card>

           <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex items-center gap-4">
                 <div className="p-2 bg-primary/20 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                 </div>
                 <div className="flex-1">
                    <p className="text-sm font-bold">Script Assistant</p>
                    <p className="text-[10px] text-muted-foreground">Generate high-retention scripts.</p>
                 </div>
                 <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
