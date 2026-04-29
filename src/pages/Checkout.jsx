import { server } from "@/main";
import axios from "axios";
import Cookies from "js-cookie";
import { Trash, Plus, MapPin, Phone } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoaderMG from "../components/LoaderMG";
import { motion, AnimatePresence } from "motion/react";
import { Spinner } from "../components/ui/spinner";

const Checkout = () => {
  const [address, setAddress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locLoading, setLocLoading] = useState(false)

  async function fetchAddress() {
    try {
      const { data } = await axios.get(
        `${server}/api/address/all`,
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      setAddress(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const [modalOpen, setModalOpen] = useState(false);

  const [newAddress, setNewAddress] = useState({
    address: "",
    phone: "",
  });
const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    toast.error("Geolocation is not supported");
    return;
  }

  setLocLoading(true);

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        );

        const data = await response.json();

        setNewAddress((prev) => ({
          ...prev,
          address: data.display_name,
        }));

        toast.success("Location fetched successfully");
      } catch (error) {
        toast.error("Failed to fetch address");
      }

      setLocLoading(false);
    },
    () => {
      toast.error("Permission denied");
      setLocLoading(false);
    }
  );
};
  const handleAddAddress = async () => {
     if (newAddress.phone.length !== 10) {
    toast.error("Phone number must be 10 digits");
    return;
  }

    try {
      const { data } = await axios.post(
        `${server}/api/address/new`,
        {
          address: newAddress.address,
          phone: newAddress.phone,
        },
        {
          headers: {
            token: Cookies.get("token"),
          },
        }
      );

      if (data.message) {
        toast.success(data.message);

        fetchAddress();

        setNewAddress({
          address: "",
          phone: "",
        });

        setModalOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  const deleteHandler = async (id) => {
    if (
      confirm(
        "Are you sure you want to delete this address"
      )
    ) {
      try {
        const { data } = await axios.delete(
          `${server}/api/address/${id}`,
          {
            headers: {
              token: Cookies.get("token"),
            },
          }
        );

        toast.success(data.message);

        fetchAddress();
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea] px-6 py-12 md:px-10">

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-14"
      >

        <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
          Secure Checkout
        </p>

        <h1 className="font-garamond text-6xl text-[#1d1d1d] leading-none">
          Delivery Address
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600 font-manrope">
          Select your preferred shipping address or add a new
          delivery location for your premium order.
        </p>

      </motion.div>

      {/* Loading */}
      {loading ? (
        <LoaderMG />
      ) : (
        <>
          {address && address.length > 0 ? (

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3"
            >

              {address.map((e, index) => (
                <motion.div
                  key={e._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -8 }}
                  className="border border-[#d9c8a8] bg-white p-7 shadow-sm transition-all duration-300"
                >

                  {/* Top */}
                  <div className="mb-6 flex items-start justify-between">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center bg-[#f8f3ea] text-[#BEA163]">

                        <MapPin size={22} />

                      </div>

                      <div>

                        <p className="text-xs uppercase tracking-[4px] text-[#705023]">
                          Shipping Address
                        </p>

                        <h3 className="mt-1 font-garamond text-3xl text-[#1d1d1d]">
                          Address
                        </h3>

                      </div>

                    </div>

                    {/* Delete */}
                    <button
                      onClick={() =>
                        deleteHandler(e._id)
                      }
                      className="flex h-11 w-11 items-center justify-center border border-red-200 bg-red-50 text-red-600 transition-all duration-300 hover:bg-red-500 hover:text-white cursor-pointer"
                    >

                      <Trash size={18} />

                    </button>

                  </div>

                  {/* Address */}
                  <div className="space-y-5">

                    <div>

                      <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
                        Address
                      </p>

                      <p className="text-base leading-8 text-gray-700 font-manrope">
                        {e.address}
                      </p>

                    </div>

                    {/* Phone */}
                    <div>

                      <p className="mb-2 text-xs uppercase tracking-[4px] text-gray-400">
                        Phone Number
                      </p>

                      <div className="flex items-center gap-3 text-[#1d1d1d]">

                        <Phone size={16} />

                        <span className="font-manrope">
                          {e.phone}
                        </span>

                      </div>

                    </div>

                  </div>

                  {/* Button */}
                  <Link
                    to={`/payment/${e._id}`}
                    className="mt-8 block"
                  >

                    <motion.button
                      whileHover={{ scale: 0.98 }}
                      whileTap={{ scale: 0.96 }}
                      className="flex h-14 w-full items-center justify-center bg-[#1d1d1d] text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
                    >
                      Use Address
                    </motion.button>

                  </Link>

                </motion.div>
              ))}

            </motion.div>

          ) : (
            <div className="flex h-[350px] items-center justify-center border border-dashed border-[#BEA163]/20 bg-white">

              <p className="font-garamond text-5xl text-gray-400">
                No Address Found
              </p>

            </div>
          )}
        </>
      )}

      {/* Add Address Button */}
      <motion.button
        whileHover={{ scale: 0.98 }}
        
        whileTap={{ scale: 0.96 }}
        onClick={() => setModalOpen(true)
            }
        className="mt-14 flex h-14 items-center gap-3 bg-[#1d1d1d] px-8 text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
      >

        <Plus size={18} />

        Add New Address

      </motion.button>

      {/* Modal */}
      <AnimatePresence>

        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          >

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl border border-[#d9c8a8] bg-[#f8f3ea] p-8 shadow-2xl"
            >

              {/* Top */}
              <div className="mb-8 flex items-center justify-between">

                <div>

                  <p className="mb-2 text-xs uppercase tracking-[4px] text-[#705023]">
                    Add Address
                  </p>

                  <h2 className="font-garamond text-5xl text-[#1d1d1d]">
                    New Delivery Address
                  </h2>

                </div>

                <button
                  onClick={() => setModalOpen(false)}
                  className="flex h-12 w-12 items-center justify-center border border-[#1d1d1d] text-[#1d1d1d] transition-all duration-300 hover:bg-[#1d1d1d] hover:text-white"
                >
                  ✕
                </button>

              </div>

              {/* Inputs */}
              <div className="space-y-5">
<button
  onClick={getCurrentLocation}
  disabled={locLoading}
  className="mb-4 flex h-12 items-center justify-center gap-3 border border-[#BEA163] bg-[#f8f3ea] px-5 text-sm uppercase tracking-[3px] text-[#1d1d1d] transition-all duration-300 hover:bg-[#BEA163] hover:text-black disabled:opacity-50 cursor-pointer"
>
  {locLoading
    ? "Fetching Location..."
    : "Use Current Location"}
</button>
                <textarea
                  placeholder="Enter Address"
                  value={newAddress.address}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      address: e.target.value,
                    })
                  }
                  className="min-h-[140px] w-full border border-[#d8ccb6] bg-white px-5 py-4 outline-none focus:border-[#BEA163]"
                />

                <input
                  type="tel"
  placeholder="Phone Number"
  value={newAddress.phone}
  maxLength={10}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setNewAddress({
        ...newAddress,
        phone: value,
      });
    }
  }}
                  
                  className="h-14 remove-arrow w-full border border-[#d8ccb6] bg-white px-5 outline-none focus:border-[#BEA163]"
                />

              </div>

              {/* Footer */}
              <div className="mt-8 flex gap-4">

                <button
                  onClick={() => setModalOpen(false)}
                  className="flex h-14 flex-1 items-center justify-center border border-[#1d1d1d] text-sm uppercase tracking-[4px] text-[#1d1d1d] transition-all duration-300 hover:bg-[#1d1d1d] hover:text-white cursor-pointer"
                >
                  Close
                </button>

                <motion.button
                  whileHover={{ scale: 0.98 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAddAddress}
                  className="flex h-14 flex-1 items-center justify-center bg-[#1d1d1d] text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
                >
                  Add Address
                </motion.button>

              </div>

            </motion.div>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
};

export default Checkout;