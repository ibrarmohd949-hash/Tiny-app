import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Download, Smartphone, Globe, Github, Info, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ isOpen, onClose }: DownloadModalProps) {
  const webUrl = window.location.origin;

  const steps = [
    {
      icon: <Smartphone className="text-blue-500" />,
      title: "Install as PWA (Fastest)",
      desc: "Open this site in Chrome (Android) or Safari (iOS) and select 'Add to Home Screen'."
    },
    {
      icon: <Download className="text-rose-500" />,
      title: "Direct APK Download",
      desc: "Download the native Android APK from our official GitHub build artifacts."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-[300] backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-[85vh] bg-zinc-900 border-t border-white/10 rounded-t-[3rem] z-[301] flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 backdrop-blur-lg sticky top-0 z-10">
              <div>
                <h2 className="text-xl font-black italic">Download App</h2>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Version 2.4.0 • Android & iOS</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
              {/* QR Code Section */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-6 bg-white rounded-3xl shadow-2xl shadow-rose-500/10 transition-transform hover:scale-105 active:scale-95 cursor-pointer">
                  <QRCodeSVG value={webUrl} size={160} level="H" includeMargin />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-sm">Scan to Install on Mobile</h3>
                  <p className="text-xs text-zinc-500">Fast, secure, and always up-to-date.</p>
                </div>
              </div>

              {/* Options Grid */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-2">Installation Methods</h4>
                
                {steps.map((step, idx) => (
                  <div key={idx} className="p-6 bg-zinc-800/50 rounded-3xl border border-white/5 flex gap-4 transition-all hover:bg-zinc-800 active:scale-[0.98]">
                    <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                      {step.icon}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm mb-1">{step.title}</h5>
                      <p className="text-xs text-zinc-400 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* GitHub Link */}
              <div className="bg-rose-500/5 rounded-3xl border border-rose-500/10 p-6 space-y-4">
                <div className="flex items-center gap-2 text-rose-500">
                  <Github size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Developer Resources</span>
                </div>
                <p className="text-xs text-zinc-400">
                  You can also export the source code via the <b>AI Studio Settings</b> menu and build your own custom APK using Capacitor and Android Studio.
                </p>
                <button className="w-full bg-rose-500 text-white font-bold py-3 rounded-2xl flex items-center justify-center gap-2 text-sm shadow-xl shadow-rose-500/20 active:scale-95 transition-all">
                  <ExternalLink size={16} /> Open GitHub Builds
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-black/40 border-t border-white/5">
              <div className="flex items-start gap-3 bg-blue-500/10 p-4 rounded-2xl border border-blue-500/20">
                <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[10px] text-blue-400 font-medium leading-relaxed">
                  Tiny Tiny Tok Tok is a Progressive Web App (PWA). It works exactly like a native app once added to your home screen.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
