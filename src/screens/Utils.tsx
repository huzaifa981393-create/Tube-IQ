import React, { useMemo, useState } from 'react';
import {
  BarChart3,
  Brain,
  CheckCircle2,
  Clock,
  Copy,
  Flame,
  ImageUp,
  Languages,
  LineChart,
  MessageCircle,
  Music2,
  PlayCircle,
  Search,
  Sparkles,
  Target,
  Tags,
  TrendingUp,
  UploadCloud,
  Wand2,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { analyzeSeo, analyzeThumbnail, competitorSnapshot, optimizeTopic, trendingIndia } from '../lib/tubeiqEngine';
import { cn } from '../lib/utils';

const toolTabs = [
  { id: 'viral', label: '1 Tap', icon: Wand2 },
  { id: 'title', label: 'Titles', icon: Sparkles },
  { id: 'thumb', label: 'Thumb', icon: ImageUp },
  { id: 'seo', label: 'SEO', icon: Target },
  { id: 'trend', label: 'Trends', icon: Flame },
  { id: 'spy', label: 'Spy', icon: BarChart3 },
  { id: 'script', label: 'Script', icon: MessageCircle },
  { id: 'predict', label: 'Viral', icon: TrendingUp },
];

export default function Utils() {
  const [activeTool, setActiveTool] = useState('viral');
  const ActiveIcon = toolTabs.find((tab) => tab.id === activeTool)?.icon ?? Wand2;

  return (
    <div className="min-h-full bg-[radial-gradient(circle_at_top_right,rgba(255,0,0,0.16),transparent_35%),radial-gradient(circle_at_20%_0%,rgba(59,130,246,0.14),transparent_28%)]">
      <div className="sticky top-0 z-30 bg-bg/85 backdrop-blur-xl border-b border-white/5 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-yt-red font-mono uppercase tracking-[0.28em]">TubeIQ AI Lab</p>
            <h1 className="text-2xl font-syne font-extrabold">Creator Growth Tools</h1>
          </div>
          <div className="h-11 w-11 rounded-2xl bg-yt-red/15 border border-yt-red/30 flex items-center justify-center text-yt-red">
            <ActiveIcon size={22} />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {toolTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTool(tab.id)}
                className={cn(
                  'shrink-0 min-w-20 px-3 py-3 rounded-2xl border text-xs font-black uppercase tracking-wider transition-all',
                  activeTool === tab.id
                    ? 'bg-yt-red text-white border-yt-red shadow-[0_10px_28px_rgba(255,0,0,0.24)]'
                    : 'bg-surface/80 text-text3 border-border-subtle hover:text-white hover:border-yt-red/30',
                )}
              >
                <Icon size={16} className="mx-auto mb-1" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5 pb-28">
        {activeTool === 'viral' && <OneTapOptimizer />}
        {activeTool === 'title' && <TitleGenerator />}
        {activeTool === 'thumb' && <ThumbnailAnalyzer />}
        {activeTool === 'seo' && <SeoScore />}
        {activeTool === 'trend' && <TrendingDashboard />}
        {activeTool === 'spy' && <CompetitorAnalysis />}
        {activeTool === 'script' && <ScriptWriter />}
        {activeTool === 'predict' && <ShortsPredictor />}
      </div>
    </div>
  );
}

function OneTapOptimizer() {
  const [topic, setTopic] = useState('Train Ramp Challenge');
  const result = useMemo(() => optimizeTopic(topic), [topic]);
  return (
    <ToolShell
      eyebrow="Special Feature"
      title="1 Tap Viral Optimization"
      description="Sirf topic dalo. TubeIQ title, description, tags, thumbnail idea, SEO score aur best upload timing auto-generate karta hai."
    >
      <TopicInput value={topic} onChange={setTopic} buttonLabel="Optimize Now" />
      <div className="grid grid-cols-3 gap-3">
        <Metric label="SEO" value={`${result.seoScore}/100`} tone="red" />
        <Metric label="Viral" value={`${result.viralChance}%`} tone="green" />
        <Metric label="Upload" value="8 PM" tone="blue" />
      </div>
      <ResultCard title="Best Viral Titles" icon={<Sparkles size={18} />}>
        {result.titles.slice(0, 4).map((title) => <CopyRow key={title} text={title} />)}
      </ResultCard>
      <ResultCard title="Auto Description" icon={<PlayCircle size={18} />}>
        <p className="text-sm text-text2 whitespace-pre-line leading-relaxed">{result.description}</p>
      </ResultCard>
      <ResultCard title="Tags + Hashtags" icon={<Tags size={18} />}>
        <ChipCloud items={[...result.tags.slice(0, 8), ...result.hashtags.slice(0, 4)]} />
      </ResultCard>
      <ResultCard title="Thumbnail Direction" icon={<ImageUp size={18} />}>
        <ul className="space-y-2">
          {result.thumbnailIdeas.map((idea) => <li key={idea} className="text-sm text-text2 flex gap-2"><CheckCircle2 size={16} className="text-success shrink-0" />{idea}</li>)}
        </ul>
      </ResultCard>
    </ToolShell>
  );
}

function TitleGenerator() {
  const [topic, setTopic] = useState('Gaming facts in Hindi');
  const result = useMemo(() => optimizeTopic(topic), [topic]);
  return (
    <ToolShell eyebrow="AI Viral Title Generator" title="Viral, Clickbait, Hindi + English Titles" description="Long videos, Shorts aur SEO ke liye scroll-stopping titles banaye.">
      <TopicInput value={topic} onChange={setTopic} buttonLabel="Generate Titles" />
      <ResultCard title="Hindi + English Mix" icon={<Languages size={18} />}>
        {result.titles.map((title) => <CopyRow key={title} text={title} />)}
      </ResultCard>
      <ResultCard title="Shorts Title Formats" icon={<Zap size={18} />}>
        {['Wait For The End 😳', '99% Log Ye Nahi Jante', 'Part 2 Chahiye?', 'Biggest Mistake Ever'].map((title) => <CopyRow key={title} text={`${topic}: ${title}`} />)}
      </ResultCard>
    </ToolShell>
  );
}

function ThumbnailAnalyzer() {
  const [fileName, setFileName] = useState('train-ramp-thumb.png');
  const analysis = useMemo(() => analyzeThumbnail(fileName), [fileName]);
  return (
    <ToolShell eyebrow="Thumbnail Analyzer" title="CTR Score + Readability Check" description="Upload mock ke saath brightness, text readability, face emotion aur design suggestions dekho.">
      <label className="block border border-dashed border-yt-red/40 rounded-3xl bg-yt-red/5 p-6 text-center cursor-pointer">
        <UploadCloud className="mx-auto text-yt-red mb-3" size={34} />
        <p className="text-sm font-bold text-white">Thumbnail upload karo</p>
        <p className="text-xs text-text3 mt-1">PNG/JPG filename analyzer demo</p>
        <input type="file" accept="image/*" className="hidden" onChange={(event) => setFileName(event.target.files?.[0]?.name || fileName)} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <Metric label="CTR Score" value={`${analysis.ctr}/100`} tone="red" />
        <Metric label="Brightness" value={analysis.brightness} tone="blue" />
      </div>
      <ResultCard title="AI Findings" icon={<Brain size={18} />}>
        <InfoLine label="Text" value={analysis.readability} />
        <InfoLine label="Emotion" value={analysis.emotion} />
        <div className="mt-4 space-y-2">
          {analysis.suggestions.map((suggestion) => <li key={suggestion} className="list-none text-sm text-text2 flex gap-2"><CheckCircle2 size={16} className="text-success shrink-0" />{suggestion}</li>)}
        </div>
      </ResultCard>
    </ToolShell>
  );
}

function SeoScore() {
  const [title, setTitle] = useState('India’s Craziest Ramp Crash Ever!');
  const [description, setDescription] = useState('Train Ramp Challenge ka full high-retention breakdown. Watch till the end for the crazy crash. #shorts #viral #trending');
  const [tags, setTags] = useState('train ramp challenge, viral shorts, india youtuber, challenge video, ramp crash, hindi shorts');
  const seo = useMemo(() => analyzeSeo(title, description, tags), [title, description, tags]);
  return (
    <ToolShell eyebrow="SEO Score System" title="Title + Description + Tags Audit" description="Ranking chance, SEO score aur exact improvement checklist pao.">
      <TextField label="Video Title" value={title} onChange={setTitle} />
      <TextArea label="Description" value={description} onChange={setDescription} />
      <TextField label="Tags (comma separated)" value={tags} onChange={setTags} />
      <div className="grid grid-cols-2 gap-3">
        <Metric label="SEO Score" value={`${seo.score}/100`} tone="red" />
        <Metric label="Ranking" value={seo.rankingChance} tone="green" />
      </div>
      <ResultCard title="Improvement Suggestions" icon={<Target size={18} />}>
        {seo.suggestions.map((suggestion) => <p key={suggestion} className="text-sm text-text2 mb-2">• {suggestion}</p>)}
      </ResultCard>
    </ToolShell>
  );
}

function TrendingDashboard() {
  return (
    <ToolShell eyebrow="Trending Dashboard" title="India Specific Trends" description="Realtime-style dashboard for viral topics, music, Shorts ideas and gaming trends.">
      <div className="grid grid-cols-2 gap-3">
        <Metric label="India Lift" value="+34%" tone="green" />
        <Metric label="Viral Music" value="6 tracks" tone="red" />
      </div>
      <div className="space-y-3">
        {trendingIndia.map((item, index) => (
          <div key={item.topic} className="glass-card p-4 rounded-3xl flex items-start gap-3">
            <div className="h-10 w-10 rounded-2xl bg-yt-red/15 text-yt-red flex items-center justify-center font-mono font-black">{index + 1}</div>
            <div className="flex-1">
              <div className="flex justify-between gap-3"><h3 className="text-sm font-bold">{item.topic}</h3><span className="text-success text-xs font-mono">{item.lift}</span></div>
              <p className="text-xs text-text3 mt-1">Idea: {item.idea}</p>
            </div>
          </div>
        ))}
      </div>
      <ResultCard title="Viral Music + Shorts Notes" icon={<Music2 size={18} />}>
        <p className="text-sm text-text2">Use fast-beat edits, subtitle every spoken line, and switch camera/action every 1.2-1.8 seconds for Hindi Shorts retention.</p>
      </ResultCard>
    </ToolShell>
  );
}

function CompetitorAnalysis() {
  const [channel, setChannel] = useState('@TopGamingCreator');
  return (
    <ToolShell eyebrow="Competitor Analysis" title="Channel Pattern Detector" description="Channel link ya handle dalo aur upload frequency, best videos, growth graph aur viral pattern dekho.">
      <TopicInput value={channel} onChange={setChannel} buttonLabel="Analyze Channel" placeholder="YouTube channel link or handle" />
      <div className="grid grid-cols-3 gap-3">
        <Metric label="Uploads" value={competitorSnapshot.uploadFrequency} tone="blue" />
        <Metric label="Avg Views" value={competitorSnapshot.averageViews} tone="red" />
        <Metric label="Growth" value={competitorSnapshot.growth} tone="green" />
      </div>
      <ResultCard title="Best Performing Patterns" icon={<LineChart size={18} />}>
        {competitorSnapshot.bestPerformers.map((pattern) => <p key={pattern} className="text-sm text-text2 mb-2">• {pattern}</p>)}
        <p className="text-sm text-white mt-4 p-3 rounded-2xl bg-white/5">Viral pattern: {competitorSnapshot.viralPattern}</p>
      </ResultCard>
    </ToolShell>
  );
}

function ScriptWriter() {
  const [topic, setTopic] = useState('Train Ramp Challenge');
  const result = useMemo(() => optimizeTopic(topic), [topic]);
  return (
    <ToolShell eyebrow="AI Script Writer" title="Hook, Intro, Shorts Script, CTA" description="Hinglish scripts for Shorts and long-form intros with retention beats.">
      <TopicInput value={topic} onChange={setTopic} buttonLabel="Write Script" />
      <ResultCard title="Shorts Script" icon={<MessageCircle size={18} />}>
        {result.script.map((line, index) => <CopyRow key={line} text={`${index + 1}. ${line}`} />)}
      </ResultCard>
      <ResultCard title="Long Video Structure" icon={<Clock size={18} />}>
        {['0:00 Hook with final result tease', '0:08 Quick setup + stakes', '0:30 Main experiment / story', '2:30 Biggest twist', '4:30 CTA + next video bridge'].map((line) => <p key={line} className="text-sm text-text2 mb-2">• {line}</p>)}
      </ResultCard>
    </ToolShell>
  );
}

function ShortsPredictor() {
  const [topic, setTopic] = useState('AI facts in Hindi');
  const result = useMemo(() => optimizeTopic(topic), [topic]);
  return (
    <ToolShell eyebrow="Shorts Viral Predictor" title="Viral Chance + Retention Forecast" description="AI estimate for viral %, retention, engagement and best upload time.">
      <TopicInput value={topic} onChange={setTopic} buttonLabel="Predict Viral Chance" />
      <div className="grid grid-cols-2 gap-3">
        <Metric label="Viral Chance" value={`${result.viralChance}%`} tone="red" />
        <Metric label="Engagement" value="8.7%" tone="green" />
      </div>
      <ResultCard title="Prediction" icon={<TrendingUp size={18} />}>
        <InfoLine label="Retention" value={result.retention} />
        <InfoLine label="Best Time" value={result.bestUploadTime} />
        <InfoLine label="Risk" value="If hook is slow after 2 seconds, swipe-away chance increases." />
      </ResultCard>
    </ToolShell>
  );
}

function ToolShell({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-surface via-black to-yt-red/20 p-5 shadow-2xl">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-yt-red/25 blur-3xl" />
        <p className="text-[10px] text-yt-red font-mono uppercase tracking-[0.28em] relative">{eyebrow}</p>
        <h2 className="mt-2 text-3xl font-syne font-extrabold leading-tight relative">{title}</h2>
        <p className="mt-3 text-sm text-text2 leading-relaxed relative">{description}</p>
      </section>
      {children}
    </div>
  );
}

function TopicInput({ value, onChange, buttonLabel, placeholder = 'Video topic dalo...' }: { value: string; onChange: (value: string) => void; buttonLabel: string; placeholder?: string }) {
  return (
    <div className="glass-card rounded-3xl p-4 space-y-3">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text3" size={18} />
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="h-14 w-full rounded-2xl bg-black/35 border border-white/10 pl-12 pr-4 text-sm outline-none focus:border-yt-red/60" />
      </div>
      <button onClick={() => toast.success('TubeIQ AI generated fresh recommendations')} className="h-13 w-full rounded-2xl bg-yt-red text-white font-black uppercase tracking-wider shadow-[0_12px_30px_rgba(255,0,0,0.22)] active:scale-[0.98] transition-transform">
        {buttonLabel}
      </button>
    </div>
  );
}

function ResultCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="glass-card rounded-3xl p-5 space-y-4">
      <div className="flex items-center gap-2 text-white font-bold"><span className="text-yt-red">{icon}</span>{title}</div>
      {children}
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: 'red' | 'green' | 'blue' }) {
  const tones = { red: 'text-yt-red bg-yt-red/10 border-yt-red/20', green: 'text-success bg-success/10 border-success/20', blue: 'text-primary-blue bg-primary-blue/10 border-primary-blue/20' };
  return <div className={cn('rounded-3xl border p-4 min-h-24 flex flex-col justify-between', tones[tone])}><p className="text-[10px] uppercase font-mono tracking-widest opacity-80">{label}</p><p className="text-lg font-black leading-tight">{value}</p></div>;
}

const CopyRow: React.FC<{ text: string }> = ({ text }) => {
  return <button onClick={() => { navigator.clipboard?.writeText(text); toast.success('Copied'); }} className="w-full text-left p-3 rounded-2xl bg-white/[0.04] border border-white/5 text-sm text-text2 hover:text-white hover:border-yt-red/30 transition-all flex gap-3 justify-between"><span>{text}</span><Copy size={14} className="text-text3 shrink-0" /></button>;
};

function ChipCloud({ items }: { items: string[] }) {
  return <div className="flex flex-wrap gap-2">{items.map((item) => <span key={item} className="px-3 py-2 rounded-full bg-yt-red/10 border border-yt-red/20 text-xs text-white">{item}</span>)}</div>;
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return <div className="py-3 border-b border-white/5 last:border-0"><p className="text-[10px] uppercase font-mono tracking-widest text-text3">{label}</p><p className="text-sm text-text2 mt-1">{value}</p></div>;
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block space-y-2"><span className="text-xs text-text3 uppercase font-mono tracking-widest">{label}</span><input value={value} onChange={(event) => onChange(event.target.value)} className="h-13 w-full rounded-2xl bg-surface2 border border-border-subtle px-4 text-sm outline-none focus:border-yt-red/50" /></label>;
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return <label className="block space-y-2"><span className="text-xs text-text3 uppercase font-mono tracking-widest">{label}</span><textarea value={value} onChange={(event) => onChange(event.target.value)} rows={5} className="w-full rounded-2xl bg-surface2 border border-border-subtle p-4 text-sm outline-none focus:border-yt-red/50" /></label>;
}
