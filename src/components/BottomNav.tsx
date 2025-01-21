// src/components/BottomNav.tsx
import { Home, ShoppingBag, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BottomNav = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
      <div className="flex justify-around items-center">
        <button
          onClick={() => navigate("/")}
          className="flex flex-col items-center"
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => navigate("/deals")}
          className="flex flex-col items-center"
        >
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xs mt-1">Deals</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="flex flex-col items-center"
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </div>
    </div>
  );
};