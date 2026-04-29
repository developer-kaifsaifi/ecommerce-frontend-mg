
"use client";

import { motion } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import React from "react";

import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Skiper47 = () => {
  const images = [
    {
      src: "https://i.pinimg.com/736x/fa/12/9f/fa129f39c2905225f1c6c39f42538ed6.jpg",
      alt: "Image 1",
    },
    {
      src: "https://i.pinimg.com/736x/fa/12/9f/fa129f39c2905225f1c6c39f42538ed6.jpg",
      alt: "Image 2",
    },
    {
      src: "https://i.pinimg.com/736x/fa/12/9f/fa129f39c2905225f1c6c39f42538ed6.jpg",
      alt: "Image 3",
    },
    {
      src: "https://i.pinimg.com/736x/fa/12/9f/fa129f39c2905225f1c6c39f42538ed6.jpg",
      alt: "Image 4",
    },
    {
      src: "https://i.pinimg.com/736x/fa/12/9f/fa129f39c2905225f1c6c39f42538ed6.jpg",
      alt: "Image 5",
    },
  ];

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden rounded-[40px] bg-[#f4f1ea] py-10">

      {/* Background Glow */}
      <div className="absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#BEA163]/10 blur-3xl" />

      <div className="absolute right-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#BEA163]/10 blur-3xl" />

      <Carousel_001
        images={images}
        showPagination
        showNavigation
        loop
        autoplay
      />

    </div>
  );
};

export default Skiper47;

const Carousel_001 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}) => {
  const css = `
    .Carousal_001 {
      padding-bottom: 70px !important;
      overflow: visible !important;
    }

    .swiper-pagination-bullet {
      background: rgba(112, 80, 35, 0.3) !important;
      opacity: 1 !important;
      width: 10px !important;
      height: 10px !important;
      transition: all 0.3s ease;
    }

    .swiper-pagination-bullet-active {
      background: #BEA163 !important;
      width: 28px !important;
      border-radius: 999px !important;
    }

    .swiper-slide {
      transition: all 0.4s ease;
      opacity: 0.55;
      transform: scale(0.92);
    }

    .swiper-slide-active {
      opacity: 1 !important;
      transform: scale(1.02);
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 30 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.5,
      }}
      viewport={{ once: true }}
      className={`relative w-full max-w-7xl ${
        className || ""
      }`}
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 2500,
                disableOnInteraction: false,
              }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={loop}
        slidesPerView={2.2}
        breakpoints={{
          320: {
            slidesPerView: 1.1,
          },
          768: {
            slidesPerView: 1.6,
          },
          1024: {
            slidesPerView: 2.2,
          },
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2.2,
          slideShadows: false,
        }}
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        className="Carousal_001"
        modules={[
          EffectCoverflow,
          Autoplay,
          Pagination,
          Navigation,
        ]}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="!h-[520px] overflow-hidden rounded-[35px] border border-[#BEA163]/15 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          >
            <div className="relative h-full w-full overflow-hidden rounded-[35px]">

              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-8 text-white">

                <p className="uppercase tracking-[4px] text-xs text-[#BEA163] mb-3">
                  New Collection
                </p>

                <h2 className="text-4xl font-garamond leading-none">
                  Premium Menswear
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-200 font-manrope max-w-xs">
                  Crafted with elegance and modern sophistication for
                  everyday luxury.
                </p>

              </div>

            </div>
          </SwiperSlide>
        ))}

        {/* Navigation */}
        {showNavigation && (
          <div>

            <div className="swiper-button-next after:hidden !h-14 !w-14 rounded-full border border-[#BEA163]/20 bg-[#1d1d1d]/90 backdrop-blur-md transition-all hover:bg-[#BEA163] hover:text-black">

              <ChevronRightIcon className="h-6 w-6 text-white swiper-next-icon" />

            </div>

            <div className="swiper-button-prev after:hidden !h-14 !w-14 rounded-full border border-[#BEA163]/20 bg-[#1d1d1d]/90 backdrop-blur-md transition-all hover:bg-[#BEA163] hover:text-black">

              <ChevronLeftIcon className="h-6 w-6 text-white swiper-prev-icon" />

            </div>

          </div>
        )}

      </Swiper>
    </motion.div>
  );
};






































































// "use client";

// import { motion } from "framer-motion";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import React from "react";

// import {
//   Autoplay,
//   EffectCoverflow,
//   Navigation,
//   Pagination,
// } from "swiper/modules";

// import { Swiper, SwiperSlide } from "swiper/react";

// import "swiper/css";
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// const Skiper47 = () => {
//   const images = [
//     {
//       src: "https://i.pinimg.com/736x/fa/12/9f/fa129f39c2905225f1c6c39f42538ed6.jpg",
//       alt: "Image 1",
//     },
//     {
//       src: "https://i.pinimg.com/736x/fa/12/9f/fa129f39c2905225f1c6c39f42538ed6.jpg",
//       alt: "Image 2",
//     },
//     {
//       src: "https://i.pinimg.com/736x/fa/12/9f/fa129f39c2905225f1c6c39f42538ed6.jpg",
//       alt: "Image 3",
//     },
//     {
//       src: "https://i.pinimg.com/736x/fa/12/9f/fa129f39c2905225f1c6c39f42538ed6.jpg",
//       alt: "Image 4",
//     },
//     {
//       src: "https://i.pinimg.com/736x/fa/12/9f/fa129f39c2905225f1c6c39f42538ed6.jpg",
//       alt: "Image 5",
//     },
//     {
//       src: "https://i.pinimg.com/736x/fa/12/9f/fa129f39c2905225f1c6c39f42538ed6.jpg",
//       alt: "Image 6",
//     },
//   ];

//   return (
//     <div className="flex rounded-[40px] h-screen w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
//       <Carousel_001
//         images={images}
//         showPagination
//         showNavigation
//         loop
//       />
//     </div>
//   );
// };

// export default Skiper47;

// const Carousel_001 = ({
//   images,
//   className,
//   showPagination = false,
//   showNavigation = false,
//   loop = true,
//   autoplay = false,
//   spaceBetween = 40,
// }) => {
//   const css = `
//     .Carousal_001 {
//       padding-bottom: 50px !important;
//     }
//   `;

//   return (
//     <motion.div
//       initial={{ opacity: 0, translateY: 20 }}
//       animate={{ opacity: 1, translateY: 0 }}
//       transition={{
//         duration: 0.3,
//         delay: 0.5,
//       }}
//       className={`relative w-full max-w-5xl ${className || ""}`}
//     >
//       <style>{css}</style>

//       <Swiper
//         spaceBetween={spaceBetween}
//         autoplay={
//           autoplay
//             ? {
//                 delay: 1500,
//                 disableOnInteraction: false,
//               }
//             : false
//         }
//         effect="coverflow"
//         grabCursor={true}
//         centeredSlides={true}
//         loop={loop}
//         slidesPerView={2.4}
//         coverflowEffect={{
//           rotate: 0,
//           stretch: 0,
//           depth: 120,
//           modifier: 2.5,
//           slideShadows: false,
//         }}
//         pagination={
//           showPagination
//             ? {
//                 clickable: true,
//               }
//             : false
//         }
//         navigation={
//           showNavigation
//             ? {
//                 nextEl: ".swiper-button-next",
//                 prevEl: ".swiper-button-prev",
//               }
//             : false
//         }
//         className="Carousal_001"
//         modules={[
//           EffectCoverflow,
//           Autoplay,
//           Pagination,
//           Navigation,
//         ]}
//       >
//         {images.map((image, index) => (
//           <SwiperSlide
//             key={index}
//             className="!h-[320px] overflow-hidden rounded-3xl"
//           >
//             <img
//               src={image.src}
//               alt={image.alt}
//               className="h-full w-full object-cover"
//             />
//           </SwiperSlide>
//         ))}

//         {showNavigation && (
//           <div>
//             <div className="swiper-button-next after:hidden">
//               <ChevronRightIcon className="h-7 w-7 text-white" />
//             </div>

//             <div className="swiper-button-prev after:hidden">
//               <ChevronLeftIcon className="h-7 w-7 text-white" />
//             </div>
//           </div>
//         )}
//       </Swiper>
//     </motion.div>
//   );
// };