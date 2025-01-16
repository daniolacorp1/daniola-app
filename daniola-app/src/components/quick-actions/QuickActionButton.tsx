import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuickActionButtonProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string;
  iconClassName?: string;
}

export const QuickActionButton = ({
  icon: Icon,
  label,
  onClick,
  className,
  iconClassName,
}: QuickActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-lg space-y-2 w-full transition-colors duration-200",
        "hover:bg-primary-light/80 text-black",
        className
      )}
    >
      <Icon className={cn("h-6 w-6", iconClassName)} />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};