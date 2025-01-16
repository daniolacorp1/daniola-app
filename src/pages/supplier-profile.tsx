
import { ArrowLeft, ThumbsUp, ThumbsDown, Star } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const SupplierProfile = () => {
  const stats = [
    { label: "Total deals", value: "2.5K" },
    { label: "Avg. response time", value: "2h" },
    { label: "Ratings", value: "4.9" },
    { label: "Rating score", value: "98%" },
  ];

  const recentDeals = [
    {
      product: "Almonds",
      amount: "5000lb",
      image: "/buyer/Depth 3, Frame 1 (1).png",
    },
    {
      product: "Walnuts",
      amount: "2000lb",
      image: "/buyer/Depth 3, Frame 1.png",
    },
  ];

  const feedback = [
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

  const commodities = [
    {
      name: "Almonds",
      amount: "5000lb",
      image: "/buyer/Depth 4, Frame 0 (4).png",
    },
    {
      name: "Walnuts",
      amount: "2000lb",
      image: "/buyer/Depth 4, Frame 0 (5).png",
    },
    {
      name: "Pistachios",
      amount: "3000lb",
      image: "/buyer/Depth 4, Frame 0 (4).png",
    },
  ];

  const navigate = useNavigate();
  return (
    <div className=" min-h-screen">
      {/* Header */}
      <div className="py-4 flex justify-between">
        <button onClick={() => navigate("/")}>
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="text-xl font-semibold mr-4 mt-2">Profile</span>
        <span></span>
      </div>

      {/* Profile Info */}
      <div className="text-center py-4">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-3">
          <img
            src="/supplier/Depth 4, Frame 0 (4).png"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-xl font-bold">Chike M.</h2>
        <p className="text-[#A14545]">Congo, Africa</p>
        <p className="text-[#A14545] text-sm">5 years on Daniola</p>

        <button className="bg-[#FB5151] text-white rounded-xl py-2 px-4 mt-3 w-full mx-auto mb-[6px]">
          Contact
        </button>

        <p className="text-[#A14545] text-sm mt-3">
          Commodities: Fresh produce, nuts, dairy, iron ore
        </p>
      </div>

      {/* Stats */}
      <div className="py-3 text-left">
        <h3 className="text-xl font-bold mb-5">Supplier Stats</h3>
        <div className="grid grid-cols-2 gap-4">

        {/* <div className="p-5 rounded-lg border border-[#EBCCCC]">
            <div className="flex flex-col gap-2">
              <span className="text-[16px] leading-[24px] text-gray-500">{listing.price}</span>
              <span className="text-[24px] leading-[30px] font-bold">${listing.price}</span>
              <span className="text-[16px] leading-[24px] text-green-600">
                +{listing.priceChange}%
              </span>
            </div>
          </div>
           */}
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col p-5 gap-1 text-left border border-[#EBCCCC] rounded-xl"
            >
              <span className="text-[16px] leading-[24px] text-black font-medium">{stat.label}</span>
              <span className="text-[24px] leading-[30px] font-bold text-black">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Deals */}
      <div className="py-4 text-left">
        <h3 className="text-xl font-bold mb-4">Recent purchases</h3>
        <div className="space-y-4">
          {recentDeals.map((purchase) => (
            <div
              key={purchase.product}
              className="flex items- justify-between"
            >
              <div>
                <p className="font-medium text-black">{purchase.product}</p>
                <p className="text-[#A14545] text-sm">{purchase.amount}</p>
              </div>
              <div className="w-32 h-16 rounded-xl overflow-hidden">
                <img
                  src={purchase.image}
                  alt={purchase.product}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buyer Feedback */}
      <div className="py-4 text-left">
        <h3 className="text-xl font-bold mb-4">Buyers feedback</h3>
        <div className="space-y-6">
          {feedback.map((review) => (
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

      {/* Commodities */}
      <div className="py-4 text-left">
        <h3 className="text-xl font-bold mb-4">Commodities offered</h3>
        <div className="flex overflow-x-auto pb-4 gap-4 scrollbar-hide">
          {commodities.map((item) => (
            <div key={item.name} className="flex-shrink-0">
              <div className="w-36 h-36 rounded-xl overflow-hidden mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-medium text-sm text-black">{item.name}</p>
              <p className="text-[#A14545] text-sm">{item.amount}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupplierProfile;
