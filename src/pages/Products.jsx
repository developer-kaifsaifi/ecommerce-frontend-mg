import React, { useState, lazy, Suspense } from "react";
import { ProductData } from "../context/ProductContext.jsx";
import {
  Filter,
  X,
  ChevronLeftCircle,
  ChevronRightCircle,
  Plus,
} from "lucide-react";
import LoaderMG from "../components/LoaderMG.jsx";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext.jsx";

// Lazy
const ProductCard = lazy(() =>
  import("../components/ProductCard.jsx")
);

export default function Products() {
  const navigate = useNavigate();
  const { user } = UserData();

  const {
    loading,
    products,
    search,
    setSearch,
    categories,
    category,
    setCategory,
    totalPages,
    price,
    setPrice,
    page,
    setPage,
  } = ProductData();

  const [show, setShow] = useState(false);

  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  const clearFilter = () => {
    setSearch("");
    setCategory("");
    setPrice("");
    setPage(1);
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-[#f4f1ea]">

      {/* SIDEBAR */}
      <AnimatePresence>
        {(show || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-y-0 left-0 z-50 w-[270px] bg-[#1d1d1d] text-white md:relative ${
              show ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="p-6 relative">

              <button
                onClick={() => setShow(false)}
                className="absolute top-4 right-4 md:hidden"
              >
                <X />
              </button>

              <h2 className="text-xl mb-6 font-semibold text-[#BEA163]">
                Filters
              </h2>

              {/* Search */}
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full mb-4 p-3 bg-[#232323] rounded"
              />

              {/* Category */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mb-4 p-3 bg-[#232323] rounded"
              >
                <option value="">All</option>
                {categories.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </select>

              {/* Price */}
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full mb-4 p-3 bg-[#232323] rounded"
              >
                <option value="">Sort</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>

              <button
                onClick={clearFilter}
                className="w-full bg-[#BEA163] text-black py-2 rounded"
              >
                Clear
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">

          <button
            onClick={() => setShow(true)}
            className="md:hidden bg-black text-white p-3 rounded"
          >
            <Filter />
          </button>

          {/* ADMIN BUTTON */}
          {user?.role === "admin" && (
            <button
              onClick={() => navigate("/admin/add-product")}
              className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-[#BEA163] hover:text-black transition"
            >
              <Plus size={18} />
              Add Product
            </button>
          )}
        </div>

        {/* HEADING */}
        <h1 className="text-5xl font-garamond mb-10">
          Explore Products
        </h1>

        {/* PRODUCTS */}
        {loading ? (
          <LoaderMG />
        ) : products?.length > 0 ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((e) => (
              <Suspense fallback={<LoaderMG />} key={e._id}>
                <ProductCard product={e} latest="no" />
              </Suspense>
            ))}
          </div>

        ) : (
          <p className="text-center text-gray-500">
            No Products Found
          </p>
        )}

        {/* PAGINATION */}
        <div className="flex justify-center mt-10 gap-4">

          {page !== 1 && (
            <button onClick={prevPage}>
              <ChevronLeftCircle />
            </button>
          )}

          <span>Page {page}</span>

          {page !== totalPages && (
            <button onClick={nextPage}>
              <ChevronRightCircle />
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

