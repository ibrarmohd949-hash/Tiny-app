import React from 'react';
import { Home, Search, PlusCircle, Bell, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-black text-white max-w-md mx-auto relative overflow-hidden font-sans">
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full h-20 bg-black/40 backdrop-blur-3xl border-t border-white/5 flex items-center justify-around z-[100] max-w-md px-4 pb-4">
        <NavLink to="/" className="flex-1">
          {({ isActive }) => (
            <div className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-white' : 'text-zinc-600'}`}>
              <Home size={22} className={isActive ? 'neon-text' : ''} />
              <span className="text-[9px] font-black uppercase tracking-tighter">Home</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/search" className="flex-1">
          {({ isActive }) => (
            <div className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-white' : 'text-zinc-600'}`}>
              <Search size={22} />
              <span className="text-[9px] font-black uppercase tracking-tighter">Search</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/upload" className="flex flex-col items-center -mt-10 mx-2">
          <div className="bg-gradient-to-tr from-rose-500 to-amber-500 text-white p-3.5 rounded-[1.5rem] shadow-[0_0_20px_rgba(244,63,94,0.4)] transition-all hover:scale-110 active:scale-90 ring-4 ring-black">
            <PlusCircle size={32} strokeWidth={2.5} />
          </div>
        </NavLink>
        <NavLink to="/notifications" className="flex-1">
          {({ isActive }) => (
            <div className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-white' : 'text-zinc-600'}`}>
              <div className="relative">
                <Bell size={22} />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full neon-border shadow-rose-500/50 shadow-md" />
              </div>
              <span className="text-[9px] font-black uppercase tracking-tighter">Inbox</span>
            </div>
          )}
        </NavLink>
        <NavLink to="/profile" className="flex-1">
          {({ isActive }) => (
            <div className={`flex flex-col items-center gap-1 transition-all ${isActive ? 'text-white' : 'text-zinc-600'}`}>
              <User size={22} />
              <span className="text-[9px] font-black uppercase tracking-tighter">Profile</span>
            </div>
          )}
        </NavLink>
      </nav>
    </div>
  );
}
