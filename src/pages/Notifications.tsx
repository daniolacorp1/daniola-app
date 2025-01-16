import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Bell, AlertCircle, Package, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "New Deal Alert",
      message: "A new copper deal is available in your area",
      icon: DollarSign,
      time: "2 hours ago",
      type: "deal"
    },
    {
      id: 2,
      title: "Shipment Update",
      message: "Your recent order has been shipped",
      icon: Package,
      time: "5 hours ago",
      type: "shipment"
    },
    {
      id: 3,
      title: "Price Alert",
      message: "Copper prices have increased by 5%",
      icon: AlertCircle,
      time: "1 day ago",
      type: "alert"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-white border-b px-4 py-3 flex items-center gap-3">
        <Bell className="w-5 h-5 text-primary" />
        <h1 className="text-xl font-semibold">Notifications</h1>
      </header>
      
      <main className="p-4 max-w-lg mx-auto space-y-4 pb-24">
        {notifications.length > 0 ? (
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Card 
                  key={notification.id}
                  className="p-4 hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center text-muted-foreground pt-8">
            <Bell className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p>No new notifications</p>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Notifications;