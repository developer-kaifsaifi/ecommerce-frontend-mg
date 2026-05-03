import { ProductData } from "@/context/ProductContext.jsx";
import  { useState } from "react";

import ProductCard from "../ProductCard.jsx";

import { categories, server } from "@/main.jsx";

import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import LoaderMG from "../LoaderMG.jsx";

const HomePage = () => {
  const { products, page, setPage, fetchProducts, loading, totalPages } =
    ProductData();

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };

  const [open, setOpen] = useState(false);

  const [formData, setFromData] = useState({
    title: "",
    about: "",
    category: "",
    price: "",
    stock: "",
    images: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFromData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFromData((prev) => ({ ...prev, images: e.target.files }));
  };

  const submitHanlder = async (e) => {
    e.preventDefault();

    if (!formData.images || formData.images.length === 0) {
      toast.error("Please select images");
      return;
    }

    const myFrom = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "images") {
        for (let i = 0; i < value.length; i++) {
          myFrom.append("files", value[i]);
        }
      } else {
        myFrom.append(key, value);
      }
    });

    try {
      const { data } = await axios.post(`${server}/product/new`, myFrom, {
        headers: {
          "Content-Type": "multipart/form-data",
          token: Cookies.get("token"),
        },
      });

      toast.success(data.message);
      setOpen(false);
      setFromData({
        title: "",
        about: "",
        categroy: "",
        price: "",
        stock: "",
        images: null,
      });
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
  <div className="min-h-screen bg-[#f4f1ea] px-6 md:px-10 py-12">

    {/* Top */}
    <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

      <div>

        <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
          Admin Panel
        </p>

        <h1 className="font-garamond text-6xl text-[#1d1d1d] leading-none">
          All Products
        </h1>

      </div>

      {/* Add Button */}
      <button
        onClick={() => setOpen(true)}
        className="h-14 border border-[#1d1d1d] bg-[#1d1d1d] px-8 text-sm uppercase tracking-[3px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
      >
        Add Product
      </button>

    </div>

    {/* Modal */}
    {open && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

        <div className="w-full max-w-2xl bg-[#f8f3ea] border border-[#d9c8a8] p-8 shadow-2xl">

          {/* Top */}
          <div className="mb-8 flex items-center justify-between">

            <div>

              <p className="mb-2 text-xs uppercase tracking-[4px] text-[#705023]">
                Create Product
              </p>

              <h2 className="font-garamond text-5xl text-[#1d1d1d] leading-none">
                Add New Product
              </h2>

            </div>

            <button
              onClick={() => setOpen(false)}
              className="flex h-12 w-12 items-center justify-center border border-[#1d1d1d] text-[#1d1d1d] transition-all duration-300 hover:bg-[#1d1d1d] hover:text-white"
            >
              ✕
            </button>

          </div>

          {/* Form */}
          <form onSubmit={submitHanlder} className="space-y-5">

            <input
              name="title"
              placeholder="Product Title"
              value={formData.title}
              onChange={handleChange}
              required
              className="h-14 w-full border border-[#d8ccb6] bg-white px-5 outline-none focus:border-[#BEA163]"
            />

            <textarea
              name="about"
              placeholder="About Product"
              value={formData.about}
              onChange={handleChange}
              required
              className="min-h-[130px] w-full border border-[#d8ccb6] bg-white px-5 py-4 outline-none focus:border-[#BEA163]"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="h-14 w-full border border-[#d8ccb6] bg-white px-5 outline-none focus:border-[#BEA163]"
            >

              <option value="">
                Select Category
              </option>

              {categories.map((e) => {
                return (
                  <option value={e} key={e}>
                    {e}
                  </option>
                );
              })}

            </select>

            <div className="grid grid-cols-2 gap-5">

              <input
                name="price"
                placeholder="Product Price"
                value={formData.price}
                onChange={handleChange}
                required
                className="h-14 w-full border border-[#d8ccb6] bg-white px-5 outline-none focus:border-[#BEA163]"
              />

              <input
                name="stock"
                placeholder="Product Stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="h-14 w-full border border-[#d8ccb6] bg-white px-5 outline-none focus:border-[#BEA163]"
              />

            </div>

            {/* File */}
            <div className="border border-dashed border-[#BEA163]/40 bg-white p-6">

              <p className="mb-4 text-xs uppercase tracking-[4px] text-[#705023]">
                Upload Images
              </p>

              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                required
                className="w-full text-sm text-gray-600"
              />

            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-14 w-full bg-[#1d1d1d] text-sm uppercase tracking-[4px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer"
            >
              Create Product
            </button>

          </form>

        </div>

      </div>
    )}

    {/* Products */}
    {loading ? (
      <LoaderMG />
    ) : (
      <>
        {products && products.length > 0 ? (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">

            {products.map((e) => {
              return (
                <ProductCard
                  product={e}
                  key={e._id}
                  latest={"no"}
                />
              );
            })}

          </div>

        ) : (
          <div className="flex h-[350px] items-center justify-center border border-dashed border-[#BEA163]/20 bg-white">

            <p className="font-garamond text-5xl text-gray-400">
              No Products Yet
            </p>

          </div>
        )}
      </>
    )}

    {/* Pagination */}
    <div className="mt-20 flex items-center justify-center gap-5">

      {page !== 1 && (
        <button
          onClick={prevPage}
          className="flex h-14 w-14 items-center justify-center border border-[#d9c8a8] bg-white text-[#1d1d1d] transition-all duration-300 hover:bg-[#BEA163]"
        >
          ←
        </button>
      )}

      <div className="border border-[#d9c8a8] bg-white px-8 py-4 text-sm uppercase tracking-[4px] text-[#705023]">
        Page {page}
      </div>

      {page !== totalPages && (
        <button
          onClick={nextPage}
          className="flex h-14 w-14 items-center justify-center border border-[#d9c8a8] bg-white text-[#1d1d1d] transition-all duration-300 hover:bg-[#BEA163]"
        >
          →
        </button>
      )}

    </div>

  </div>
);
};

export default HomePage;