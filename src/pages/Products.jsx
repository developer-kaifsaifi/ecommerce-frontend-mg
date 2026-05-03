import React, {
  useState,
  lazy,
  Suspense,
} from "react";

import { ProductData } from "../context/ProductContext.jsx";

import {
  Filter,
  X,
  ChevronLeftCircle,
  ChevronRightCircle,
} from "lucide-react";

import LoaderMG from "../components/LoaderMG.jsx";

import {
  motion,
  AnimatePresence,
} from "motion/react";

// Lazy Loaded Component
const ProductCard = lazy(() =>
  import("../components/ProductCard.jsx")
);

export default function Products() {
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

  const [show, setShow] =
    useState(false);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const clearFilter = () => {
    setSearch("");
    setCategory("");
    setPrice("");
    setPage(1);
  };

  return (
    <div
      className="min-h-screen flex overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #f8f4ec 0%, #f1ece3 40%, #ebe4d8 100%)",
      }}
    >

      {/* Sidebar */}
      <AnimatePresence>

        {(show ||
          window.innerWidth >= 768) && (
          <motion.div
            initial={{
              x: -60,
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            exit={{
              x: -60,
              opacity: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className={`fixed inset-y-0 left-0 z-50 w-[290px] border-r border-[#BEA163]/10 bg-[#181818]/95 backdrop-blur-md md:relative md:translate-x-0 ${
              show
                ? "translate-x-0"
                : "-translate-x-full"
            }`}
          >

            <div className="relative h-full overflow-y-auto px-7 py-10">

              {/* Close */}
              <button
                onClick={() =>
                  setShow(false)
                }
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#BEA163]/10 text-[#BEA163] md:hidden"
              >
                <X size={18} />
              </button>

              {/* Heading */}
              <div className="mb-12">

                <p className="mb-4 text-xs uppercase tracking-[5px] text-[#BEA163]">
                  Filters
                </p>

                <h1 className="font-garamond text-5xl leading-none text-white">
                  Refined <br />
                  Collection
                </h1>

              </div>

              {/* Search */}
              <div className="mb-7">

                <label className="mb-3 block text-xs uppercase tracking-[4px] text-[#BEA163]">
                  Search
                </label>

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  type="text"
                  placeholder="Search Products..."
                  className="h-14 w-full rounded-2xl border border-[#BEA163]/10 bg-[#232323] px-5 text-white outline-none placeholder:text-gray-500 focus:border-[#BEA163]"
                />

              </div>

              {/* Category */}
              <div className="mb-7">

                <label className="mb-3 block text-xs uppercase tracking-[4px] text-[#BEA163]">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="h-14 w-full rounded-2xl border border-[#BEA163]/10 bg-[#232323] px-5 text-white outline-none focus:border-[#BEA163]"
                >

                  <option value="">
                    All Categories
                  </option>

                  {categories.map(
                    (e) => (
                      <option
                        value={e}
                        key={e}
                      >
                        {e}
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* Price */}
              <div className="mb-10">

                <label className="mb-3 block text-xs uppercase tracking-[4px] text-[#BEA163]">
                  Sort Price
                </label>

                <select
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      e.target.value
                    )
                  }
                  className="h-14 w-full rounded-2xl border border-[#BEA163]/10 bg-[#232323] px-5 text-white outline-none focus:border-[#BEA163]"
                >

                  <option value="">
                    Select
                  </option>

                  <option value="lowToHigh">
                    Low to High
                  </option>

                  <option value="highToLow">
                    High to Low
                  </option>

                </select>

              </div>

              {/* Clear */}
              <button
                onClick={clearFilter}
                className="h-14 w-full rounded-2xl bg-[#BEA163] font-semibold tracking-wide text-black transition-all hover:scale-[0.98]"
              >
                Clear Filters
              </button>

            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* Products */}
      <div className="relative flex-1 overflow-hidden px-6 py-12 md:px-10">

        {/* Glow */}
        <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-[#BEA163]/10 blur-[100px]" />

        {/* Mobile Filter */}
        <button
          onClick={() => setShow(true)}
          className="relative z-10 mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#181818] text-white md:hidden"
        >
          <Filter size={20} />
        </button>

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
          className="relative z-10 mb-16"
        >

          <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
            Premium Fashion
          </p>

          <h1 className="font-garamond text-6xl leading-none text-[#181818] md:text-7xl">
            Explore Products
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600 font-manrope">
            Premium shirts, t-shirts,
            blazers and timeless essentials
            crafted for elegance and
            comfort.
          </p>

        </motion.div>

        {/* Products */}
        {loading ? (
          <LoaderMG />
        ) : (
          <>
            {products &&
            products.length > 0 ? (

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="relative z-10 grid grid-cols-1 place-items-center gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3"
              >

                {products.map((e) => {
                  return (
                    <motion.div
                      key={e._id}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 40,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                        },
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      whileHover={{
                        y: -8,
                      }}
                    >

                      <Suspense
                        fallback={
                          <LoaderMG />
                        }
                      >
                        <ProductCard
                          product={e}
                          latest={"no"}
                        />
                      </Suspense>

                    </motion.div>
                  );
                })}

              </motion.div>

            ) : (

              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                className="flex h-[350px] items-center justify-center rounded-[40px] border border-dashed border-[#BEA163]/20 bg-white"
              >

                <p className="font-garamond text-5xl text-gray-400">
                  No Products Found
                </p>

              </motion.div>

            )}
          </>
        )}

        {/* Pagination */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="relative z-10 mt-20 flex items-center justify-center gap-5"
        >

          {page !== 1 && (
            <button
              onClick={prevPage}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#BEA163]/15 bg-white text-[#181818] shadow-sm transition-all hover:bg-[#BEA163]"
            >
              <ChevronLeftCircle />
            </button>
          )}

          <div className="rounded-full border border-[#BEA163]/15 bg-white px-8 py-4 text-sm uppercase tracking-[4px] text-[#705023] shadow-sm">
            Page {page}
          </div>

          {page !== totalPages && (
            <button
              onClick={nextPage}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#BEA163]/15 bg-white text-[#181818] shadow-sm transition-all hover:bg-[#BEA163]"
            >
              <ChevronRightCircle />
            </button>
          )}

        </motion.div>

      </div>

    </div>
  );
}

