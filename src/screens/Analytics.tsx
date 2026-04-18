import React, { useState } from 'react';
import { useTubeIQStore } from '../store/useStore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign,
  Calendar,
  ChevronDown,
  Info
} from 'lucide-react';

export default function Analytics() {
  const { analytics, channel } = useTubeIQStore();
  const [range, setRange] = useState('28 Days');

  if (!analytics || !channel) return null;

  const trafficData = [
    { name: 'Browse', value: 45 },
    { name: 'Suggested', value: 30 },
    { name: 'Search', value: 15 },
    { name: 'Others', value: 10 },
  ];

  const COLORS = ['#3B82F6', '#22C55E', '#F59E0B', '#EF4444'];

  return (
    <div className="p-6 space-y-8">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-syne font-black text-white">Analytics</h2>
        <div className="flex items-center gap-2 bg-surface2 px-3 py-1.5 rounded-xl border border-border-subtle">
           <Calendar size={14} className="text-text3" />
           <span className="text-[10px] font-mono font-bold text-text2 uppercase tracking-widest">{range}</span>
           <ChevronDown size={14} className="text-text3" />
        </div>
      </header>

      {/* Hero Stats */}
      <section className="grid grid-cols-2 gap-4">
          <StatBox label="Impressions" value="452.1K" icon={<TrendingUp size={14} />} color="text-primary-blue" />
          <StatBox label="Total Subs" value={Number(channel.subscriberCount).toLocaleString()} icon={<Users size={14} />} color="text-success" />
          <StatBox label="Watch Time" value={`${analytics.watchTimeHours}h`} icon={<Clock size={14} />} color="text-warning" />
          <StatBox label="CPM Avg" value="$4.15" icon={<DollarSign size={14} />} color="text-text1" />
      </section>

      {/* Views Bar Chart */}
      <section className="bg-surface border border-border-subtle rounded-2xl p-5 space-y-6">
          <div className="flex items-center justify-between">
              <h4 className="text-[12px] uppercase font-mono tracking-widest text-text2 font-bold">Views Performance</h4>
              <button className="text-text3 hover:text-white"><Info size={16} /></button>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analytics.dayByDayViews}>
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <Tooltip 
                        cursor={{fill: 'rgba(255,255,255,0.05)'}}
                        contentStyle={{ backgroundColor: '#18181B', border: '1px solid #3F3F46', color: '#FAFAFA', fontSize: '10px' }}
                    />
                    <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between items-center pt-2">
              <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-text3 font-mono">TOTAL VIEWS</span>
                  <span className="text-xl font-mono font-bold text-white">{analytics.views.toLocaleString()}</span>
              </div>
              <div className="text-right flex flex-col gap-1">
                  <span className="text-[10px] text-text3 font-mono">VS PREV</span>
                  <span className="text-sm font-mono font-bold text-success">+12.4%</span>
              </div>
          </div>
      </section>

      {/* Traffic Sources */}
      <section className="bg-surface border border-border-subtle rounded-3xl p-6 flex items-center gap-6">
          <div className="w-32 h-32">
             <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                     <Pie
                        data={trafficData}
                        innerRadius={35}
                        outerRadius={55}
                        paddingAngle={5}
                        dataKey="value"
                     >
                        {trafficData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                     </Pie>
                 </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="flex-1 space-y-2">
              <h4 className="text-[10px] uppercase font-mono tracking-widest text-text3 mb-3">Traffic Sources</h4>
              {trafficData.map((t, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px] font-bold">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                         <span className="text-text2">{t.name}</span>
                      </div>
                      <span className="text-text1">{t.value}%</span>
                  </div>
              ))}
          </div>
      </section>

      {/* Top Videos Table (Mini) */}
      <section className="space-y-4">
         <h4 className="text-[12px] uppercase font-mono tracking-widest text-text2 px-1">Top Videos (28d)</h4>
         <div className="bg-surface border border-border-subtle rounded-2xl overflow-hidden divide-y divide-border-subtle">
             {[1, 2, 3].map((v) => (
                 <div key={v} className="p-4 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-text3">0{v}</span>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white line-clamp-1">Mastering React 19...</span>
                            <span className="text-[10px] text-text3 font-mono">1.2K VIEWS</span>
                        </div>
                     </div>
                     <div className="flex flex-col items-end">
                        <span className="text-xs font-mono font-bold text-success">8.4%</span>
                        <span className="text-[9px] text-text3 font-mono uppercase">CTR</span>
                     </div>
                 </div>
             ))}
         </div>
      </section>
    </div>
  );
}

function StatBox({ label, value, icon, color }: { label: string, value: string, icon: React.ReactNode, color: string }) {
    return (
        <div className="bg-surface2 border border-border-subtle/50 rounded-2xl p-4 space-y-2">
            <div className={`p-1.5 rounded-lg bg-surface w-fit ${color}`}>{icon}</div>
            <div className="flex flex-col gap-0.5">
                <span className="text-[9px] text-text3 uppercase font-mono tracking-widest">{label}</span>
                <span className="text-lg font-mono font-bold text-white">{value}</span>
            </div>
        </div>
    );
}
