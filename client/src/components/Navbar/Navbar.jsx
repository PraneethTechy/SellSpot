import { Link, useLocation } from "react-router-dom";
import {
  MessageCircle,
  Plus,
  LayoutDashboard,
  ChevronDown,
  User,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, profile } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 px-5 py-4 bg-slate-900 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 items-center">
        
        {/* Left Column: Brand Logo */}
        <div className="flex items-center justify-start">
          <Link
            to="/"
            className="group flex items-center gap-1 text-3xl font-black tracking-tight"
          >
            <span className="text-white group-hover:text-stone-200 transition">
              Sell
            </span>
            <span className="text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-lg border border-amber-400/20">
              Spot
            </span>
          </Link>
        </div>

        {/* Center Column: Primary Navigation (Balanced Grid Center) */}
        {user ? (
          <div className="hidden md:flex items-center justify-center">
            <nav className="flex items-center gap-1 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
              <Link
                to="/dashboard"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive("/dashboard")
                    ? "bg-amber-400/15 text-amber-400 border border-amber-400/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/dashboard/messages"
                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive("/dashboard/messages")
                    ? "bg-amber-400/15 text-amber-400 border border-amber-400/30 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <MessageCircle size={16} />
                <span>Messages</span>
              </Link>
            </nav>
          </div>
        ) : (
          <div className="hidden md:block" />
        )}

        {/* Right Column: User Actions */}
        <div className="flex items-center justify-end gap-3">
          {user ? (
            <>
              {/* Post Item Button */}
              <Link
                to="/add-product"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition shadow-md shadow-amber-500/15 active:scale-95"
              >
                <Plus size={18} strokeWidth={2.5} />
                <span className="hidden sm:inline">Sell Item</span>
              </Link>

              {/* Profile Pill */}
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 p-1.5 pr-3 rounded-2xl transition group"
              >
                {profile?.avatar_url ? (
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name || "User"}
                    className="w-8 h-8 rounded-xl object-cover ring-2 ring-amber-400/60"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
                    <User size={16} />
                  </div>
                )}

                <span className="hidden lg:block text-xs font-semibold text-slate-200 group-hover:text-amber-400 transition max-w-25 truncate">
                  {profile?.full_name || "Account"}
                </span>

                <ChevronDown
                  size={14}
                  className="text-slate-400 group-hover:text-white transition"
                />
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-slate-300 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition hover:bg-slate-800"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-sm font-bold transition shadow-md shadow-amber-500/15 active:scale-95"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}