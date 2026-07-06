import { zustandStorage } from '@/storage/storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@react-native-firebase/auth';
import { doc, getDoc, getFirestore } from '@react-native-firebase/firestore';
import { AuthState, Role } from '@/types/types.userState';

const db = getFirestore();

const fetchRole = async (uid: string): Promise<Role> => {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    const role = snap.exists() ? (snap.data()?.role as Role | undefined) : undefined;
    return role === 'admin' ? 'admin' : 'customer';
  } catch (error) {
    console.error('fetchRole error:', error);
    return 'customer';
  }
};

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      isLoading: false,
      signin: async (email, password) => {
        set({ isLoading: true });
        try {
          const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
          const { uid, email: userEmail, displayName } = userCredential.user;
          const role = await fetchRole(uid);
          set({
            user: { uid, email: userEmail, displayName, role },
            isLoggedIn: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false });
          throw error;
        }
      },
      signup: async (email, password) => {
        set({ isLoading: true });
        try {
          const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
          const { uid, email: userEmail, displayName } = userCredential.user;
          set({
            user: { uid, email: userEmail, displayName, role: 'customer' },
            isLoggedIn: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false });
          throw error;
        }
      },
      signout: async () => {
        set({ isLoading: true });
        try {
          await signOut(getAuth());
          set({ user: null, isLoggedIn: false, isLoading: false });
        } catch (error: any) {
          set({ isLoading: false });
          throw error;
        }
      },
      setUser: (user) => set({ user, isLoggedIn: !!user }),
      updateUser: (name: string, address: string, phoneno: string) => set({ name, address, phoneno }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useAuthStore;