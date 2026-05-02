import { Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { UserData } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

import {
  motion,
  
} from "motion/react";

export default function Login() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const { loginUser, btnLoading } = UserData();

  const submitHandler = () => {
    loginUser(email, navigate);
  };

  // Smooth premium mouse parallax
 



  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-10 overflow-hidden relative"
      style={{
        background:
          "radial-gradient(circle at top left, #f8f4ec 0%, #f1ece3 40%, #ebe4d8 100%)",
      }}
    >
      {/* Premium Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.35, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-100px] left-[-100px] h-[500px] w-[500px] rounded-full bg-[#BEA163]/20 blur-[140px]"
      />

      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-120px] right-[-120px] h-[500px] w-[500px] rounded-full bg-[#BEA163]/20 blur-[140px]"
      />

      {/* Main Card */}
      <motion.div
        initial={{
          opacity: 0,
          y: 80,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        
        className="w-full max-w-6xl grid lg:grid-cols-2 bg-white/75 backdrop-blur-2xl rounded-[40px] overflow-hidden border border-white/40 shadow-[0px_30px_80px_rgba(0,0,0,0.08)] relative z-10"
      >
        {/* Left Side */}
        <div className="relative hidden lg:flex flex-col justify-between bg-[#1d1d1d] p-14 text-white overflow-hidden">
          {/* Animated Glow */}
          <motion.div
            animate={{
              x: [0, 40, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 right-0 h-72 w-72 rounded-full bg-[#BEA163]/20 blur-3xl"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-10"
          >
            <p className="uppercase tracking-[5px] text-[#BEA163] text-sm font-semibold mb-5">
              Welcome Back
            </p>

            <h1 className="text-6xl leading-tight font-bold font-garamond">
              Login To <br />
              Mansoori Garment
            </h1>

            <p className="mt-8 text-gray-300 text-lg leading-9 font-manrope max-w-md">
              Access your account to explore premium collections,
              manage orders, and enjoy a seamless shopping experience.
            </p>
          </motion.div>

          {/* Bottom Card */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.4,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{
              y: -6,
            }}
            className="relative z-10 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <ShieldCheck
                  className="text-[#BEA163]"
                  size={30}
                />
              </motion.div>

              <h3 className="text-2xl font-semibold font-epilogue">
                Secure Login
              </h3>
            </div>

            <p className="text-gray-300 leading-7 font-manrope">
              Your information is securely protected with encrypted OTP
              verification.
            </p>
          </motion.div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-14 flex flex-col justify-center relative">
          {/* subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

          <motion.div
            initial={{
              opacity: 0,
              x: 80,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-md w-full mx-auto relative z-10"
          >
            <p className="uppercase tracking-[4px] text-[#BEA163] text-sm font-semibold mb-4">
              Account Access
            </p>

            <h2 className="text-4xl md:text-5xl font-bold font-epilogue text-[#1d1d1d]">
              Sign In / Sign Up
            </h2>

            <p className="mt-5 text-gray-600 leading-8 font-manrope">
              Enter your email address to receive a one-time password
              for secure login.
            </p>

            {/* Form */}
            <div className="mt-10 flex flex-col gap-6">
              {/* Email */}
              <motion.div
                whileFocus={{ scale: 1.01 }}
              >
                <label className="block mb-3 text-sm font-semibold text-[#1d1d1d] font-manrope">
                  Email Address
                </label>

                <motion.div
                  whileHover={{
                    y: -2,
                  }}
                  className="flex items-center gap-3 border border-gray-300 rounded-2xl px-5 h-16 bg-[#f8f5f0]/80 backdrop-blur-xl focus-within:border-[#BEA163] transition-all duration-500"
                >
                  <Mail
                    className="text-gray-500"
                    size={22}
                  />

                  <input
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    type="email"
                    placeholder="Enter your email"
                    className="bg-transparent outline-none w-full text-lg font-manrope"
                  />
                </motion.div>
              </motion.div>

              {/* Send OTP */}
              <motion.button
                whileHover={{
                  scale: 1.015,
                  y: -2,
                  boxShadow:
                    "0px 20px 40px rgba(0,0,0,0.18)",
                }}
                whileTap={{
                  scale: 0.985,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 14,
                }}
                onClick={submitHandler}
                className="h-15 flex items-center justify-center rounded-2xl bg-[#1d1d1d] text-white text-lg font-semibold cursor-pointer"
              >
                {btnLoading ? <Spinner /> : "Send OTP"}
              </motion.button>

              {/* OTP */}
              <div>
                <label className="block mb-3 text-sm font-semibold text-[#1d1d1d] font-manrope">
                  OTP Verification
                </label>

                <motion.input
                  whileHover={{
                    y: -2,
                  }}
                  type="text"
                  placeholder="Enter OTP"
                  disabled
                  className="w-full h-16 rounded-2xl border cursor-not-allowed border-gray-300 bg-[#f8f5f0]/80 backdrop-blur-xl px-5 outline-none text-lg font-manrope"
                />
              </div>

              {/* Verify */}
              <motion.button
                whileHover={{
                  scale: 1.015,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.985,
                }}
                className="h-15 rounded-2xl bg-[#BEA163] text-black text-lg font-semibold cursor-not-allowed"
              >
                Verify & Continue
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}




















































// import { Loader, Mail, ShieldCheck } from "lucide-react";
// import { useState } from "react";
// import { UserData } from "../context/UserContext.jsx";
// import { useNavigate } from "react-router-dom";
// import { Spinner } from "@/components/ui/spinner";

// export default function Login() {

//   const [email,setEmail] = useState("")
//   const navigate = useNavigate()

//   const { loginUser, btnLoading } = UserData()

//   const submitHandler = () => {
//     loginUser(email , navigate)
//   }


//   return (
//     <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center px-6 py-10">

//       <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-xl">

//         {/* Left Side */}
//         <div className="relative hidden lg:flex flex-col justify-between bg-[#1d1d1d] p-14 text-white overflow-hidden">

//           <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-[#BEA163]/20 blur-3xl" />

//           <div className="relative z-10">

//             <p className="uppercase tracking-[5px] text-[#BEA163] text-sm font-semibold mb-5">
//               Welcome Back
//             </p>

//             <h1 className="text-6xl leading-tight font-bold font-garamond">
//               Login To <br />
//               Mansoori Garment
//             </h1>

//             <p className="mt-8 text-gray-300 text-lg leading-9 font-manrope max-w-md">
//               Access your account to explore premium collections,
//               manage orders, and enjoy a seamless shopping experience.
//             </p>

//           </div>

//           {/* Bottom Card */}
//           <div className="relative z-10 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">

//             <div className="flex items-center gap-4 mb-4">
//               <ShieldCheck className="text-[#BEA163]" size={30} />

//               <h3 className="text-2xl font-semibold font-epilogue">
//                 Secure Login
//               </h3>
//             </div>

//             <p className="text-gray-300 leading-7 font-manrope">
//               Your information is securely protected with encrypted OTP
//               verification.
//             </p>

//           </div>

//         </div>

//         {/* Right Side */}
//         <div className="p-8 md:p-14 flex flex-col justify-center">

//           <div className="max-w-md w-full mx-auto">

//             <p className="uppercase tracking-[4px] text-[#BEA163] text-sm font-semibold mb-4">
//               Account Access
//             </p>

//             <h2 className="text-4xl md:text-5xl font-bold font-epilogue text-[#1d1d1d]">
//               Sign In / Sign Up
//             </h2>

//             <p className="mt-5 text-gray-600 leading-8 font-manrope">
//               Enter your email address to receive a one-time password
//               for secure login.
//             </p>

//             {/* Form */}
//             <div className="mt-10 flex flex-col gap-6">

//               {/* Email */}
//               <div>
//                 <label className="block mb-3 text-sm font-semibold text-[#1d1d1d] font-manrope">
//                   Email Address
//                 </label>

//                 <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-5 h-16 bg-[#f8f5f0] focus-within:border-[#BEA163] transition-all">

//                   <Mail className="text-gray-500" size={22} />

//                   <input
//                   value={email}
//                   onChange={(e)=> setEmail(e.target.value)}
//                     type="email"
//                     placeholder="Enter your email"
//                     className="bg-transparent outline-none w-full text-lg font-manrope"
//                   />

//                 </div>
//               </div>

//               {/* Send OTP Button */}
//               <button onClick={submitHandler}  className="h-15 flex items-center justify-center rounded-2xl bg-[#1d1d1d] text-white text-lg font-semibold hover:bg-black transition-all duration-300 cursor-pointer">
//                 {btnLoading? <Spinner /> :"Send OTP"}
//               </button>

//               {/* OTP */}
//               <div>
//                 <label className="block mb-3 text-sm font-semibold text-[#1d1d1d] font-manrope">
//                   OTP Verification
//                 </label>

//                 <input
//                   type="text"
//                   placeholder="Enter OTP"
//                   disabled
//                   className="w-full h-16 rounded-2xl border cursor-not-allowed border-gray-300  bg-[#f8f5f0] px-5 outline-none text-lg font-manrope focus:border-[#BEA163] transition-all"
//                 />
//               </div>

//               {/* Verify Button */}
//               <button className="h-15 rounded-2xl bg-[#BEA163] text-black text-lg font-semibold hover:opacity-80  transition-all duration-300 cursor-not-allowed">
//                 Verify & Continue
//               </button>

//             </div>

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }