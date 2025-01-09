// src/types/auth.ts

export type AuthMode = 'login' | 'signup';

export interface AuthFormValues {
  email: string;
  password: string;
  full_name?: string;
  role?: 'buyer' | 'supplier';
}

export interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (values: AuthFormValues) => Promise<void>;
  isLoading: boolean;
}

export interface AuthError {
  message: string;
  code?: string;
}

export interface AuthState {
  isLoading: boolean;
  error: AuthError | null;
  user: any | null;  // Replace 'any' with your user type if you have one
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  role: 'buyer' | 'supplier';
  created_at?: string;
  updated_at?: string;
}

export interface Session {
  user: {
    id: string;
    email: string;
    user_metadata: {
      full_name?: string;
      role?: 'buyer' | 'supplier';
    };
  };
  access_token: string;
  refresh_token: string;
}