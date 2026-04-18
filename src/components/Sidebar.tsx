import { Home, Search, Lightbulb, Zap, TrendingUp, Users, Bot, Settings, LogOut, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const menuItems = [
  { icon: Calendar, label: "Today", id: "today" },
  { icon: Home, label: "Dashboard", id: "dashboard" },
  { icon: Search, label: "Keywords", id: "keywords" },
  { icon: Lightbulb, label: "Daily Ideas", id: "ideas" },
  { icon: Zap, label: "Optimize", id: "optimize" },
  { icon: Users, label: "Competitors", id: "competitors" },
  { icon: TrendingUp, label: "Analytics", id: "analytics" },
  { icon: Bot, label: "AI Coach", id: "coach" },
];

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  className?: string;
}

export function Sidebar({ activeTab, setActiveTab, className }: SidebarProps) {
  return (
    <div className={cn("flex flex-col h-screen border-r bg-card/50 backdrop-blur-sm", className)}>
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 vidiq-gradient rounded-lg flex items-center justify-center font-bold text-white text-xl">T</div>
        <span className="text-xl font-bold tracking-tight">TubeIQ</span>
      </div>
      
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2 py-4">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start gap-3",
                activeTab === item.id && "bg-secondary text-primary font-medium"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 mt-auto border-t">
        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive/80">
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
