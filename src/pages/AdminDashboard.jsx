import HomePage from "@/components/admin/HomePage";
import InfoPage from "@/components/admin/InfoPage";
import OrdersPage from "@/components/admin/OrdersPage";

import { UserData } from "@/context/UserContext";

import {
  Home,
  Info,
  Menu,
  ShoppingBag,
  X,
  Crown,
} from "lucide-react";

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "motion/react";

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] =
    useState("home");

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const navigate = useNavigate();

  const { user } = UserData();

  if (user.role !== "admin") return navigate("/");

  const renderPageContent = () => {
    switch (selectedPage) {
      case "home":
        return <HomePage />;

      case "orders":
        return <OrdersPage />;

      case "info":
        return <InfoPage />;

      default:
        return <HomePage  />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea]">

      <div className="flex">

        {/* Mobile Overlay */}
        <AnimatePresence>

          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setSidebarOpen(false)
              }
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
            />
          )}

        </AnimatePresence>

        {/* Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`fixed left-0 top-0 z-50 flex h-screen w-[300px] flex-col border-r border-[#d9c8a8] bg-[#1d1d1d] transition-all duration-300 lg:sticky ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        >

          {/* Top */}
          <div className="border-b border-white/10 px-8 py-8">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center bg-[#BEA163] text-black">

                <Crown size={24} />

              </div>

              <div>

                <p className="text-xs uppercase tracking-[4px] text-[#BEA163]">
                  Mansoori Garment
                </p>

                <h2 className="mt-1 font-garamond text-4xl text-white">
                  Admin
                </h2>

              </div>

            </div>

          </div>

          {/* Menu */}
          <div className="flex flex-1 flex-col gap-4 p-6">

            {/* Home */}
            <button
              onClick={() => {
                setSelectedPage("home");
                setSidebarOpen(false);
              }}
              className={`group flex h-16 items-center gap-4 px-5 text-sm uppercase tracking-[3px] transition-all duration-300 cursor-pointer ${
                selectedPage === "home"
                  ? "bg-[#BEA163] text-black"
                  : "text-white hover:bg-[#BEA163] hover:text-black"
              }`}
            >

              <Home size={20} />

              Dashboard

            </button>

            {/* Orders */}
            <button
              onClick={() => {
                setSelectedPage("orders");
                setSidebarOpen(false);
              }}
              className={`group flex h-16 items-center gap-4 px-5 text-sm uppercase tracking-[3px] transition-all duration-300 cursor-pointer ${
                selectedPage === "orders"
                  ? "bg-[#BEA163] text-black"
                  : "text-white hover:bg-[#BEA163] hover:text-black"
              }`}
            >

              <ShoppingBag size={20} />

              Orders

            </button>

            {/* Info */}
            <button
              onClick={() => {
                setSelectedPage("info");
                setSidebarOpen(false);
              }}
              className={`group flex h-16 items-center gap-4 px-5 text-sm uppercase tracking-[3px] transition-all duration-300 cursor-pointer ${
                selectedPage === "info"
                  ? "bg-[#BEA163] text-black"
                  : "text-white hover:bg-[#BEA163] hover:text-black"
              }`}
            >

              <Info size={20} />

              Website Info

            </button>

          </div>

          {/* Bottom */}
          <div className="border-t border-white/10 p-6 lg:hidden">

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
              className="flex h-14 w-full items-center justify-center gap-3 border border-white/10 text-sm uppercase tracking-[3px] text-white transition-all duration-300 hover:bg-red-500 hover:text-white cursor-pointer"
            >

              <X size={18} />

              Close Menu

            </button>

          </div>

        </motion.div>

        {/* Right */}
        <div className="flex flex-1 flex-col min-w-0 w-full overflow-x-hidden">

          {/* Topbar */}
          <div className="sticky top-0 z-30 border-b border-[#d9c8a8] bg-[#f8f3ea]/90 backdrop-blur-md">

            <div className="flex h-22 items-center justify-between px-6 md:px-10">

              {/* Mobile Menu */}
              <button
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="flex h-12 w-12 items-center justify-center border border-[#d9c8a8] bg-white text-[#1d1d1d] transition-all duration-300 hover:bg-[#BEA163] hover:text-black lg:hidden cursor-pointer"
              >

                <Menu size={20} />

              </button>

              {/* Title */}
              <div>

                <p className="mb-1 text-xs uppercase tracking-[4px] text-[#705023]">
                  Admin Dashboard
                </p>

                <h1 className="font-garamond text-4xl text-[#1d1d1d]">
                  {selectedPage === "home"
                    ? "Dashboard"
                    : selectedPage === "orders"
                    ? "Orders"
                    : "Website Info"}
                </h1>

              </div>

            </div>

          </div>

          {/* Content */}
          <motion.div
            key={selectedPage}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="flex-1 p-6 md:p-10"
          >

            {renderPageContent()}

          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;