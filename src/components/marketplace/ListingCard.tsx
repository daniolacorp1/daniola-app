import { Commodity } from "@/types/marketplace";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface ListingCardProps {
  commodity: Commodity;
  onViewDetails: (commodity: Commodity) => void;
  onSave: (id: number) => void;
}

export const ListingCard = ({ commodity, onViewDetails }: ListingCardProps) => {
  return (
    <div className="flex justify-between items-center py-2 gap-4">
      <div>
        <div>
          <h3 className="font-bold text-left text-[16px] leading-[20px] text-foreground mb-1">
            {commodity.name}
          </h3>
          <p className="text-[#A14545] text-[14px] leading-[21px] text-left mb-4">
            $
            {commodity.price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl gap-0 flex items-center justify-center h-8 flex-shrink-0 self-start border-none mr-28  bg-[#F5E5E5] px-5 py-1"
          onClick={() => onViewDetails(commodity)}
        >
          <span>Buy</span>
          <ArrowUp className=" ml-1" />
        </Button>
      </div>
      <div className="w-[130px] h-[93px]">
        <img
          src={commodity.image}
          alt={commodity.name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
    </div>
  );
};

export default ListingCard;
