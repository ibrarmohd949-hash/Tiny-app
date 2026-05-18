import React from 'react';
import { FileText, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-full bg-black text-white p-6 pb-24">
      <button onClick={() => navigate(-1)} className="mb-6 flex items-center gap-2 text-zinc-500 font-bold uppercase text-[10px] tracking-widest">
        <ChevronLeft size={16} /> Back
      </button>

      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-2xl">
          <FileText className="text-blue-500" size={24} />
        </div>
        <h1 className="text-2xl font-black italic">Terms of Service</h1>
      </div>

      <div className="space-y-6 text-zinc-400 text-sm leading-relaxed">
        <section>
          <h2 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">1. Acceptance of Terms</h2>
          <p>By accessing Tiny Tiny Tok Tok, you agree to be bound by these terms. If you do not agree, please do not use the service.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">2. Content Ownership</h2>
          <p>You retain ownership of the content you upload, but you grant us a worldwide, royalty-free license to host, display, and distribute your content.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">3. Prohibited Conduct</h2>
          <p>Users are prohibited from uploading illegal, harmful, or copyright-infringing content. Our AI moderation system will automatically flag and remove such content.</p>
        </section>

        <section>
          <h2 className="text-white font-bold mb-2 uppercase text-xs tracking-wider">4. Monetization</h2>
          <p>Creator earnings are subject to verification and plateau reached during specific campaign clusters.</p>
        </section>
      </div>
    </div>
  );
}
