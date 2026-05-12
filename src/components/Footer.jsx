import {
  

  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



export default function Footer() {

const navigate = useNavigate()


  return (
    <footer className="print:hidden bg-[#1d1d1d] text-white">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div>

            <h2 className="text-3xl font-bold font-epilogue mb-6">
              Thread & Grace
            </h2>

            <div className="space-y-5 text-gray-300 font-manrope">

              <div className="flex items-start gap-3">
                <MapPin className="text-[#BEA163] mt-1" size={18} />

                <p>
                  Khora Colony Sector 62A <br />
                  Ghaziabad 201309
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-[#BEA163]" size={18} />

                <p>(+91) 98574-70115</p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-[#BEA163]" size={18} />

                <p>info@threadandgrace.com</p>
              </div>

            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-8">

              <button className="h-11 w-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#BEA163] hover:text-black transition-all duration-300">
                <FaInstagram size={18} />
              </button>

              <button className="h-11 w-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#BEA163] hover:text-black transition-all duration-300">
                <FaFacebook size={18} />
              </button>

              <button className="h-11 w-11 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#BEA163] hover:text-black transition-all duration-300">
                <FaTwitter size={18} />
              </button>

            </div>

          </div>

          {/* Categories */}
          <div>

            <h3 className="text-2xl font-semibold font-epilogue mb-6">
              Categories
            </h3>

            <ul className="space-y-4 text-gray-300 font-manrope">

              <li className="hover:text-[#BEA163] transition-all cursor-pointer">
                All
              </li>

              <li className="hover:text-[#BEA163] transition-all cursor-pointer">
                Footwear
              </li>

              <li className="hover:text-[#BEA163] transition-all cursor-pointer">
                Mens
              </li>

              <li className="hover:text-[#BEA163] transition-all cursor-pointer">
                New Arrivals
              </li>

            </ul>

          </div>

          {/* Useful Links */}
          <div>

            <h3 className="text-2xl font-semibold font-epilogue mb-6">
              Useful Links
            </h3>

            <ul className="space-y-4 text-gray-300 font-manrope">

              <li onClick={() => navigate("/")} className="hover:text-[#BEA163] transition-all cursor-pointer">
                Home
              </li>

              <li onClick={() => navigate("/about")} className="hover:text-[#BEA163] transition-all cursor-pointer">
                About Us
              </li>

              <li onClick={() => navigate("/products")} className="hover:text-[#BEA163] transition-all cursor-pointer">
                Shop
              </li>

              <li onClick={() => navigate("/cart")} className="hover:text-[#BEA163] transition-all cursor-pointer">
                Checkout
              </li>

              
            </ul>

          </div>

          {/* Support */}
          <div>

            <h3 className="text-2xl font-semibold font-epilogue mb-6">
              Support
            </h3>

            <ul className="space-y-4 text-gray-300 font-manrope">

              <li className="hover:text-[#BEA163] transition-all cursor-pointer">
                Contact Us
              </li>

              <li onClick={() => navigate("/privacypolicy")} className="hover:text-[#BEA163] transition-all cursor-pointer">
                Privacy Policy
              </li>

              <li onClick={() => navigate("/shippingpolicy")} className="hover:text-[#BEA163] transition-all cursor-pointer">
                Shipping Policy
              </li>

              <li onClick={() => navigate("/terms&condition")} className="hover:text-[#BEA163] transition-all cursor-pointer">
                Terms & Conditions
              </li>

            </ul>

          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">

        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-gray-400 text-sm font-manrope text-center md:text-left">
            Copyright © 2026 Thread & Grace | All Rights Reserved.
          </p>

          {/* Payments */}
          <div className="flex items-center gap-3">

            <div className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold">
              VISA
            </div>

            <div className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold">
              MasterCard
            </div>

            <div className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold">
              UPI
            </div>

            <div className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold">
              Paytm
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}