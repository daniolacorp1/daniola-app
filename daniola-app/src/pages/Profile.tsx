// src/pages/Profile.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Edit2 } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { Loading } from "@/components/ui/loading";
import { useProfile } from "@/hooks/use-profile";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { fetchProfileStats, type ProfileStats } from "@/lib/profile-stats";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { profile, loading, error } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (profile) {
        try {
          const profileStats = await fetchProfileStats(profile.id, profile.role);
          setStats(profileStats);
        } catch (error) {
          console.error('Error loading stats:', error);
        } finally {
          setIsLoadingStats(false);
        }
      }
    };

    loadStats();
  }, [profile]);

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

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="py-4 px-4 flex justify-between items-center">
          <button onClick={() => navigate(-1)} className="p-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xl font-semibold">Profile</span>
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-[#FF4B4B] hover:text-[#FF3333]"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="px-4 py-6">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#FF4B4B] flex items-center justify-center text-white text-2xl">
                {profile.full_name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {profile.full_name}
            </h2>
            <p className="text-[#FF4B4B] text-sm capitalize">
              {profile.role}
            </p>
            {profile.location && (
              <p className="text-[#FF4B4B] text-sm">
                {profile.location}
              </p>
            )}
            {profile.company_name && (
              <p className="text-[#FF4B4B] text-sm">
                {profile.company_name}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Performance</h3>
            {isLoadingStats ? (
              <Loading type="inline" message="Loading stats..." />
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {stats && Object.entries(stats).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-white p-4 rounded-lg shadow-sm"
                  >
                    <p className="text-sm text-gray-600">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      {typeof value === 'number' ? value.toFixed(1) : value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <ProfileEditForm 
              profile={profile}
              onSuccess={() => {
                setIsEditing(false);
                toast({
                  title: "Success",
                  description: "Profile updated successfully",
                });
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default Profile;