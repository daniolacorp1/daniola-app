import React from "react";
import {
  LayoutDashboard,
  Settings,
  UserCircle,
  Users,
  // Removing unused Menu import
} from "lucide-react";
import { useNavigate } from "react-router-dom";
// Removing unused Button import since it's not being used
import { cn } from "@/lib/utils";

// Either use the interface by adding props to the component
// or remove it if not needed
const DealsSidebar = () => {
  const navigate = useNavigate();

  const routes = [
    {
      icon: LayoutDashboard,
      href: "/deals",
      label: "Dashboard",
      color: "text-sky-500",
    },
    {
      icon: UserCircle,
      href: "/deals/profile",
      label: "Profile",
      color: "text-violet-500",
    },
    {
      icon: Users,
      href: "/deals/users",
      label: "Users",
      color: "text-pink-700",
    },
    {
      icon: Settings,
      href: "/deals/settings",
      label: "Settings",
      color: "text-orange-700",
    },
  ];

  const onNavigate = (url: string) => {
    navigate(url);
  };

  return (
    <div className="flex h-full flex-col items-center space-y-4 bg-black py-4 text-white">
      <div className="flex-1 space-y-4 overflow-y-auto pt-4">
        {routes.map((route) => (
          <div
            key={route.href}
            onClick={() => onNavigate(route.href)}
            className="group flex w-full cursor-pointer flex-col items-center gap-y-2 px-2"
          >
            <div
              className={cn(
                "flex items-center justify-center rounded-lg p-2 transition hover:bg-white/10",
                route.color
              )}
            >
              <route.icon className="h-6 w-6" />
            </div>
            <span className="text-xs font-medium">{route.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsSidebar;