import { MainHeader } from "@/components/MainHeader";
import { FeaturedListings } from "@/components/FeaturedListings";
import { ActiveDeals } from "@/components/ActiveDeals";
import { BottomNav } from "@/components/BottomNav";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type Listing = {
  title: string;
  image: string;
  rating: number;
  price: string;
  id: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const featuredListings = [
    {
      title: "New arrivals: mining equipment",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/276ef47cfe-3e5e25e8d68e7a4042fb.png",
      rating: 4.8,
      price: "$12,499",
      id: "mining-eq-1",
    },
    {
      title: "New listings: rare earths",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/549cd0f74c-709e74054dddc7db191a.png",
      rating: 4.5,
      price: "$8,999",
      id: "rare-earth-1",
    },
    {
      title: "New: construction equipment",
      image:
        "https://storage.googleapis.com/uxpilot-auth.appspot.com/19c2045391-4c5231e3161b5ce7a275.png",
      rating: 4.9,
      price: "$15,999",
      id: "const-eq-1",
    },
  ];

  const handleListingClick = (listing: Listing) => {
    navigate(`/marketplace?id=${listing.id}`);
    toast({
      title: "Opening listing",
      description: `Viewing details for ${listing.title}`,
    });
  };

  return (
    <div className="min-h-screen">
      <MainHeader />
      <header>
        <div className="flex flex-col pt-12">
          <div className="flex items-center text-left">
            <h1 className="text-xl font-bold py-6">
              Good afternoon John, how can I help you today?
            </h1>
          </div>
        </div>
      </header>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-24"
      >
        <div className="space-y-6">
          <FeaturedListings
            listings={featuredListings}
            onListingClick={handleListingClick}
          />
          <ActiveDeals />
        </div>
      </motion.main>
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <BottomNav />
      </div>
    </div>
  );
};

export default Dashboard;
