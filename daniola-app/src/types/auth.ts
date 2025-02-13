// src/types/auth.ts

export type AuthMode = 'login' | 'signup';

export interface AuthFormValues {
  email: string;
  password: string;
  full_name?: string;
  company_name?: string;
  years_of_experience?: number;
  role?: 'buyer' | 'supplier';
  location?: string;
  bio?: string;
  commodities?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  company_name?: string;
  years_of_experience?: number;
  role: 'buyer' | 'supplier';
  location?: string;
  bio?: string;
  commodities?: string;
  avatar_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface AuthError {
  message: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile;
}

export interface AuthFormProps {
  mode: string;
  onSubmit: (values: AuthFormValues) => Promise<void>;
  isLoading: boolean;
}