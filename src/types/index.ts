import { LucideIcon } from 'lucide-react';

// Auth Types
export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
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
  code?: string;
}

export interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  error: AuthError | null;
}

export interface AuthFormValues {
  email: string;
  password: string;
  full_name?: string;
  role?: 'buyer' | 'supplier';
  location?: string;
  bio?: string;
  commodities?: string;
}

// Deal Types
export interface DealIconProps {
  icon: LucideIcon;
  color: string;
}

export interface Deal {
  id: number;
  title: string;
  status: string;
  quantity: string;
  price: string;
  image: string;
  supplier: string;
  deliveryDate: string;
  description: string;
  terms: string;
  location: string;
}