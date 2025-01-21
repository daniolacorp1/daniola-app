<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Define the DealDetail type
interface DealDetail {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  location: string;
  supplier: string;
  certification: string;
  image: string;
  stock: number;
  rating: number;
  priceChange: number;
  quantity: number;
  quantityChange: number;
  _price: string;
  status: string;
}

// Ensure commodities is correctly typed
const commodities: DealDetail[] = [
  {
    id: 1,
    name: "Commodity 1",
    price: 100,
    category: "Category 1",
    description: "Description 1",
    location: "Location 1",
    supplier: "Supplier 1",
    certification: "Certification 1",
    image: "/path/to/image1.jpg",
    stock: 100,
    rating: 4.5,
    priceChange: 0.5,
    quantity: 50,
    quantityChange: 1,
    _price: "100",
    status: "Ready for Review"
  },
  // Add more commodities as needed
];

const DealDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
=======
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
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
  const [deal, setDeal] = useState<DealDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching deal details
    const dealData = commodities.find(c => c.id === Number(id));
    if (dealData) {
      setDeal({
        ...dealData,
<<<<<<< HEAD
        _price: dealData.price.toString(),
=======
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
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
<<<<<<< HEAD
    <div>
      <h1>{deal.name}</h1>
      <p>{deal.description}</p>
      <p>Price: {deal._price}</p>
      <p>Status: {deal.status}</p>
      {/* Add more deal details as needed */}
=======
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
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
    </div>
  );
};

<<<<<<< HEAD
export default DealDetailView;

=======
export default DealDetailView;
>>>>>>> 92be504d21e39cfb7ce9120353d547b3197f8765
