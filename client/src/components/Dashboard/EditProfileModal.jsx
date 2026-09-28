import { useState } from "react";
import {
  X,
  User,
  Phone,
  MapPin,
  Save,
  Camera,
} from "lucide-react";

import { updateProfile } from "../../services/profileService";
import { uploadImages } from "../../services/uploadService";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

export default function EditProfileModal({
  profile,
  onClose,
  onProfileUpdated,
}) {
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] =
    useState(null);

  const [preview, setPreview] = useState(
    profile.profileImage || ""
  );

  const [formData, setFormData] = useState({
    name: profile.name || "",
    phoneNumber: profile.phoneNumber || "",
    city: profile.city || "",
    bio: profile.bio || "",
  });

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setProfileImage(file);

    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    let profileImageUrl =
      profile.profileImage || "";

    if (profileImage) {
      const { data, error } = await uploadImages([
        profileImage,
      ]);

      if (error) {
        setLoading(false);

        showError(
          error.message ||
            "Image upload failed"
        );

        return;
      }

      profileImageUrl = data.images[0];
    }

    const { data, error } =
      await updateProfile({
        ...formData,
        profileImage: profileImageUrl,
      });

    setLoading(false);

    if (error) {
      showError(
        error.message ||
          "Profile update failed"
      );
      return;
    }

    onProfileUpdated(data.user);

    onClose();
  }

  return (
   <div
  className="
    fixed
    inset-0
    z-50
    bg-black/50
    backdrop-blur-sm
    flex
    items-end
    md:items-center
    justify-center
    overflow-y-auto
    p-4
  "
>


        <div
  className="
    w-full
    h-[90vh]
    md:max-w-lg
    bg-white
    rounded-t-3xl
    md:rounded-3xl
    shadow-2xl
    overflow-y-auto
    custom-scrollbar
  "
>
        {/* Header */}

        <div
          className="
            sticky
            top-0
            z-20
            bg-white
            border-b
            border-stone-200
            px-6
            py-5
            flex
            items-center
            justify-between
          "
        >
          <div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Edit Profile
            </h2>

            <p className="text-sm text-stone-500 mt-1">
              Update your personal information
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              w-10
              h-10
              rounded-xl
              hover:bg-stone-100
              flex
              items-center
              justify-center
              transition
            "
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6"
        >
          {/* Profile Image */}

          <div className="flex flex-col items-center">
            <label
              htmlFor="profile-image"
              className="cursor-pointer group"
            >
              <div className="relative">
                <div
                  className="
                    w-32
                    h-32
                    rounded-full
                    overflow-hidden
                    border-4
                    border-amber-100
                    bg-stone-100
                    flex
                    items-center
                    justify-center
                    shadow-md
                  "
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User
                      size={60}
                      className="text-stone-400"
                    />
                  )}
                </div>

                <div
                  className="
                    absolute
                    bottom-2
                    right-2
                    w-10
                    h-10
                    rounded-full
                    bg-amber-500
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    group-hover:scale-110
                    transition
                  "
                >
                  <Camera size={18} />
                </div>
              </div>
            </label>

            <input
              id="profile-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />

            <p className="mt-3 font-medium text-neutral-800">
              Change Profile Picture
            </p>

            <p className="text-sm text-stone-500">
              Click the image to upload a new photo
            </p>
          </div>

          {/* Full Name */}

          <div>
            <label className="flex items-center gap-2 mb-2 font-medium text-neutral-800">
              <User
                size={16}
                className="text-amber-600"
              />
              Full Name
            </label>

            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              placeholder="Enter your full name"
              className="
                w-full
                rounded-xl
                border
                border-stone-300
                bg-stone-50
                px-4
                py-3
                outline-none
                transition
                focus:border-amber-500
                focus:ring-4
                focus:ring-amber-100
              "
            />
          </div>

                    {/* Phone */}

          <div>
            <label className="flex items-center gap-2 mb-2 font-medium text-neutral-800">
              <Phone
                size={16}
                className="text-amber-600"
              />
              Phone Number
            </label>

            <input
              type="text"
              value={formData.phoneNumber}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phoneNumber: e.target.value,
                })
              }
              placeholder="Enter your phone number"
              className="
                w-full
                rounded-xl
                border
                border-stone-300
                bg-stone-50
                px-4
                py-3
                outline-none
                transition
                focus:border-amber-500
                focus:ring-4
                focus:ring-amber-100
              "
            />
          </div>

          {/* City */}

          <div>
            <label className="flex items-center gap-2 mb-2 font-medium text-neutral-800">
              <MapPin
                size={16}
                className="text-amber-600"
              />
              City
            </label>

            <input
              type="text"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
              placeholder="Enter your city"
              className="
                w-full
                rounded-xl
                border
                border-stone-300
                bg-stone-50
                px-4
                py-3
                outline-none
                transition
                focus:border-amber-500
                focus:ring-4
                focus:ring-amber-100
              "
            />
          </div>

          {/* Bio */}

          <div>
            <label className="flex items-center gap-2 mb-2 font-medium text-neutral-800">
              <User
                size={16}
                className="text-amber-600"
              />
              Bio
            </label>

            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bio: e.target.value,
                })
              }
              placeholder="Tell something about yourself..."
              className="
                w-full
                rounded-xl
                border
                border-stone-300
                bg-stone-50
                px-4
                py-3
                outline-none
                resize-none
                transition
                focus:border-amber-500
                focus:ring-4
                focus:ring-amber-100
              "
            />
          </div>

          {/* Buttons */}

          <div className="flex flex-col-reverse md:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="
                w-full
                py-3
                rounded-xl
                border
                border-stone-300
                bg-white
                hover:bg-stone-100
                text-neutral-700
                font-medium
                transition
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                py-3
                rounded-xl
                bg-amber-500
                hover:bg-amber-600
                disabled:opacity-60
                disabled:cursor-not-allowed
                text-white
                font-semibold
                transition
              "
            >
              <Save size={18} />

              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}