import React, { useState } from "react";
import { ProductData } from "../context/ProductContext.jsx";
import {
  Filter,
  X,
  ChevronLeftCircle,
  ChevronRightCircle,
} from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import LoaderMG from "../components/LoaderMG.jsx";
import { motion, AnimatePresence } from "framer-motion";

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

  const [show, setShow] = useState(false);

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
        {(show || window.innerWidth >= 768) && (
          <motion.div
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`fixed inset-y-0 left-0 z-50 w-[290px] bg-[#181818]/95 backdrop-blur-xl border-r border-[#BEA163]/10 md:relative md:translate-x-0 ${
              show ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="h-full overflow-y-auto px-7 py-10 relative">
              {/* Close */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ rotate: 90 }}
                onClick={() => setShow(false)}
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#BEA163]/10 text-[#BEA163] md:hidden"
              >
                <X size={18} />
              </motion.button>

              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="mb-12"
              >
                <p className="text-xs uppercase tracking-[5px] text-[#BEA163] mb-4">
                  Filters
                </p>

                <h1 className="font-garamond text-5xl text-white leading-none">
                  Refined <br /> Collection
                </h1>
              </motion.div>

              {/* Search */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-7"
              >
                <label className="block mb-3 text-xs uppercase tracking-[4px] text-[#BEA163]">
                  Search
                </label>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  placeholder="Search Products..."
                  className="h-14 w-full rounded-2xl border border-[#BEA163]/10 bg-[#232323] px-5 text-white outline-none placeholder:text-gray-500 focus:border-[#BEA163] transition-all duration-300"
                />
              </motion.div>

              {/* Category */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-7"
              >
                <label className="block mb-3 text-xs uppercase tracking-[4px] text-[#BEA163]">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-[#BEA163]/10 bg-[#232323] px-5 text-white outline-none focus:border-[#BEA163]"
                >
                  <option value="">All Categories</option>

                  {categories.map((e) => (
                    <option value={e} key={e}>
                      {e}
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-10"
              >
                <label className="block mb-3 text-xs uppercase tracking-[4px] text-[#BEA163]">
                  Sort Price
                </label>

                <select
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-[#BEA163]/10 bg-[#232323] px-5 text-white outline-none focus:border-[#BEA163]"
                >
                  <option value="">Select</option>

                  <option value="lowToHigh">Low to High</option>

                  <option value="highToLow">High to Low</option>
                </select>
              </motion.div>

              {/* Button */}
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 20px 40px rgba(190,161,99,0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                onClick={clearFilter}
                className="h-14 w-full rounded-2xl bg-[#BEA163] text-black font-semibold tracking-wide cursor-pointer"
              >
                Clear Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products */}
      <div className="flex-1 px-6 md:px-10 py-12 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#BEA163]/10 blur-[140px]" />

        {/* Mobile Filter */}
        <motion.button
          whileHover={{
            scale: 1.08,
            rotate: 8,
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShow(true)}
          className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#181818] text-white md:hidden relative z-10"
        >
          <Filter size={20} />
        </motion.button>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-16 relative z-10"
        >
          <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
            Premium Fashion
          </p>

          <h1 className="font-garamond text-6xl md:text-7xl text-[#181818] leading-none">
            Explore Products
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600 font-manrope">
            Premium shirts, t-shirts, blazers and timeless essentials
            crafted for elegance and comfort.
          </p>
        </motion.div>

        {/* Products */}
        {loading ? (
          <LoaderMG />
        ) : (
          <>
            {products && products.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                    },
                  },
                }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-8 gap-y-14 place-items-center relative z-10"
              >
                {products.map((e) => {
                  return (
                    <motion.div
                      key={e._id}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 80,
                          scale: 0.92,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        },
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{
                        y: -12,
                      }}
                    >
                      <ProductCard product={e} latest={"no"} />
                    </motion.div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex items-center justify-center gap-5 relative z-10"
        >
          {page !== 1 && (
            <motion.button
              whileHover={{
                scale: 1.08,
                backgroundColor: "#BEA163",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={prevPage}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#BEA163]/15 bg-white text-[#181818] shadow-sm"
            >
              <ChevronLeftCircle />
            </motion.button>
          )}

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-full border border-[#BEA163]/15 bg-white px-8 py-4 text-sm uppercase tracking-[4px] text-[#705023] shadow-sm"
          >
            Page {page}
          </motion.div>

          {page !== totalPages && (
            <motion.button
              whileHover={{
                scale: 1.08,
                backgroundColor: "#BEA163",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPage}
              className="flex h-14 w-14 items-center justify-center rounded-full border border-[#BEA163]/15 bg-white text-[#181818] shadow-sm"
            >
              <ChevronRightCircle />
            </motion.button>
          )}
        </motion.div>
      </div>
    </div>
  );
}

































// import React, { useState } from "react";
// import { ProductData } from "../context/ProductContext.jsx";
// import { Filter, X,  ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
// import ProductCard from "../components/ProductCard.jsx";
// import LoaderMG from "../components/LoaderMG.jsx";

// export default function Products() {
//   const {
//     loading,
//     products,
//     search,
//     setSearch,
//     categories,
//     category,
//     setCategory,
//     totalPages,
//     price,
//     setPrice,
//     page,
//     setPage,
//   } = ProductData();

//   const [show, setShow] = useState(false);

//   const nextPage = () => {
//     setPage(page + 1);
//   };

//   const prevPage = () => {
//     setPage(page - 1);
//   };

//   const clearFilter = () => {
//     setSearch("");
//     setCategory("");
//     setPrice("");
//     setPage(1);
//   };

//   return (
//    <div className="min-h-screen bg-[#f6f1e8] flex">

//   {/* Sidebar */}
//   <div
//     className={`fixed inset-y-0 left-0 z-50 w-[290px] bg-[#181818] border-r border-[#BEA163]/10 transition-all duration-300 md:relative md:translate-x-0 ${
//       show ? "translate-x-0" : "-translate-x-full"
//     }`}
//   >

//     <div className="h-full overflow-y-auto px-7 py-10 relative">

//       {/* Close */}
//       <button
//         onClick={() => setShow(false)}
//         className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#BEA163]/10 text-[#BEA163] md:hidden"
//       >
//         <X size={18} />
//       </button>

//       {/* Heading */}
//       <div className="mb-12">

//         <p className="text-xs uppercase tracking-[5px] text-[#BEA163] mb-4">
//           Filters
//         </p>

//         <h1 className="font-garamond text-5xl text-white leading-none">
//           Refined <br /> Collection
//         </h1>

//       </div>

//       {/* Search */}
//       <div className="mb-7">

//         <label className="block mb-3 text-xs uppercase tracking-[4px] text-[#BEA163]">
//           Search
//         </label>

//         <input
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           type="text"
//           placeholder="Search Products..."
//           className="h-14 w-full rounded-2xl border border-[#BEA163]/10 bg-[#232323] px-5 text-white outline-none placeholder:text-gray-500 focus:border-[#BEA163]"
//         />

//       </div>

//       {/* Category */}
//       <div className="mb-7">

//         <label className="block mb-3 text-xs uppercase tracking-[4px] text-[#BEA163]">
//           Category
//         </label>

//         <select
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="h-14 w-full rounded-2xl border border-[#BEA163]/10 bg-[#232323] px-5 text-white outline-none focus:border-[#BEA163]"
//         >

//           <option value="">All Categories</option>

//           {categories.map((e) => (
//             <option value={e} key={e}>
//               {e}
//             </option>
//           ))}

//         </select>

//       </div>

//       {/* Price */}
//       <div className="mb-10">

//         <label className="block mb-3 text-xs uppercase tracking-[4px] text-[#BEA163]">
//           Sort Price
//         </label>

//         <select
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="h-14 w-full rounded-2xl border border-[#BEA163]/10 bg-[#232323] px-5 text-white outline-none focus:border-[#BEA163]"
//         >

//           <option value="">Select</option>

//           <option value="lowToHigh">
//             Low to High
//           </option>

//           <option value="highToLow">
//             High to Low
//           </option>

//         </select>

//       </div>

//       {/* Button */}
//       <button
//         onClick={clearFilter}
//         className="h-14 w-full rounded-2xl bg-[#BEA163] text-black font-semibold tracking-wide transition-all duration-300 hover:scale-[0.98] cursor-pointer"
//       >
//         Clear Filters
//       </button>

//     </div>

//   </div>

//   {/* Products */}
//   <div className="flex-1 px-6 md:px-10 py-12">

//     {/* Mobile Filter */}
//     <button
//       onClick={() => setShow(true)}
//       className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#181818] text-white md:hidden"
//     >
//       <Filter size={20} />
//     </button>

//     {/* Heading */}
//     <div className="mb-16">

//       <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
//         Premium Fashion
//       </p>

//       <h1 className="font-garamond text-6xl md:text-7xl text-[#181818] leading-none">
//         Explore Products
//       </h1>

//       <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600 font-manrope">
//         Premium shirts, t-shirts, blazers and timeless essentials
//         crafted for elegance and comfort.
//       </p>

//     </div>

//     {/* Grid */}
//     {loading ? (
//       <LoaderMG />
//     ) : (
//       <>
//         {products && products.length > 0 ? (

//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-8 gap-y-14 place-items-center">

//             {products.map((e) => {
//               return (
//                 <ProductCard
//                   key={e._id}
//                   product={e}
//                   latest={"no"}
//                 />
//               );
//             })}

//           </div>

//         ) : (
//           <div className="flex h-[350px] items-center justify-center rounded-[40px] border border-dashed border-[#BEA163]/20 bg-white">

//             <p className="font-garamond text-5xl text-gray-400">
//               No Products Found
//             </p>

//           </div>
//         )}
//       </>
//     )}

//     {/* Pagination */}
//     <div className="mt-20 flex items-center justify-center gap-5">

//       {page !== 1 && (
//         <button
//           onClick={prevPage}
//           className="flex h-14 w-14 items-center justify-center rounded-full border border-[#BEA163]/15 bg-white text-[#181818] shadow-sm transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
//         >
//           <ChevronLeftCircle />
//         </button>
//       )}

//       <div className="rounded-full border border-[#BEA163]/15 bg-white px-8 py-4 text-sm uppercase tracking-[4px] text-[#705023] shadow-sm">
//         Page {page}
//       </div>

//       {page !== totalPages && (
//         <button
//           onClick={nextPage}
//           className="flex h-14 w-14 items-center justify-center rounded-full border border-[#BEA163]/15 bg-white text-[#181818] shadow-sm transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
//         >
//           <ChevronRightCircle />
//         </button>
//       )}

//     </div>

//   </div>

// </div>
//   );
// }



