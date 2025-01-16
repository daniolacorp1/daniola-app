export * from './auth';

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role?: 'buyer' | 'supplier';
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
  supplier: {
    id: string;
    full_name: string;
  };
}

export type DealType = {
  id: string;
  buyer_id: string;
  supplier_id: string;
  listing_id: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  created_at: string;
  updated_at: string;
  price: number;
  quantity: number;
  total_amount: number;
  listing?: Listing;
  buyer?: User;
  supplier?: User;
};

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
}

export type ApiResponse<T> = {
  data: T | null;
  error: Error | null;
};