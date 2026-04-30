import { UserData } from "../context/UserContext.jsx";
import { server } from "../main.jsx";

import axios from "axios";
import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import { Printer, ShoppingBag, Truck } from "lucide-react";

import { motion } from "motion/react";
import LoaderMG from "../components/LoaderMG.jsx";

const OrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = UserData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${server}/order/${id}`, {
          headers: {
            token: Cookies.get("token"),
          },
        });
        setOrder(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <LoaderMG />;
  }

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f4f1ea] px-6 text-center">
        <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
          Order Not Found
        </p>
        <h1 className="font-garamond text-6xl text-[#1d1d1d]">
          Invalid Order
        </h1>
        <button
          onClick={() => navigate("/products")}
          className="mt-10 bg-[#1d1d1d] px-8 py-4 text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
        >
          Shop Now
        </button>
      </div>
    );
  }

  // ==========================================
  // EXPECTED DELIVERY DATE LOGIC (Order Date + 7 Days)
  // ==========================================
  const expectedDeliveryDate = new Date(order.createdAt);
  expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 7);
  const formattedExpectedDate = expectedDeliveryDate.toLocaleDateString();

  return (
    <>
      {/* ========================================= */}
      {/* 1. WEB VIEW (Hidden during printing)      */}
      {/* ========================================= */}
      <div className="min-h-screen bg-[#f4f1ea] px-6 py-12 md:px-10 print:hidden">
        {user._id === order.user._id || user.role === "admin" ? (
          <>
            {/* Heading */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <div>
                <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
                  Order Details
                </p>
                <h1 className="font-garamond text-6xl text-[#1d1d1d] leading-none">
                  Your Order
                </h1>
              </div>

              {/* Print Button */}
              <button
                onClick={() => window.print()}
                className="flex h-14 items-center gap-3 bg-[#1d1d1d] px-8 text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
              >
                <Printer size={18} />
                Print Order
              </button>
            </motion.div>

            {/* Top */}
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="border border-[#d9c8a8] bg-white p-8 shadow-sm"
              >
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center bg-[#f8f3ea] text-[#BEA163]">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[4px] text-[#705023]">
                      Order Summary
                    </p>
                    <h2 className="mt-1 font-garamond text-4xl text-[#1d1d1d]">
                      Details
                    </h2>
                  </div>
                </div>

                <div className="space-y-5 text-gray-700 font-manrope">
                  <div className="flex justify-between border-b border-[#f0e7d8] pb-4">
                    <span>Order ID</span>
                    <span className="text-right">{order._id}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#f0e7d8] pb-4">
                    <span>Status</span>
                    <span
                      className={`uppercase tracking-[2px] ${
                        order.status === "Pending"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#f0e7d8] pb-4">
                    <span>Total Items</span>
                    <span>{order.items.length}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#f0e7d8] pb-4">
                    <span>Payment Method</span>
                    <span className="uppercase">{order.method}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#f0e7d8] pb-4">
                    <span>Subtotal</span>
                    <span className="font-garamond text-3xl text-[#1d1d1d]">
                      ₹ {order.subTotal}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[#f0e7d8] pb-4">
                    <span>Placed At</span>
                    <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  
                  {/* Web UI: Expected Delivery Date Add Kiya Hai */}
                  <div className="flex justify-between border-b border-[#f0e7d8] pb-4">
                    <span className="font-semibold text-[#1d1d1d]">Expected Delivery</span>
                    <span className="font-bold text-[#705023]">
                      {formattedExpectedDate}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Paid At</span>
                    <span>
                      {order.paidAt
                        ? new Date(order.paidAt).toLocaleDateString()
                        : "Payment Through COD"}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Shipping */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="border border-[#d9c8a8] bg-white p-8 shadow-sm"
              >
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center bg-[#f8f3ea] text-[#BEA163]">
                    <Truck size={24} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[4px] text-[#705023]">
                      Shipping
                    </p>
                    <h2 className="mt-1 font-garamond text-4xl text-[#1d1d1d]">
                      Delivery Details
                    </h2>
                  </div>
                </div>

                <div className="space-y-6 text-gray-700 font-manrope">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
                      Phone Number
                    </p>
                    <p className="text-lg">{order.phone}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
                      Address
                    </p>
                    <p className="leading-8">{order.address}</p>
                  </div>
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
                      User Email
                    </p>
                    <p>{order.user?.email}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Products */}
            <div className="mt-20">
              <div className="mb-14 text-center">
                <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
                  Purchased Products
                </p>
                <h2 className="font-garamond text-6xl text-[#1d1d1d]">
                  Order Items
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-4">
                {order.items.map((e, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="border border-[#d9c8a8] bg-white p-4 shadow-sm transition-all duration-300"
                  >
                    <Link to={`/product/${e.product._id}`}>
                      <div className="overflow-hidden bg-[#f8f3ea] p-4">
                        <img
                          src={e.product.images[0]?.url}
                          alt={e.product.title}
                          className="h-[320px] w-full object-cover transition-all duration-500 hover:scale-105"
                        />
                      </div>
                    </Link>
                    <div className="pt-5">
                      <p className="mb-2 text-xs uppercase tracking-[4px] text-[#705023]">
                        Mansoori Garment
                      </p>
                      <h3 className="font-garamond text-3xl text-[#1d1d1d]">
                        {e.product.title}
                      </h3>
                      <div className="mt-5 flex items-center justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-[4px] text-gray-400">
                            Quantity
                          </p>
                          <p className="mt-1 text-lg">{e.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs uppercase tracking-[4px] text-gray-400">
                            Price
                          </p>
                          <h4 className="mt-1 font-garamond text-4xl text-[#1d1d1d]">
                            ₹ {e.product.price}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
            <p className="mb-4 text-xs uppercase tracking-[5px] text-red-500">
              Access Denied
            </p>
            <h1 className="font-garamond text-6xl text-[#1d1d1d]">
              This Is Not Your Order
            </h1>
            <Link
              to={"/"}
              className="mt-10 bg-[#1d1d1d] px-8 py-4 text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
            >
              Go To Home Page
            </Link>
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* 2. PRINT INVOICE (Visible ONLY on paper)  */}
      {/* ========================================= */}
      <div className="hidden print:block w-full bg-white text-black p-8 font-manrope">
        {/* Header */}
        <div className="flex justify-between items-end border-b-2 border-gray-800 pb-6 mb-8">
          <div>
            <h1 className="text-4xl font-garamond font-bold uppercase tracking-widest text-black">
              Mansoori Garment
            </h1>
            <p className="text-sm uppercase tracking-widest text-gray-600 mt-1">
              Premium Fashion
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-3xl font-bold text-black mb-2">INVOICE</h2>
            <p className="text-sm font-semibold">Order ID: <span className="font-normal">{order._id}</span></p>
            <p className="text-sm font-semibold">Order Date: <span className="font-normal">{new Date(order.createdAt).toLocaleDateString()}</span></p>
            
            {/* Print UI: Expected Delivery Date Add Kiya Hai */}
            <p className="text-sm font-bold mt-1">Expected Delivery: <span className="font-bold text-gray-800">{formattedExpectedDate}</span></p>
          </div>
        </div>

        {/* Customer & Order Details */}
        <div className="flex justify-between mb-10">
          <div className="w-1/2">
            <h3 className="font-bold text-lg text-black border-b border-gray-300 pb-2 mb-3">Billed To</h3>
            <p className="text-sm mb-1"><span className="font-semibold">Email:</span> {order.user?.email}</p>
            <p className="text-sm mb-1"><span className="font-semibold">Phone:</span> {order.phone}</p>
            <p className="text-sm"><span className="font-semibold">Address:</span> {order.address}</p>
          </div>
          <div className="w-1/3 text-right">
            <h3 className="font-bold text-lg text-black border-b border-gray-300 pb-2 mb-3">Payment Info</h3>
            <p className="text-sm mb-1"><span className="font-semibold">Method:</span> <span className="uppercase">{order.method}</span></p>
            <p className="text-sm mb-1"><span className="font-semibold">Status:</span> {order.status}</p>
            <p className="text-sm"><span className="font-semibold">Paid At:</span> {order.paidAt ? new Date(order.paidAt).toLocaleDateString() : "COD"}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-left border-collapse mb-8">
          <thead>
            <tr className="bg-gray-100 border-y-2 border-gray-800">
              <th className="py-3 px-2 font-bold text-black">Item Name</th>
              <th className="py-3 px-2 font-bold text-center text-black">Quantity</th>
              <th className="py-3 px-2 font-bold text-right text-black">Unit Price</th>
              <th className="py-3 px-2 font-bold text-right text-black">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((e, i) => (
              <tr key={i} className="border-b border-gray-300">
                <td className="py-4 px-2 font-garamond text-xl">{e.product.title}</td>
                <td className="py-4 px-2 text-center">{e.quantity}</td>
                <td className="py-4 px-2 text-right">₹ {e.product.price}</td>
                <td className="py-4 px-2 text-right font-semibold">₹ {e.product.price * e.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Calculation */}
        <div className="flex justify-end mt-8">
          <div className="w-1/3">
            <div className="flex justify-between border-t-2 border-gray-800 pt-4">
              <span className="font-bold text-xl text-black">Grand Total:</span>
              <span className="font-garamond text-2xl font-bold text-black">₹ {order.subTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPage;
