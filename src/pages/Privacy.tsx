import React from 'react';
import { Shield, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Privacy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-black text-white p-6 pb-24">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-rose-500/10 rounded-2xl">
          <Shield className="text-rose-500" size={24} />
        </div>
        <h1 className="text-2xl font-black italic">Privacy Policy</h1>
      </div>

      <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">1. Data Collection</h2>
          <p>We collect information you provide directly to us when you create an account, upload content, or interact with other users.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">2. Usage Tracking</h2>
          <p>We use AI algorithms to analyze your viewing habits to provide a personalized recommendation feed (TT Tok Tok AI Engine).</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">3. Data Sharing</h2>
          <p>Your content is public by default. We do not sell your personal data to third parties.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">4. Security</h2>
          <p>We use enterprise-level encryption to protect your data and account information.</p>
        </section>
      </div>
    </div>
  );
}
