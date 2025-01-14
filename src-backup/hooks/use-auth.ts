// src/hooks/use-auth.ts
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import type { AuthError, AuthFormValues, AuthState } from '@/types/auth';

export const useAuth = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    error: null,
    user: null,
  });

  useEffect(() => {
    // Check initial session
    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setState(prev => ({ ...prev, isLoading: true }));
        
        if (event === 'SIGNED_IN' && session) {
          await handleSignedIn(session);
        } else if (event === 'SIGNED_OUT') {
          setState({ isLoading: false, error: null, user: null });
          navigate('/login');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const checkSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      
      if (session) {
        await handleSignedIn(session);
      } else {
        setState({ isLoading: false, error: null, user: null });
      }
    } catch (error) {
      handleError(error);
    }
  };

  const handleSignedIn = async (session: any) => {
    try {
      // Get or create user profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      if (!profile) {
        // Create new profile if it doesn't exist
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            email: session.user.email,
            full_name: session.user.user_metadata.full_name,
            role: session.user.user_metadata.role || 'buyer',
          });

        if (insertError) throw insertError;
      }

      setState({
        isLoading: false,
        error: null,
        user: { ...session.user, profile },
      });

      navigate('/dashboard');
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    const authError: AuthError = {
      message: error.message || 'An unexpected error occurred',
      code: error.code,
    };
    setState(prev => ({ ...prev, isLoading: false, error: authError }));
  };

  const signIn = async (values: AuthFormValues) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const signUp = async (values: AuthFormValues) => {
    if (!values.full_name || !values.role) {
      throw new Error('Full name and role are required');
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));
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
      handleError(error);
      throw error;
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      handleError(error);
      throw error;
    }
  };

  return {
    ...state,
    signIn,
    signUp,
    signOut,
  };
};