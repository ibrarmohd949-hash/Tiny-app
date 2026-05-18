import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, TrendingUp, Users, DollarSign, Award, ChevronRight, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { VideoPost } from '../types';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function CreatorDashboard() {
  const { user, profile } = useAuth();
  const [stats, setStats] = useState({ totalViews: 0, totalLikes: 0, topVideo: null as VideoPost | null });

  const chartData = [
    { name: 'Mon', views: 4000 },
    { name: 'Tue', views: 3000 },
    { name: 'Wed', views: 5000 },
    { name: 'Thu', views: 2780 },
    { name: 'Fri', views: 1890 },
    { name: 'Sat', views: 2390 },
    { name: 'Sun', views: 3490 },
  ];

  useEffect(() => {
    if (!user) return;
    const fetchStats = async () => {
      const q = query(collection(db, 'videos'), where('userId', '==', user.uid));
      const snaps = await getDocs(q);
      let views = 0;
      let likes = 0;
      let topV = null;
      snaps.forEach(d => {
        const v = d.data() as VideoPost;
        views += v.viewCount;
        likes += v.likesCount;
        if (!topV || v.viewCount > (topV as any).viewCount) topV = { ...v, id: d.id };
      });
      setStats({ totalViews: views, totalLikes: likes, topVideo: topV });
    };
    fetchStats();
  }, [user]);

  if (!user) return null;

  return (
    <div className="min-h-full bg-black text-white p-6 pb-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black italic tracking-tighter">Creator Studio</h1>
        <div className="px-3 py-1 bg-gradient-to-r from-rose-500 to-amber-500 text-white rounded-full text-[10px] font-black uppercase shadow-lg shadow-rose-500/20">
          PRO AI
        </div>
      </div>

      <div className="mb-8 glass p-6 rounded-[2rem]">
        <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-6">Engagement Trends</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="views" stroke="#f43f5e" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <StatCard icon={<Users className="text-blue-400" />} label="Followers" value={profile?.followersCount || 0} change="+12%" />
        <StatCard icon={<TrendingUp className="text-green-400" />} label="Total Views" value={stats.totalViews} change="+24%" />
      </div>

      {/* Monetization Section */}
      <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 rounded-3xl p-6 border border-white/5 mb-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Award className="text-amber-500" /> Monetization Status
          </h2>
          <p className="text-sm text-zinc-400 mb-6 font-medium">You are 80% towards your next milestone!</p>
          
          <div className="w-full bg-white/5 h-3 rounded-full mb-8 relative overflow-hidden">
             <motion.div 
               initial={{ width: 0 }}
               animate={{ width: '80%' }}
               className="h-full bg-gradient-to-r from-amber-500 to-rose-500 rounded-full" 
            />
          </div>
          
          <div className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-white/5">
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-black">Creator Coins</p>
              <p className="text-xl font-black">{profile?.coins || 0} <span className="text-xs text-zinc-600 font-bold ml-1">TT Coins</span></p>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-xl text-xs font-bold hover:scale-105 active:scale-95 transition-transform">
              Cash Out
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full -mr-16 -mt-16" />
      </div>

      {/* Top Content */}
      {stats.topVideo && (
        <div className="mb-8">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2"><BarChart3 size={20} className="text-zinc-400" /> Best Performing Reel</h2>
          <div className="bg-zinc-900 rounded-2xl p-4 flex gap-4 border border-white/5 items-center">
            <div className="w-16 h-24 bg-zinc-800 rounded-lg overflow-hidden shrink-0">
               <video src={stats.topVideo.videoURL} className="w-full h-full object-cover grayscale opacity-50" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm line-clamp-1">{stats.topVideo.title || stats.topVideo.caption}</h3>
              <p className="text-xs text-zinc-500 mt-1">{stats.topVideo.viewCount} views • {stats.topVideo.likesCount} hits</p>
            </div>
            <ChevronRight className="text-zinc-600" />
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, change }: any) {
  return (
    <div className="bg-zinc-900/50 p-5 rounded-2xl border border-white/5 hover:bg-zinc-900 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/5 rounded-xl">{icon}</div>
        <span className="text-[10px] font-black text-zinc-500">{change}</span>
      </div>
      <p className="text-2xl font-black">{typeof value === 'number' ? value.toLocaleString() : value}</p>
      <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}
