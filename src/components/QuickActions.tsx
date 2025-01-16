import { Store, Bookmark, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { QuickActionButton } from "./quick-actions/QuickActionButton";
import { VoiceSearchButton } from "./quick-actions/VoiceSearchButton";

export const QuickActions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <section className="px-4 py-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <QuickActionButton
          icon={Store}
          label="Browse Store"
          onClick={() => {
            navigate("/marketplace");
            toast({
              title: "Opening Marketplace",
              description: "Browse available listings",
            });
          }}
          className="bg-white hover:bg-gray-50"
          iconClassName="text-primary"
        />
        <QuickActionButton
          icon={Bookmark}
          label="Saved Items"
          onClick={() => {
            navigate("/saved");
            toast({
              title: "Opening Saved Items",
              description: "View your saved listings",
            });
          }}
          className="bg-white hover:bg-gray-50"
          iconClassName="text-primary"
        />
        <VoiceSearchButton />
        <QuickActionButton
          icon={Settings}
          label="Settings"
          onClick={() => {
            navigate("/settings");
            toast({
              title: "Opening Settings",
              description: "Manage your preferences",
            });
          }}
          className="col-span-2 bg-white hover:bg-gray-50"
          iconClassName="text-gray-600"
        />
      </div>
    </section>
  );
};