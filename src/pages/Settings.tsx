import { useNavigate } from "react-router-dom";
import { MainHeader } from "@/components/MainHeader";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { LogOut, Bell, Lock, User, Globe } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    toast({
      title: "Logged out successfully",
      description: "You have been securely logged out.",
    });
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader />
      <main className="container mx-auto px-4 py-8 mt-16">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => navigate("/profile")}
              >
                <User className="mr-2 h-4 w-4" />
                Profile Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Bell className="mr-2 h-4 w-4" />
                Notification Preferences
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Lock className="mr-2 h-4 w-4" />
                Security Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
              >
                <Globe className="mr-2 h-4 w-4" />
                Language & Region
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Session</h2>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;