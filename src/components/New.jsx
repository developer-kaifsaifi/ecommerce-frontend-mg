



import Skiper47 from "./skiper/Carousel";

export default function New() {
  return (
    <section className="relative w-full py-24 bg-[#f4f1ea] overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-[#BEA163]/10 blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">

          <div className="px-5 py-2 rounded-full border border-[#BEA163]/30 bg-[#BEA163]/10 mb-6">
            <p className="uppercase tracking-[4px] text-xs text-[#705023] font-semibold">
              Fresh Collection
            </p>
          </div>

          <h1 className="text-5xl md:text-6xl font-garamond text-black leading-tight">
            Look @ Newly Added
          </h1>

          <p className="mt-6 max-w-2xl text-[#4b4b4b] text-lg leading-9 font-manrope">
            Discover our latest arrivals crafted with modern elegance,
            premium fabrics, and timeless style designed for today’s
            fashion-forward men.
          </p>

        </div>

        {/* Carousel Wrapper */}
        <div className="relative">

          {/* Decorative Blur */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 h-60 w-60 rounded-full bg-[#BEA163]/10 blur-3xl" />

          <div className="absolute -right-20 top-1/2 -translate-y-1/2 h-60 w-60 rounded-full bg-[#BEA163]/10 blur-3xl" />

          {/* Carousel Box */}
          <div className="relative rounded-[40px] border border-[#BEA163]/15 bg-white/70 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-5 md:p-8 overflow-hidden">

            <Skiper47 />

          </div>

        </div>

      </div>
    </section>
  );
}








// import Skiper47 from './skiper/Carousel'

// export default function New() {
//   return (
//     <div className='w-full h-full flex flex-col'><h1 className='text-4xl self-center mb-5 font-garamond'>Look @ Newly Added</h1><div className='w-full h-full '><Skiper47/></div></div>
//   )
// }


