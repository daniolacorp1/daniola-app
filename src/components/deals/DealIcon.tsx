import { LucideIcon } from 'lucide-react';
import { useDealsStore } from '@/stores/use-deals-store';
import { useEffect, memo } from 'react';

interface DealIconProps {
  icon: LucideIcon;
  color: string;
}

export const DealIcon = memo(({ icon: Icon, color }: DealIconProps) => {
  const { dealCount, updateDealCount } = useDealsStore();

  useEffect(() => {
    updateDealCount();
  }, [updateDealCount]);

  return (
    <div className="relative">
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className={`h-12 w-12 ${color}`} />
      </div>
      {dealCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-[#FF4B4B] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {dealCount}
        </div>
      )}
    </div>
  );
});

DealIcon.displayName = 'DealIcon';