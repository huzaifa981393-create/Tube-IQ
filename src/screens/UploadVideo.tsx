import React, { useState } from 'react';
import { useTubeIQStore } from '../store/useStore';
import { uploadVideo } from '../services/youtube';
import { 
  Upload, 
  FileVideo, 
  X, 
  Sparkles, 
  Check, 
  AlertCircle,
  Play
} from 'lucide-react';
import { toast } from 'sonner';

export default function UploadVideo({ onComplete }: { onComplete: () => void }) {
  const { token } = useTubeIQStore();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type.startsWith('video/')) {
      setFile(selected);
      setTitle(selected.name.split('.')[0]);
    } else {
      toast.error('Please select a valid video file.');
    }
  };

  const startUpload = async () => {
    if (!token || !file) return;
    
    setIsUploading(true);
    setProgress(0);

    const metadata = {
      snippet: {
        title,
        description,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        categoryId: '22'
      },
      status: {
        privacyStatus: 'unlisted', // Default to unlisted for safety
        selfDeclaredMadeForKids: false
      }
    };

    try {
      await uploadVideo(token, file, metadata, (pct) => setProgress(pct));
      toast.success('Video uploaded successfully!');
      onComplete();
    } catch (err: any) {
      console.error('Upload error:', err);
      toast.error('Upload failed. ' + (err.message || ''));
    } finally {
      setIsUploading(false);
    }
  };

  if (isUploading) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 space-y-8 animate-in fade-in">
        <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="var(--color-surface2)" strokeWidth="8" fill="transparent" />
                <circle 
                    cx="64" cy="64" r="58" 
                    stroke="var(--color-primary-blue)" 
                    strokeWidth="8" 
                    strokeDasharray={364.4} 
                    style={{ strokeDashoffset: 364.4 - (progress / 100) * 364.4 }}
                    strokeLinecap="round" 
                    fill="transparent" 
                    className="transition-all duration-300"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-mono font-bold text-white">{progress}%</span>
            </div>
        </div>
        <div className="text-center space-y-2">
            <h3 className="text-lg font-syne font-bold text-white">Uploading Masterpiece...</h3>
            <p className="text-xs text-text3 font-mono uppercase tracking-widest">{Math.round(file!.size / 1024 / 1024)} MB • {file!.name}</p>
        </div>
        <p className="text-[10px] text-text3 font-mono px-12 text-center leading-relaxed">Please keep the app open and connected until the upload is finished.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 pb-32">
      <header className="flex items-center justify-between">
         <h2 className="text-2xl font-syne font-black text-white">Upload Video</h2>
         <button onClick={onComplete} className="p-2 text-text3 hover:text-white"><X size={20} /></button>
      </header>

      {!file ? (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-border-subtle rounded-3xl p-12 space-y-4 hover:border-primary-blue/50 hover:bg-primary-blue/5 transition-all cursor-pointer group">
          <input type="file" accept="video/*" onChange={handleFileChange} className="hidden" />
          <div className="w-16 h-16 bg-surface2 rounded-2xl flex items-center justify-center text-text3 group-hover:text-primary-blue transition-colors">
            <Upload size={32} />
          </div>
          <div className="text-center space-y-1">
            <p className="text-sm font-bold text-white">Select Video File</p>
            <p className="text-[10px] text-text3 uppercase font-mono tracking-widest">MP4, MOV OR WEBM</p>
          </div>
        </label>
      ) : (
        <div className="space-y-6">
            <div className="bg-surface2 border border-border-subtle p-4 rounded-2xl flex items-center gap-4">
               <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center text-primary-blue">
                   <FileVideo size={24} />
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white truncate">{file.name}</p>
                  <p className="text-[10px] text-text3 font-mono uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
               </div>
               <button onClick={() => setFile(null)} className="p-2 text-text3 hover:text-danger"><X size={18} /></button>
            </div>

            <div className="space-y-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono font-bold text-text3 px-1 tracking-widest">Video Title</label>
                    <div className="relative">
                        <input 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full h-14 bg-surface2 border border-border-subtle rounded-xl px-4 text-sm outline-none focus:border-primary-blue/50"
                            placeholder="Catchy title here..."
                        />
                        <button className="absolute right-2 top-2 bottom-2 px-3 bg-surface border border-border-subtle rounded-lg text-primary-blue hover:text-white transition-colors">
                            <Sparkles size={16} />
                        </button>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono font-bold text-text3 px-1 tracking-widest">Description</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full h-32 bg-surface2 border border-border-subtle rounded-xl p-4 text-sm outline-none focus:border-primary-blue/50 resize-none"
                        placeholder="Tell viewers about your video..."
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-[10px] uppercase font-mono font-bold text-text3 px-1 tracking-widest">Tags (comma separated)</label>
                    <input 
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="w-full h-14 bg-surface2 border border-border-subtle rounded-xl px-4 text-sm outline-none focus:border-primary-blue/50"
                        placeholder="seo, tutorial, nextjs..."
                    />
                </div>
            </div>

            <button 
                onClick={startUpload}
                disabled={!title}
                className="w-full h-14 bg-primary-blue text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-primary-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Play size={20} fill="currentColor" /> Start Upload
            </button>
        </div>
      )}
    </div>
  );
}
