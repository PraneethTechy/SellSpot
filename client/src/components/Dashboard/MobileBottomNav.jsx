import { NavLink } from "react-router-dom";
import { Package, MessageCircle, User } from "lucide-react";

export default function MobileBottomNav() {
  const linkClass = ({ isActive }) =>
    `flex flex-col items-center justify-center flex-1 py-3 transition ${
      isActive ? "text-amber-500" : "text-stone-500"
    }`;

  return (
    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        border-t
        border-stone-200
        shadow-lg
        md:hidden
        z-50
      "
    >
      <div className="flex">
        <NavLink to="/dashboard/products" className={linkClass}>
          <Package size={22} />

          <span className="text-xs mt-1">Products</span>
        </NavLink>

        <NavLink to="/dashboard/messages" className={linkClass}>
          <MessageCircle size={22} />

          <span className="text-xs mt-1">Messages</span>
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass}>
          <User size={22} />

          <span className="text-xs mt-1">Profile</span>
        </NavLink>
      </div>
    </div>
  );
}
