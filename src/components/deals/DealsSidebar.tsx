import { Home, Store, HandshakeIcon, Bell, Settings, ChevronLeft, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navigationItems = [
  { title: "Dashboard", icon: Home, path: "/dashboard" },
  { title: "Marketplace", icon: Store, path: "/marketplace" },
  { title: "Deals", icon: HandshakeIcon, path: "/deals" },
  { title: "Notifications", icon: Bell, path: "/notifications" },
  { title: "Settings", icon: Settings, path: "/settings" },
];

const NavigationContent = () => {
  const navigate = useNavigate();
  
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-md"
                  tooltip={item.title}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
};

export const DealsSidebar = () => {
  const { state } = useSidebar();
  const isMobile = window.innerWidth < 768;

  if (isMobile) {
    return (
      <Sheet>
        <SheetContent side="left" className="w-[240px] p-0">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
              <span className="font-semibold text-lg">Navigation</span>
            </div>
            <NavigationContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sidebar className="border-r border-gray-200">
      <div className="flex items-center justify-between p-4">
        <span className="font-semibold text-lg">Navigation</span>
        <SidebarTrigger>
          <ChevronLeft className={`h-5 w-5 transition-transform duration-200 ${state === "collapsed" ? "rotate-180" : ""}`} />
        </SidebarTrigger>
      </div>
      <NavigationContent />
    </Sidebar>
  );
};