import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import {
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  ShoppingBag,
  Camera,
} from "lucide-react";

import { signUp } from "../services/authService";
import { createProfile } from "../services/profileService";

export default function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    city: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    setProfileImage(file);
    setPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const { data, error } = await signUp(
      formData.email,
      formData.password
    );

    if (error) {
      setLoading(false);
      alert(error.message);
      return;
    }

    const user = data.user;

    console.log("User:", user);

const {
  data: { session },
} = await supabase.auth.getSession();

console.log("Session:", session);
console.log("Selected Image:", profileImage);

let avatarUrl = "";

if (profileImage) {
  const fileExt = profileImage.name.split(".").pop();
  const fileName = `${user.id}.${fileExt}`;

  console.log("Uploading:", fileName);

  const { data: uploadData, error: uploadError } =
    await supabase.storage
      .from("avatars")
      .upload(fileName, profileImage, {
        upsert: true,
      });

  console.log("Upload Data:", uploadData);
  console.log("Upload Error:", uploadError);

  if (uploadError) {
    alert(uploadError.message);
    setLoading(false);
    return;
  }

  const { data: publicData } = supabase.storage
    .from("avatars")
    .getPublicUrl(fileName);

  console.log("Public URL:", publicData.publicUrl);

  avatarUrl = publicData.publicUrl;
}
    const { error: profileError } = await createProfile({
  id: user.id,
  full_name: formData.fullName,
  phone: formData.phone,
  city: formData.city,
  avatar_url: avatarUrl,
});

    setLoading(false);

    if (profileError) {
      alert(profileError.message);
      return;
    }

    alert("Signup Successful!");

    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-stone-100 flex">

      {/* Left Section */}

      <div className="hidden lg:flex w-1/2 bg-neutral-900 text-white p-16 flex-col justify-center">

        <span className="text-5xl font-extrabold tracking-wide">
          <span>Sell</span>
          <span className="text-amber-400">Spot</span>
        </span>

        <h2 className="mt-8 text-4xl font-bold leading-tight">
          Buy & Sell
          <br />
          Products Near You
        </h2>

        <p className="mt-6 text-stone-300 text-lg leading-8 max-w-md">
          Join thousands of buyers and sellers on SellSpot.
          Discover amazing deals and connect with trusted people
          in your city.
        </p>

        <div className="mt-12 space-y-6">

          <div className="flex items-center gap-4">
            <ShieldCheck className="text-amber-400" size={28} />
            <span className="text-lg">Secure Marketplace</span>
          </div>

          <div className="flex items-center gap-4">
            <BadgeCheck className="text-amber-400" size={28} />
            <span className="text-lg">Verified Sellers</span>
          </div>

          <div className="flex items-center gap-4">
            <ShoppingBag className="text-amber-400" size={28} />
            <span className="text-lg">Thousands of Products</span>
          </div>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-6">

        <div className="w-full max-w-xl bg-white rounded-3xl border border-stone-200 shadow-xl px-6 py-8 sm:p-8">

          <h1 className="text-3xl font-bold text-slate-900">
            Create Account
          </h1>

          <p className="mt-1 text-stone-500 text-sm">
            Start buying and selling in minutes.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 space-y-3.5"
          >

            {/* Profile Picture */}

            <div className="flex flex-col items-center mb-3">

              <label
                htmlFor="profile-image"
                className="cursor-pointer group"
              >

                <div className="relative">

                  <div className="w-22 h-22 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-amber-100 bg-stone-100 flex items-center justify-center">

                    {preview ? (
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User
                        size={40}
                        className="text-stone-400"
                      />
                    )}

                  </div>

                  <div
                    className="
                      absolute
                      bottom-0
                      right-0
                      w-8
                      h-8
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
                    <Camera size={16} />
                  </div>

                </div>

              </label>

              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <p className="mt-2 text-sm font-medium text-slate-700">
                Profile Picture
              </p>

              <p className="text-xs text-stone-500">
                Upload a clear profile photo
              </p>

            </div>

            <InputField
              icon={<User size={18} />}
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
            />

            <InputField
              icon={<Mail size={18} />}
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />

            <InputField
              icon={<Lock size={18} />}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* Phone & City grouped in 1 row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InputField
                icon={<Phone size={18} />}
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />

              <InputField
                icon={<MapPin size={18} />}
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <button
              disabled={loading}
              className="
                w-full
                bg-amber-500
                hover:bg-amber-600
                text-white
                rounded-xl
                py-3
                font-semibold
                flex
                items-center
                justify-center
                gap-2
                transition
                mt-2
              "
            >
              {loading ? "Creating Account..." : "Create Account"}

              {!loading && (
                <ArrowRight size={18} />
              )}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-stone-500">
            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-amber-600 hover:text-amber-700"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

function InputField({
  icon,
  type = "text",
  name,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="flex items-center gap-3 border border-stone-300 bg-stone-50 rounded-xl px-4 py-2.5 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100 transition">

      <div className="text-stone-500">
        {icon}
      </div>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full bg-transparent outline-none text-sm"
      />

    </div>
  );
}