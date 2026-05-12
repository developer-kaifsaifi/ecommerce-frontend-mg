import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product, latest }) {
  const navigate = useNavigate();

  return (
    <div className="group relative w-[320px] bg-[#f8f3ea] border border-[#e6d8bb] p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]">

      {/* New Badge */}
      {latest === "yes" && (
        <div className="absolute left-6 top-6 z-20 bg-[#BEA163] px-4 py-2 text-[10px] uppercase tracking-[4px] text-black">
          New
        </div>
      )}

      {/* Image Box */}
      <Link to={`/product/${product._id}`}>

        <div className="relative overflow-hidden bg-white p-5">

          {/* Decorative Border */}
          <div className="absolute inset-3 border border-[#BEA163]/20 pointer-events-none" />

          {/* Image */}
          <img
            src={product.images[0].url}
            alt="Product"
            className="h-[340px] w-full object-cover transition-all duration-700 group-hover:scale-105"
          />

        </div>

      </Link>

      {/* Content */}
      <div className="pt-6">

        {/* Brand */}
        <p className="text-[10px] uppercase tracking-[5px] text-[#8a6a39] font-semibold">
          Thread & Grace
        </p>

        {/* Title */}
        <h2 className="mt-3 font-garamond text-3xl leading-none text-[#1d1d1d]">
          {product.title.slice(0, 28)}
        </h2>

        {/* Description */}
        <p className="mt-4 text-sm leading-7 text-gray-600 font-manrope min-h-[55px]">
          {product.about.slice(0, 75)}...
        </p>

        {/* Bottom */}
        <div className="mt-7 flex items-end justify-between border-t border-[#d9c8a8] pt-5">

          {/* Price */}
          <div>

            <p className="text-[10px] uppercase tracking-[4px] text-gray-400">
              Price
            </p>

            <h3 className="mt-1 font-garamond text-4xl text-[#1d1d1d]">
              ₹ {product.price}
            </h3>

          </div>

          {/* Button */}
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="bg-[#1d1d1d] px-6 py-3 text-xs uppercase tracking-[3px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
          >
            View
          </button>

        </div>

      </div>

    </div>
  );
}