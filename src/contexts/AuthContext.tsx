import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { 
  auth, 
  signInWithPopup, 
  googleProvider, 
  signOut, 
  db,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from '../lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const GUEST_PROFILE: UserProfile = {
  uid: 'guest',
  displayName: 'Guest User',
  email: 'guest@example.com',
  photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
  bio: 'Watching Tiny Tiny Tok Tok as a guest.',
  followersCount: 0,
  followingCount: 0,
  totalLikes: 0,
  isVerified: false,
  isAdmin: false,
  coins: 0,
  creatorEarnings: 0,
  createdAt: { toDate: () => new Date() } as any,
  updatedAt: { toDate: () => new Date() } as any,
};

const MOCK_GUEST_USER = {
  uid: 'guest',
  displayName: 'Guest User',
  email: 'guest@example.com',
  photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=guest',
} as User;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_GUEST_USER);
  const [profile, setProfile] = useState<UserProfile | null>(GUEST_PROFILE);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (!isMounted) return;
      
      if (u) {
        setUser(u);
      } else {
        setUser(MOCK_GUEST_USER);
      }
      
      try {
        if (u) {
          const userDoc = await getDoc(doc(db, 'users', u.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserProfile;
            setProfile(data);
          } else {
            const newProfile: UserProfile = {
              uid: u.uid,
              displayName: u.displayName || 'User',
              email: u.email || '',
              photoURL: u.photoURL || '',
              bio: '',
              followersCount: 0,
              followingCount: 0,
              totalLikes: 0,
              isVerified: false,
              isAdmin: false,
              coins: 50,
              creatorEarnings: 0,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };
            await setDoc(doc(db, 'users', u.uid), newProfile);
            setProfile(newProfile);
          }
        } else {
          setProfile(GUEST_PROFILE);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setProfile(GUEST_PROFILE);
      } finally {
        if (isMounted) setLoading(false);
      }
    });

    // If no response from auth in 2 seconds, assume guest and stop loading
    const timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 2000);

    return () => {
      isMounted = false;
      clearTimeout(timeout);
      unsubscribe();
    };
  }, []);

  const signIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Sign in error:', error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
