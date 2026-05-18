import React, { useRef, useEffect, useState, memo } from 'react';
import { Heart, MessageCircle, Share2, Music, UserPlus, CheckCircle, TrendingUp, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { VideoPost } from '../types';
import confetti from 'canvas-confetti';
import CommentsModal from './CommentsModal';

interface ReelPlayerProps {
  video: VideoPost;
  isActive: boolean;
}

import { db } from '../lib/firebase';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export const ReelPlayer = memo(({ video, isActive }: ReelPlayerProps) => {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const handleLike = async (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!user) return;
    
    const newLiked = !isLiked;
    setIsLiked(newLiked);

    if (newLiked) {
      if ('vibrate' in navigator) navigator.vibrate(50);
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#ff2d55', '#fbbf24', '#ffffff'],
        disableForReducedMotion: true,
        shapes: ['circle']
      });
    }

    try {
      const vidRef = doc(db, 'videos', video.id);
      await updateDoc(vidRef, {
        likesCount: increment(newLiked ? 1 : -1)
      });
      
      const userRef = doc(db, 'users', video.userId);
      await updateDoc(userRef, {
        totalLikes: increment(newLiked ? 1 : -1)
      });
    } catch (err) {
      console.error("Like error:", err);
      setIsLiked(!newLiked);
    }
  };

  const handleDoubleTap = () => {
    if (!isLiked) handleLike();
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 800);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tiny Tiny Tok Tok',
          text: `Check out this cool video by @${video.user?.displayName || 'creator'}`,
          url: window.location.href,
        });
        const vRef = doc(db, 'videos', video.id);
        await updateDoc(vRef, { shareCount: increment(1) });
      } catch (err) {
        console.log('Share aborted', err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleReport = () => {
    setShowReport(true);
  };

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(console.error);
      const incrementView = async () => {
         const vRef = doc(db, 'videos', video.id);
         await updateDoc(vRef, { viewCount: increment(1) });
      };
      incrementView();
    } else if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="relative h-screen w-full bg-black snap-start" onDoubleClick={handleDoubleTap} onContextMenu={(e) => { e.preventDefault(); handleReport(); }}>
      <video
        ref={videoRef}
        src={video.videoURL}
        className="h-full w-full object-cover"
        loop
        playsInline
        muted={false}
      />

      <AnimatePresence>
        {showReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-6"
          >
            <div className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 w-full max-w-xs text-center shadow-2xl">
              <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-rose-500" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Report Content?</h3>
              <p className="text-zinc-500 text-sm mb-6">Our AI will review this video for community guideline violations.</p>
              <div className="space-y-3">
                <button 
                  onClick={() => { setShowReport(false); }}
                  className="w-full bg-rose-500 text-white font-bold py-3 rounded-xl active:scale-95 transition-all shadow-lg shadow-rose-500/20"
                >
                  Report Video
                </button>
                <button 
                  onClick={() => setShowReport(false)}
                  className="w-full bg-zinc-800 text-white font-bold py-3 rounded-xl active:scale-95 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trending Badge */}
      {video.viewCount > 1000 && (
        <div className="absolute top-20 left-4 z-30 bg-rose-500 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase flex items-center gap-1 shadow-lg shadow-rose-500/20 animate-pulse">
           <TrendingUp size={12} /> Viral Trending
        </div>
      )}

      {/* Heart Animation for double tap */}
      <AnimatePresence>
        {showHeartAnim && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            exit={{ scale: 2, opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
          >
            <Heart fill="#ff2d55" color="#ff2d55" size={100} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right Side Actions */}
      <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
        <div className="relative group cursor-pointer">
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-zinc-800 shadow-xl group-active:scale-95 transition-transform">
            <img src={video.user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${video.userId}`} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-rose-500 rounded-full p-1 border-2 border-black shadow-lg hover:scale-110 active:scale-90 transition-all">
            <UserPlus size={12} strokeWidth={3} />
          </button>
        </div>

        <button onClick={handleLike} className="flex flex-col items-center gap-1 group">
          <Heart 
            size={32} 
            fill={isLiked ? "#ff2d55" : "transparent"} 
            color={isLiked ? "#ff2d55" : "white"} 
            className="group-active:scale-125 transition-transform drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]"
          />
          <span className="text-[10px] font-black drop-shadow-md">
            {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(video.likesCount + (isLiked ? 1 : 0))}
          </span>
        </button>

        <button onClick={() => setIsCommentsOpen(true)} className="flex flex-col items-center gap-1 group">
          <MessageCircle size={32} className="group-active:scale-125 transition-transform drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
          <span className="text-[10px] font-black drop-shadow-md">
            {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(video.commentsCount)}
          </span>
        </button>

        <button onClick={handleShare} className="flex flex-col items-center gap-1 group">
          <Share2 size={32} className="group-active:scale-125 transition-transform drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
          <span className="text-[10px] font-black drop-shadow-md">
            {new Intl.NumberFormat('en-US', { notation: 'compact' }).format(video.shareCount)}
          </span>
        </button>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-4 left-4 right-16 z-20">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-bold drop-shadow-md">@{video.user?.displayName || 'user'}</h3>
          {video.user?.isVerified && (
            <div className="bg-blue-500 rounded-full p-0.5 text-white shadow-[0_0_8px_rgba(59,130,246,0.8)]">
              <CheckCircle size={10} fill="currentColor" />
            </div>
          )}
        </div>
        <p className="text-sm line-clamp-2 mb-3 drop-shadow-md">
          {video.caption} {video.hashtags.map(h => <span key={h} className="text-rose-400 font-bold">#{h} </span>)}
        </p>
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm w-fit px-3 py-1.5 rounded-full border border-white/10">
          <Music size={14} className="animate-spin-slow" />
          <div className="text-[10px] font-bold overflow-hidden w-40">
            <div className="whitespace-nowrap animate-marquee">
               Original Sound - @{video.user?.displayName || 'creator'} • Viral Trending Hits 2026
            </div>
          </div>
        </div>
      </div>

      <CommentsModal 
        videoId={video.id} 
        isOpen={isCommentsOpen} 
        onClose={() => setIsCommentsOpen(false)} 
      />
    </div>
  );
});

export default ReelPlayer;
