import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Bell, Moon, Languages, HelpCircle, Info, ChevronRight, LogOut, Verified, Wallet, FileText, Bug, Download } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import DownloadModal from '../components/DownloadModal';

export default function Settings() {
  const { user, logout } = useAuth();
  const [isDownloadOpen, setIsDownloadOpen] = useState(false);

  const sections = [
    {
      title: "Account",
      items: [
        { icon: <Verified size={20} className="text-blue-500" />, label: "Verification", path: "/verification" },
        { icon: <Wallet size={20} className="text-amber-500" />, label: "Wallet & Earnings", path: "/wallet" },
        { icon: <Shield size={20} className="text-green-500" />, label: "Privacy & Safety", path: "/settings" },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: <Bell size={20} className="text-rose-500" />, label: "Notifications", path: "/settings" },
        { icon: <Moon size={20} className="text-purple-500" />, label: "Dark Mode", path: "/settings", badge: "Auto" },
        { icon: <Languages size={20} className="text-blue-400" />, label: "Language", path: "/settings", badge: "English" },
      ]
    },
    {
      title: "App",
      items: [
        { icon: <div className="p-2 bg-rose-500/10 rounded-lg"><Info size={16} className="text-rose-500" /></div>, label: "Share TT Tok Tok", path: "/settings" },
        { 
          icon: <div className="p-2 bg-green-500/10 rounded-lg"><Download size={16} className="text-green-500" /></div>, 
          label: "Download / Install App", 
          action: () => setIsDownloadOpen(true), 
          badge: "v2.4" 
        },
        { icon: <HelpCircle size={20} className="text-zinc-400" />, label: "Report a Bug", path: "/report-bug" },
        { icon: <Shield size={20} className="text-zinc-400" />, label: "Privacy Policy", path: "/privacy" },
        { icon: <FileText size={20} className="text-zinc-400" />, label: "Terms of Service", path: "/terms" },
        {icon: <Info size={20} className="text-zinc-400" />, label: "Community Guidelines", path: "/community-guidelines" },
        { icon: <Shield size={20} className="text-zinc-400" />, label: "Safety & Copyright", path: "/safety-notice" },
        { icon: <Info size={20} className="text-zinc-400" />, label: "About TT Tok Tok", path: "/settings" },
      ]
    }
  ];

  return (
    <div className="min-h-full bg-black text-white p-6 pb-32">
      <h1 className="text-2xl font-black mb-8 italic">Settings</h1>

      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx}>
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 ml-4">{section.title}</h3>
            <div className="bg-zinc-900/50 rounded-3xl border border-white/5 overflow-hidden">
              {section.items.map((item, i) => 
                item.action ? (
                  <button 
                    key={i} 
                    onClick={item.action} 
                    className="w-full flex items-center justify-between p-4 hover:bg-zinc-800 transition-colors border-b border-white/5 last:border-none text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-bold text-sm">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded-lg text-zinc-400 font-bold uppercase">{item.badge}</span>}
                      <ChevronRight size={18} className="text-zinc-600" />
                    </div>
                  </button>
                ) : (
                  <NavLink 
                    key={i} 
                    to={item.path!} 
                    className="flex items-center justify-between p-4 hover:bg-zinc-800 transition-colors border-b border-white/5 last:border-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span className="font-bold text-sm">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.badge && <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded-lg text-zinc-400 font-bold uppercase">{item.badge}</span>}
                      <ChevronRight size={18} className="text-zinc-600" />
                    </div>
                  </NavLink>
                )
              )}
            </div>
          </div>
        ))}
      </div>

      {user?.uid !== 'guest' && (
        <button 
          onClick={logout}
          className="w-full mt-12 bg-rose-500/10 text-rose-500 font-black py-4 rounded-3xl border border-rose-500/20 flex items-center justify-center gap-3 active:scale-95 transition-all"
        >
          <LogOut size={18} /> Log Out
        </button>
      )}

      <p className="text-center text-[10px] text-zinc-600 mt-12 font-bold uppercase tracking-widest italic">
        v2.4.0 Global Edition — Built with AI
      </p>

      <DownloadModal 
        isOpen={isDownloadOpen} 
        onClose={() => setIsDownloadOpen(false)} 
      />
    </div>
  );
}
