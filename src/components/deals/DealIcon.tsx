import React from 'react';
import { useDealsStore } from '@/stores/use-dealstore';
import type { DealIconProps } from '@/types';

export const DealIcon: React.FC<DealIconProps> = ({ icon: Icon, color }) => {
  const { dealCount } = useDealsStore();

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
};