import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  signIn,
  signInWithGoogle,
} from "../services/authService";

import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  BadgeCheck,
  ShoppingBag,
} from "lucide-react";


export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from =
    location.state?.from?.pathname || "/";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const { error } = await signIn(
      formData.email,
      formData.password
    );

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    navigate(from, {
      replace: true,
    });
  }

  async function handleGoogleLogin() {
  const { error } = await signInWithGoogle();

  if (error) {
    alert(error.message);
  }
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
          Welcome Back
          <br />
          to SellSpot
        </h2>

        <p className="mt-6 text-stone-300 text-lg leading-8 max-w-md">
          Log in to continue buying and selling products
          with trusted people in your city.
        </p>

        <div className="mt-12 space-y-6">

          <div className="flex items-center gap-4">
            <ShieldCheck
              className="text-amber-400"
              size={28}
            />
            <span className="text-lg">
              Secure Marketplace
            </span>
          </div>

          <div className="flex items-center gap-4">
            <BadgeCheck
              className="text-amber-400"
              size={28}
            />
            <span className="text-lg">
              Trusted Community
            </span>
          </div>

          <div className="flex items-center gap-4">
            <ShoppingBag
              className="text-amber-400"
              size={28}
            />
            <span className="text-lg">
              Thousands of Products
            </span>
          </div>

        </div>

      </div>

      {/* Right Section */}

      <div className="flex-1 flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-lg bg-white rounded-3xl border border-stone-200 shadow-xl p-10">

          <h1 className="text-4xl font-bold text-slate-900">
            Login
          </h1>

          <p className="mt-2 text-stone-500">
            Continue to your SellSpot account.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

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

            <button
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-3.5 font-semibold flex items-center justify-center gap-2 transition"
            >
              {loading ? "Logging in..." : "Login"}

              {!loading && (
                <ArrowRight size={18} />
              )}
            </button>

            <button
  type="button"
  onClick={handleGoogleLogin}
  className="
    w-full
    border
    border-stone-300
    rounded-xl
    py-3
    flex
    items-center
    justify-center
    gap-3
    hover:bg-stone-100
    transition
  "
>
  <img
    src="https://www.svgrepo.com/show/475656/google-color.svg"
    className="w-5 h-5"
    alt=""
  />

  Continue with Google
</button>

<div className="flex items-center my-6">
  <div className="flex-1 border-t"></div>

  <span className="px-4 text-sm text-stone-500">
    OR
  </span>

  <div className="flex-1 border-t"></div>
</div>

          </form>

          <p className="mt-8 text-center text-stone-500">
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="font-semibold text-amber-600 hover:text-amber-700"
            >
              Create Account
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
    <div className="flex items-center gap-3 border border-stone-300 bg-stone-50 rounded-xl px-4 py-3 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-100 transition">

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
        className="w-full bg-transparent outline-none"
      />

    </div>
  );
}