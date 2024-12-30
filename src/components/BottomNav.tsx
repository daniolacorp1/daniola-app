import { MessageCircle, UserCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation, Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Deals from "../../public/icon/deals.svg";
import Marketplace from "../../public/icon/marketplace.svg";
import Voice from "../../public/icon/voice.svg";

const navItems = [
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
    count: 2,
  },
  {
    icon: () => <img src={Voice} alt="Voice" className="h-10 w-10" />,
    label: "Voice Mode",
    href: "/voice",
    indicator: false,
    isVoiceMode: true,
  },
  {
    icon: MessageCircle,
    label: "Chat",
    href: "/chats",
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

export const BottomNav = () => {
  const location = useLocation();

  return (
    <Card className="fixed bottom-0 left-0 right-0 border-t border-gray-100 z-50 rounded-none bg-white">
      <ScrollArea className="w-full scrollbar-hide">
        <div className="flex items-center justify-between px-1 py-1 min-w-max md:container md:mx-auto">
          {navItems.map(
            ({ icon: Icon, label, href, indicator, count, isVoiceMode }) => {
              const isActive = location.pathname === href;
              return (
                <Link
                  key={label}
                  to={href}
                  className={cn(
                    "flex flex-1 flex-col items-center p-2 min-w-[4rem] transition-colors duration-200 relative",
                    isActive
                      ? "text-primary"
                      : "text-black-400 hover:text-primary/80"
                  )}
                >
                  <div className="relative">
                    {typeof Icon === "function" ? (
                      <div
                        className={cn(
                          "mb-1",
                          isActive ? "text-primary" : "text-gray-400",
                          isVoiceMode && isActive && "animate-pulse"
                        )}
                      >
                        <Icon />
                      </div>
                    ) : (
                      <Icon
                        className={cn(
                          "h-5 w-5 mb-1",
                          isActive ? "text-primary" : "text-gray-400",
                          isVoiceMode && isActive && "animate-pulse"
                        )}
                      />
                    )}
                    {indicator && count > 0 && (
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
            }
          )}
        </div>
      </ScrollArea>
    </Card>
  );
};

export default BottomNav;
