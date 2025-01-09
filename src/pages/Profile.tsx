// src/pages/Profile.tsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { Loading } from "@/components/ui/loading";
import { useProfile } from "@/hooks/use-profile";

const Profile = () => {
  const navigate = useNavigate();
  const { profile, loading, error } = useProfile();

  if (loading) {
    return <Loading message="Loading profile..." />;
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Failed to load profile. Please try again.</p>
      </div>
    );
  }

  // Determine stats based on role
  const stats = profile.role === 'buyer' ? [
    { label: "Total purchases", value: "12" },
    { label: "Average order value", value: "$5.2K" },
    { label: "Response rate", value: "98%" },
    { label: "Rating score", value: "4.9" },
  ] : [
    { label: "Total deals", value: "2.5K" },
    { label: "Average response time", value: "2h" },
    { label: "Ratings", value: "4.9" },
    { label: "Rating score", value: "98%" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="py-4 px-4 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xl font-semibold">Profile</span>
          <div className="w-5"></div>
        </div>

        {/* Profile Info */}
        <div className="px-4 py-6">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 bg-gray-200">
            {/* Add actual profile image handling here */}
            <div className="w-full h-full bg-[#FF4B4B] flex items-center justify-center text-white text-2xl">
              {profile.full_name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {profile.full_name}
            </h2>
            <p className="text-[#FF4B4B] text-sm capitalize">
              {profile.role}
            </p>
            <p className="text-[#FF4B4B] text-sm">
              {profile.location}
            </p>
            {profile.company_name && (
              <p className="text-[#FF4B4B] text-sm">
                {profile.company_name}
              </p>
            )}
          </div>

          {/* Commodities */}
          <div className="mt-4">
            <p className="text-[#FF4B4B] text-sm">
              Commodities: {profile.commodities}
            </p>
          </div>

          {/* Bio */}
          {profile.bio && (
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                {profile.bio}
              </p>
            </div>
          )}

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-lg font-semibold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Experience (for suppliers) */}
          {profile.role === 'supplier' && profile.years_of_experience && (
            <div className="mt-6">
              <p className="text-sm text-gray-600">Years in Business</p>
              <p className="text-lg font-semibold">{profile.years_of_experience} years</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Profile;