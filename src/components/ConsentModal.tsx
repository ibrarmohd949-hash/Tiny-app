import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function ConsentModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('user-consent-v1');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('user-consent-v1', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[3000] flex items-end justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl"
          >
            <div className="w-16 h-16 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-rose-500/20">
              <ShieldCheck className="text-white" size={32} />
            </div>
            
            <h2 className="text-2xl font-black italic mb-3">Your Privacy Matters</h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              To give you the best Tiny Tiny Tok Tok experience, we use AI to personalize your feed. By continuing, you agree to our 
              <NavLink to="/privacy" className="text-rose-500 font-bold mx-1">Privacy Policy</NavLink> 
              and 
              <NavLink to="/terms" className="text-rose-500 font-bold mx-1">Terms</NavLink>.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleAccept}
                className="w-full bg-white text-black font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
              >
                Accept and Continue <ArrowRight size={18} />
              </button>
              <p className="text-center text-[10px] text-zinc-600 uppercase font-black tracking-tighter">
                Tiny Tiny Tok Tok AI Engine v2.4 
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
