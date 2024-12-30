import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface DealCardProps {
  id?: number;
  title: string;
  status: string;
  description?: string;
  image?: string;
  icon?: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
  category?: string;
  value?: string;
  timeline?: string;
  onViewDeal?: (id: number) => void;
  onClick?: () => void;
}

export const DealCard = ({
  id,
  title,
  status,
  description,
  image,
  icon: Icon,
  iconBgColor,
  iconColor,
  category,
  value,
  timeline,
  onViewDeal,
  onClick,
}: DealCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (onViewDeal && id) {
      onViewDeal(id);
    }
  };

  return (
    <div className="overflow-hidden py-2">
      {image ? (
        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover rounded-xl"
        />
      ) : (
        Icon && (
          <div
            className={`w-12 h-12 rounded-lg ${iconBgColor} flex items-center justify-center`}
          >
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
        )
      )}
      <div className="py-4  bottom-3 flex  items-end justify-between"> 
        <div className="text-left">
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-[#A14545]">Status: {status}</p>
          {description && <p className="text-[#A14545] mt-1">{description}</p>}
          {category && (
            <p className="text-gray-600 mt-1">Category: {category}</p>
          )}
          {value && <p className="text-gray-600 mt-1">Value: {value}</p>}
          {timeline && (
            <p className="text-gray-600 mt-1">Timeline: {timeline}</p>
          )}
        </div>
        <div className="">
          <Button
            className="
             rounded-xl gap-0 flex items-center justify-center h-8 flex-shrink-0 self-start border-none  px-5 
            bg-primary text-white "
            onClick={handleClick}
          >
            View Deal
          </Button>
        </div>
      </div>
    </div>
  );
};
