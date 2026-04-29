
import Hero from "../components/Hero.jsx";

import { useNavigate } from "react-router-dom";
import { ProductData } from "../context/ProductContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import LoaderMG from "../components/LoaderMG.jsx";
 

export default function Home() {
  const navigate = useNavigate();
  const { loading, newProd } = ProductData();

  // Mouse positions
  

  return (
    <div className="bg-[#f4f1ea] min-h-screen overflow-hidden">
      
      {/* --- CUSTOM CURSOR (SPRING ANIMATION) --- */}
      

      {/* Hero */}
      <Hero navigate={navigate} />

      {/* Products Section */}
      <section className="relative px-6 md:px-10 py-24">
        {/* Glow */}
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#BEA163]/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#BEA163]/10 blur-3xl" />

        {/* Heading */}
        <div className="relative z-10 mb-16 flex flex-col items-center text-center">
          <div className="mb-6 rounded-full border border-[#BEA163]/20 bg-[#BEA163]/10 px-5 py-2">
            <p className="text-xs uppercase tracking-[4px] text-[#705023] font-semibold">
              New Collection
            </p>
          </div>
          <h1 className="font-garamond text-5xl md:text-7xl text-[#1d1d1d] leading-none">
            Latest Products
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600 font-manrope">
            Discover our latest premium arrivals crafted with timeless elegance, comfort, and modern sophistication for every occasion.
          </p>
        </div>

        {/* Products */}
        <div className="relative justify-center z-5">
          {loading ? (
            <LoaderMG />
          ) : (
            <>
              {newProd && newProd.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                  {newProd.map((e) => {
                    return (
                      <ProductCard
                        key={e._id}
                        product={e}
                        latest={"yes"}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="flex h-[300px] items-center justify-center rounded-[40px] border border-dashed border-[#BEA163]/20 bg-white">
                  <h3 className="font-garamond text-4xl text-gray-500">
                    No Products Available
                  </h3>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Footer component would go here */}
      
    </div>
  );
}