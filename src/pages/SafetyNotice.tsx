import React from 'react';
import { AlertCircle, Copyright, EyeOff, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SafetyNotice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-black text-white p-6 pb-24">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-rose-500/10 rounded-2xl">
          <AlertCircle className="text-rose-500" size={24} />
        </div>
        <h1 className="text-2xl font-black italic">Safety & Copyright</h1>
      </div>

      <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
        <section>
          <div className="flex items-center gap-2 mb-2">
            <Copyright size={18} className="text-amber-500" />
            <h2 className="text-white font-bold uppercase text-xs tracking-wider">Intellectual Property</h2>
          </div>
          <p>Tiny Tiny Tok Tok respects the intellectual property of others. If you believe your copyright has been infringed, please use our Reporting tool immediately.</p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
            <EyeOff size={18} className="text-blue-500" />
            <h2 className="text-white font-bold uppercase text-xs tracking-wider">Age Restrictions</h2>
          </div>
          <p>Users must be at least 13 years old to use this platform. Users under 18 require parental supervision. Certain content is automatically filtered based on age settings.</p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-2">
             <AlertCircle size={18} className="text-rose-500" />
             <h2 className="text-white font-bold uppercase text-xs tracking-wider">Reporting Abuse</h2>
          </div>
          <p>Our AI-powered moderation works 24/7. You can report any video or comment. Reports are reviewed by our safety team within 24 hours.</p>
        </section>
      </div>
    </div>
  );
}
