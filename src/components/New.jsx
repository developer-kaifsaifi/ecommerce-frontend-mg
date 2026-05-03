

import React, {
  lazy,
  Suspense,
} from "react";

import LoaderMG from "./LoaderMG.jsx";

// Lazy Loaded Carousel
const Skiper47 = lazy(() =>
  import("./skiper/Carousel")
);

export default function New() {
  return (
    <section className="relative w-full overflow-hidden bg-[#f4f1ea] py-24">

      {/* Optimized Background Glow */}
      <div className="absolute top-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#BEA163]/10 blur-2xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">

        {/* Heading */}
        <div className="mb-16 flex flex-col items-center text-center">

          <div className="mb-6 rounded-full border border-[#BEA163]/30 bg-[#BEA163]/10 px-5 py-2">

            <p className="text-xs font-semibold uppercase tracking-[4px] text-[#705023]">
              Fresh Collection
            </p>

          </div>

          <h1 className="font-garamond text-5xl leading-tight text-black md:text-6xl">
            Look @ Newly Added
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-[#4b4b4b] font-manrope">
            Discover our latest arrivals crafted with modern elegance,
            premium fabrics, and timeless style designed for today’s
            fashion-forward men.
          </p>

        </div>

        {/* Carousel Wrapper */}
        <div className="relative">

          {/* Decorative Glow */}
          <div className="absolute -left-20 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-[#BEA163]/10 blur-2xl" />

          <div className="absolute -right-20 top-1/2 h-52 w-52 -translate-y-1/2 rounded-full bg-[#BEA163]/10 blur-2xl" />

          {/* Carousel Box */}
          <div className="relative overflow-hidden rounded-[40px] border border-[#BEA163]/15 bg-white/70 p-5 shadow-lg md:p-8">

            <Suspense fallback={<LoaderMG />}>
              <Skiper47 />
            </Suspense>

          </div>

        </div>

      </div>

    </section>
  );
}