import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Deals from "../../public/icon/deals.svg";

export const MainHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname === "/commodities-chat";

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 z-[60]">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
          )}
          <Avatar
            className="h-8 w-8 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <AvatarImage src="/lovable-uploads/87f31747-a7d0-4570-890a-3400aaa6cc66.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
        <div
          className="cursor-pointer flex items-center justify-center"
          onClick={() => navigate("/")}
        >
          <img
            src="/lovable-uploads/5003102d-fc82-4f55-a4d0-413468c06098.png"
            alt="Mountain Logo"
            className="h-12 w-12"
          />
        </div>
        <button
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
          onClick={() => navigate("/notifications")}
        >
          <img
            src={Deals}
            alt="Deals"
            className="text-gray-600 h-8 w-8 group-hover:text-primary transition-colors"
          />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      </div>
    </header>
  );
};
