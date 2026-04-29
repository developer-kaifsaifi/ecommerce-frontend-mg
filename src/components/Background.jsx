export default function WatermarkBackground() {
  return (
    <div className="relative h-screen w-full overflow-hidden ">
      
      {/* Background Image */}
      <img
        src="/../assets/mg-black.png"
        alt="bg"
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Watermark Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -rotate-[70deg] scale-150 flex flex-col gap-8 top-[-40%] left-[-30%]">
          
          {Array.from({ length: 18 }).map((_, row) => (
            <div
              key={row}
              className="flex items-center gap-12 whitespace-nowrap"
            >
              
              {Array.from({ length: 14 }).map((_, col) => (
                <div
                  key={col}
                  className="flex items-center gap-10"
                >
                  
                  {/* Text */}
                  <span className="text-white/5 text-5xl font-extrabold tracking-[8px] uppercase">
                    Fashion
                  </span>

                  {/* Image */}
                  <img
                    src="/logo.png"
                    alt="logo"
                    className="w-14 h-14 object-contain opacity-10"
                  />

                </div>
              ))}

            </div>
          ))}

        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
        <h1 className="text-6xl font-bold">Modern Wear</h1>
        <p className="mt-4 text-lg text-gray-300">
          Premium Streetwear Collection
        </p>
      </div>
    </div>
  );
}