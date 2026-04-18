import React, { useState, useEffect } from 'react';
import { useTubeIQStore } from '../store/useStore';
import { 
  fetchComments, 
  postReply, 
  searchChannels 
} from '../services/youtube';
import { 
  Search, 
  Tag as TagIcon, 
  MessageCircle, 
  Target,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Zap,
  CheckCircle2,
  Copy,
  User,
  ThumbsUp,
  MoreHorizontal,
  Play,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export default function Utils() {
  const [utility, setUtility] = useState('keywords');

  const tabs = [
    { id: 'keywords', icon: <Search size={18} />, label: 'SEO' },
    { id: 'tags', icon: <TagIcon size={18} />, label: 'Tags' },
    { id: 'comments', icon: <MessageCircle size={18} />, label: 'Talk' },
    { id: 'spy', icon: <Target size={18} />, label: 'Spy' },
  ];

  return (
    <div className="min-h-full flex flex-col">
      {/* Utility Selector Bar */}
      <div className="p-6 pb-2 sticky top-0 bg-bg/80 backdrop-blur-md z-30 space-y-4">
        <h2 className="text-[12px] uppercase font-mono tracking-widest text-text3 font-bold">Optimization Core</h2>
        <div className="flex bg-surface2 p-1 rounded-2xl border border-border-subtle">
           {tabs.map((tab) => (
             <button 
                key={tab.id}
                onClick={() => setUtility(tab.id)}
                className={cn(
                  "flex-1 py-2.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all",
                  utility === tab.id ? "bg-primary-blue text-white shadow-lg" : "text-text3 hover:text-text2"
                )}
             >
                {tab.icon}
                <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
             </button>
           ))}
        </div>
      </div>

      <div className="flex-1 p-6">
        {utility === 'keywords' && <KeywordResearch />}
        {utility === 'tags' && <TagGenerator />}
        {utility === 'comments' && <CommentManager />}
        {utility === 'spy' && <CompetitorSpy />}
      </div>
    </div>
  );
}

function KeywordResearch() {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-4">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text3 group-focus-within:text-primary-blue transition-colors" size={20} />
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search keyword..."
                        className="w-full h-14 bg-surface2 border border-border-subtle rounded-2xl pl-12 pr-4 outline-none focus:border-primary-blue/50 text-sm"
                    />
                </div>
                <button 
                    onClick={() => { setIsSearching(true); setTimeout(() => setIsSearching(false), 1000); }}
                    className="w-full h-14 bg-primary-blue text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-primary-blue/20"
                >
                   {isSearching ? <Zap className="animate-pulse" /> : "Analyze Keyword"}
                </button>
            </div>

            <section className="space-y-6">
                <div className="flex items-center gap-2 text-text2 uppercase font-mono tracking-widest text-xs font-bold">
                    <TrendingUp size={14} className="text-success" /> Global Trends
                </div>
                <div className="space-y-3">
                   {['React 19 Hooks', 'Vite 6 Features', 'AI Agent Builder', 'Cursor IDE Tips'].map((k, i) => (
                       <div key={i} className="bg-surface border border-border-subtle p-4 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-primary-blue/30 transition-all">
                           <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-surface2 rounded-lg flex items-center justify-center text-primary-blue font-mono font-bold text-xs">
                                   0{i+1}
                               </div>
                               <span className="text-sm font-bold text-white group-hover:text-primary-blue transition-colors">{k}</span>
                           </div>
                           <div className="text-right">
                               <div className="text-xs font-mono font-black text-success">85%</div>
                               <div className="text-[8px] text-text3 uppercase font-mono">SEO SCORE</div>
                           </div>
                       </div>
                   ))}
                </div>
            </section>
        </div>
    );
}

function TagGenerator() {
    const [topic, setTopic] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    
    const generate = () => {
        if (!topic) return;
        setTags(['reactjs', 'tutorial', 'programming', 'javascript', 'web development', 'coding', 'software engineer']);
        toast.success('Generated top 7 ranking tags');
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-surface border border-border-subtle p-6 rounded-3xl space-y-4">
               <div className="flex items-center gap-3 text-primary-blue">
                   <Sparkles size={24} />
                   <h3 className="font-syne font-bold text-white uppercase text-sm tracking-widest">AI Tag Generator</h3>
               </div>
               <p className="text-xs text-text3 leading-relaxed">Enter your video topic and IQ assistant will generate high-ranking tags optimized for YouTube search.</p>
               <div className="space-y-3 pt-4">
                   <input 
                        type="text" 
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g. Next.js 15 Full Tutorial"
                        className="w-full h-14 bg-surface2 border border-border-subtle rounded-2xl px-5 outline-none focus:border-primary-blue/50 text-sm"
                   />
                   <button 
                        onClick={generate}
                        className="w-full h-14 bg-primary-blue text-white font-black rounded-2xl uppercase tracking-widest text-[11px]"
                    >
                        Generate Smart Tags
                    </button>
               </div>
            </div>

            {tags.length > 0 && (
                <section className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <span className="text-[10px] uppercase font-mono font-black text-text3 tracking-widest">{tags.length} TAGS GENERATED</span>
                        <button 
                            onClick={() => { navigator.clipboard.writeText(tags.join(', ')); toast.success('Copied all tags'); }}
                            className="text-primary-blue text-[10px] font-black uppercase tracking-widest flex items-center gap-1"
                        >
                            <Copy size={12} /> Copy All
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                            <div key={tag} className="px-3 py-1.5 bg-surface2 border border-border-subtle rounded-xl text-xs font-medium text-text2 flex items-center gap-2">
                                #{tag}
                                <div className="w-1.5 h-1.5 rounded-full bg-success opacity-50" />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

function CommentManager() {
    const { token, videos } = useTubeIQStore();
    const [selectedVideo, setSelectedVideo] = useState(videos[0]?.id || '');
    const [comments, setComments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [replyText, setReplyText] = useState<{ [id: string]: string }>({});

    useEffect(() => {
        if (!token || !selectedVideo) return;
        loadComments();
    }, [selectedVideo]);

    const loadComments = async () => {
        setIsLoading(true);
        try {
            const data = await fetchComments(token!, selectedVideo);
            setComments(data);
        } catch (err) {
            toast.error('Failed to load comments.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleReply = async (parentId: string) => {
        const text = replyText[parentId];
        if (!text?.trim() || !token) return;

        try {
            await postReply(token, parentId, text);
            toast.success('Reply posted!');
            setReplyText({ ...replyText, [parentId]: '' });
            loadComments();
        } catch (err) {
            toast.error('Failed to post reply.');
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <header className="space-y-3 px-1">
                <h3 className="text-sm font-bold text-white uppercase font-syne tracking-widest">Comment Mastery</h3>
                <div className="relative">
                   <select 
                      value={selectedVideo}
                      onChange={(e) => setSelectedVideo(e.target.value)}
                      className="w-full h-12 bg-surface2 border border-border-subtle rounded-xl px-4 text-xs font-bold text-text2 outline-none appearance-none"
                   >
                      {videos.map(v => (
                          <option key={v.id} value={v.id}>{v.title}</option>
                      ))}
                   </select>
                   <ChevronRight size={14} className="absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-text3 pointer-events-none" />
                </div>
            </header>

            <div className="space-y-4">
                {isLoading ? (
                    [1,2,3].map(i => <div key={i} className="h-24 bg-surface2 rounded-3xl shimmer" />)
                ) : comments.map(c => {
                    const comment = c.snippet.topLevelComment.snippet;
                    return (
                        <div key={c.id} className="bg-surface border border-border-subtle p-5 rounded-3xl space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full overflow-hidden border border-border-subtle">
                                        <img src={comment.authorProfileImageUrl} alt="avatar" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white tracking-tight">{comment.authorDisplayName}</span>
                                        <span className="text-[10px] text-text3 font-mono">{(comment.publishedAt).split('T')[0]}</span>
                                    </div>
                                </div>
                                <div className="px-2 py-0.5 bg-success/10 text-success border border-success/20 rounded text-[8px] font-black uppercase tracking-widest">
                                    😊 Positive
                                </div>
                            </div>
                            <p className="text-sm text-text2 leading-relaxed">
                                {comment.textDisplay}
                            </p>
                            
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center bg-surface2 rounded-xl border border-border-subtle overflow-hidden">
                                    <input 
                                        value={replyText[c.id] || ''}
                                        onChange={(e) => setReplyText({ ...replyText, [c.id]: e.target.value })}
                                        placeholder="Type reply..."
                                        className="flex-1 bg-transparent px-4 h-10 text-xs outline-none"
                                    />
                                    <button 
                                        onClick={() => handleReply(c.id)}
                                        className="px-4 h-10 bg-primary-blue text-white"
                                    >
                                        <Send size={14} />
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-1.5 text-[9px] font-black text-text3 uppercase tracking-widest hover:text-white transition-colors">
                                        <ThumbsUp size={12} /> {comment.likeCount}
                                    </button>
                                    <button 
                                        onClick={() => {
                                            toast.info("Generating reply with Claude...");
                                            // Mocking AI suggestion for now
                                            setReplyText({ ...replyText, [c.id]: "Thanks for your feedback! Glad you enjoyed it." });
                                        }}
                                        className="flex items-center gap-1.5 text-[9px] font-black text-primary-blue uppercase tracking-widest bg-primary-blue/5 border border-primary-blue/10 px-3 py-1.5 rounded-lg"
                                    >
                                        <Sparkles size={10} /> AI Reply
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {!isLoading && comments.length === 0 && (
                    <div className="py-20 text-center text-text3 italic text-xs">No comments found for this video.</div>
                )}
            </div>
        </div>
    );
}

function Send({ size }: { size: number }) {
    return <ArrowRight size={size} />;
}

function CompetitorSpy() {
    const { token } = useTubeIQStore();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        if (!query || !token) return;
        setIsLoading(true);
        try {
            const channels = await searchChannels(token, query);
            setResults(channels);
        } catch (err) {
            toast.error('Search failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-4">
                <header className="px-1">
                    <h3 className="text-sm font-syne font-bold text-white uppercase tracking-widest">Growth Intelligence</h3>
                    <p className="text-xs text-text3 mt-1">Discover what's working for top channels in your niche.</p>
                </header>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text3" size={18} />
                       <input 
                          type="text" 
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                          placeholder="Channel name or URL..."
                          className="w-full h-14 bg-surface2 border border-border-subtle rounded-2xl pl-12 pr-5 outline-none focus:border-primary-blue/50 text-sm"
                       />
                    </div>
                    <button 
                        onClick={handleSearch}
                        className="w-14 h-14 bg-primary-blue text-white rounded-2xl flex items-center justify-center shadow-lg shadow-primary-blue/20"
                    >
                        <Zap size={20} />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    [1,2].map(i => <div key={i} className="h-20 bg-surface2 rounded-3xl shimmer" />)
                ) : results.map(c => (
                    <div key={c.id.channelId} className="bg-surface border border-border-subtle p-4 rounded-3xl flex items-center gap-4 group hover:border-primary-blue/30 transition-all">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-border-subtle">
                            <img src={c.snippet.thumbnails.default.url} alt="chan" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white truncate">{c.snippet.title}</h4>
                            <p className="text-[10px] text-text3 font-mono line-clamp-1">{c.snippet.description}</p>
                        </div>
                        <button className="p-2.5 bg-surface2 rounded-xl text-text3 hover:text-primary-blue group-hover:bg-primary-blue/10 transition-all">
                            <Target size={18} />
                        </button>
                    </div>
                ))}
            </div>

            {!isLoading && results.length === 0 && (
                <section className="bg-primary-blue/5 border border-primary-blue/20 p-6 rounded-3xl space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                        <Target size={120} />
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 bg-surface2 rounded-xl flex items-center justify-center text-primary-blue">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h4 className="font-syne font-bold text-white uppercase text-xs tracking-widest">Niche Analysis</h4>
                            <p className="text-xs text-text3 mt-1">Search a competitor to see strategy alerts.</p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

