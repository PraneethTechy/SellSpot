import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "../components/Dashboard/Sidebar";
import MobileBottomNav from "../components/Dashboard/MobileBottomNav";

import MyProducts from "../components/Dashboard/MyProducts";
import Messages from "../components/Dashboard/Messages";
import Profile from "../components/Dashboard/Profile";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">


      <div className="hidden md:flex min-h-screen">

        <Sidebar />

        <div className="flex-1 p-8">

          <Routes>

            <Route
              index
              element={<Navigate to="products" />}
            />

            <Route
              path="products"
              element={<MyProducts />}
            />

            <Route
              path="messages"
              element={<Messages />}
            />

            <Route
              path="profile"
              element={<Profile />}
            />

          </Routes>

        </div>

      </div>


      <div className="md:hidden">

        <div className="bg-white shadow-sm border-b px-5 py-4">

          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>

        </div>

        <div className="pb-20 p-4">

          <Routes>

            <Route
              index
              element={<Navigate to="products" />}
            />

            <Route
              path="products"
              element={<MyProducts />}
            />

            <Route
              path="messages"
              element={<Messages />}
            />

            <Route
              path="profile"
              element={<Profile />}
            />

          </Routes>

        </div>

        <MobileBottomNav />

      </div>

    </div>
  );
}