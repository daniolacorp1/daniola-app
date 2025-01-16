// src/pages/buyer-profile.tsx
import { ArrowLeft, ThumbsUp, ThumbsDown, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";


const BuyerProfile = () => {
  const favoriteListings = [
    {
      name: "Almonds",
      quantity: "5000lb",
      image: "/buyer/Depth 4, Frame 0 (4).png",
    },
    {
      name: "Walnuts",
      quantity: "2000lb",
      image: "/buyer/Depth 4, Frame 0 (5).png",
    },
    {
      name: "Pistachios",
      quantity: "3000lb",
      image: "/buyer/Depth 4, Frame 0 (4).png",
    },
  ];

  const recentPurchases = [
    {
      name: "Almonds",
      quantity: "5000lb",
      image: "/buyer/Depth 3, Frame 1 (1).png",
    },
    {
      name: "Walnuts",
      quantity: "2000lb",
      image: "/buyer/Depth 3, Frame 1.png",
    },
  ];

  const purchasingStats = [
    { label: "Total deals", value: "2.5K" },
    { label: "Average response time", value: "2h" },
    { label: "Ratings", value: "4.9" },
    { label: "Rating score", value: "98%" },
  ];

  const reviews = [
    {
      name: "Matteo R.",
      time: "6 months ago",
      rating: 5,
      comment: "Great quality of products, will buy again.",
      likes: 4,
    },
    {
      name: "Katie T.",
      time: "7 months ago",
      rating: 5,
      comment: "Fast delivery, good communication.",
      likes: 2,
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="py-4 flex justify-between">
        <button onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xl font-semibold mr-4 mt-2">Profile</span>
        <span></span>
      </div>

      {/* Profile Info */}
      <div className="py-4">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
          <img
            src="/buyer/Buyer Profile (1).png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Javier M.</h2>
          <p className="text-[#A14545] text-sm">Los Angeles, CA</p>
          <p className="text-[#A14545] text-sm">
            Commodities: Fresh produce, nuts, dairy
          </p>
        </div>
        <div className="text-left">
          <p className="text-black mt-4 text-sm">
            Bio: Javier is a passionate foodie who loves to source the best
            ingredients for his restaurant. He has been using Daniola AI for 3
            years to connect with suppliers and make deals.
          </p>
        </div>
      </div>

      {/* Favorite Listings */}
      <div className="py-4 text-left">
        <h3 className="text-xl font-semibold mb-4">Favorite listings</h3>
        <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
          {favoriteListings.map((item) => (
            <div key={item.name} className="flex-shrink-0">
              <div className="w-36 h-36 rounded-xl overflow-hidden mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-sm text-black">{item.name}</p>
              <p className="text-[#A14545] text-sm">{item.quantity}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="pb-4 text-left">
        <h3 className="text-xl font-semibold mb-4">Recent purchases</h3>
        <div className="space-y-4">
          {recentPurchases.map((purchase) => (
            <div
              key={purchase.name}
              className="flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-black">{purchase.name}</p>
                <p className="text-[#A14545] text-sm">{purchase.quantity}</p>
              </div>
              <div className="w-32 h-16 rounded-xl overflow-hidden">
                <img
                  src={purchase.image}
                  alt={purchase.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Purchasing Power */}
      <div className="pb-5 text-left">
        <h3 className="text-xl font-semibold mb-4">Purchasing power</h3>
        <div className="space-y-3">
          {purchasingStats.map((stat) => (
            <div key={stat.label} className="flex items-center">
              <p className="text-[#A14545] text-sm">
                {stat.label}:{" "}
                <span className="text-[#A14545] ml-1">{stat.value}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="pb-5 text-left">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.name} className="space-y-2">
              <div>
                <h2 className="font-medium text-black">{review.name}</h2>
                <span className="text-[#A14545] text-sm">{review.time}</span>
              </div>
              <div className="flex gap-0.5">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-red-500 text-red-500" />
                ))}
              </div>
              <p className="text-black text-sm">{review.comment}</p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-[#A14545] text-sm">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{review.likes}</span>
                </button>
                <button className="flex items-center gap-1.5 text-[#A14545] text-sm">
                  <ThumbsDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerProfile;