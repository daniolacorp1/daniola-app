import { LucideIcon } from "lucide-react";

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

// Separate base interface for shared properties
export interface DealBase {
    id: string;
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
    createdAt: Date;
}

// Deal interface without the click handlers
export interface Deal extends DealBase {
    // Add any additional Deal-specific properties here
}

// DealCard interface with click handlers
export interface DealCard extends DealBase {
    onClick?: () => void;
    onViewDeal?: (id: number) => void;
}