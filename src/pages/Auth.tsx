import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn } from 'lucide-react';
import { motion } from 'motion/react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Auth() {
  const { user, signIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate('/', { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-black text-white text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 20 }}
        className="mb-12"
      >
        <div className="w-24 h-24 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-3xl mx-auto flex items-center justify-center shadow-2xl rotate-12">
          <span className="text-4xl font-black italic -rotate-12">TT</span>
        </div>
        <h1 className="text-4xl font-black mt-8 tracking-tighter italic">Tiny Tiny Tok Tok</h1>
        <p className="text-zinc-500 mt-2 font-medium">Capture. Create. Connect.</p>
      </motion.div>

      <div className="w-full space-y-4">
        <button 
          onClick={signIn}
          disabled={loading}
          className="w-full bg-white text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
             <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin" />
          ) : (
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          )}
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>
        
        <button className="w-full bg-zinc-900 text-white font-bold py-4 rounded-2xl border border-white/10 opacity-50 cursor-not-allowed">
          Email or Phone
        </button>
      </div>

      <p className="text-[10px] text-zinc-600 mt-12 px-8 leading-relaxed">
        By continuing, you agree to Tiny Tiny Tok Tok's 
        <NavLink to="/terms" className="text-zinc-400 font-bold mx-1">Terms of Service</NavLink> 
        and acknowledge you've read our 
        <NavLink to="/privacy" className="text-zinc-400 font-bold mx-1">Privacy Policy</NavLink>.
      </p>
    </div>
  );
}
