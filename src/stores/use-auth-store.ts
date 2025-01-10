import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import type { AuthState, UserProfile, AuthFormValues, AuthError } from '@/types';

interface AuthStore extends AuthState {
  signIn: (values: AuthFormValues) => Promise<void>;
  signUp: (values: AuthFormValues) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: AuthError | null) => void;
  setUser: (user: UserProfile | null) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setUser: (user) => set({ user }),

  signIn: async (values) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
    } catch (error) {
      set({ error: { message: (error as Error).message } });
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (values) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.full_name,
            role: values.role,
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      set({ error: { message: (error as Error).message } });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
    } catch (error) {
      set({ error: { message: (error as Error).message } });
    } finally {
      set({ isLoading: false });
    }
  },

  updateProfile: async (profile) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', profile.id);
      if (error) throw error;
      set((state) => ({
        user: state.user ? { ...state.user, ...profile } : null
      }));
    } catch (error) {
      set({ error: { message: (error as Error).message } });
    } finally {
      set({ isLoading: false });
    }
  },
})); 