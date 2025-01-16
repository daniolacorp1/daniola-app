import { LucideIcon } from "lucide-react";

// src/types/index.ts
export interface DealCardProps {
  id: number;
  title: string;
  status: string;
  description: string;
  image: string;
  icon?: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  category: string;
  value?: string;
  timeline?: string;
  onClick?: () => void;
  onViewDeal?: (id: number) => void;
}