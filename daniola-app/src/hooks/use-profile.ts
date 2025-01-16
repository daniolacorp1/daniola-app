// src/hooks/use-profile.ts
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase-client';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'buyer' | 'supplier';
  location?: string;
  bio?: string;
  commodities?: string;
  company_name?: string;
  years_of_experience?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        
        // Get the current user's session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        if (!session?.user?.id) {
          throw new Error('No authenticated user');
        }

        // Fetch the profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) throw profileError;

        setProfile(profileData);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
};