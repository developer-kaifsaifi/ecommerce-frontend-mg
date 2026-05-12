
import { CartData } from "@/context/CartContext.jsx";
import { server } from "@/main.jsx";

import axios from "axios";
import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";

import {toast} from "react-toastify";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { loadStripe } from "@stripe/stripe-js";

import {
  CreditCard,
  Truck,
  Wallet,
  ArrowRight,
  MapPin,
} from "lucide-react";

import { motion } from "motion/react";
import LoaderMG from "../components/LoaderMG.jsx";

const Payment = () => {
  const {
    cart,
    subTotal,
    fetchCart,
  } = CartData();

  const [address, setAddress] =
    useState("");

  const [method, setMethod] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  async function fetchAddress() {
    try {
      const { data } = await axios.get(
        `${server}/address/${id}`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      setAddress(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAddress();
  }, [id]);

  const paymentHandler = async () => {
    if (method === "cod") {
      setLoading(true);

      try {
        const { data } = await axios.post(
          `${server}/order/new/cod`,
          {
            method,
            phone: address.phone,
            address: address.address,
          },
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        setLoading(false);

        toast.success(data.message);

        fetchCart();

        navigate("/orders");
      } catch (error) {
        setLoading(false);

        toast.error(
          error.response.data.message
        );
      }
    }

    if (method === "online") {
      const stripePromise = loadStripe(
        "pk_test_51TRFy8GjPlMnjOL84P19ZhpfPC0EFGaNyr0PCmAQJg7eb3NJ4VMdXJAkmDZypsJoOZHt41Y2OjMGoXRlUqjG7ICv00bZ1wybpO"
      );

      try {
        setLoading(true);

        const stripe =
          await stripePromise;

        const { data } = await axios.post(
          `${server}/order/new/online`,
          {
            method,
            phone: address.phone,
            address: address.address,
          },
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        if (data.url) {
          window.location.href =
            data.url;

          setLoading(false);
        } else {
          toast.error(
            "Failed to create payment session"
          );

          setLoading(false);
        }
      } catch (error) {
        
        toast.error(
          "Payment Failed. Please Try Again"
        );
fetchCart()


        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] px-6 py-12 md:px-10">

      {loading ? (
        <LoaderMG />
      ) : (
        <div className="mx-auto max-w-7xl">

          {/* Heading */}
          <motion.div
            initial={{
              opacity: 0,
              y: 40,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="mb-14"
          >

            <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
              Secure Payment
            </p>

            <h1 className="font-garamond text-6xl text-[#1d1d1d] leading-none">
              Payment Checkout
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-500 font-manrope">
              Review your premium order and complete your
              payment securely.
            </p>

          </motion.div>

          <div className="grid gap-10 xl:grid-cols-3">

            {/* Left */}
            <div className="space-y-8 xl:col-span-2">

              {/* Products */}
              <div className="border border-[#d9c8a8] bg-white p-8 shadow-sm">

                <div className="mb-8 flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center bg-[#f8f3ea] text-[#BEA163]">

                    <Truck size={24} />

                  </div>

                  <div>

                    <p className="text-xs uppercase tracking-[4px] text-[#705023]">
                      Your Products
                    </p>

                    <h2 className="mt-1 font-garamond text-4xl text-[#1d1d1d]">
                      Order Items
                    </h2>

                  </div>

                </div>

                <div className="space-y-6">

                  {cart &&
                    cart.map((e, i) => (
                      <motion.div
                        key={i}
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
                          delay: i * 0.1,
                        }}
                        className="flex flex-col gap-5 border border-[#e9deca] bg-[#faf7f2] p-5 md:flex-row md:items-center"
                      >

                        {/* Image */}
                        <div className="overflow-hidden bg-white p-3">

                          <img
                            src={
                              e.product.images[0]
                                .url
                            }
                            alt="product"
                            className="h-28 w-28 object-cover"
                          />

                        </div>

                        {/* Info */}
                        <div className="flex-1">

                          <p className="mb-2 text-xs uppercase tracking-[4px] text-[#705023]">
                            Thread & Grace
                          </p>

                          <h3 className="font-garamond text-3xl text-[#1d1d1d]">
                            {e.product.title}
                          </h3>

                          <p className="mt-3 text-gray-500">
                            ₹{" "}
                            {
                              e.product.price
                            }{" "}
                            × {e.quantity}
                          </p>

                        </div>

                        {/* Price */}
                        <div>

                          <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
                            Total
                          </p>

                          <h4 className="font-garamond text-4xl text-[#1d1d1d]">
                            ₹{" "}
                            {e.product.price *
                              e.quantity}
                          </h4>

                        </div>

                      </motion.div>
                    ))}

                </div>

              </div>

              {/* Address */}
              {address && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 30,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.5,
                  }}
                  className="border border-[#d9c8a8] bg-white p-8 shadow-sm"
                >

                  <div className="mb-8 flex items-center gap-4">

                    <div className="flex h-14 w-14 items-center justify-center bg-[#f8f3ea] text-[#BEA163]">

                      <MapPin size={24} />

                    </div>

                    <div>

                      <p className="text-xs uppercase tracking-[4px] text-[#705023]">
                        Delivery Details
                      </p>

                      <h2 className="mt-1 font-garamond text-4xl text-[#1d1d1d]">
                        Shipping Address
                      </h2>

                    </div>

                  </div>

                  <div className="space-y-5">

                    <div>

                      <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
                        Address
                      </p>

                      <p className="text-lg leading-9 text-gray-600 font-manrope">
                        {address.address}
                      </p>

                    </div>

                    <div>

                      <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
                        Phone Number
                      </p>

                      <p className="text-lg text-[#1d1d1d]">
                        {address.phone}
                      </p>

                    </div>

                  </div>

                </motion.div>
              )}

            </div>

            {/* Right */}
            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="h-fit border border-[#d9c8a8] bg-white p-8 shadow-sm sticky top-28"
            >

              <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
                Payment Summary
              </p>

              <h2 className="font-garamond text-5xl text-[#1d1d1d]">
                Checkout
              </h2>

              {/* Total */}
              <div className="mt-10 border-t border-[#f0e7d8] pt-8">

                <div className="flex items-center justify-between">

                  <p className="text-gray-500">
                    Total Amount
                  </p>

                  <h3 className="font-garamond text-5xl text-[#1d1d1d]">
                    ₹ {subTotal}
                  </h3>

                </div>

              </div>

              {/* Methods */}
              <div className="mt-10 space-y-4">

                {/* COD */}
                <button
                  onClick={() =>
                    setMethod("cod")
                  }
                  className={`flex w-full items-center justify-between border p-5 transition-all duration-300 cursor-pointer ${
                    method === "cod"
                      ? "border-[#BEA163] bg-[#f8f3ea]"
                      : "border-[#e7dcc6] bg-white hover:border-[#BEA163]"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center bg-[#f4f1ea] text-[#BEA163]">

                      <Wallet size={20} />

                    </div>

                    <div className="text-left">

                      <p className="text-xs uppercase tracking-[4px] text-[#705023]">
                        Payment Method
                      </p>

                      <h3 className="mt-1 text-lg text-[#1d1d1d]">
                        Cash On Delivery
                      </h3>

                    </div>

                  </div>

                  <div
                    className={`h-5 w-5 border ${
                      method === "cod"
                        ? "border-[#BEA163] bg-[#BEA163]"
                        : "border-gray-300"
                    }`}
                  />

                </button>

                {/* Online */}
                <button
                  onClick={() =>
                    setMethod("online")
                  }
                  className={`flex w-full items-center justify-between border p-5 transition-all duration-300 cursor-pointer ${
                    method === "online"
                      ? "border-[#BEA163] bg-[#f8f3ea]"
                      : "border-[#e7dcc6] bg-white hover:border-[#BEA163]"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center bg-[#f4f1ea] text-[#BEA163]">

                      <CreditCard size={20} />

                    </div>

                    <div className="text-left">

                      <p className="text-xs uppercase tracking-[4px] text-[#705023]">
                        Payment Method
                      </p>

                      <h3 className="mt-1 text-lg text-[#1d1d1d]">
                        Online Payment
                      </h3>

                    </div>

                  </div>

                  <div
                    className={`h-5 w-5 border ${
                      method === "online"
                        ? "border-[#BEA163] bg-[#BEA163]"
                        : "border-gray-300"
                    }`}
                  />

                </button>

              </div>

              {/* Button */}
              <motion.button
                whileHover={{
                  scale: 0.98,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                onClick={paymentHandler}
                disabled={
                  !method || !address
                }
                className="mt-10 flex h-16 w-full items-center justify-center gap-3 bg-[#1d1d1d] text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black disabled:opacity-50 cursor-pointer"
              >

                Proceed To Payment

                <ArrowRight size={18} />

              </motion.button>

            </motion.div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Payment;
