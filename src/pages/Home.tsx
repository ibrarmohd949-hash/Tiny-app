import React, { useEffect, useState } from 'react';
import ReelFeed from '../components/ReelFeed';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { collection, query, orderBy, limit, onSnapshot, getDoc, doc } from 'firebase/firestore';
import { VideoPost, UserProfile } from '../types';

import { ReelSkeleton } from '../components/Skeleton';

export default function Home() {
  const { profile } = useAuth();
  const [videos, setVideos] = useState<VideoPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [trendingTags, setTrendingTags] = useState<string[]>([]);

  useEffect(() => {
    fetch('/api/trending').then(r => r.json()).then(data => setTrendingTags(data.hashtags));
    
    const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'), limit(20));
    
    return onSnapshot(q, async (snapshot) => {
      const videoList: VideoPost[] = [];
      const userCache: Record<string, UserProfile> = {};

      if (snapshot.empty) {
        // Fallback dummy data if Firebase is empty/unconfigured
        setVideos([
          {
            id: 'demo1',
            userId: 'system',
            videoURL: 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            thumbnailURL: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7',
            caption: 'Welcome to TinyTok! 🚀 #AiTok #FirstVideo',
            title: 'Welcome to TinyTok',
            hashtags: ['AiTok', 'FirstVideo'],
            likesCount: 1200,
            commentsCount: 45,
            shareCount: 12,
            viewCount: 5000,
            viralScore: 85,
            moderationStatus: 'approved',
            createdAt: new Date().toISOString(),
            user: {
              uid: 'system',
              displayName: 'TinyTok Team',
              email: 'team@tinytok.ai',
              photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=tinytok',
              followersCount: 15000,
              followingCount: 1,
              totalLikes: 100000,
              isVerified: true,
              isAdmin: true,
              coins: 0,
              creatorEarnings: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          },
          {
            id: 'demo2',
            userId: 'system2',
            videoURL: 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
            thumbnailURL: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4',
            caption: 'Nature is beautiful. 🌿 #Nature #AI #Reels',
            title: 'Nature Magic',
            hashtags: ['Nature', 'AI', 'Reels'],
            likesCount: 850,
            commentsCount: 23,
            shareCount: 5,
            viewCount: 3000,
            viralScore: 65,
            moderationStatus: 'approved',
            createdAt: new Date().toISOString(),
            user: {
              uid: 'system2',
              displayName: 'AI Explorer',
              email: 'explorer@ai.com',
              photoURL: 'https://api.dicebear.com/7.x/bottts/svg?seed=explorer',
              followersCount: 500,
              followingCount: 150,
              totalLikes: 2000,
              isVerified: false,
              isAdmin: false,
              coins: 0,
              creatorEarnings: 0,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          }
        ]);
        setLoading(false);
        return;
      }

      for (const d of snapshot.docs) {
        const data = d.data() as VideoPost;
        const userId = data.userId;
        
        if (!userCache[userId]) {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            userCache[userId] = userDoc.data() as UserProfile;
          }
        }
        
        videoList.push({
          ...data,
          id: d.id,
          user: userCache[userId]
        });
      }
      
      setVideos(videoList);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="h-full bg-black">
        <ReelSkeleton />
      </div>
    );
  }

  return (
    <div className="h-full bg-black">
      <div className="absolute top-0 left-0 right-0 z-30 flex flex-col pointer-events-none">
        <div className="flex justify-center py-4 pointer-events-auto bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex gap-6 text-sm font-semibold">
            <button className="text-zinc-400 hover:text-white transition-colors">Following</button>
            <div className="flex flex-col items-center">
              <button className="text-white">For You</button>
              <div className="w-6 h-1 bg-rose-500 rounded-full mt-1 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
            </div>
          </div>
        </div>
        
        {/* Stories Bar */}
        <div className="flex gap-4 px-4 overflow-x-auto py-2 pointer-events-auto scrollbar-hide bg-gradient-to-b from-black/20 to-transparent">
          <div className="flex flex-col items-center shrink-0 gap-1 group cursor-pointer">
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-rose-500 p-0.5 group-active:scale-95 transition-transform">
              <div className="w-full h-full bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden">
                 <img src={profile?.photoURL} alt="Me" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-6 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-bold">+</div>
            </div>
            <span className="text-[10px] text-white/80 font-medium">Your Story</span>
          </div>
          
          {[1,2,3,4,5].map(i => (
            <div key={i} className="flex flex-col items-center shrink-0 gap-1 cursor-pointer group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-500 via-amber-500 to-purple-500 p-0.5 group-active:scale-95 transition-transform">
                <div className="w-full h-full bg-black rounded-full p-0.5">
                   <div className="w-full h-full bg-zinc-800 rounded-full overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`} alt="User" />
                   </div>
                </div>
              </div>
              <span className="text-[10px] text-white/80 font-medium">Friend {i}</span>
            </div>
          ))}
        </div>
      </div>
      <ReelFeed videos={videos} />
    </div>
  );
}
