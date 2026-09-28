import {
  Package,
  MessageCircle,
  User,
  ArrowLeft,
  Store,
  LogOut,
} from "lucide-react";

import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

import ConfirmModal from "../Common/ConfirmModal"

export default function Sidebar() {

const [showLogoutModal, setShowLogoutModal] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
      isActive
        ? "bg-amber-500 text-white shadow-sm"
        : "text-stone-700 hover:bg-stone-100 hover:text-neutral-900"
    }`;

  const navigate = useNavigate();

  function handleLogout() {
  localStorage.removeItem("token");
  navigate("/login");
}

  return (

    <>
    <aside className="hidden md:flex w-72 bg-white border-r border-stone-200 shadow-sm p-6 flex-col">
      {/* Back Arrow Button */}
      <div className="mb-4">
        <Link
          to="/"
          aria-label="Back"
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-500 text-white hover:bg-stone-200 hover:text-neutral-900 transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>

        <p className="mt-2 text-sm text-stone-500">
          Manage your marketplace account
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-3 flex-1">
        <NavLink to="/dashboard/products" className={linkClass}>
          <Package size={20} />
          My Products
        </NavLink>

        <NavLink to="/dashboard/messages" className={linkClass}>
          <MessageCircle size={20} />
          Messages
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass}>
          <User size={20} />
          Profile
        </NavLink>

        
      </nav>

       <button
  onClick={() => setShowLogoutModal(true)}
  className="
    mt-auto
    w-full
    flex
    items-center
    gap-3
    px-4
    py-3
    rounded-xl
    text-red-600
    hover:bg-red-100
    transition-all
    duration-300
  "
>
  <LogOut size={20} />
  <span>Logout</span>
</button>
    </aside>



    <ConfirmModal
  isOpen={showLogoutModal}
  title="Logout"
  message="Are you sure you want to logout?"
  confirmText="Logout"
  cancelText="Cancel"
  onCancel={() => setShowLogoutModal(false)}
  onConfirm={handleLogout}
/>

</>
  );
}
