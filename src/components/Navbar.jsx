import logo from "./../assets/mg.webp";

import {
  ShoppingBag,
  User,
  LogIn,
 
  Package,
  LogOut,
  LayoutDashboardIcon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext.jsx";
import { useState } from "react";
import { CartData } from "../context/CartContext.jsx";

export default function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);


  const { cart } = CartData()

  const { isAuth, logoutUser, user } = UserData();

  const logoutHandler = () => {
    logoutUser(navigate);
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-500 w-full border-b border-[#BEA163]/20 bg-gradient-to-r from-[#1d1d1d] via-[#2a2418] to-[#1d1d1d] backdrop-blur-md">

      <div className="mx-auto flex h-22 max-w-7xl items-center justify-between px-6 md:px-10">

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex cursor-pointer items-center gap-3"
        >
          <img
            src={logo}
            alt="logo"
            className="h-14 w-auto"
          />

          <div className="hidden md:block">

            <h2 className="font-epilogue text-xl font-semibold tracking-wide text-white">
              Mansoori Garment
            </h2>

            <p className="text-xs uppercase tracking-[3px] text-[#BEA163]">
              Premium Fashion
            </p>

          </div>
        </div>

        {/* Nav Links */}
        <ul className="hidden items-center gap-10 font-manrope text-sm uppercase tracking-[2px] text-white md:flex">

          <li
            onClick={() => navigate("/")}
            className="cursor-pointer transition-all duration-300 hover:text-[#BEA163]"
          >
            Home
          </li>

          <li
            onClick={() => navigate("/products")}
            className="cursor-pointer transition-all duration-300 hover:text-[#BEA163]"
          >
            Products
          </li>

        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Cart */}
          <div
            onClick={() => navigate("/cart")}
            className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#BEA163]/20 bg-[#1d1d1d] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
          >

            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#BEA163] text-[10px] font-bold text-black">
              {cart?.length || 0}
            </span>

            <ShoppingBag size={19} />

          </div>

          {/* User Dropdown */}
          <div className="relative">

            {/* Icon */}
            <div
              onClick={() => setOpen(!open)}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#BEA163]/20 bg-[#1d1d1d] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
            >

              {isAuth ? (
                <User size={18} />
              ) : (
                <LogIn size={18} />
              )}

            </div>

            {/* Dropdown */}
            <div
              className={`absolute right-0 top-full z-50 pt-3 transition-all duration-300 ${
                open
                  ? "visible translate-y-0 opacity-100"
                  : "invisible translate-y-2 opacity-0"
              }`}
            >

              <div className="min-w-[240px] overflow-hidden rounded-xl border border-[#BEA163]/20 bg-[#1d1d1d] shadow-2xl">

                {/* Heading */}
                <div className="border-b border-[#BEA163]/10 px-5 py-4">

                  <p className="text-xs uppercase tracking-[4px] text-[#BEA163]">
                    Account
                  </p>

                </div>

                {/* Menu */}
                <div className="flex flex-col p-2">

                  {!isAuth ? (
                    <button
                      onClick={() => {
                        navigate("/login");
                        setOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-left text-sm uppercase tracking-[2px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
                    >
                      <LogIn size={16} />
                      Login
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          navigate("/orders");
                          setOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-left text-sm uppercase tracking-[2px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
                      >
                        <Package size={16} />
                        Your Orders
                      </button>

                      {user?.role === "admin" && (
                        <button
                          onClick={() => {
                            navigate("/admin/dashboard");
                            setOpen(false);
                          }}
                          className="flex items-center gap-3 px-4 py-3 text-left text-sm uppercase tracking-[2px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
                        >
                          <LayoutDashboardIcon size={16} />
                          Dashboard
                        </button>
                      )}

                      <button
                        onClick={()=>{
                          logoutHandler()
                        }}
                        className="flex items-center gap-3 px-4 py-3 text-left text-sm uppercase tracking-[2px] text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </>
                  )}

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </nav>
  );
}