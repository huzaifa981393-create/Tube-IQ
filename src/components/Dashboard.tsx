import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Users, Eye, Clock, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, MoreVertical, Zap, Lightbulb, Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const data = [
  { name: "Mon", views: 4000 },
  { name: "Tue", views: 3000 },
  { name: "Wed", views: 5000 },
  { name: "Thu", views: 2780 },
  { name: "Fri", views: 1890 },
  { name: "Sat", views: 2390 },
  { name: "Sun", views: 3490 },
];

const videos = [
  { id: 1, title: "Mastering React 19: Full Course", views: "125K", ctr: "8.2%", engage: "15%", trend: "up" },
  { id: 2, title: "Why I'm Quitting My Job", views: "854K", ctr: "12.4%", engage: "22%", trend: "up" },
  { id: 3, title: "Vlog #45: New Studio Setup", views: "42K", ctr: "4.1%", engage: "8%", trend: "down" },
];

export function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Channel Overview</h1>
          <p className="text-muted-foreground">Welcome back, your channel grew by 12% this month.</p>
        </div>
        <Button className="vidiq-gradient text-white border-none">Sync Channel</Button>
      </div>

      {/* Top Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Subscribers", value: "45,231", icon: Users, trend: "+1,200", positive: true },
          { label: "Total Views", value: "2.1M", icon: Eye, trend: "+45K", positive: true },
          { label: "Watch Time", value: "12.4K hrs", icon: Clock, trend: "-240", positive: false },
          { label: "Est. Revenue", value: "$4,520", icon: DollarSign, trend: "+$890", positive: true },
        ].map((stat, i) => (
          <Card key={i} className="bg-card/40 border-primary/10 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={stat.positive ? "text-xs text-green-500 flex items-center gap-1" : "text-xs text-red-500 flex items-center gap-1"}>
                {stat.positive ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
                {stat.trend} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card/40 border-primary/10">
          <CardHeader>
            <CardTitle>Views Growth</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#212836" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#151921', border: '1px solid #212836', borderRadius: '8px' }}
                    itemStyle={{ color: '#00D4FF' }}
                  />
                  <Area type="monotone" dataKey="views" stroke="#00D4FF" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-card/40 border-primary/10">
          <CardHeader>
            <CardTitle>Recent Performance</CardTitle>
            <CardDescription>How your latest videos are doing.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {videos.map((video) => (
                <div key={video.id} className="flex items-center gap-4 group p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                  <div className="w-20 aspect-video rounded-md bg-secondary shrink-0 overflow-hidden relative">
                    <img src={`https://picsum.photos/seed/${video.id}/200`} className="object-cover w-full h-full" alt="" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-none truncate mb-1">{video.title}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{video.views} views</span>
                      <Badge variant="outline" className="text-[10px] py-0 h-4 border-primary/20 text-primary">CTR: {video.ctr}</Badge>
                    </div>
                  </div>
                  {video.trend === "up" ? <ArrowUpRight className="h-4 w-4 text-green-500" /> : <ArrowDownRight className="h-4 w-4 text-red-500" />}
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 text-xs font-medium border-primary/10">View All Videos</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-card/40 border-primary/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 bg-primary/20 rounded-bl-full transform translate-x-1/4 -translate-y-1/4 transition-transform group-hover:scale-110">
            <Zap className="h-24 w-24" />
          </div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary fill-primary" />
              Upgrade to Boost
            </CardTitle>
            <CardDescription>Get 10x more ideas and unlimited research.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">You're currently on the free plan. Unlock the power of TubeIQ AI.</p>
            <Button className="vidiq-gradient w-full text-white border-none shadow-lg">Go Boost</Button>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-primary/10 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Daily Idea Spotlight
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="p-3 rounded-lg border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer">
                <p className="text-sm font-semibold mb-1">5 Tools I use to build Apps in 2026</p>
                <div className="flex items-center gap-2 mt-2">
                   <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30 border-none px-1 text-[10px]">Very High</Badge>
                   <span className="text-[10px] text-muted-foreground">Est. 50K - 200K views</span>
                </div>
             </div>
             <Button variant="ghost" className="w-full text-xs text-primary">Get More Ideas</Button>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-primary/10 group">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-purple-500" />
              AI Coach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary/40 p-4 rounded-xl mb-4 text-xs italic text-muted-foreground border-l-2 border-purple-500">
              "Hey John! Your CTR is dropping on your last 3 vlogs. Try using more vibrant thumbnails with 'Before/After' comparisons."
            </div>
            <Button variant="secondary" className="w-full text-xs font-semibold">Chat with Coach</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
