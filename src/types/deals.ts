// src/types/deals.ts
import type { User } from './user';
import type { Listing } from './listings';

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