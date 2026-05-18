import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Info, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'info' | 'error' | 'success';
}

export const DynamicIslandToast: React.FC<ToastProps> = ({ message, type = 'info' }) => {
  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-[280px]">
      <motion.div
        initial={{ y: -100, scale: 0.8, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: -100, scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
        className="glass-dark px-4 py-2.5 rounded-full flex items-center gap-3 shadow-2xl border border-white/10"
      >
        <div className={`p-1.5 rounded-full ${
          type === 'success' ? 'bg-green-500/20 text-green-500' : 
          type === 'error' ? 'bg-rose-500/20 text-rose-500' : 
          'bg-blue-500/20 text-blue-500'
        }`}>
          {type === 'success' ? <CheckCircle2 size={14} /> : 
           type === 'error' ? <AlertCircle size={14} /> : 
           <Info size={14} />}
        </div>
        <p className="text-[11px] font-black italic tracking-tight truncate flex-1">{message}</p>
      </motion.div>
    </div>
  );
};
