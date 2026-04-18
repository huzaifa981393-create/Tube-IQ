import React from 'react';
import { useTubeIQStore } from '../../store/useStore';
import { 
  Home, 
  PlaySquare, 
  BarChart3, 
  Search, 
  MessageSquare, 
  User,
  PlusCircle,
  TrendingUp,
  MessageCircle,
  Users
} from 'lucide-react';

// Screens (To be created)
import Dashboard from '../../screens/Dashboard';
import MyVideos from '../../screens/MyVideos';
import Analytics from '../../screens/Analytics';
import Utils from '../../screens/Utils'; // Keyword Research + Tag Gen + Comments
import Profile from '../../screens/Profile';
import UploadVideo from '../../screens/UploadVideo';

export default function MainNavigation() {
  const { activeTab, setActiveTab } = useTubeIQStore();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home': return <Dashboard />;
      case 'videos': return <MyVideos />;
      case 'analytics': return <Analytics />;
      case 'utils': return <Utils />;
      case 'profile': return <Profile />;
      case 'upload': return <UploadVideo onComplete={() => setActiveTab('home')} />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-bg relative">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {renderActiveScreen()}
      </div>

      {/* Bottom Nav */}
      <nav className="absolute bottom-0 left-0 right-0 h-20 bg-surface border-t border-border-subtle flex items-center justify-around px-2 z-40">
        <NavButton 
          active={activeTab === 'home'} 
          icon={<Home size={22} />} 
          label="Home" 
          onClick={() => setActiveTab('home')} 
        />
        <NavButton 
          active={activeTab === 'videos'} 
          icon={<PlaySquare size={22} />} 
          label="Videos" 
          onClick={() => setActiveTab('videos')} 
        />
        
        {/* Special Center Button for Utils (Search/Analyze) */}
        <button 
          onClick={() => setActiveTab('utils')}
          className={`flex flex-col items-center justify-center -mt-8 w-14 h-14 rounded-full transition-all duration-300 ${activeTab === 'utils' ? 'bg-primary-blue text-white shadow-[0_4px_20px_rgba(59,130,246,0.3)]' : 'bg-surface2 text-text2 border border-border-subtle'}`}
        >
          <PlusCircle size={32} />
        </button>

        <NavButton 
          active={activeTab === 'analytics'} 
          icon={<BarChart3 size={22} />} 
          label="Stats" 
          onClick={() => setActiveTab('analytics')} 
        />
        <NavButton 
          active={activeTab === 'profile'} 
          icon={<User size={22} />} 
          label="Profile" 
          onClick={() => setActiveTab('profile')} 
        />
      </nav>
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-colors ${active ? 'text-primary-blue' : 'text-text3 hover:text-text2'}`}
    >
      {icon}
      <span className="text-[10px] uppercase font-mono tracking-widest font-bold">{label}</span>
    </button>
  );
}
