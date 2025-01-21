// src/types/auth.ts
<<<<<<< HEAD

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

<<<<<<< HEAD
// src/types/auth.ts
export interface AuthError {
  message: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: any; // Replace 'any' with your user type
=======
export interface AuthFormProps {
  mode: string;
  onSubmit: (values: AuthFormValues) => Promise<void>;
  isLoading: boolean;
>>>>>>> 719c7b49ba048f75b95de8609ca220e3d2c3b06c
=======
import { LucideIcon } from "lucide-react";

export interface Deal {
    id: string;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    image: string;
    icon?: LucideIcon;
    iconBgColor?: string;
    iconColor?: string;
    category: string;
    value?: string;
    timeline?: string;
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
}