import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
// src/components/deals/DealCard.tsx
interface DealCardProps {
  id: number;
  title: string;
  status: string;
  description: string;
  image: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  category: string;
  price?: number;      // Added price as optional
  discount?: number;   // Added discount as optional
  value?: string;
  gradientColors?: string;
  timeline?: string;
  onViewDeal: (id: number) => void;
  onClick?: () => void;
}


interface DealCardProps {

  id: number;

  title: string;

  status: string;

  description: string;

  image: string;

  gradientColors?: string;

  onViewDeal: (id: number) => void;

}


export const DealCard = ({
  icon: Icon,
  iconBgColor,
  iconColor,
  status,
  title,
  category,
  value,
  timeline,
  onClick,
}: DealCardProps) => {
  return (
    <Card
      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`p-2 rounded-lg ${iconBgColor}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{title}</h3>
              <p className="text-sm text-gray-600">{category}</p>
            </div>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {status}
            </span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="font-medium">{value}</span>
            <span className="text-gray-500">{timeline}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
