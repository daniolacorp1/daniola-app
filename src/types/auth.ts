// src/types/auth.ts

export type AuthMode = 'login' | 'signup';

export interface AuthFormValues {
  email: string;
  password: string;
  full_name?: string;
  role?: 'buyer' | 'supplier';
  location?: string;
  bio?: string;
  commodities?: string;
  company_name?: string;
  years_of_experience?: string;
}

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
  avatar_url?: string | null;  // Added this line
  created_at?: string;
  updated_at?: string;
}