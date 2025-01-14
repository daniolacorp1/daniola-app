import { MapPin } from "lucide-react";

export const CopperLocation = () => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
      <div className="flex items-center">
        <MapPin className="text-gray-400 mr-2 h-5 w-5" />
        <div>
          <div className="text-gray-600 text-sm">Location</div>
          <div className="text-lg font-semibold text-gray-900">Los Angeles, USA</div>
        </div>
      </div>
    </div>
  );
};