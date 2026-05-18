import React from 'react';
import { motion } from 'motion/react';

export default function SplashScreen() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1, delay: 3.5 }}
      className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center pointer-events-none overflow-hidden"
    >
      <motion.div
        initial={{ scale: 0, rotate: -45, filter: 'blur(20px)' }}
        animate={{ scale: 1, rotate: 0, filter: 'blur(0px)' }}
        transition={{ 
          duration: 1.2, 
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative"
      >
        <div className="w-40 h-40 bg-gradient-to-tr from-rose-500 via-rose-600 to-amber-500 rounded-[3rem] flex items-center justify-center shadow-[0_0_80px_rgba(244,63,94,0.3)] border-4 border-white/20">
          <span className="text-6xl font-black italic text-white tracking-tighter drop-shadow-2xl">TT</span>
        </div>
        
        {/* Particle circles in background */}
        {[1,2,3].map(i => (
          <motion.div
            key={i}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.5 + i*0.2, opacity: [0, 0.2, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            className="absolute inset-0 border border-white/10 rounded-full"
          />
        ))}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mt-12 text-center"
      >
        <h1 className="text-4xl font-black text-white italic tracking-tighter neon-text">Tiny Tiny Tok Tok</h1>
        <p className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.6em] mt-3 opacity-50">Global Premium Experience</p>
      </motion.div>

      <div className="absolute bottom-24 flex flex-col items-center gap-4">
        <div className="w-40 h-1 bg-zinc-900 rounded-full overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full bg-gradient-to-r from-transparent via-rose-500 to-transparent"
          />
        </div>
        <span className="text-[8px] font-black text-zinc-700 uppercase tracking-widest">Powered by Gemini AI</span>
      </div>
    </motion.div>
  );
}
