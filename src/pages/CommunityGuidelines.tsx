import React from 'react';
import { Users, ShieldCheck, Heart, MessageSquare, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommunityGuidelines() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-black text-white p-6 pb-24">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-500/10 rounded-2xl">
          <Users className="text-purple-500" size={24} />
        </div>
        <h1 className="text-2xl font-black italic">Community Guidelines</h1>
      </div>

      <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
        <section className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={18} className="text-rose-500" />
            <h2 className="text-white font-bold uppercase text-xs tracking-wider">Respect Others</h2>
          </div>
          <p>Treat every creator and viewer with kindness. Harassment, bullying, or hate speech will result in an immediate permanent ban.</p>
        </section>

        <section className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <ShieldCheck size={18} className="text-blue-500" />
            <h2 className="text-white font-bold uppercase text-xs tracking-wider">Safety First</h2>
          </div>
          <p>Do not post content that depicts or encourages dangerous activities or self-harm. We prioritize the mental health of our community.</p>
        </section>

        <section className="bg-white/5 p-4 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-2">
            <MessageSquare size={18} className="text-green-500" />
            <h2 className="text-white font-bold uppercase text-xs tracking-wider">Authentic Content</h2>
          </div>
          <p>Be yourself. Spam, deceptive practices, and impersonation undermine the TT Tok Tok experience.</p>
        </section>

        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
          <p className="text-amber-200 text-[11px] font-medium leading-normal">
            Violating these guidelines may result in content removal, account strikes, or permanent deactivation of your Tiny Tiny Tok Tok profile.
          </p>
        </div>
      </div>
    </div>
  );
}
