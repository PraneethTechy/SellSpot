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
import { getProfileById } from "../../services/profileService";

import EditProfileModal from "../Dashboard/EditProfileModal";

export default function Profile() {
  const { user } = useAuth();

  const [showEditModal, setShowEditModal] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!user) return;
    loadProfile();
  }, [user]);

  async function loadProfile() {
    const { data, error } = await getProfileById(user.id);

    if (error) {
      console.log(error);
      return;
    }

    setProfile(data);
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-sm text-stone-500">Loading Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-5xl mx-auto px-6 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-900">My Profile</h1>
          <p className="text-sm text-stone-500 mt-1">
            Manage your personal information and marketplace account.
          </p>
        </div>

        {/* Main Profile Card (Wider Aspect Ratio) */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden flex flex-col justify-between">
          
          {/* Top Hero Section */}
          <div className="bg-linear-to-b from-amber-50/60 via-amber-50/20 to-white px-8 py-8 border-b border-stone-100">
            <div className="flex items-center justify-between gap-6">
              
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-amber-100 flex items-center justify-center shrink-0 overflow-hidden ring-4 ring-white shadow-xs">
                  {profile.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={44} className="text-amber-700/80" />
                  )}
                </div>

                {/* User Info Header */}
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">
                    {profile.full_name || "User"}
                  </h2>
                  
                  <div className="flex items-center gap-2 text-sm text-stone-500 mt-1.5">
                    <Mail size={16} className="text-amber-600" />
                    <span>{user.email}</span>
                  </div>

                  <div className="mt-3 inline-flex items-center gap-1.5 bg-amber-100/70 text-amber-800 text-xs px-3.5 py-1 rounded-full font-medium">
                    <BadgeCheck size={15} className="text-amber-700" />
                    Verified SellSpot Member
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <button
                onClick={() => setShowEditModal(true)}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-xl text-xs font-semibold transition shadow-xs"
              >
                <Pencil size={15} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Details Section */}
          <div className="p-8 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              <InfoCard
                icon={<Phone className="text-amber-600" size={20} />}
                title="Phone Number"
                value={profile.phone || "Not Added"}
              />

              <InfoCard
                icon={<MapPin className="text-amber-600" size={20} />}
                title="City"
                value={profile.city || "Not Added"}
              />

              <InfoCard
                icon={<Mail className="text-amber-600" size={20} />}
                title="Email Address"
                value={user.email}
              />

              <InfoCard
                icon={<Calendar className="text-amber-600" size={20} />}
                title="Member Since"
                value={new Date(user.created_at).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              />

            </div>
          </div>

        </div>
      </div>

      {showEditModal && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onProfileUpdated={(updatedProfile) => setProfile(updatedProfile)}
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
          <p className="text-xs text-stone-500 font-medium">{title}</p>
          <p className="mt-0.5 text-sm font-semibold text-neutral-900 truncate">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}