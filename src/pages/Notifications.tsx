import React from 'react';
import { Heart, MessageCircle, UserPlus, AtSign } from 'lucide-react';
import { motion } from 'motion/react';

export default function Notifications() {
  const notifications = [
    { type: 'like', user: 'jess_vibe', text: 'liked your video', time: '2m', color: 'rose' },
    { type: 'follow', user: 'alex_cool', text: 'started following you', time: '15m', color: 'blue' },
    { type: 'comment', user: 'sam_dev', text: 'commented: "This is fire! 🔥"', time: '1h', color: 'green' },
    { type: 'mention', user: 'reels_bot', text: 'mentioned you in a challenge', time: '3h', color: 'purple' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'like': return <Heart size={16} fill="currentColor" />;
      case 'follow': return <UserPlus size={16} />;
      case 'comment': return <MessageCircle size={16} />;
      case 'mention': return <AtSign size={16} />;
      default: return null;
    }
  };

  return (
    <div className="bg-black h-full overflow-y-auto text-white p-6 pb-24">
      <h1 className="text-2xl font-bold mb-8">Inbox</h1>
      
      <div className="flex gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        {['All', 'Likes', 'Comments', 'Mentions', 'Followers'].map((filter, i) => (
          <button 
            key={i}
            className={`whitespace-nowrap px-6 py-2 rounded-xl text-sm font-bold border transition-all ${i === 0 ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-500 border-white/5'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {notifications.map((notif, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="relative">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${notif.user}`} 
                className="w-14 h-14 rounded-full border border-white/10" 
                alt="Avatar"
              />
              <div className={`absolute -bottom-1 -right-1 p-1 rounded-full text-white bg-${notif.color}-500 shadow-lg border-2 border-black`}>
                {getIcon(notif.type)}
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-bold">@{notif.user}</span> {notif.text}
              </p>
              <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">{notif.time}</p>
            </div>

            <div className="w-10 h-14 bg-zinc-900 rounded-lg border border-white/5 overflow-hidden">
               {/* Small thumbnail placeholder */}
               <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-700" />
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-xs text-zinc-600 font-medium italic">That's everything for today.</p>
      </div>
    </div>
  );
}
