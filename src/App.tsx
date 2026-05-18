import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Search = lazy(() => import('./pages/Search'));
const Upload = lazy(() => import('./pages/Upload'));
const Notifications = lazy(() => import('./pages/Notifications'));
const Profile = lazy(() => import('./pages/Profile'));
const CreatorDashboard = lazy(() => import('./pages/CreatorDashboard'));
const Wallet = lazy(() => import('./pages/Wallet'));
const Verification = lazy(() => import('./pages/Verification'));
const Settings = lazy(() => import('./pages/Settings'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const ReportBug = lazy(() => import('./pages/ReportBug'));
const Auth = lazy(() => import('./pages/Auth'));
const CommunityGuidelines = lazy(() => import('./pages/CommunityGuidelines'));
const SafetyNotice = lazy(() => import('./pages/SafetyNotice'));

import SplashScreen from './components/SplashScreen';
import ErrorBoundary from './components/ErrorBoundary';
import ConsentModal from './components/ConsentModal';
import { AnimatePresence, motion } from 'motion/react';
import { useNetwork } from './hooks/useNetwork';

function OfflineNotice() {
  const isOnline = useNetwork();
  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 inset-x-0 bg-rose-500 text-white py-1.5 text-[10px] font-black uppercase tracking-widest text-center z-[2000]"
        >
          No Internet Connection • Limited Mode
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AppWrapper({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();
  
  if (loading) return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-zinc-900 border-t-rose-500 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black italic tracking-tighter">AI</div>
      </div>
    </div>
  );
  
  return (
    <ErrorBoundary>
      <Layout>{children}</Layout>
    </ErrorBoundary>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <OfflineNotice />
        <ConsentModal />
        <SplashScreen />
        <Suspense fallback={
          <div className="h-screen w-full bg-black flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-zinc-800 border-t-rose-500 rounded-full animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<AppWrapper><Home /></AppWrapper>} />
            <Route path="/search" element={<AppWrapper><Search /></AppWrapper>} />
            <Route path="/upload" element={<AppWrapper><Upload /></AppWrapper>} />
            <Route path="/notifications" element={<AppWrapper><Notifications /></AppWrapper>} />
            <Route path="/profile" element={<AppWrapper><Profile /></AppWrapper>} />
            <Route path="/creator-studio" element={<AppWrapper><CreatorDashboard /></AppWrapper>} />
            <Route path="/wallet" element={<AppWrapper><Wallet /></AppWrapper>} />
            <Route path="/verification" element={<AppWrapper><Verification /></AppWrapper>} />
            <Route path="/settings" element={<AppWrapper><Settings /></AppWrapper>} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/privacy" element={<AppWrapper><Privacy /></AppWrapper>} />
            <Route path="/terms" element={<AppWrapper><Terms /></AppWrapper>} />
            <Route path="/report-bug" element={<AppWrapper><ReportBug /></AppWrapper>} />
            <Route path="/community-guidelines" element={<AppWrapper><CommunityGuidelines /></AppWrapper>} />
            <Route path="/safety-notice" element={<AppWrapper><SafetyNotice /></AppWrapper>} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
