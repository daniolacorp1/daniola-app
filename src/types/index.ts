// src/types/index.ts
export type DealStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export interface Deal {
  id: string;
  title: string;
  status: DealStatus;
  description: string;
  image?: string;
  value: string;
  timeline: string;
  category: string;
  buyer_id: string;
  supplier_id: string;
  listing_id: string;
  created_at: string;
  updated_at: string;
  price: number;
  quantity: number;
  total_amount: number;
  documents?: any[];
  updates?: any[];
  tasks?: any[];
  listing?: Listing;
  buyer?: User;
  supplier?: User;
}

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

export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
}