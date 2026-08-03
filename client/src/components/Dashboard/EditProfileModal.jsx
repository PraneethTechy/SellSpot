import { useState } from "react";
import {
  X,
  User,
  Phone,
  MapPin,
  Save,
  Camera,
} from "lucide-react";

import {
  updateProfile,
  uploadProfileImage,
} from "../../services/profileService";

import { getProducts } from "../../services/productService";

export default function EditProfileModal({
  profile,
  onClose,
  onProfileUpdated,
}) {
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] =
    useState(null);

  const [preview, setPreview] = useState(
    profile.avatar_url || ""
  );

  const [formData, setFormData] = useState({
    full_name: profile.full_name || "",
    phone: profile.phone || "",
    city: profile.city || "",
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

    let avatarUrl = profile.avatar_url;

    if (profileImage) {
      const {
        data: uploadedUrl,
        error: uploadError,
      } = await uploadProfileImage(
        profile.id,
        profileImage
      );

      if (uploadError) {
        setLoading(false);
        alert(uploadError.message);
        return;
      }

      avatarUrl = uploadedUrl;
    }

    const {
      data,
      error,
    } = await updateProfile(
      profile.id,
      {
        ...formData,
        avatar_url: avatarUrl,
      }
    );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    onProfileUpdated(data);

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
      "
    >
      <div
        className="
          w-full
          h-[92vh]
          md:h-auto
          md:max-w-lg
          bg-white
          rounded-t-3xl
          md:rounded-3xl
          shadow-2xl
          overflow-y-auto
        "
      >


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
              value={formData.full_name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  full_name: e.target.value,
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
              value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
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

          {/* Action Buttons */}

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