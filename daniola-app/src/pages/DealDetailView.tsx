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
  const [deal, setDeal] = useState<DealDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching deal details
    const dealData = commodities.find(c => c.id === Number(id));
    if (dealData) {
      setDeal({
        ...dealData,
        _price: dealData.price.toString(),
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
    <div>
      <h1>{deal.name}</h1>
      <p>{deal.description}</p>
      <p>Price: {deal._price}</p>
      <p>Status: {deal.status}</p>
      {/* Add more deal details as needed */}
    </div>
  );
};

export default DealDetailView;

