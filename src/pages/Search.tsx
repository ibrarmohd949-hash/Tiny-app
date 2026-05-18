import React, { useState } from 'react';
import { Search as SearchIcon, TrendingUp, Music, Hash } from 'lucide-react';
import { motion } from 'motion/react';
import { Skeleton } from '../components/Skeleton';

export default function Search() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const trendingTopics = [
    { name: 'DancingChallenge', posts: '1.2M', icon: Hash },
    { name: 'GamingSetup2026', posts: '850K', icon: Hash },
    { name: 'MorningVibe', posts: '2.4M', icon: Music },
    { name: 'TravelDiaries', posts: '500K', icon: TrendingUp },
  ];

  return (
    <div className="p-6 bg-black h-full overflow-y-auto text-white pb-32">
      <div className="relative mb-8">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
          <SearchIcon size={20} />
        </div>
        <input 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search creators, songs, hashtags..."
          className="w-full bg-zinc-900 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 glass"
        />
      </div>

      <div className="space-y-8">
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-black text-xl italic flex items-center gap-2">
              <TrendingUp size={20} className="text-rose-500" /> Viral Now
            </h2>
            <button className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">See All</button>
          </div>
          
          <div className="space-y-4">
            {loading ? [1,2,3].map(i => <Skeleton key={i} className="h-20 w-full" />) : trendingTopics.map((topic, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-3xl border border-white/5 hover:glass transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <topic.icon size={24} className="text-rose-500" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm italic">#{topic.name}</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">Trending • {topic.posts} posts</p>
                  </div>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 neon-border" />
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-black text-xl italic">Categories</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['Gaming', 'Comedy', 'Music', 'Sports'].map((cat, i) => (
              loading ? <Skeleton key={i} className="h-32 w-full" /> : (
                <div 
                  key={i}
                  className="h-32 rounded-[2rem] bg-gradient-to-br from-zinc-800/50 to-zinc-900 border border-white/5 flex flex-col justify-between p-6 glass hover:neon-border transition-all group cursor-pointer"
                >
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                      <TrendingUp size={16} className="text-zinc-500 group-hover:text-rose-500" />
                   </div>
                   <span className="font-black text-sm italic tracking-tighter uppercase">{cat}</span>
                </div>
              )
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
