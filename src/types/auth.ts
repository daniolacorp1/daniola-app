// src/types/auth.ts
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
}