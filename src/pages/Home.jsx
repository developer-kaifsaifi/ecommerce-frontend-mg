import React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion/react";

import Hero from "../components/Hero.jsx";
import { useNavigate } from "react-router-dom";
import { ProductData } from "../context/ProductContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import LoaderMG from "../components/LoaderMG.jsx";

export default function Home() {
  const navigate = useNavigate();
  const { loading, newProd } = ProductData();

  const { scrollY } = useScroll();

  const y1 = useTransform(scrollY, [0, 1000], [0, 180]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -120]);

  return (
    <>
      {/* Loader */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(10px)",
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[9999]"
          >
            <LoaderMG />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main */}
      <div
        className="min-h-screen overflow-hidden relative"
        style={{
          background:
            "radial-gradient(circle at top left, #f8f4ec 0%, #f1ece3 40%, #ebe4d8 100%)",
        }}
      >
        {/* Luxury Glow Effects */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-[#BEA163]/10 blur-[140px]"
        />

        <motion.div
          style={{ y: y2 }}
          className="absolute right-0 top-[40%] h-[450px] w-[450px] rounded-full bg-[#BEA163]/10 blur-[140px]"
        />

        {/* Noise Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Hero navigate={navigate} />
        </motion.div>

        {/* Products Section */}
        <section className="relative px-6 md:px-10 py-28">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10 mb-20 flex flex-col items-center text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="mb-6 rounded-full border border-[#BEA163]/20 bg-[#BEA163]/10 px-6 py-3 backdrop-blur-xl"
            >
              <p className="text-xs uppercase tracking-[5px] text-[#705023] font-semibold">
                New Collection
              </p>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.1,
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-garamond text-5xl md:text-7xl xl:text-8xl text-[#1d1d1d] leading-none"
            >
              Latest Products
            </motion.h1>

            {/* Desc */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.25,
                duration: 0.9,
              }}
              className="mt-8 max-w-2xl text-lg leading-9 text-gray-600 font-manrope"
            >
              Discover our latest premium arrivals crafted with timeless
              elegance, comfort, and modern sophistication for every occasion.
            </motion.p>
          </motion.div>

          {/* Products */}
          {/* Products */}
<div className="relative z-10">
  {loading ? (
    <LoaderMG />
  ) : newProd && newProd.length > 0 ? (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"
    >
      {newProd.map((e) => {
        return (
          <motion.div
            key={e._id}
            variants={{
              hidden: {
                opacity: 0,
                y: 100,
                scale: 0.9,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
              },
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -12,
            }}
          >
            <motion.div
              whileHover={{
                boxShadow:
                  "0px 25px 60px rgba(0,0,0,0.12)",
              }}
              transition={{ duration: 0.4 }}
              className="rounded-[32px]"
            >
              <ProductCard
                product={e}
                latest={"yes"}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </motion.div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="flex h-[300px] items-center justify-center rounded-[40px] border border-dashed border-[#BEA163]/20 bg-white/80 backdrop-blur-xl"
    >
      <h3 className="font-garamond text-4xl text-gray-500">
        No Products Available
      </h3>
    </motion.div>
  )}
</div>

          {/* Luxury Bottom Fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#ebe4d8] to-transparent" />
        </section>
      </div>
    </>
  );
}
































































// import React from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Hero from "../components/Hero.jsx";
// import { useNavigate } from "react-router-dom";
// import { ProductData } from "../context/ProductContext.jsx";
// import ProductCard from "../components/ProductCard.jsx";
// import LoaderMG from "../components/LoaderMG.jsx";

// export default function Home() {
//   const navigate = useNavigate();
//   const { loading, newProd } = ProductData();

//   // Mouse positions (Aapka custom cursor logic yahan rahega)
  
//   return (
//     <>
//       {/* --- FULL SCREEN LOADER WRAPPER --- */}
//       {/* AnimatePresence loader ko unmount hone se pehle smooth fade-out animation dega */}
//       <AnimatePresence>
//         {loading && (
//           <motion.div
//             key="loader"
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5, ease: "easeInOut" }}
//             className="fixed inset-0 z-[9999]"
//           >
//             <LoaderMG />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* --- MAIN WEBSITE CONTENT --- */}
//       <div className="bg-[#f4f1ea] min-h-screen overflow-hidden">
        
//         {/* --- CUSTOM CURSOR (SPRING ANIMATION) --- */}

//         {/* Hero */}
//         <Hero navigate={navigate} />

//         {/* Products Section */}
//         <section className="relative px-6 md:px-10 py-24">
//           {/* Glow */}
//           <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#BEA163]/10 blur-3xl" />
//           <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#BEA163]/10 blur-3xl" />

//           {/* Heading */}
//           <div className="relative z-10 mb-16 flex flex-col items-center text-center">
//             <div className="mb-6 rounded-full border border-[#BEA163]/20 bg-[#BEA163]/10 px-5 py-2">
//               <p className="text-xs uppercase tracking-[4px] text-[#705023] font-semibold">
//                 New Collection
//               </p>
//             </div>
//             <h1 className="font-garamond text-5xl md:text-7xl text-[#1d1d1d] leading-none">
//               Latest Products
//             </h1>
//             <p className="mt-6 max-w-2xl text-lg leading-9 text-gray-600 font-manrope">
//               Discover our latest premium arrivals crafted with timeless elegance, comfort, and modern sophistication for every occasion.
//             </p>
//           </div>

//           {/* Products Grid */}
//           {/* Yahan se purana loading logic hata diya gaya hai kyunki ab loader screen ke upar hai */}
//           <div className="relative justify-center z-5">
//             {newProd && newProd.length > 0 ? (
//               <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
//                 {newProd.map((e) => {
//                   return (
//                     <ProductCard
//                       key={e._id}
//                       product={e}
//                       latest={"yes"}
//                     />
//                   );
//                 })}
//               </div>
//             ) : (
//               <div className="flex h-[300px] items-center justify-center rounded-[40px] border border-dashed border-[#BEA163]/20 bg-white">
//                 <h3 className="font-garamond text-4xl text-gray-500">
//                   No Products Available
//                 </h3>
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Footer component would go here */}
        
//       </div>
//     </>
//   );
// }





























