import React, { lazy, Suspense } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion/react";

import { useNavigate } from "react-router-dom";
import { ProductData } from "../context/ProductContext.jsx";
import LoaderMG from "../components/LoaderMG.jsx";

// Lazy Loaded Components
const Hero = lazy(() => import("../components/Hero.jsx"));
const ProductCard = lazy(() => import("../components/ProductCard.jsx"));

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
        className="relative min-h-screen overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at top left, #f8f4ec 0%, #f1ece3 40%, #ebe4d8 100%)",
        }}
      >

        {/* Optimized Glow */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-0 left-0 h-[400px] w-[400px] rounded-full bg-[#BEA163]/10 blur-[100px]"
        />

        <motion.div
          style={{ y: y2 }}
          className="absolute right-0 top-[40%] h-[350px] w-[350px] rounded-full bg-[#BEA163]/10 blur-[100px]"
        />

        {/* Noise Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "url('https://grainy-gradients.vercel.app/noise.svg')",
          }}
        />

        {/* Hero */}
        <Suspense fallback={<LoaderMG />}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.8,
            }}
          >
            <Hero navigate={navigate} />
          </motion.div>
        </Suspense>

        {/* Products Section */}
        <section className="relative px-6 py-28 md:px-10">

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
            }}
            className="relative z-10 mb-20 flex flex-col items-center text-center"
          >

            {/* Badge */}
            <div className="mb-6 rounded-full border border-[#BEA163]/20 bg-[#BEA163]/10 px-6 py-3">
              <p className="text-xs font-semibold uppercase tracking-[5px] text-[#705023]">
                New Collection
              </p>
            </div>

            {/* Title */}
            <h1 className="font-garamond text-5xl leading-none text-[#1d1d1d] md:text-7xl xl:text-8xl">
              Latest Products
            </h1>

            {/* Desc */}
            <p className="mt-8 max-w-2xl text-lg leading-9 text-gray-600 font-manrope">
              Discover our latest premium arrivals crafted with timeless
              elegance, comfort, and modern sophistication for every occasion.
            </p>

          </motion.div>

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
                      staggerChildren: 0.05,
                    },
                  },
                }}
                className="grid grid-cols-1 gap-8 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              >

                {newProd.map((e) => {
                  return (
                    <motion.div
                      key={e._id}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 50,
                        },
                        visible: {
                          opacity: 1,
                          y: 0,
                        },
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      whileHover={{
                        y: -8,
                      }}
                    >

                      <Suspense fallback={<LoaderMG />}>
                        <ProductCard
                          product={e}
                          latest={"yes"}
                        />
                      </Suspense>

                    </motion.div>
                  );
                })}

              </motion.div>

            ) : (

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="flex h-[300px] items-center justify-center rounded-[40px] border border-dashed border-[#BEA163]/20 bg-white/80"
              >
                <h3 className="font-garamond text-4xl text-gray-500">
                  No Products Available
                </h3>
              </motion.div>

            )}

          </div>

          {/* Bottom Fade */}
          <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#ebe4d8] to-transparent" />

        </section>

      </div>
    </>
  );
}



































































// import React from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
// } from "motion/react";

// import Hero from "../components/Hero.jsx";
// import { useNavigate } from "react-router-dom";
// import { ProductData } from "../context/ProductContext.jsx";
// import ProductCard from "../components/ProductCard.jsx";
// import LoaderMG from "../components/LoaderMG.jsx";

// export default function Home() {
//   const navigate = useNavigate();
//   const { loading, newProd } = ProductData();

//   const { scrollY } = useScroll();

//   const y1 = useTransform(scrollY, [0, 1000], [0, 180]);
//   const y2 = useTransform(scrollY, [0, 1000], [0, -120]);

//   return (
//     <>
//       {/* Loader */}
//       <AnimatePresence>
//         {loading && (
//           <motion.div
//             key="loader"
//             initial={{ opacity: 1 }}
//             exit={{
//               opacity: 0,
//               scale: 1.05,
//               filter: "blur(10px)",
//             }}
//             transition={{
//               duration: 0.8,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="fixed inset-0 z-[9999]"
//           >
//             <LoaderMG />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main */}
//       <div
//         className="min-h-screen overflow-hidden relative"
//         style={{
//           background:
//             "radial-gradient(circle at top left, #f8f4ec 0%, #f1ece3 40%, #ebe4d8 100%)",
//         }}
//       >
//         {/* Luxury Glow Effects */}
//         <motion.div
//           style={{ y: y1 }}
//           className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-[#BEA163]/10 blur-[140px]"
//         />

//         <motion.div
//           style={{ y: y2 }}
//           className="absolute right-0 top-[40%] h-[450px] w-[450px] rounded-full bg-[#BEA163]/10 blur-[140px]"
//         />

//         {/* Noise Overlay */}
//         <div
//           className="pointer-events-none absolute inset-0 opacity-[0.03]"
//           style={{
//             backgroundImage:
//               "url('https://grainy-gradients.vercel.app/noise.svg')",
//           }}
//         />

//         {/* Hero */}
//         <motion.div
//           initial={{ opacity: 0, scale: 1.03 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{
//             duration: 1.2,
//             ease: [0.22, 1, 0.36, 1],
//           }}
//         >
//           <Hero navigate={navigate} />
//         </motion.div>

//         {/* Products Section */}
//         <section className="relative px-6 md:px-10 py-28">
//           {/* Heading */}
//           <motion.div
//             initial={{ opacity: 0, y: 100 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{
//               duration: 1,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="relative z-10 mb-20 flex flex-col items-center text-center"
//           >
//             {/* Badge */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.7 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{
//                 delay: 0.2,
//                 duration: 0.6,
//               }}
//               className="mb-6 rounded-full border border-[#BEA163]/20 bg-[#BEA163]/10 px-6 py-3 backdrop-blur-xl"
//             >
//               <p className="text-xs uppercase tracking-[5px] text-[#705023] font-semibold">
//                 New Collection
//               </p>
//             </motion.div>

//             {/* Title */}
//             <motion.h1
//               initial={{ opacity: 0, y: 70 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: 0.1,
//                 duration: 1,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className="font-garamond text-5xl md:text-7xl xl:text-8xl text-[#1d1d1d] leading-none"
//             >
//               Latest Products
//             </motion.h1>

//             {/* Desc */}
//             <motion.p
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: 0.25,
//                 duration: 0.9,
//               }}
//               className="mt-8 max-w-2xl text-lg leading-9 text-gray-600 font-manrope"
//             >
//               Discover our latest premium arrivals crafted with timeless
//               elegance, comfort, and modern sophistication for every occasion.
//             </motion.p>
//           </motion.div>

//           {/* Products */}
//           {/* Products */}
// <div className="relative z-10">
//   {loading ? (
//     <LoaderMG />
//   ) : newProd && newProd.length > 0 ? (
//     <motion.div
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       variants={{
//         hidden: {},
//         visible: {
//           transition: {
//             staggerChildren: 0.08,
//           },
//         },
//       }}
//       className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8"
//     >
//       {newProd.map((e) => {
//         return (
//           <motion.div
//             key={e._id}
//             variants={{
//               hidden: {
//                 opacity: 0,
//                 y: 100,
//                 scale: 0.9,
//               },
//               visible: {
//                 opacity: 1,
//                 y: 0,
//                 scale: 1,
//               },
//             }}
//             transition={{
//               duration: 0.9,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             whileHover={{
//               y: -12,
//             }}
//           >
//             <motion.div
//               whileHover={{
//                 boxShadow:
//                   "0px 25px 60px rgba(0,0,0,0.12)",
//               }}
//               transition={{ duration: 0.4 }}
//               className="rounded-[32px]"
//             >
//               <ProductCard
//                 product={e}
//                 latest={"yes"}
//               />
//             </motion.div>
//           </motion.div>
//         );
//       })}
//     </motion.div>
//   ) : (
//     <motion.div
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       className="flex h-[300px] items-center justify-center rounded-[40px] border border-dashed border-[#BEA163]/20 bg-white/80 backdrop-blur-xl"
//     >
//       <h3 className="font-garamond text-4xl text-gray-500">
//         No Products Available
//       </h3>
//     </motion.div>
//   )}
// </div>

//           {/* Luxury Bottom Fade */}
//           <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-full bg-gradient-to-t from-[#ebe4d8] to-transparent" />
//         </section>
//       </div>
//     </>
//   );
// }

























































