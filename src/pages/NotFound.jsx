
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import error from "./../assets/404.svg"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center px-6">

      <div className="max-w-4xl w-full border border-[#d9c8a8] bg-white shadow-sm">

        <div className="grid md:grid-cols-2">

          {/* Left */}
          <div className="flex flex-col justify-center px-8 md:px-12 py-14">

            <p className="mb-4 text-xs uppercase tracking-[5px] text-[#705023]">
              Error 404
            </p>

            <h1 className="font-garamond text-7xl text-[#1d1d1d] leading-none">
              Page Not Found
            </h1>

            <p className="mt-8 text-lg leading-9 text-gray-600 font-manrope">
              The page you are looking for does not exist or has been
              moved. Continue exploring premium fashion collections at
              Mansoori Garment.
            </p>

            {/* Button */}
            <Link to={"/"} className="mt-10">

              <button className="flex h-14 items-center gap-3 bg-[#1d1d1d] px-8 text-sm uppercase tracking-[3px] text-white transition-all duration-300 hover:bg-[#BEA163] hover:text-black cursor-pointer">

                <Home size={18} />

                Back To Home

              </button>

            </Link>

          </div>

          {/* Right */}
          <div className="bg-[#f8f3ea] flex items-center justify-center p-8 border-l border-[#e7dcc6]">

            <img
              src={error}
              alt="Not Found"
              className="w-full max-w-md object-contain"
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default NotFound;