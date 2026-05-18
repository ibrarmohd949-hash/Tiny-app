import React, { useState, useEffect } from 'react';
import ReelPlayer from './ReelPlayer';
import { VideoPost } from '../types';

interface ReelFeedProps {
  videos: VideoPost[];
}

export default function ReelFeed({ videos }: ReelFeedProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollPos = e.currentTarget.scrollTop;
    const height = e.currentTarget.clientHeight;
    const index = Math.round(scrollPos / height);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  // Preload Logic: Render 2 neighbors to ensure smooth scrolling
  const visibleVideos = videos.slice(Math.max(0, activeIndex - 1), activeIndex + 3);

  return (
    <div 
      className="h-full w-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scroll-smooth"
      onScroll={handleScroll}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {videos.map((video, index) => {
        // Only mount the actual video component if it's close to viewport
        const shouldRender = Math.abs(index - activeIndex) <= 1;
        return (
          <div key={video.id} className="h-full w-full snap-start">
            {shouldRender ? (
              <ReelPlayer 
                video={video} 
                isActive={index === activeIndex} 
              />
            ) : (
              <div className="h-full w-full bg-zinc-900 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/10 border-t-white/30 rounded-full animate-spin" />
              </div>
            )}
          </div>
        );
      })}
      
      {videos.length === 0 && (
        <div className="h-full flex items-center justify-center text-zinc-500 italic">
          No reels yet. Be the first to post!
        </div>
      )}
    </div>
  );
}
