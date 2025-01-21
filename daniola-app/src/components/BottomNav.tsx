import React from 'react';
import { MessageCircle, UserCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Deals from "../../public/icon/deals.svg";
import Marketplace from "../../public/icon/marketplace.svg";
import Voice from "../../public/icon/voice.svg";
<<<<<<< HEAD
//import { useDealStore } from '../../stores/use-deals-store';
=======
import { useDealStore } from '@/store/dealStore';
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
import { useEffect } from 'react';

// Define a type for nav items
type IconComponent = LucideIcon | React.FC;
type NavItem = {
  icon: IconComponent;
  label: string;
  href: string;
  indicator: boolean;
  count?: number;
  isVoiceMode?: boolean;
};

export const BottomNav = () => {
  const { activeDealsCount, fetchActiveDeals } = useDealStore();
  const location = useLocation();

  useEffect(() => {
    fetchActiveDeals();
  }, [fetchActiveDeals]);

  const navItems: NavItem[] = [
    {
      icon: () => <img src={Marketplace} alt="Markets" className="h-5 w-5" />,
      label: "Marketplace",
      href: "/marketplace",
      indicator: false,
    },
    {
      icon: () => <img src={Deals} alt="Deals" className="h-5 w-5" />,
      label: "Deals",
      href: "/deals",
      indicator: true,
      count: activeDealsCount,
    },
    {
      icon: () => <img src={Voice} alt="Voice" className="h-10 w-10" />,
      label: "Voice Mode",
      href: "/voice-mode",
      indicator: false,
      isVoiceMode: true,
    },
    {
      icon: MessageCircle,
      label: "Chat",
      href: "/chat",
      indicator: true,
      count: 1,
    },
    {
      icon: UserCircle,
      label: "Profile",
      href: "/profile",
      indicator: false,
    },
  ];

  return (
    <Card className="fixed bottom-0 left-0 right-0 border-t border-gray-100 z-50 rounded-none bg-white">
      <ScrollArea className="w-full scrollbar-hide">
        <div className="flex items-center justify-between px-1 py-1 min-w-max md:container md:mx-auto">
          {navItems.map(({ icon: Icon, label, href, indicator, count, isVoiceMode }) => {
            const isActive = location.pathname === href;
            return (
              <Link
                key={label}
                to={href}
                className={cn(
                  "flex flex-1 flex-col items-center p-2 min-w-[4rem] transition-colors duration-200 relative",
                  isActive ? "text-primary" : "text-black-400 hover:text-primary/80"
                )}
              >
                <div className="relative">
                  <div
                    className={cn(
                      "mb-1",
                      isActive ? "text-primary" : "text-gray-400",
                      isVoiceMode && isActive && "animate-pulse"
                    )}
                  >
                    <Icon />
                  </div>
                  {indicator && count !== undefined && count > 0 && (
                    <Badge
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                    >
                      {count}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default BottomNav;
<<<<<<< HEAD
import { useState } from 'react';

function useDealStore() {
  const [activeDealsCount, setActiveDealsCount] = useState<number>(0);

  const fetchActiveDeals = async () => {
    try {
      // Replace with your actual API call
      const response = await fetch('/api/active-deals');
      const data = await response.json();
      setActiveDealsCount(data.count);
    } catch (error) {
      console.error('Failed to fetch active deals:', error);
    }
  };

  useEffect(() => {
    fetchActiveDeals();
  }, []);

  return { activeDealsCount, fetchActiveDeals };
}

=======
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
