


export default function LoaderMG() {
  return (
    <div className="fixed inset-0 z-[9999] bg-[#151515] flex items-center justify-center overflow-hidden">

      {/* Background Glow */}
      <div className="absolute h-72 w-72 rounded-full bg-[#BEA163]/20 blur-3xl" />

      {/* Loader Content */}
      <div className="relative flex flex-col items-center">

        {/* Ring Loader */}
        <div className="relative h-28 w-28">

          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-[#BEA163]/20" />

          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#BEA163] border-r-[#BEA163] animate-spin" />

          {/* Inner Circle */}
          <div className="absolute inset-4 rounded-full bg-[#1d1d1d] border border-[#BEA163]/20 flex items-center justify-center">

            <span className="text-[#BEA163] flex items-center justify-center h-full w-full inset-0 m-auto text-2xl font-bold font-epilogue">
             MG
            </span>

          </div>

        </div>

        {/* Text */}
        <h2 className="mt-8 text-3xl tracking-[4px] uppercase text-white font-epilogue">
          Mansoori Garment
        </h2>

        <p className="mt-3 text-[#BEA163] text-sm tracking-[5px] uppercase font-manrope">
          Loading Experience
        </p>

      </div>
    </div>
  );
}