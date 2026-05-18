import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, X, Sparkles, Wand2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { storage, db } from '../lib/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function Upload() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aiLoading, setAiLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const generateAI = async () => {
    if (!caption) return alert('Please enter a brief description first');
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: caption }),
      });
      const data = await res.json();
      setTitle(data.title);
      setHashtags(data.hashtags);
      setCaption(data.caption);
    } catch (error) {
      console.error('AI Error:', error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    
    // AI Moderation Check
    setUploading(true);
    try {
      const modRes = await fetch('/api/ai/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: caption, type: 'caption' }),
      });
      const modData = await modRes.json();
      if (modData.status === 'rejected') {
        alert(`Content rejected: ${modData.reason}`);
        setUploading(false);
        return;
      }
    } catch (e) {
      console.warn("Moderation skip:", e);
    }

    const storageRef = ref(storage, `videos/${user.uid}/${Date.now()}_${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, 
      (error) => {
        console.error('Upload error:', error);
        setUploading(false);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        
        await addDoc(collection(db, 'videos'), {
          userId: user.uid,
          videoURL: downloadURL,
          thumbnailURL: '', // Would normally generate this
          caption,
          title,
          hashtags,
          likesCount: 0,
          commentsCount: 0,
          shareCount: 0,
          viewCount: 0,
          createdAt: serverTimestamp(),
        });
        
        setUploading(false);
        navigate('/');
      }
    );
  };

  return (
    <div className="p-6 pb-24 h-full bg-black text-white">
      <h1 className="text-2xl font-bold mb-6">Upload Reel</h1>
      
      {!preview ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-zinc-800 rounded-3xl h-96 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-zinc-900 transition-colors"
        >
          <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center">
            <UploadIcon size={32} className="text-zinc-400" />
          </div>
          <div className="text-center">
            <p className="font-semibold">Select video to upload</p>
            <p className="text-sm text-zinc-500">Or drag and drop a file</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="video/*" 
            className="hidden" 
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-3xl overflow-hidden h-64 bg-zinc-900 group">
            <video src={preview} className="w-full h-full object-cover" />
            <button 
              onClick={() => { setFile(null); setPreview(null); }}
              className="absolute top-2 right-2 bg-black/50 p-2 rounded-full hover:bg-black/80"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase text-zinc-500 mb-2 block">Description</label>
              <div className="relative">
                <textarea 
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="What's this video about?"
                  className="w-full bg-zinc-900 rounded-2xl p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-white/20 min-h-[100px]"
                />
                <button 
                  onClick={generateAI}
                  disabled={aiLoading || !caption}
                  className="absolute bottom-4 right-4 bg-white text-black px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-bold shadow-lg disabled:opacity-50"
                >
                  {aiLoading ? (
                    <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : <Sparkles size={14} />}
                  AI Generate
                </button>
              </div>
            </div>

            {title && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                <label className="text-xs font-semibold uppercase text-zinc-500 block">AI Suggested Title</label>
                <input 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-zinc-900 rounded-xl p-3 text-sm focus:outline-none"
                />
              </motion.div>
            )}

            {hashtags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {hashtags.map((h, i) => (
                  <span key={i} className="bg-zinc-800 px-3 py-1 rounded-lg text-xs text-zinc-300">#{h}</span>
                ))}
              </div>
            )}

            <div className="space-y-4 pt-4 border-t border-white/5">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-purple-500/10 rounded-lg"><Sparkles size={16} className="text-purple-500" /></div>
                     <span className="text-sm font-bold">AI Music Sync</span>
                  </div>
                  <div className="w-10 h-5 bg-purple-500 rounded-full relative"><div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-fullShadow shadow-sm" /></div>
               </div>
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="p-2 bg-blue-500/10 rounded-lg"><Wand2 size={16} className="text-blue-500" /></div>
                     <span className="text-sm font-bold">High Resolution Post</span>
                  </div>
                  <div className="w-10 h-5 bg-zinc-800 rounded-full relative"><div className="absolute left-1 top-1 w-3 h-3 bg-zinc-600 rounded-fullShadow shadow-sm" /></div>
               </div>
            </div>

            <button 
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-gradient-to-tr from-rose-500 to-amber-500 text-white font-black py-4 rounded-[2rem] mt-4 flex items-center justify-center gap-2 shadow-xl shadow-rose-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            >
              {uploading ? (
                <span>Uploading {Math.round(progress)}%...</span>
              ) : (
                <>Post Video <Wand2 size={20} /></>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
