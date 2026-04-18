import { useState } from "react";
import { Search, TrendingUp, Info, ArrowUpRight, Filter, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockResults = [
  { keyword: "how to use react 19", volume: "450K", competition: 42, score: 78, trend: "up" },
  { keyword: "react 19 new features", volume: "120K", competition: 30, score: 85, trend: "up" },
  { keyword: "react vs vue 2026", volume: "85K", competition: 65, score: 45, trend: "down" },
  { keyword: "tailwind css v4 tutorial", volume: "310K", competition: 15, score: 92, trend: "up" },
  { keyword: "best coding monitor 2026", volume: "25K", competition: 80, score: 22, trend: "up" },
];

export function Keywords() {
  const [query, setQuery] = useState("");

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Keyword Research</h1>
        <p className="text-muted-foreground">Find high-volume, low-competition keywords for your next video.</p>
      </div>

      <Card className="bg-card/40 border-primary/10 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter a keyword or phrase..." 
                className="pl-11 h-12 bg-secondary/50 border-none transition-all focus:ring-2 focus:ring-primary/50 text-lg"
              />
            </div>
            <Button size="lg" className="vidiq-gradient text-white border-none h-12 px-8 font-semibold">
              Research
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-4">
        <Card className="lg:col-span-3 bg-card/40 border-primary/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Results for "{query || "trending topics"}"</CardTitle>
              <CardDescription>Showing top related keywords and competition data.</CardDescription>
            </div>
            <div className="flex gap-2">
               <Button variant="outline" size="sm" className="h-8 gap-2 text-xs border-primary/10">
                 <Filter className="h-3 w-3" /> Filters
               </Button>
               <Button variant="outline" size="sm" className="h-8 gap-2 text-xs border-primary/10">
                 <Download className="h-3 w-3" /> Export
               </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-primary/10">
                  <TableHead>Keyword</TableHead>
                  <TableHead>Search Volume</TableHead>
                  <TableHead>Competition</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockResults.map((item) => (
                  <TableRow key={item.keyword} className="border-primary/5 hover:bg-secondary/30 transition-colors group">
                    <TableCell className="font-medium flex items-center gap-2 py-4">
                      {item.keyword}
                      {item.trend === "up" && <ArrowUpRight className="h-3 w-3 text-green-500" />}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.volume}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                           <div 
                             className={cn(
                               "h-full rounded-full transition-all",
                               item.competition < 30 ? "bg-green-500 w-1/3" : 
                               item.competition < 60 ? "bg-yellow-500 w-2/3" : "bg-red-500 w-full"
                             )}
                             style={{ width: `${item.competition}%` }}
                           />
                        </div>
                        <span className="text-xs font-mono">{item.competition}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={cn(
                        "font-mono border-none",
                        item.score > 70 ? "bg-green-500/20 text-green-500" :
                        item.score > 40 ? "bg-yellow-500/20 text-yellow-500" : "bg-red-500/20 text-red-500"
                      )}>
                        {item.score}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <Button variant="ghost" size="sm" className="h-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                         Details
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
           <Card className="bg-card/40 border-primary/10 overflow-hidden">
              <CardHeader className="vidiq-gradient py-4 text-white">
                <CardTitle className="text-sm flex items-center gap-2">
                   <TrendingUp className="h-4 w-4" /> Global Score
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 text-center">
                 <div className="text-5xl font-black mb-1">
                   {query ? "68" : "--"}
                 </div>
                 <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">Good Opportunity</p>
                 <div className="space-y-2 text-left">
                    <div className="flex justify-between text-xs">
                       <span className="text-muted-foreground">Search Volume:</span>
                       <span className="font-bold">High</span>
                    </div>
                    <div className="flex justify-between text-xs">
                       <span className="text-muted-foreground">Competition:</span>
                       <span className="font-bold text-yellow-500">Medium</span>
                    </div>
                 </div>
              </CardContent>
           </Card>

           <Card className="bg-card/40 border-primary/10">
              <CardHeader>
                <CardTitle className="text-sm">Smart Tag Generator</CardTitle>
                <CardDescription className="text-[10px]">AI filtered tags for SEO</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="flex flex-wrap gap-2">
                    {["reactjs", "programming", "tutorial", "coding", "2026"].map(t => (
                      <Badge key={t} variant="secondary" className="text-[10px] cursor-pointer hover:bg-primary/20 transition-colors">
                        #{t}
                      </Badge>
                    ))}
                 </div>
                 <Button variant="outline" className="w-full mt-4 h-8 text-[10px] border-primary/10">Copy All Tags</Button>
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
