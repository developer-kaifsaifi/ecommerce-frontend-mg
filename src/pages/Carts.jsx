import { CartData } from "../context/CartContext";
import {
  ShoppingBag,
  Trash2,
  Minus,
  Plus,
} from "lucide-react";

import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";

const Cart = () => {
  const {
    cart,
    totalItem,
    subTotal,
    updateCart,
    removeFromCart,
  } = CartData();

  const navigate = useNavigate();

  const updateCartHander = async (action, id) => {
    await updateCart(action, id);
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] px-6 py-12 md:px-10">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
          Premium Shopping
        </p>
        <h1 className="font-garamond text-6xl text-[#1d1d1d] leading-none">
          Your Cart
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600 font-manrope">
          Review your selected premium products before proceeding
          to secure checkout.
        </p>
      </motion.div>

      {/* Empty Cart */}
      {cart.length === 0 ? (
        <div className="flex min-h-[60vh] flex-col items-center justify-center border border-dashed border-[#BEA163]/20 bg-white text-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center bg-[#f8f3ea] text-[#BEA163]">
            <ShoppingBag size={40} />
          </div>
          <h2 className="font-garamond text-5xl text-[#1d1d1d]">
            Your Cart Is Empty
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-9 text-gray-500 font-manrope">
            Explore our premium collection and add timeless
            fashion pieces to your cart.
          </p>
          <motion.button
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/products")}
            className="mt-10 bg-[#1d1d1d] px-8 py-4 text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
          >
            Shop Now
          </motion.button>
        </div>
      ) : (
        <div className="grid gap-10 xl:grid-cols-3">
          
          {/* Left - Cart Items */}
          <div className="space-y-8 xl:col-span-2">
            {cart.map((e, index) => (
              <motion.div
                key={e._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -4 }}
                className="border border-[#d9c8a8] bg-white p-5 shadow-sm transition-all duration-300"
              >
                <div className="flex flex-col gap-6 lg:flex-row">
                  
                  {/* Image */}
                  <div
                    onClick={() => {
                      if (e.product?._id) {
                        navigate(`/product/${e.product._id}`);
                      }
                    }}
                    className="cursor-pointer overflow-hidden bg-[#f8f3ea] p-4"
                  >
                    <img
                      src={e.product?.images?.[0]?.url || "https://via.placeholder.com/220x240?text=No+Image"}
                      alt={e.product?.title || "Product Image"}
                      className="h-[240px] w-[220px] object-cover transition-all duration-500 hover:scale-105"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="mb-3 text-xs uppercase tracking-[4px] text-[#705023]">
                        Mansoori Garment
                      </p>
                      <h2 className="font-garamond text-5xl leading-none text-[#1d1d1d]">
                        {e.product?.title || "Product Unavailable"}
                      </h2>
                      <p className="mt-5 text-lg text-gray-500 font-manrope">
                        Premium fashion crafted with timeless elegance.
                      </p>
                    </div>

                    {/* Bottom Actions */}
                    <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                      
                      {/* Price */}
                      <div>
                        <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
                          Price
                        </p>
                        <h3 className="font-garamond text-5xl text-[#1d1d1d]">
                          ₹ {e.product?.price || 0}
                        </h3>
                      </div>

                      {/* Quantity Logic */}
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => updateCartHander("dec", e._id)}
                          className="flex h-12 w-12 items-center justify-center border border-[#d9c8a8] bg-[#f8f3ea] text-[#1d1d1d] transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
                        >
                          <Minus size={16} />
                        </button>

                        <span className="min-w-[40px] text-center text-xl font-semibold text-[#1d1d1d]">
                          {e.quantity} {/* Fixed Typo Here */}
                        </span>

                        <button
                          onClick={() => updateCartHander("inc", e._id)}
                          className="flex h-12 w-12 items-center justify-center border border-[#d9c8a8] bg-[#f8f3ea] text-[#1d1d1d] transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(e._id)}
                        className="flex h-12 w-12 items-center justify-center border border-red-200 bg-red-50 text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white cursor-pointer"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right - Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="h-fit border border-[#d9c8a8] bg-white p-8 shadow-sm sticky top-28"
          >
            <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
              Order Summary
            </p>
            <h2 className="font-garamond text-5xl text-[#1d1d1d]">
              Checkout
            </h2>

            {/* Summary Details */}
            <div className="mt-10 space-y-6 border-t border-[#f0e7d8] pt-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-500">Total Items</p>
                <p className="text-xl text-[#1d1d1d]">{totalItem}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-gray-500">Subtotal</p>
                <p className="font-garamond text-4xl text-[#1d1d1d]">
                  ₹ {subTotal}
                </p>
              </div>
            </div>

            {/* Total */}
            <div className="mt-8 border-t border-[#f0e7d8] pt-8">
              <div className="flex items-center justify-between">
                <p className="text-lg uppercase tracking-[3px] text-[#1d1d1d]">
                  Total
                </p>
                <h3 className="font-garamond text-5xl text-[#1d1d1d]">
                  ₹ {subTotal}
                </h3>
              </div>
            </div>

            {/* Proceed Button */}
            <motion.button
              whileHover={{ scale: 0.98 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate("/checkout")}
              disabled={cart.length === 0}
              className="mt-10 flex h-16 w-full items-center justify-center bg-[#1d1d1d] text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black disabled:opacity-50 cursor-pointer"
            >
              Proceed To Checkout
            </motion.button>
          </motion.div>

        </div>
      )}
    </div>
  );
};

export default Cart;