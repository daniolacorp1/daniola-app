// src/types/index.ts
import { LucideIcon } from "lucide-react";

export interface DealIconProps {
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