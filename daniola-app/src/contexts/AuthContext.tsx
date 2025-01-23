import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-client';

interface AuthContextType {
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;
  user: any | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isInitialized: false,
  isLoading: true,
  user: null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        setIsAuthenticated(!!session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isInitialized, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);