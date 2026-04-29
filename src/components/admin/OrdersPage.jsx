import { server } from "./../../main.jsx"
import axios from "axios";
import Cookies from "js-cookie";
import  { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import LoaderMG from "../LoaderMG.jsx";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${server}/api/order/admin/all`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/order/${orderId}`,
        { status },
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      toast.success(data.message);

      fetchOrders();

      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);

      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.user.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      order._id
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f1ea] px-6 md:px-10 py-12">

      {/* Heading */}
      <div className="mb-14">

        <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
          Admin Dashboard
        </p>

        <h1 className="font-garamond text-6xl text-[#1d1d1d] leading-none">
          Manage Orders
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600 font-manrope">
          View, track and update customer orders with premium
          management experience.
        </p>

      </div>

      {/* Search */}
      <div className="mb-10">

        <input
          placeholder="Search by Email or Order ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-14 w-full max-w-xl border border-[#d9c8a8] bg-white px-5 outline-none placeholder:text-gray-400 focus:border-[#BEA163]"
        />

      </div>

      {/* Content */}
      {loading ? (
        <LoaderMG />
      ) : filteredOrders.length > 0 ? (

        <div className="overflow-x-auto border border-[#d9c8a8] bg-white shadow-sm">

          <table className="w-full min-w-[1100px] border-collapse">

            {/* Head */}
            <thead className="bg-[#f8f3ea]">

              <tr>

                <th className="border-b border-[#e7dcc6] px-6 py-5 text-left text-xs uppercase tracking-[4px] text-[#705023]">
                  Order ID
                </th>

                <th className="border-b border-[#e7dcc6] px-6 py-5 text-left text-xs uppercase tracking-[4px] text-[#705023]">
                  User Email
                </th>

                <th className="border-b border-[#e7dcc6] px-6 py-5 text-left text-xs uppercase tracking-[4px] text-[#705023]">
                  Total
                </th>

                <th className="border-b border-[#e7dcc6] px-6 py-5 text-left text-xs uppercase tracking-[4px] text-[#705023]">
                  Status
                </th>

                <th className="border-b border-[#e7dcc6] px-6 py-5 text-left text-xs uppercase tracking-[4px] text-[#705023]">
                  Date
                </th>

                <th className="border-b border-[#e7dcc6] px-6 py-5 text-left text-xs uppercase tracking-[4px] text-[#705023]">
                  Action
                </th>

              </tr>

            </thead>

            {/* Body */}
            <tbody>

              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="transition-all duration-300 hover:bg-[#faf7f2]"
                >

                  {/* ID */}
                  <td className="border-b border-[#f0e7d8] px-6 py-6 text-sm text-[#1d1d1d]">

                    <Link
                      to={`/order/${order._id}`}
                      className="transition-all hover:text-[#BEA163]"
                    >
                      {order._id.slice(0, 18)}...
                    </Link>

                  </td>

                  {/* Email */}
                  <td className="border-b border-[#f0e7d8] px-6 py-6 text-sm text-gray-600">
                    {order.user.email}
                  </td>

                  {/* Total */}
                  <td className="border-b border-[#f0e7d8] px-6 py-6">

                    <span className="font-garamond text-3xl text-[#1d1d1d]">
                      ₹ {order.subTotal}
                    </span>

                  </td>

                  {/* Status */}
                  <td className="border-b border-[#f0e7d8] px-6 py-6">

                    <span
                      className={`px-4 py-2 text-xs uppercase tracking-[3px] ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                  {/* Date */}
                  <td className="border-b border-[#f0e7d8] px-6 py-6 text-sm text-gray-500">
                    {moment(order.createdAt).format("DD MMM YYYY")}
                  </td>

                  {/* Action */}
                  <td className="border-b border-[#f0e7d8] px-6 py-6">

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="h-12 border border-[#d9c8a8] bg-[#f8f3ea] px-4 text-sm outline-none focus:border-[#BEA163]"
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                    </select>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      ) : (
        <div className="flex h-[350px] items-center justify-center border border-dashed border-[#BEA163]/20 bg-white">

          <p className="font-garamond text-5xl text-gray-400">
            No Orders Found
          </p>

        </div>
      )}

    </div>
  );
};

export default OrdersPage;