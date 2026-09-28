import { useEffect, useState } from "react";
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Pencil,
  Mail,
  BadgeCheck,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getCurrentUser } from "../../services/authService";

import EditProfileModal from "../Dashboard/EditProfileModal";
import ProfileSkeleton from "../Skeleton/ProfileSkeleton";

export default function Profile() {
  const { profile, setProfile } = useAuth();

  const [user, setUser] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const currentUser = await getCurrentUser();

    setUser(currentUser);
  }

 if (!profile || !user) {
  return <ProfileSkeleton />;
}

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Header */}

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-900">
            My Profile
          </h1>

          <p className="text-sm text-stone-500 mt-1">
            Manage your personal information and marketplace
            account.
          </p>
        </div>

        {/* Profile Card */}

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden flex flex-col justify-between">
          {/* Hero */}

          <div className="bg-linear-to-b from-amber-50/60 via-amber-50/20 to-white px-8 py-8 border-b border-stone-100">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                {/* Avatar */}

                <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center shrink-0 overflow-hidden ring-4 ring-white shadow-xs">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User
                      size={44}
                      className="text-amber-700/80"
                    />
                  )}
                </div>

                {/* User Info */}

                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {profile.name || "User"}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-stone-500 mt-1.5">
                    <Mail
                      size={16}
                      className="text-amber-600"
                    />

                    <span>{profile.email}</span>
                  </div>

                  <div className="mt-3 inline-flex items-center gap-1.5 bg-amber-100/70 text-amber-800 text-xs px-3.5 py-1 rounded-full font-medium">
                    <BadgeCheck
                      size={15}
                      className="text-amber-700"
                    />

                    Verified SellSpot Member
                  </div>
                </div>
              </div>

              {/* Edit Button */}

              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition shadow-xs"
              >
                <Pencil size={15} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Details */}

          <div className="p-8 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InfoCard
                icon={
                  <Phone
                    className="text-amber-600"
                    size={20}
                  />
                }
                title="Phone Number"
                value={profile.phoneNumber || "Not Added"}
              />

              <InfoCard
                icon={
                  <MapPin
                    className="text-amber-600"
                    size={20}
                  />
                }
                title="City"
                value={profile.city || "Not Added"}
              />

              <InfoCard
                icon={
                  <Mail
                    className="text-amber-600"
                    size={20}
                  />
                }
                title="Email Address"
                value={profile.email}
              />

              <InfoCard
  icon={<Calendar className="text-amber-600" size={20} />}
  title="Member Since"
  value={
    profile?.createdAt
      ? new Date(profile.createdAt).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Not available"
  }
/>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onProfileUpdated={(updatedProfile) => {
            
            setProfile(updatedProfile);
            setShowEditModal(false);
          }}
        />
      )}
    </>
  );
}

function InfoCard({ icon, title, value }) {

  return (
    <div className="bg-stone-50/60 border border-stone-100/80 rounded-xl p-4.5">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-100/60 flex items-center justify-center shrink-0">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs text-stone-500 font-medium">
            {title}
          </p>

          <p className="mt-0.5 text-sm font-semibold text-neutral-900 truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}