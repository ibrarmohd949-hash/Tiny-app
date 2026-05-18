import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Edit, LogOut, Grid, Bookmark, Heart, Settings as SettingsIcon, LayoutDashboard, CheckCircle, Wallet, TrendingUp } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { VideoPost } from '../types';
import { Skeleton } from '../components/Skeleton';

export default function Profile() {
  const { user, profile, logout } = useAuth();
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'videos'|'liked'>('videos');

  useEffect(() => {
    if (!user) return;
    const fetchUserVideos = async () => {
      const q = query(
        collection(db, 'videos'), 
        where('userId', '==', user.uid)
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map(d => ({ ...d.data(), id: d.id } as VideoPost));
      setVideos(list);
      setLoading(false);
    };
    fetchUserVideos();
  }, [user]);

  if (!user) return null;

  return (
    <div className="bg-black h-full overflow-y-auto text-white pb-24">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 glass-dark sticky top-0 z-40">
        <div className="flex items-center gap-2">
           <h2 className="font-black italic tracking-tighter text-lg uppercase">Profile</h2>
           {profile?.isVerified && <CheckCircle size={16} className="text-blue-500 fill-current" />}
        </div>
        <div className="flex items-center gap-4">
           <NavLink to="/wallet"><Wallet size={22} className="text-zinc-500 hover:text-white transition-colors" /></NavLink>
           <NavLink to="/settings"><SettingsIcon size={22} className="text-zinc-500 hover:text-white transition-colors" /></NavLink>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex flex-col items-center py-10 relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-rose-500/10 to-transparent pointer-events-none" />
        
        <div className="relative mb-6 z-10">
          <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-tr from-rose-500 to-amber-500 p-1 shadow-2xl">
            <img 
              src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} 
              className="w-full h-full rounded-[2.2rem] border-4 border-black object-cover" 
              alt="Profile"
            />
          </div>
          {profile?.isVerified && (
            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-1.5 border-4 border-black shadow-lg">
               <CheckCircle size={16} fill="currentColor" />
            </div>
          )}
        </div>
        
        <h1 className="text-xl font-black italic tracking-tight">@{user.displayName?.replace(/\s+/g, '').toLowerCase()}</h1>
        <p className="text-zinc-500 text-xs font-bold uppercase mt-1 tracking-widest">Creator Member</p>
        
        <div className="flex gap-10 mt-8 w-full px-6 flex-wrap justify-center">
          <StatItem label="Following" value={profile?.followingCount || 0} />
          <StatItem label="Followers" value={profile?.followersCount || 0} />
          <StatItem label="Likes" value={profile?.totalLikes || 0} />
        </div>

        <div className="flex gap-3 mt-10 w-full px-6">
          <button className="flex-1 glass border border-white/10 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95">
            <Edit size={16} className="inline mr-2" /> Edit Profile
          </button>
          <NavLink to="/creator-studio" className="flex-1 bg-gradient-to-tr from-rose-500 to-amber-500 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-rose-500/20 active:scale-95 transition-all">
             <LayoutDashboard size={16} /> Studio
          </NavLink>
        </div>
        
        {profile?.bio && (
          <p className="mt-8 text-sm text-center px-12 text-zinc-400 font-medium leading-relaxed italic">
            "{profile.bio}"
          </p>
        )}
      </div>

      {/* Content Tabs */}
      <div className="flex border-b border-white/5 sticky top-16 z-30 bg-black pt-2">
        <button 
          onClick={() => setTab('videos')}
          className={`flex-1 py-4 flex flex-col items-center gap-1 border-b-2 transition-all ${tab === 'videos' ? 'border-rose-500 text-white' : 'border-transparent text-zinc-600'}`}
        >
          <Grid size={20} />
          <span className="text-[9px] font-black uppercase tracking-widest">Reels</span>
        </button>
        <button 
          onClick={() => setTab('liked')}
          className={`flex-1 py-4 flex flex-col items-center gap-1 border-b-2 transition-all ${tab === 'liked' ? 'border-rose-500 text-white' : 'border-transparent text-zinc-600'}`}
        >
          <Heart size={20} />
          <span className="text-[9px] font-black uppercase tracking-widest">Liked</span>
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-3 gap-0.5 p-0.5">
        {loading ? [1,2,3,4,5,6].map(i => <Skeleton key={i} className="aspect-[9/16] rounded-none opacity-20" />) : videos.map(video => (
          <div key={video.id} className="aspect-[9/16] bg-zinc-900 relative group overflow-hidden active:scale-95 transition-transform cursor-pointer">
            <video src={video.videoURL} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            <div className="absolute inset-x-0 bottom-0 p-2 flex items-center gap-1 bg-gradient-to-t from-black/80 to-transparent">
              <TrendingUp size={10} className="text-white" />
              <span className="text-[10px] font-black text-white">{video.viewCount}</span>
            </div>
          </div>
        ))}
        {videos.length === 0 && !loading && (
          <div className="col-span-3 py-32 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-4 border border-white/5">
              <Grid className="text-zinc-700" size={32} />
            </div>
            <p className="text-zinc-600 text-sm font-bold uppercase tracking-widest italic">No Reels Yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string, value: number }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-xl font-black italic">{value.toLocaleString()}</span>
      <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">{label}</span>
    </div>
  );
}
