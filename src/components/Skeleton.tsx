import React, { memo } from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = memo(({ className = "" }: SkeletonProps) => {
  return (
    <div className={`shimmer rounded-xl ${className}`} />
  );
});

export const ReelSkeleton = memo(() => (
  <div className="h-full w-full bg-black relative">
    <Skeleton className="absolute inset-0 rounded-none opacity-20" />
    <div className="absolute right-4 bottom-24 flex flex-col gap-6">
      <Skeleton className="w-12 h-12 rounded-full" />
      <Skeleton className="w-10 h-10 rounded-full" />
      <Skeleton className="w-10 h-10 rounded-full" />
      <Skeleton className="w-10 h-10 rounded-full" />
    </div>
    <div className="absolute bottom-8 left-4 space-y-3 w-2/3">
      <Skeleton className="w-1/2 h-6" />
      <Skeleton className="w-full h-4" />
      <Skeleton className="w-3/4 h-3" />
    </div>
  </div>
));
