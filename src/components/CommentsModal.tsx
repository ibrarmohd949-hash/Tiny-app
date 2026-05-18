import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  increment 
} from 'firebase/firestore';

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  likes: number;
  createdAt: any;
}

interface CommentsModalProps {
  videoId: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function CommentsModal({ videoId, isOpen, onClose }: CommentsModalProps) {
  const { user, profile } = useAuth();
  const [text, setText] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const q = query(
      collection(db, 'comments'),
      where('videoId', '==', videoId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(docs);
      setLoading(false);
    });

    return unsubscribe;
  }, [videoId, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !user) return;

    const commentText = text.trim();
    setText('');

    try {
      await addDoc(collection(db, 'comments'), {
        videoId,
        userId: user.uid,
        userName: profile?.displayName || 'User',
        userPhoto: profile?.photoURL || '',
        text: commentText,
        likes: 0,
        createdAt: serverTimestamp(),
      });

      const videoRef = doc(db, 'videos', videoId);
      await updateDoc(videoRef, {
        commentsCount: increment(1)
      });
    } catch (err) {
      console.error('Comment error:', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[200]"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[70vh] bg-zinc-900 border-t border-white/10 rounded-t-[2.5rem] z-[201] flex flex-col max-w-md mx-auto"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <h3 className="text-sm font-black uppercase tracking-widest">
                {comments.length} Comments
              </h3>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {loading ? (
                <div className="flex justify-center py-10">
                  <div className="w-8 h-8 border-2 border-zinc-800 border-t-rose-500 rounded-full animate-spin" />
                </div>
              ) : comments.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-zinc-500 text-sm italic">No comments yet. Be the first!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img 
                      src={comment.userPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.userId}`} 
                      className="w-10 h-10 rounded-full shrink-0 object-cover"
                      alt={comment.userName}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-400">@{comment.userName}</span>
                        <button className="flex flex-col items-center gap-0.5 text-zinc-500 hover:text-rose-500 transition-colors">
                          <Heart size={14} />
                          <span className="text-[10px] font-bold">{comment.likes}</span>
                        </button>
                      </div>
                      <p className="text-sm mt-1">{comment.text}</p>
                      <div className="flex gap-4 mt-2">
                        <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-tighter">
                          {comment.createdAt?.toDate ? new Date(comment.createdAt.toDate()).toLocaleDateString() : 'Just now'}
                        </span>
                        <button className="text-[10px] text-zinc-400 font-black uppercase tracking-tighter hover:text-white">Reply</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <form 
              onSubmit={handleSubmit}
              className="p-6 border-t border-white/5 bg-zinc-900/50 backdrop-blur-xl flex gap-3"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-zinc-800">
                <img src={profile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=guest`} alt="Profile" />
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full h-10 bg-white/5 border border-white/10 rounded-full px-5 text-sm focus:outline-none focus:border-rose-500/50 focus:ring-4 focus:ring-rose-500/10 transition-all pr-12"
                />
                <button 
                  type="submit"
                  disabled={!text.trim()}
                  className="absolute right-1 top-1 w-8 h-8 bg-rose-500 text-white rounded-full flex items-center justify-center disabled:opacity-50 disabled:grayscale transition-all active:scale-90 shadow-lg shadow-rose-500/20"
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
