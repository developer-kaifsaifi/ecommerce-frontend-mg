import {
  ShieldCheck,
  Lock,
  Eye,
  Database,
  Mail,
  ChevronRight,
} from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#1d1d1d]">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#1d1d1d] text-white px-6 md:px-16 py-24">

        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-[#BEA163]/20 blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">

          <p className="uppercase tracking-[5px] text-[#BEA163] text-sm font-semibold mb-5">
            Privacy & Security
          </p>

          <h1 className="text-5xl md:text-7xl font-bold font-epilogue leading-tight max-w-4xl">
            Your Privacy Matters To Us
          </h1>

          <p className="mt-8 text-gray-300 text-lg leading-9 font-manrope max-w-3xl">
            At Manssori Garment, protecting your personal information
            is our priority. This policy explains how we collect,
            manage, and safeguard your data while delivering a secure
            and seamless shopping experience.
          </p>

        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-16 py-20">

        <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-12">

          {/* Sidebar */}
          <div className="hidden lg:block">

            <div className="sticky top-10 bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

              <h3 className="font-semibold text-lg mb-5 font-epilogue">
                Quick Navigation
              </h3>

              <div className="space-y-4 text-sm font-manrope text-gray-600">

                <p className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  Information Collection
                </p>

                <p className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  Data Usage
                </p>

                <p className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  Security
                </p>

                <p className="flex items-center gap-2">
                  <ChevronRight size={16} />
                  Contact Information
                </p>

              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-10">

            {/* Cards */}
            <div className="grid md:grid-cols-3 gap-6">

              <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-200">
                <ShieldCheck className="mb-5 text-[#BEA163]" size={34} />

                <h3 className="text-xl font-semibold mb-3 font-epilogue">
                  Safe Shopping
                </h3>

                <p className="text-gray-600 leading-7 font-manrope">
                  Your transactions and personal details are securely
                  protected.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-200">
                <Lock className="mb-5 text-[#BEA163]" size={34} />

                <h3 className="text-xl font-semibold mb-3 font-epilogue">
                  Secure Data
                </h3>

                <p className="text-gray-600 leading-7 font-manrope">
                  We use advanced security measures to keep your
                  information private.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-200">
                <Eye className="mb-5 text-[#BEA163]" size={34} />

                <h3 className="text-xl font-semibold mb-3 font-epilogue">
                  Transparency
                </h3>

                <p className="text-gray-600 leading-7 font-manrope">
                  We clearly explain how your information is collected
                  and used.
                </p>
              </div>

            </div>

            {/* Sections */}
            <div className="space-y-8">

              <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-200">

                <div className="flex items-center gap-4 mb-6">
                  <Database className="text-[#BEA163]" size={28} />

                  <h2 className="text-3xl font-semibold font-epilogue">
                    Information We Collect
                  </h2>
                </div>

                <div className="space-y-5 text-gray-700 leading-8 font-manrope">

                  <p>
                    We may collect personal information such as your
                    name, email address, phone number, billing details,
                    and shipping address when you place an order or
                    contact us.
                  </p>

                  <p>
                    We also collect website usage information including
                    browser type, pages visited, and interaction data to
                    improve your experience.
                  </p>

                </div>
              </section>

              <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-200">

                <h2 className="text-3xl font-semibold mb-6 font-epilogue">
                  How We Use Your Information
                </h2>

                <div className="grid md:grid-cols-2 gap-5">

                  {[
                    "Process and deliver your orders",
                    "Provide customer support",
                    "Improve website performance",
                    "Send offers and updates",
                    "Maintain account security",
                    "Enhance shopping experience",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#f8f5f0] rounded-2xl p-5 font-manrope text-gray-700"
                    >
                      {item}
                    </div>
                  ))}

                </div>
              </section>

              <section className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-gray-200">

                <h2 className="text-3xl font-semibold mb-6 font-epilogue">
                  Security & Protection
                </h2>

                <p className="text-gray-700 leading-8 font-manrope">
                  Manssori Garment takes appropriate security measures
                  to protect your personal information from
                  unauthorized access, misuse, or disclosure. While we
                  strive to maintain complete security, no online
                  system can guarantee absolute protection.
                </p>
              </section>

              {/* Contact */}
              <section className="bg-[#1d1d1d] text-white rounded-3xl p-8 md:p-12">

                <div className="flex items-center gap-4 mb-6">
                  <Mail className="text-[#BEA163]" size={28} />

                  <h2 className="text-3xl font-semibold font-epilogue">
                    Contact Us
                  </h2>
                </div>

                <p className="text-gray-300 leading-8 font-manrope max-w-2xl">
                  If you have any questions regarding our Privacy
                  Policy or how your information is handled, feel free
                  to contact us anytime.
                </p>

                <div className="mt-8 inline-flex items-center gap-3 bg-[#BEA163] text-black px-6 py-4 rounded-full font-semibold">
                  info@mansoorigarment.com
                </div>

              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}