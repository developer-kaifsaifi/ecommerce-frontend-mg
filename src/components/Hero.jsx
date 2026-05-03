
import hero from "./../assets/hero.webp";

import { easeInOut, motion } from "motion/react";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export default function Hero({ navigate }) {
  return (
    <section className="relative min-h-[110vh] overflow-hidden bg-[#f4f1ea] pt-24">

      {/* Optimized Background Glow */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-[#BEA163]/10 blur-2xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2">

        {/* Left Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-start"
        >

          {/* Tag */}
          <motion.div
            variants={item}
            className="mb-6 rounded-full border border-[#BEA163]/30 bg-[#BEA163]/10 px-5 py-2"
          >
            <p className="text-xs font-semibold uppercase tracking-[4px] text-[#705023]">
              Premium Menswear
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="font-garamond text-6xl leading-none font-bold text-black md:text-7xl xl:text-8xl"
          >
            Timeless Style
          </motion.h1>

          <motion.h1
            variants={item}
            className="mt-2 font-garamond text-6xl leading-none font-bold text-[#705023] md:text-7xl xl:text-8xl"
          >
            Modern Sophistication
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            variants={item}
            className="mt-8 max-w-xl text-[0.8rem] leading-9 text-[#4b4b4b] md:text-lg font-manrope"
          >
            Premium outfits for men crafted with elegance,
            comfort, and attention to detail — designed for
            modern lifestyles and timeless confidence.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={item}
            className="mt-10 flex items-center gap-5"
          >

            <motion.button
              onClick={() => navigate("/products")}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 0.96 }}
              whileTap={{ scale: 0.93 }}
              className="cursor-pointer rounded-full bg-[#1d1d1d] px-8 py-4 font-garamond text-2xl text-white shadow-lg transition-all hover:bg-black md:scale-100 scale-65"
            >
              Explore Collection
            </motion.button>

            <motion.button
              onClick={() =>
                window.scrollBy({
                  top: 500,
                  behavior: "smooth",
                })
              }
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 0.96 }}
              whileTap={{ scale: 0.93 }}
              className="z-40 cursor-pointer rounded-full border border-[#BEA163]/40 px-8 py-4 font-garamond text-2xl text-[#705023] transition-all hover:bg-[#BEA163]/10 md:scale-100 scale-65"
            >
              New Arrivals
            </motion.button>

          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-14 flex gap-10"
          >

            <div>
              <h3 className="cursor-crosshair font-garamond text-4xl font-bold text-black">
                5K+
              </h3>

              <p className="mt-2 text-sm uppercase tracking-[3px] text-gray-500">
                Happy Customers
              </p>
            </div>

            <div className="mb-5">
              <h3 className="cursor-crosshair font-garamond text-4xl font-bold text-black">
                100+
              </h3>

              <p className="mt-2 text-sm uppercase tracking-[3px] text-gray-500">
                Premium Products
              </p>
            </div>

          </motion.div>

        </motion.div>

        {/* Right Image */}
        <div className="relative flex justify-center lg:justify-end">

          {/* Optimized Glow */}
          <div className="absolute bottom-0 h-[420px] w-[420px] rounded-full bg-[#BEA163]/20 blur-2xl" />

          {/* Main Hero Image */}
          <motion.img
            loading="eager"
            decoding="async"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 w-full max-w-[700px] rounded-[40px] object-cover shadow-lg will-change-transform"
            src={hero}
            alt="Premium Menswear"
          />

          
          {/* Floating Card */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              ease: easeInOut,
            }}
            className="absolute left-0 z-40 rounded-3xl border border-white/40 bg-white/80 px-6 py-5 shadow-lg md:bottom-8 md:left-8 md:scale-100 scale-65"
          >

            <p className="mb-2 text-xs uppercase tracking-[4px] text-[#705023]">
              Luxury Collection
            </p>

            <h3 className="font-garamond text-3xl text-black">
              Crafted For Modern Men
            </h3>

          </motion.div>

        </div>

      </div>
    </section>
  );
}