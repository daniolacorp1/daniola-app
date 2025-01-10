// src/pages/DealDetailView.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { commodities } from "@/data/commodities";
import { MainHeader } from "@/components/MainHeader";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface DealDetail {
  id: number;
  name: string;
  price: string;
  status: string;
  description?: string;
  // Add other fields as needed
}

const DealDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = useState<DealDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching deal details
    const dealData = commodities.find(c => c.id === Number(id));
    if (dealData) {
      setDeal({
        ...dealData,
        status: "Ready for Review"
      });
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!deal) {
    return <div>Deal not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      
      <main className="container max-w-2xl mx-auto px-4 py-6 space-y-8">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">Deal Details</h1>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">{deal.name}</h2>
            <p className="text-green-600">{deal.status}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Price</span>
              <span className="font-medium">{deal.price}</span>
            </div>
            
            {deal.description && (
              <div className="space-y-2">
                <h3 className="font-medium">Description</h3>
                <p className="text-gray-600">{deal.description}</p>
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4">
            <Button 
              onClick={() => {/* Add action handler */}}
              className="w-full bg-[#FF4B4B] hover:bg-[#FF3333] text-white"
            >
              Accept Deal
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate('/chat')}
              className="w-full"
            >
              Contact Seller
            </Button>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default DealDetailView;