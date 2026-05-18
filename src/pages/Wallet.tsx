import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Coins, Landmark, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

export default function Wallet() {
  const { profile } = useAuth();
  const [showWithdraw, setShowWithdraw] = useState(false);

  const handleWithdraw = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff2d55', '#fbbf24', '#ffffff']
    });
    alert("Withdrawal request submitted! Processing via UPI/Bank transfer (24-48h).");
    setShowWithdraw(false);
  };

  return (
    <div className="min-h-full bg-black text-white p-6 pb-32">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-zinc-900 rounded-2xl border border-white/5">
          <WalletIcon className="text-zinc-400" />
        </div>
        <h1 className="text-2xl font-black italic">My Wallet</h1>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-br from-rose-500 to-amber-500 p-8 rounded-[2rem] shadow-2xl relative overflow-hidden mb-8">
        <div className="relative z-10">
          <p className="text-xs font-black text-white/60 uppercase tracking-widest mb-1">Total Balance</p>
          <h2 className="text-4xl font-black mb-8">${profile?.creatorEarnings || '0.00'}<span className="text-lg font-medium opacity-60 ml-2">USD</span></h2>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setShowWithdraw(true)}
              className="flex-1 bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <ArrowUpRight size={18} /> Withdraw
            </button>
            <button className="flex-1 bg-black/20 backdrop-blur-md text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-black/30 transition-colors">
              <Landmark size={18} /> Banking
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 blur-[60px] rounded-full -ml-16 -mb-16" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <Coins size={20} className="text-amber-500" />
            <span className="text-[10px] font-black text-green-500">+10%</span>
          </div>
          <p className="text-xl font-black">{profile?.coins || 0}</p>
          <p className="text-[10px] text-zinc-500 font-bold uppercase">TT Coins</p>
        </div>
        <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <ShieldCheck size={20} className="text-blue-500" />
            <span className="text-[10px] font-black text-zinc-500">Active</span>
          </div>
          <p className="text-xl font-black">Level 5</p>
          <p className="text-[10px] text-zinc-500 font-bold uppercase">Creator Rank</p>
        </div>
      </div>

      {/* Transactions */}
      <h3 className="font-black italic text-zinc-500 uppercase tracking-widest text-[10px] mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {[1,2,3].map(i => (
          <div key={i} className="flex items-center justify-between p-4 bg-zinc-900/30 rounded-2xl border border-white/5 group hover:bg-zinc-900 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                <ArrowDownLeft size={18} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm font-bold">Reward from Reel #{1000 + i}</p>
                <p className="text-[10px] text-zinc-500">May {10 + i}, 2026 • 12:45 PM</p>
              </div>
            </div>
            <p className="font-black text-green-500">+$2.50</p>
          </div>
        ))}
      </div>

      {/* Withdraw Modal */}
      <AnimatePresence>
        {showWithdraw && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowWithdraw(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" 
            />
            <motion.div 
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              className="fixed bottom-0 inset-x-0 bg-zinc-900 rounded-t-[3rem] p-8 z-[101] border-t border-white/10"
            >
              <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-8" />
              <h2 className="text-2xl font-black mb-2 italic">Withdraw Earnings</h2>
              <p className="text-sm text-zinc-500 mb-8">Select your preferred payment method.</p>
              
              <div className="space-y-4 mb-10">
                <button className="w-full bg-black/40 p-5 rounded-2xl border border-white/5 flex items-center justify-between group active:scale-95 transition-all">
                  <div className="flex items-center gap-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" className="h-6 opacity-80 group-hover:opacity-100" />
                    <span className="font-bold">UPI Transfer</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-rose-500 flex items-center justify-center"><div className="w-2.5 h-2.5 bg-rose-500 rounded-full" /></div>
                </button>
                <button className="w-full bg-black/40 p-5 rounded-2xl border border-white/5 flex items-center justify-between group grayscale hover:grayscale-0 transition-all opacity-50">
                  <div className="flex items-center gap-4">
                    <Landmark size={24} className="text-zinc-600" />
                    <span className="font-bold">Bank Transfer</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-zinc-800" />
                </button>
              </div>

              <button 
                onClick={handleWithdraw}
                className="w-full bg-white text-black font-black py-4 rounded-[2rem] shadow-xl shadow-white/5 active:scale-95 transition-all"
              >
                Confirm Withdrawal
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
