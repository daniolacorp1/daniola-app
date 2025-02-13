import { LucideIcon } from "lucide-react";

export type DealStatus = 'active' | 'inactive' | 'completed' | 'pending' | 'accepted' | 'rejected' | 'Ready for Review';

export interface Deal {
  id: string;
  createdAt: Date;
  title: string;
  description: string;
  price: number;
  status: DealStatus;
  image?: string;
  icon?: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  category?: string;
  value?: string;
  timeline?: string;
}

export interface DealIconProps {
  icon: React.ElementType;
  iconColor: string;
}