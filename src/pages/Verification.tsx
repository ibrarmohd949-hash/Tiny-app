import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { BadgeCheck, ShieldAlert, FileText, Camera, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function Verification() {
  const { user, profile } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        verificationStatus: 'pending',
        updatedAt: serverTimestamp()
      });
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
      }, 1500);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  if (submitted || profile?.verificationStatus === 'pending') {
    return (
      <div className="min-h-full bg-black text-white flex flex-col items-center justify-center p-8 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mb-8">
           <CheckCircle2 size={48} className="text-blue-500" />
        </motion.div>
        <h1 className="text-2xl font-black mb-4 italic">Request Under Review</h1>
        <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
           Our team is currently reviewing your profile and identity documents. This usually takes 3-5 business days. We will notify you in your inbox.
        </p>
        <button onClick={() => window.history.back()} className="mt-12 text-zinc-400 font-bold text-sm uppercase tracking-widest">Done</button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-black text-white p-6 pb-32">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-zinc-900 rounded-2xl border border-white/5">
          <BadgeCheck className="text-blue-500" />
        </div>
        <h1 className="text-2xl font-black italic">Verified Badge</h1>
      </div>

      <div className="bg-zinc-900/50 rounded-3xl p-6 border border-white/5 mb-8">
        <h2 className="font-bold text-lg mb-4">Verification Requirements</h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
               <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <div className="text-sm">
              <p className="font-bold">Authenticity</p>
              <p className="text-zinc-500 text-xs">Your account must represent a real person or registered entity.</p>
            </div>
          </li>
          <li className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0 mt-0.5">
               <div className="w-2 h-2 bg-green-500 rounded-full" />
            </div>
            <div className="text-sm">
              <p className="font-bold">Notability</p>
              <p className="text-zinc-500 text-xs">Minimum of 1,000 followers and at least 5 reels posted.</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3 block">1. Confirm Identity</label>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col items-center gap-2 border-2 border-dashed border-zinc-800 hover:border-blue-500 transition-colors cursor-pointer">
                <Camera size={24} className="text-zinc-600" />
                <span className="text-xs font-bold">Front ID</span>
             </div>
             <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col items-center gap-2 border-2 border-dashed border-zinc-800 hover:border-blue-500 transition-colors cursor-pointer">
                <FileText size={24} className="text-zinc-600" />
                <span className="text-xs font-bold">Documentation</span>
             </div>
          </div>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-500 text-white font-black py-4 rounded-[2rem] shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? "Submitting..." : <><Send size={18} /> Submit Application</>}
        </button>
      </div>
      
      <div className="mt-8 flex items-center gap-3 p-4 bg-amber-500/5 rounded-2xl border border-amber-500/10">
        <ShieldAlert size={20} className="text-amber-500 shrink-0" />
        <p className="text-[10px] text-amber-200/60 leading-tight italic font-medium">Providing false information will result in permanent account ban.</p>
      </div>
    </div>
  );
}
