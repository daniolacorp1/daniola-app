import { TrendingUp } from "lucide-react";

export const CopperStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <span className="text-gray-600 text-sm">Price per MT</span>
        <div className="text-2xl font-bold text-gray-900">$8,000</div>
        <div className="flex items-center text-emerald-500 text-sm">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+2%</span>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm">
        <span className="text-gray-600 text-sm">Available Stock</span>
        <div className="text-2xl font-bold text-gray-900">8,000 MT</div>
        <div className="flex items-center text-emerald-500 text-sm">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+10%</span>
        </div>
      </div>
    </div>
  );
};