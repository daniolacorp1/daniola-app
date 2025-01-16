import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
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


/**
 * Component representing a deal card.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {React.ElementType} props.icon - The icon component to be displayed.
 * @param {string} props.iconBgColor - The background color of the icon container.
 * @param {string} props.iconColor - The color of the icon.
 * @param {string} props.status - The status of the deal.
 * @param {string} props.title - The title of the deal.
 * @param {string} props.category - The category of the deal.
 * @param {string | number} props.value - The value of the deal.
 * @param {string} props.timeline - The timeline of the deal.
 * @param {function} props.onClick - The function to be called when the card is clicked.
 * @returns {JSX.Element} The rendered deal card component.
 */
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
}: DealCardProps): JSX.Element => {
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
