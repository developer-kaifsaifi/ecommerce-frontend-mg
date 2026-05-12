
import { server } from "@/main.jsx";

import axios from "axios";
import Cookies from "js-cookie";

import  { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import {
  ShoppingBag,
  ArrowRight,
  PackageCheck,
} from "lucide-react";

import { motion } from "motion/react";
import LoaderMG from "../components/LoaderMG.jsx";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `${server}/order/all`,
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        setOrders(data.orders);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <LoaderMG />;
  }

  /* Empty Orders */
  if (orders.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f1ea] px-6 text-center">

        <div className="mb-8 flex h-28 w-28 items-center justify-center bg-[#f8f3ea] text-[#BEA163]">

          <ShoppingBag size={46} />

        </div>

        <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
          No Orders
        </p>

        <h1 className="font-garamond text-6xl text-[#1d1d1d] leading-none">
          Your Orders List Is Empty
        </h1>

        <p className="mt-8 max-w-2xl text-lg leading-9 text-gray-500 font-manrope">
          Explore our premium collection and place your first
          order with Thread & Grace.
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
    );
  }

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
          Order History
        </p>

        <h1 className="font-garamond text-6xl text-[#1d1d1d] leading-none">
          Your Orders
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-500 font-manrope">
          Track and manage all your premium fashion orders from
          Thread & Grace.
        </p>

      </motion.div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">

        {orders.map((order, index) => {
          return (
            <motion.div
              key={order._id}
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
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
              className="border border-[#d9c8a8] bg-white p-7 shadow-sm transition-all duration-300"
            >

              {/* Top */}
              <div className="mb-8 flex items-start justify-between">

                <div>

                  <p className="mb-3 text-xs uppercase tracking-[4px] text-[#705023]">
                    Order ID
                  </p>

                  <h2 className="font-garamond text-3xl leading-tight text-[#1d1d1d]">
                    #{order._id.slice(-8).toUpperCase()}
                  </h2>

                </div>

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center bg-[#f8f3ea] text-[#BEA163]">

                  <PackageCheck size={24} />

                </div>

              </div>

              {/* Details */}
              <div className="space-y-5 border-t border-[#f0e7d8] pt-6">

                {/* Status */}
                <div className="flex items-center justify-between">

                  <p className="text-gray-500">
                    Status
                  </p>

                  <span
                    className={`text-sm uppercase tracking-[3px] ${
                      order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-green-600"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                {/* Items */}
                <div className="flex items-center justify-between">

                  <p className="text-gray-500">
                    Total Items
                  </p>

                  <span className="text-lg text-[#1d1d1d]">
                    {order.items.length}
                  </span>

                </div>

                {/* Total */}
                <div className="flex items-center justify-between">

                  <p className="text-gray-500">
                    Total Amount
                  </p>

                  <h3 className="font-garamond text-4xl text-[#1d1d1d]">
                    ₹ {order.subTotal}
                  </h3>

                </div>

                {/* Date */}
                <div className="flex items-center justify-between">

                  <p className="text-gray-500">
                    Placed At
                  </p>

                  <span className="text-[#1d1d1d]">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </span>

                </div>

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
                  navigate(`/order/${order._id}`)
                }
                className="mt-8 flex h-14 w-full items-center justify-center gap-3 bg-[#1d1d1d] text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
              >

                View Details

                <ArrowRight size={18} />

              </motion.button>

            </motion.div>
          );
        })}

      </div>

    </div>
  );
};

export default Orders;
