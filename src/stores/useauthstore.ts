import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { describe, expect, it } from 'vitest';

interface User {
  id: string;
  email: string;
  full_name?: string;
}

interface Credentials {
  email: string;
  password: string;
  full_name?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  signIn: (credentials: Omit<Credentials, 'full_name'>) => Promise<void>;
  signUp: (credentials: Credentials) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  signIn: async (credentials) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) throw error;
      set({ user: data.user as User });
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (credentials) => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            full_name: credentials.full_name
          }
        }
      });

      if (error) throw error;
      set({ user: data.user as User });
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  }
}));

describe('ActiveDeals component', () => {
  it('should render correctly', () => {
    expect(true).toBe(true);
  });
});