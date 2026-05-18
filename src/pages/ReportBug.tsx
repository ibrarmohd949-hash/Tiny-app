import React, { useState } from 'react';
import { Bug, Send, CheckCircle2, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export default function ReportBug() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-full bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6"
        >
          <CheckCircle2 className="text-green-500" size={40} />
        </motion.div>
        <h1 className="text-2xl font-black italic mb-2">Bug Reported</h1>
        <p className="text-zinc-500 text-sm mb-8">Thank you for helping us improve Tiny Tiny Tok Tok. Our engineering team is on it!</p>
        <button 
          onClick={() => navigate('/settings')}
          className="bg-white text-black px-10 py-3 rounded-2xl font-bold"
        >
          Back to Settings
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-black text-white p-6 pb-24">
       <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-amber-500/10 rounded-2xl">
          <Bug className="text-amber-500" size={24} />
        </div>
        <h1 className="text-2xl font-black italic">Report a Bug</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Issue Title</label>
          <input 
            required
            className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500/20"
            placeholder="Feedback category (e.g. Video player lag)"
          />
        </div>

        <div>
          <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Description</label>
          <textarea 
            required
            rows={5}
            className="w-full bg-zinc-900 border border-white/5 rounded-xl p-4 text-sm focus:ring-2 focus:ring-amber-500/20"
            placeholder="Please describe what happened..."
          />
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-amber-500 text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-50"
        >
          {loading ? 'Sending...' : <><Send size={18} /> Submit Report</>}
        </button>
      </form>
    </div>
  );
}
