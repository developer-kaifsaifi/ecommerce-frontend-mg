import { CartData } from "@/context/CartContext.jsx";
import { server } from "@/main.jsx";

import axios from "axios";
import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";

import {toast} from "react-toastify";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LoaderCircle,
  Check,
  ShoppingBag,
} from "lucide-react";

import { motion } from "motion/react";

const OrderProcessing = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [paymentVerified, setPaymentVerified] =
    useState(false);

  const { fetchCart } = CartData();

  const queryParams = new URLSearchParams(
    location.search
  );

  const sessionId =
    queryParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        toast.error("Session Id missing");

        return navigate("/cart");
      }

      if (paymentVerified) {
        return;
      }

      setLoading(true);

      try {
        const { data } = await axios.post(
          `${server}/api/order/verify/payment`,
          { sessionId },
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        if (data.success) {
          toast.success(
            "Order placed successfully"
          );

          setPaymentVerified(true);

          fetchCart();

          setLoading(false);

          setTimeout(() => {
            navigate("/orders");
          }, 10000);
        }
      } catch (error) {
        toast.error(
          "Payment verification failed"
        );

        navigate("/cart");

        console.log(error);
      }
    };

    if (sessionId && !paymentVerified) {
      verifyPayment();
    }
  }, [
    sessionId,
    paymentVerified,
    navigate,
  ]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f4f1ea] px-6 py-12">

      {/* Loading */}
      {loading ? (
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
          className="w-full max-w-2xl border border-[#d9c8a8] bg-white p-10 shadow-sm"
        >

          {/* Top */}
          <div className="mb-10 text-center">

            <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
              Secure Payment
            </p>

            <h1 className="font-garamond text-6xl text-[#1d1d1d] leading-none">
              Processing Order
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-9 text-gray-500 font-manrope">
              Please wait while we securely verify your payment
              and prepare your premium order.
            </p>

          </div>

          {/* Loader */}
          <div className="flex flex-col items-center justify-center">

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
              className="mb-8 flex h-24 w-24 items-center justify-center border border-[#BEA163]/30 bg-[#f8f3ea] text-[#BEA163]"
            >

              <LoaderCircle size={42} />

            </motion.div>

            <div className="h-2 w-full overflow-hidden bg-[#efe6d7]">

              <motion.div
                animate={{
                  x: [
                    "-100%",
                    "100%",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 bg-[#BEA163]"
              />

            </div>

            <p className="mt-6 text-sm uppercase tracking-[4px] text-gray-500">
              Verifying Payment...
            </p>

          </div>

        </motion.div>
      ) : (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="w-full max-w-2xl border border-[#d9c8a8] bg-white p-10 shadow-sm"
        >

          {/* Success */}
          <div className="flex flex-col items-center text-center">

            {/* Icon */}
            <motion.div
              initial={{
                scale: 0,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 12,
              }}
              className="mb-8 flex h-28 w-28 items-center justify-center bg-[#f8f3ea] text-[#BEA163]"
            >

              <Check size={50} />

            </motion.div>

            {/* Heading */}
            <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
              Order Confirmed
            </p>

            <h1 className="font-garamond text-6xl text-[#1d1d1d] leading-none">
              Thank You
            </h1>

            {/* Text */}
            <p className="mt-8 max-w-xl text-lg leading-9 text-gray-500 font-manrope">
              Your payment has been successfully verified and
              your order has been placed successfully. We will
              deliver your premium products soon.
            </p>

            {/* Summary */}
            <div className="mt-10 flex items-center gap-4 border border-[#d9c8a8] bg-[#f8f3ea] px-8 py-5">

              <ShoppingBag
                size={22}
                className="text-[#BEA163]"
              />

              <p className="text-sm uppercase tracking-[3px] text-[#1d1d1d]">
                Redirecting To Orders Page...
              </p>

            </div>

            {/* Button */}
            <motion.button
              whileHover={{
                scale: 0.98,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() =>
                navigate("/orders")
              }
              className="mt-10 flex h-16 items-center justify-center bg-[#1d1d1d] px-10 text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
            >
              Go To Orders
            </motion.button>

          </div>

        </motion.div>
      )}

    </div>
  );
};

export default OrderProcessing;