import React, { useState } from 'react';
import { useTubeIQStore } from '../store/useStore';
import { 
  BarChart, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  ExternalLink,
  ChevronDown,
  Filter,
  Play
} from 'lucide-react';
import { deleteVideo } from '../services/youtube';
import { toast } from 'sonner';

export default function MyVideos() {
  const { videos, token, setVideos } = useTubeIQStore();
  const [filter, setFilter] = useState('Latest');

  const handleDelete = async (id: string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to delete this video? this cannot be undone.')) return;
    
    try {
      await deleteVideo(token, id);
      setVideos(videos.filter(v => v.id !== id));
      toast.success('Video deleted successfully.');
    } catch (err) {
      toast.error('Failed to delete video.');
    }
  };

  const sortedVideos = [...videos].sort((a, b) => {
    if (filter === 'Views') return Number(b.views) - Number(a.views);
    if (filter === 'Likes') return Number(b.likes) - Number(a.likes);
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  return (
    <div className="p-6 space-y-6">
      <header className="flex items-center justify-between">
         <h2 className="text-2xl font-syne font-black text-white">My Library</h2>
         <div className="flex items-center gap-2 bg-surface2 px-3 py-1.5 rounded-xl border border-border-subtle">
            <Filter size={14} className="text-text3" />
            <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent text-[11px] font-mono font-bold text-text2 outline-none uppercase tracking-widest cursor-pointer"
            >
                <option value="Latest">Latest</option>
                <option value="Views">Most Views</option>
                <option value="Likes">Most Likes</option>
            </select>
         </div>
      </header>

      <div className="space-y-4">
        {sortedVideos.map((video) => (
          <VideoCard 
            key={video.id} 
            video={video} 
            onDelete={() => handleDelete(video.id)} 
          />
        ))}

        {videos.length === 0 && (
            <div className="py-20 text-center space-y-4">
                <div className="w-16 h-16 bg-surface2 rounded-full flex items-center justify-center mx-auto text-text3">
                    <Play size={32} />
                </div>
                <p className="text-sm text-text3 font-medium">No videos found in your channel.</p>
            </div>
        )}
      </div>
    </div>
  );
}

function VideoCard({ video, onDelete }: { video: any, onDelete: () => void, key?: string }) {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-surface border border-border-subtle rounded-2xl overflow-hidden group">
      <div className="flex items-start p-3 gap-4">
        <div className="w-24 aspect-video rounded-lg overflow-hidden shrink-0 relative">
            <img src={video.thumbnail} alt="thumb" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-[8px] font-mono text-white">
                {video.duration.replace('PT', '').replace('H', ':').replace('M', ':').replace('S', '')}
            </div>
        </div>
        
        <div className="flex-1 flex flex-col gap-1 min-w-0">
            <h4 className="text-sm font-bold text-white line-clamp-2 leading-tight group-hover:text-primary-blue transition-colors">{video.title}</h4>
            <div className="flex items-center gap-3 text-[10px] text-text3 font-mono font-bold uppercase tracking-widest">
                <span>{Number(video.views).toLocaleString()} Views</span>
                <span className={`px-1.5 py-0.5 rounded ${video.privacyStatus === 'public' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    {video.privacyStatus}
                </span>
            </div>
        </div>

        <div className="relative">
            <button 
                onClick={() => setShowActions(!showActions)}
                className="p-2 text-text3 hover:text-white transition-colors"
            >
                <MoreVertical size={18} />
            </button>
            {showActions && (
                <div 
                    className="absolute right-0 top-10 w-40 bg-surface2 border border-border-subtle rounded-xl shadow-2xl z-50 overflow-hidden"
                    onMouseLeave={() => setShowActions(false)}
                >
                   <ActionButton icon={<Edit3 size={14} />} label="Edit Details" />
                   <ActionButton icon={<BarChart size={14} />} label="Full Stats" />
                   <ActionButton icon={<ExternalLink size={14} />} label="View on YT" onClick={() => window.open(`https://youtu.be/${video.id}`, '_blank')} />
                   <ActionButton icon={<Trash2 size={14} />} label="Delete" color="text-danger" onClick={onDelete} />
                </div>
            )}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, color = "text-text2", onClick }: { icon: React.ReactNode, label: string, color?: string, onClick?: () => void }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full px-4 py-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest hover:bg-white/5 transition-colors ${color}`}
        >
            {icon}
            {label}
        </button>
    );
}
