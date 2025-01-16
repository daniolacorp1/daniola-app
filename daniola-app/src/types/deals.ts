import { User } from "@supabase/supabase-js";

// src/types/deal.ts
export type DealStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'Ready for Review';

export interface Deal {
  id: string;
  title: string;
  status: DealStatus;
  description: string;
  image?: string;
  value: string;
  timeline: string;
  category: string;
  location?: string;
  terms?: string;
  deliveryDate?: string;
  buyer: User;
  buyer_id: string;
  supplier_id: string;
  listing_id: string;
  price: number;
  quantity: number;
}
export interface DealIconProps {
    icon: React.ElementType;
    iconColor: string;
  }