import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  signIn: async (credentials) => {
    set({ isLoading: true });
    // Add your sign in logic here
    set({ isLoading: false });
  },
  signOut: async () => {
    set({ isLoading: true });
    await supabase.auth.signOut();
    set({ user: null, isLoading: false });
  },
})); 