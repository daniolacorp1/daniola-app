import { Link } from "react-router-dom";
import { BookmarkIcon, HandshakeIcon, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { MainHeader } from "@/components/MainHeader";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <div className="pt-[60px]">
        <header className="sticky top-[60px] bg-white border-b px-4 py-3">
          <h1 className="text-xl font-semibold">Profile</h1>
        </header>

        <main className="p-4 max-w-lg mx-auto space-y-4 pb-24">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl font-semibold text-primary">TP</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold">TradePro User</h2>
              <p className="text-sm text-muted-foreground">Active Trader</p>
            </div>
          </div>

          <div className="grid gap-4">
            <Link to="/saved">
              <Card className="p-4 hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <BookmarkIcon className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Saved Listings</h3>
                    <p className="text-sm text-muted-foreground">View your saved items</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/deals">
              <Card className="p-4 hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <HandshakeIcon className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">My Deals</h3>
                    <p className="text-sm text-muted-foreground">Manage your active deals</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/settings">
              <Card className="p-4 hover:bg-accent transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-medium">Settings</h3>
                    <p className="text-sm text-muted-foreground">Customize your experience</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
