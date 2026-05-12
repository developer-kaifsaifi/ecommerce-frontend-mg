import { Mail, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { UserData } from "../context/UserContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "./ui/spinner.jsx";


export default function Verify() {

  const location = useLocation();
  const navigate = useNavigate()

  const { loginUser, verifyUser, btnLoading } = UserData()

const email = location.state?.email || "";

const [timer, setTimer] = useState(90)
const [canResend, setCanResend] = useState(false)
const [resendLoading, setResendLoading] = useState(false);
const [verifyLoading, setVerifyLoading] = useState(false);

useEffect(()=>{
  if(timer>0){
    const interval = setInterval(()=>{
      setTimer((prev) => prev - 1)
    },1000)

    return () => clearInterval(interval)
  } else{
    setCanResend(true)
  }
},[timer]);


const formatTime = (time) => {
  const minutes = Math.floor(time/60)
  const seconds = time % 60

  return `${String(minutes).padStart("2",0)}:${String(seconds).padStart("2",0)} `
}

  const [otp,setOtp] = useState("")

useEffect(() => {
  if (!email) {
    navigate("/login");
  }
}, [email, navigate]);


const submitHandler = async () => {
  try {
    setVerifyLoading(true);

    await verifyUser(Number(otp), navigate);
  } finally {
    setVerifyLoading(false);
  }
};

const handleResendOtp = async () => {
  try {
    setResendLoading(true);

    const email = localStorage.getItem("email");

    await loginUser(email, navigate);

    setTimer(90);
    setCanResend(false);
  } finally {
    setResendLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#f4f1ea] flex items-center justify-center px-6 py-10">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-xl">

        {/* Left Side */}
        <div className="relative hidden lg:flex flex-col justify-between bg-[#1d1d1d] p-14 text-white overflow-hidden">

          <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-[#BEA163]/20 blur-3xl" />

          <div className="relative z-10">

            <p className="uppercase tracking-[5px] text-[#BEA163] text-sm font-semibold mb-5">
              Welcome Back
            </p>

            <h1 className="text-6xl leading-tight font-bold font-garamond">
              Login To <br />
              Thread & Grace
            </h1>

            <p className="mt-8 text-gray-300 text-lg leading-9 font-manrope max-w-md">
              Access your account to explore premium collections,
              manage orders, and enjoy a seamless shopping experience.
            </p>

          </div>

          {/* Bottom Card */}
          <div className="relative z-10 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-sm">

            <div className="flex items-center gap-4 mb-4">
              <ShieldCheck className="text-[#BEA163]" size={30} />

              <h3 className="text-2xl font-semibold font-epilogue">
                Secure Login
              </h3>
            </div>

            <p className="text-gray-300 leading-7 font-manrope">
              Your information is securely protected with encrypted OTP
              verification.
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div className="p-8 md:p-14 flex flex-col justify-center">

          <div className="max-w-md w-full mx-auto">

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
              <div>
                <label className="block mb-3 text-sm font-semibold text-[#1d1d1d] font-manrope">
                  Email Address
                </label>

                <div className="flex items-center gap-3 border border-gray-300 rounded-2xl px-5 h-16 bg-[#f8f5f0] focus-within:border-[#BEA163] transition-all">

                  <Mail className="text-gray-500" size={22} />

                  <input

                  disabled
                  value={email}
                 
                    type="email"
                    placeholder="Enter your email"
                    className="cursor-not-allowed bg-transparent outline-none w-full text-lg font-manrope"
                  />

                </div>
              </div>

              {/* Send OTP Button */}
              <button disabled  className="cursor-not-allowed h-15 rounded-2xl bg-[#3e3e3e] text-white text-lg font-semibold transition-all duration-300">
                Send OTP
              </button>

              {/* OTP */}
              <div>
                <label className="block mb-3 text-sm font-semibold text-[#1d1d1d] font-manrope">
                  OTP Verification
                </label>

                <input
                  type="text"
inputMode="numeric"
                  value={otp}
                  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, "");
    
    if (value.length <= 6) {
      setOtp(value);
    }
  }}
                  placeholder="Enter OTP"
                  className="w-full h-16 rounded-2xl border border-gray-300 bg-[#f8f5f0] px-5 outline-none text-lg font-manrope focus:border-[#BEA163] transition-all"
                />
              </div>


              {/* Timer + Resend */}
<div className="flex items-center justify-between px-1">
  
  <p className="text-sm text-gray-500 font-manrope">
    {canResend ? (
      "Didn't receive OTP?"
    ) : (
      <>
        Resend OTP in{" "}
        <span className="font-semibold text-[#BEA163]">
          {formatTime(timer)}
        </span>
      </>
    )}
  </p>

<button
  disabled={!canResend || resendLoading || verifyLoading}
  onClick={handleResendOtp}
  className={`
    text-sm font-semibold transition-all duration-300
    flex items-center gap-2
    ${
      canResend &&
      !resendLoading &&
      !verifyLoading
        ? "text-[#BEA163] hover:opacity-80 cursor-pointer"
        : "text-gray-400 cursor-not-allowed"
    }
  `}
>
  {resendLoading ? (
    <>
      <Spinner className="scale-75" />
      Sending...
    </>
  ) : (
    "Resend"
  )}
</button>

</div>

              {/* Verify Button */}
<button
  onClick={submitHandler}
  disabled={verifyLoading}
  className={`
    h-15 rounded-2xl text-lg font-semibold transition-all duration-300
    flex items-center justify-center gap-3
    ${
      verifyLoading
        ? "bg-[#d4b57a] cursor-not-allowed"
        : "bg-[#BEA163] hover:opacity-90 cursor-pointer"
    }
    text-black
  `}
>
  {verifyLoading ? (
    <>
      <Spinner className="scale-90" />
      Verifying...
    </>
  ) : (
    "Verify & Continue"
  )}
</button>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}