import React, { useState } from "react";
import { ProductData } from "../context/ProductContext.jsx";
import { Filter, X,  ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";
import LoaderMG from "../components/LoaderMG.jsx";

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
   <div className="min-h-screen bg-[#f6f1e8] flex">

  {/* Sidebar */}
  <div
    className={`fixed inset-y-0 left-0 z-50 w-[290px] bg-[#181818] border-r border-[#BEA163]/10 transition-all duration-300 md:relative md:translate-x-0 ${
      show ? "translate-x-0" : "-translate-x-full"
    }`}
  >

    <div className="h-full overflow-y-auto px-7 py-10 relative">

      {/* Close */}
      <button
        onClick={() => setShow(false)}
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#BEA163]/10 text-[#BEA163] md:hidden"
      >
        <X size={18} />
      </button>

      {/* Heading */}
      <div className="mb-12">

        <p className="text-xs uppercase tracking-[5px] text-[#BEA163] mb-4">
          Filters
        </p>

        <h1 className="font-garamond text-5xl text-white leading-none">
          Refined <br /> Collection
        </h1>

      </div>

      {/* Search */}
      <div className="mb-7">

        <label className="block mb-3 text-xs uppercase tracking-[4px] text-[#BEA163]">
          Search
        </label>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search Products..."
          className="h-14 w-full rounded-2xl border border-[#BEA163]/10 bg-[#232323] px-5 text-white outline-none placeholder:text-gray-500 focus:border-[#BEA163]"
        />

      </div>

      {/* Category */}
      <div className="mb-7">

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

      </div>

      {/* Price */}
      <div className="mb-10">

        <label className="block mb-3 text-xs uppercase tracking-[4px] text-[#BEA163]">
          Sort Price
        </label>

        <select
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="h-14 w-full rounded-2xl border border-[#BEA163]/10 bg-[#232323] px-5 text-white outline-none focus:border-[#BEA163]"
        >

          <option value="">Select</option>

          <option value="lowToHigh">
            Low to High
          </option>

          <option value="highToLow">
            High to Low
          </option>

        </select>

      </div>

      {/* Button */}
      <button
        onClick={clearFilter}
        className="h-14 w-full rounded-2xl bg-[#BEA163] text-black font-semibold tracking-wide transition-all duration-300 hover:scale-[0.98] cursor-pointer"
      >
        Clear Filters
      </button>

    </div>

  </div>

  {/* Products */}
  <div className="flex-1 px-6 md:px-10 py-12">

    {/* Mobile Filter */}
    <button
      onClick={() => setShow(true)}
      className="mb-8 flex h-14 w-14 items-center justify-center rounded-full bg-[#181818] text-white md:hidden"
    >
      <Filter size={20} />
    </button>

    {/* Heading */}
    <div className="mb-16">

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

    </div>

    {/* Grid */}
    {loading ? (
      <LoaderMG />
    ) : (
      <>
        {products && products.length > 0 ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-x-8 gap-y-14 place-items-center">

            {products.map((e) => {
              return (
                <ProductCard
                  key={e._id}
                  product={e}
                  latest={"no"}
                />
              );
            })}

          </div>

        ) : (
          <div className="flex h-[350px] items-center justify-center rounded-[40px] border border-dashed border-[#BEA163]/20 bg-white">

            <p className="font-garamond text-5xl text-gray-400">
              No Products Found
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
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#BEA163]/15 bg-white text-[#181818] shadow-sm transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
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
          className="flex h-14 w-14 items-center justify-center rounded-full border border-[#BEA163]/15 bg-white text-[#181818] shadow-sm transition-all duration-300 hover:bg-[#BEA163] hover:text-black"
        >
          <ChevronRightCircle />
        </button>
      )}

    </div>

  </div>

</div>
  );
}

























































// import React, { useState } from 'react'
// import { ProductData } from '../context/ProductContext';
// import { Button } from '../components/ui/Button';
// import { Filter } from 'lucide-react';
// import ProductCard from '../components/ProductCard';
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationNext,
//   PaginationPrevious,
// } from "@/components/ui/pagination";
// import LoaderMG from '../components/LoaderMG';

// export default function Products() {

//   const { loading,
//         products,
//         newProd,
//         search,
//         setSearch,
//         categories,
//         category,
//         setCategory,
//         totalPages,
//         price,
//         setPrice,
//         page,
//         setPage,
//         fetchProduct,
//         fetchProducts,
//         product,
//         relatedProduct, } = ProductData()

//     const [show,setShow] = useState(false)
//   return (
//     <div className='h-full flex flex-col md:flex-row'><div className={`fixed inset-y-0 left-0 z-50 md:z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${show ? "translate-x-0" : "-translate-x-full"} `} >
//       <div className='p-4 relative'>
//         <button onClick={()=> setShow(false)} className='absolute top-4 right-4 bg-gray-200 text-gray-800 rounded-full md:hidden' >X</button>
//          <h2 className="text-lg font-bold mb-2">Filters</h2>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">
//               Search Title
//             </label>
//             <input
//             value={search}
//               onChange={(e) => setSearch(e.target.value)}

//               type="text"
//               placeholder="Search Title"
//               className="w-full p-2 border rounded-full"
              
//             />
//           </div>

//            <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Category</label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//             >
//               <option value="">All</option>
//               {categories.map((e) => {
//                 return (
//                   <option value={e} key={e}>
//                     {e}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>

//                     <div className="mb-4">
//             <label className="block text-sm font-medium mb-2">Price</label>
//             <select
//               className="w-full p-2 border rounded-md dark:bg-gray-900 dark:text-white"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             >
//               <option value="">Select</option>
//               <option value="lowToHigh">Low to High</option>
//               <option value="highToLow">High to Low</option>
//             </select>
//           </div>
          
//           <Button className="mt-2" >
//             Clear Filter
//           </Button>


//         </div></div>
//         <div className="flex-1 p-4">
//           <button
//           onClick={() => setShow(true)}
//           className="md:hidden bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
//         >
//           <Filter />
//         </button>

//         {loading ? (
//           <LoaderMG />
//         ) : (
//           <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {products && products.length > 0 ? (
//               products.map((e) => {
//                 return <ProductCard key={e._id} product={e} latest={"no"} />;
//               })
//             ) : (
//               <p>No Products Yet</p>
//             )}
//           </div>
//         )}

//          <div className="mt-2 mb-3">
//           <Pagination>
//             <PaginationContent>
//               {page !== 1 && (
//                 <PaginationItem className="cursor-pointer" onClick={prevPage}>
//                   <PaginationPrevious />
//                 </PaginationItem>
//               )}

//               {page !== totalPages && (
//                 <PaginationItem className="cursor-pointer" onClick={nextPage}>
//                   <PaginationNext />
//                 </PaginationItem>
//               )}
//             </PaginationContent>
//           </Pagination>
//         </div>
//         </div>
        
//         </div>
//   )
// }
