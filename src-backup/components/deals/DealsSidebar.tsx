import { 
  Home, 
  Store, 
  FileText,
  Bell, 
  Settings, 

  Menu 
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DealsSidebar({ className }: SidebarProps) {
  const navigate = useNavigate();

  const routes = [
    {
      label: 'Home',
      icon: Home,
      href: '/',
    },
    {
      label: 'Marketplace',
      icon: Store,
      href: '/marketplace',
    },
    {
      label: 'Deals',
      icon: FileText,
      href: '/deals',
    },
    {
      label: 'Notifications',
      icon: Bell,
      href: '/notifications',
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ];

  return (
    <div className={cn("flex h-full", className)}>
      <div className="hidden lg:flex flex-col space-y-4 w-[200px] bg-secondary/10 p-3">
        {routes.map((route) => (
          <div
            key={route.href}
            onClick={() => navigate(route.href)}
            className="text-muted-foreground text-xs group flex p-3 w-full justify-start cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition"
          >
            <div className="flex items-center flex-1">
              <route.icon className="h-5 w-5 mr-3" />
              {route.label}
            </div>
          </div>
        ))}
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-secondary/10">
          <div className="flex flex-col space-y-4 p-3">
            {routes.map((route) => (
              <div
                key={route.href}
                onClick={() => navigate(route.href)}
                className="text-muted-foreground text-xs group flex p-3 w-full justify-start cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition"
              >
                <div className="flex items-center flex-1">
                  <route.icon className="h-5 w-5 mr-3" />
                  {route.label}
                </div>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}