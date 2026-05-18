export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  bio?: string;
  followersCount: number;
  followingCount: number;
  totalLikes: number;
  isVerified: boolean;
  verificationStatus?: 'none' | 'pending' | 'verified';
  isAdmin: boolean;
  coins: number;
  creatorEarnings: number;
  createdAt: any;
  updatedAt: any;
}

export interface VideoPost {
  id: string;
  userId: string;
  user?: UserProfile;
  videoURL: string;
  thumbnailURL: string;
  caption: string;
  title: string;
  hashtags: string[];
  likesCount: number;
  commentsCount: number;
  shareCount: number;
  viewCount: number;
  viralScore: number;
  aiGenerated?: {
    title: string;
    hashtags: string[];
    caption: string;
  };
  moderationStatus: 'pending' | 'approved' | 'rejected';
  createdAt: any;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'gift' | 'withdrawal' | 'reward';
  status: 'pending' | 'completed';
  createdAt: any;
}

export interface Comment {
  id: string;
  userId: string;
  user?: UserProfile;
  videoId: string;
  text: string;
  createdAt: any;
}
