


import { easeInOut, motion } from "motion/react";
import hero from "./../assets/hero.png";
import logo from "./../assets/mg-black.png";



const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
  },
};

export default function Hero({navigate}) {


  return (
    <section  className="relative min-h-[110vh] overflow-hidden bg-[#f4f1ea] pt-24">

      {/* Background Glow */}
      <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-[#BEA163]/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 items-center gap-16">

        {/* Left Content */}
        <motion.div variants={container} className="relative z-10 flex flex-col items-start">

          {/* Tag */}
          <div className="mb-6 px-5 py-2 rounded-full border border-[#BEA163]/30 bg-[#BEA163]/10">
            <p className="uppercase tracking-[4px] text-xs text-[#705023] font-semibold">
              Premium Menswear
            </p>
          </div>

          {/* Heading */}
          <h1 className="font-garamond text-6xl md:text-7xl xl:text-8xl leading-none font-bold text-black">
            Timeless Style
          </h1>

          <motion.h1 variants={item} className="font-garamond text-6xl md:text-7xl xl:text-8xl leading-none font-bold text-[#705023] mt-2">
            Modern Sophistication
          </motion.h1>

          {/* Paragraph */}
          <motion.p variants={item}
          className="max-w-xl mt-8 text-[0.8rem] md:text-lg leading-9 text-[#4b4b4b] font-manrope">
            Premium outfits for men crafted with elegance,
            comfort, and attention to detail — designed for
            modern lifestyles and timeless confidence.
          </motion.p>

          {/* Buttons */}
          <div className="flex items-center gap-5 mt-10">

            <motion.button
            onClick={()=> navigate("/products")}
              transition={{ duration: 0.2, ease:"easeIn" }}
              initial={{ scale: 1 }}
              whileHover={{ scale: 0.96 }}
              whileTap={{ scale: 0.93 }}
              className="bg-[#1d1d1d] md:scale-100 scale-65 hover:bg-black text-white px-8 py-4 rounded-full font-garamond text-2xl shadow-lg shadow-black/10 transition-all cursor-pointer"
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
              initial={{ scale: 1 }}
              whileHover={{ scale: 0.96 }}
              whileTap={{ scale: 0.93 }}
              className="border md:scale-100 scale-65 z-40 border-[#BEA163]/40 text-[#705023] px-8 py-4 rounded-full font-garamond text-2xl backdrop-blur-sm hover:bg-[#BEA163]/10 transition-all cursor-pointer"
            >
              New Arrivals
            </motion.button>

          </div>

          {/* Stats */}
          <div className="flex gap-10 mt-14">

            <div>
              <h3 className="cursor-crosshair text-4xl font-bold font-garamond text-black">
                5K+
              </h3>

              <p className="cursor-crosshair text-sm uppercase tracking-[3px] text-gray-500 mt-2">
                Happy Customers
              </p>
            </div>

            <div className="mb-5">
              <h3 className="cursor-crosshair text-4xl font-bold font-garamond text-black">
                100+
              </h3>

              <p className="cursor-crosshair text-sm uppercase tracking-[3px] text-gray-500 mt-2">
                Premium Products
              </p>
            </div>

          </div>

        </motion.div>

        {/* Right Image */}
        <div className="relative flex justify-center lg:justify-end">

          {/* Gold Glow */}
          <div className="absolute bottom-0 h-[450px] w-[450px] rounded-full bg-[#BEA163]/20 blur-3xl" />

          {/* Main Image */}
          <motion.img
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative z-5 w-full max-w-[700px] rounded-[40px] object-cover shadow-2xl shadow-black/10"
            src={hero}
            alt=""
          />

          {/* Watermark Logo */}
          <img
            className="absolute z-500 w-[420px] opacity-[0.04] top-10 right-10"
            src={logo}
            alt=""
          />

          {/* Floating Card */}
          <motion.div initial={{
            scale:0
          }}
          animate={{scale:1}}
          transition={{duration:1,
            ease:easeInOut
          }}
          className="absolute md:scale-100 scale-65 z-40 md:bottom-8 left-0 md:left-8 bg-white/80 backdrop-blur-md border border-white/40 rounded-3xl px-6 py-5 shadow-xl">

            <p className="text-xs uppercase tracking-[4px] text-[#705023] mb-2">
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