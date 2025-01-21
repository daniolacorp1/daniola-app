import { Bell, Mic, User } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const notificationCount = 2; // This would come from a notifications context/state in a real app
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/lovable-uploads/f7f4374b-e564-4b94-8cad-ee77a2dc0cb9.png" 
              alt="Logo" 
              className="h-8 w-8"
            />
            <span className="font-semibold text-lg hidden md:block">TradePro</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold">{greeting}, Trader</h1>
            <p className="text-sm text-gray-500">Welcome back</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-500">
            <Mic className="h-5 w-5" />
          </Button>
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="text-gray-500 relative">
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" size="icon" className="text-gray-500">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};