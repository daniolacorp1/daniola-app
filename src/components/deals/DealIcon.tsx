import { LucideIcon } from 'lucide-react';

interface DealIconProps {
  icon: LucideIcon;
  color: string;
}

export const DealIcon = ({ icon: Icon, color }: DealIconProps) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Icon className={`h-12 w-12 ${color}`} />
    </div>
  );
};