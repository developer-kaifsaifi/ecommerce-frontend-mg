import {
  Shield,
  FileText,
  CreditCard,
  Truck,
  Ban,
  Scale,
  Mail,
} from "lucide-react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#1d1d1d]">

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-[#1d1d1d] text-white px-6 md:px-16 py-24">

        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-[#BEA163]/20 blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">

          <p className="uppercase tracking-[5px] text-[#BEA163] text-sm font-semibold mb-5">
            Legal Information
          </p>

          <h1 className="text-5xl md:text-7xl font-bold font-epilogue leading-tight max-w-4xl">
            Terms & Conditions
          </h1>

          <p className="mt-8 text-gray-300 text-lg leading-9 font-manrope max-w-3xl">
            These Terms & Conditions explain the rules, policies, and
            responsibilities related to using the Mansoori Garment
            website and services.
          </p>

        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 md:px-16 py-20">

        <div className="max-w-6xl mx-auto space-y-10">

          {/* Top Info Cards */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <Shield className="text-[#BEA163] mb-5" size={34} />

              <h3 className="text-2xl font-semibold mb-3 font-epilogue">
                Secure Shopping
              </h3>

              <p className="text-gray-600 leading-7 font-manrope">
                Your orders and account information are handled with
                care and security.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <Scale className="text-[#BEA163] mb-5" size={34} />

              <h3 className="text-2xl font-semibold mb-3 font-epilogue">
                Fair Policies
              </h3>

              <p className="text-gray-600 leading-7 font-manrope">
                We maintain transparent policies for all customers and
                website users.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <FileText className="text-[#BEA163] mb-5" size={34} />

              <h3 className="text-2xl font-semibold mb-3 font-epilogue">
                Clear Terms
              </h3>

              <p className="text-gray-600 leading-7 font-manrope">
                Please read these terms carefully before using our
                services or placing orders.
              </p>
            </div>

          </div>

          {/* Sections */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left Side */}
            <div className="space-y-8">

              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">

                <h2 className="text-3xl font-semibold mb-5 font-epilogue">
                  General Terms
                </h2>

                <div className="space-y-4 text-gray-700 leading-8 font-manrope">

                  <p>
                    These terms apply to all visitors, customers, and
                    users of the Mansoori Garment website.
                  </p>

                  <p>
                    By accessing or using our website, you agree to
                    comply with these Terms & Conditions.
                  </p>

                </div>
              </section>

              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">

                <div className="flex items-center gap-4 mb-5">
                  <CreditCard className="text-[#BEA163]" size={28} />

                  <h2 className="text-3xl font-semibold font-epilogue">
                    Orders & Payments
                  </h2>
                </div>

                <div className="space-y-4 text-gray-700 leading-8 font-manrope">

                  <p>
                    All orders are subject to acceptance and
                    availability.
                  </p>

                  <p>
                    Prices and product details may change without prior
                    notice.
                  </p>

                  <p>
                    Payments must be completed before orders are
                    processed and shipped.
                  </p>

                </div>
              </section>

              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">

                <div className="flex items-center gap-4 mb-5">
                  <Truck className="text-[#BEA163]" size={28} />

                  <h2 className="text-3xl font-semibold font-epilogue">
                    Shipping & Delivery
                  </h2>
                </div>

                <p className="text-gray-700 leading-8 font-manrope">
                  We strive to deliver every order on time. However,
                  delivery schedules may vary depending on location,
                  courier service, or external circumstances.
                </p>
              </section>

            </div>

            {/* Right Side */}
            <div className="space-y-8">

              <section className="bg-[#1d1d1d] text-white rounded-3xl p-8 md:p-10">

                <div className="flex items-center gap-4 mb-6">
                  <Ban className="text-[#BEA163]" size={30} />

                  <h2 className="text-3xl font-semibold font-epilogue">
                    Returns & Refunds
                  </h2>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

                  <h3 className="text-2xl font-semibold mb-3">
                    Currently Not Available
                  </h3>

                  <p className="text-gray-300 leading-8 font-manrope">
                    Mansoori Garment currently does not provide return
                    or refund services. Please review product details
                    carefully before placing an order.
                  </p>

                </div>
              </section>

              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">

                <h2 className="text-3xl font-semibold mb-5 font-epilogue">
                  Website Usage
                </h2>

                <ul className="space-y-4 text-gray-700 leading-8 font-manrope list-disc pl-6">

                  <li>
                    Do not misuse or attempt unauthorized access to our
                    website.
                  </li>

                  <li>
                    Avoid activities that may harm website performance
                    or security.
                  </li>

                  <li>
                    All website content belongs to Mansoori Garment and
                    cannot be copied without permission.
                  </li>

                </ul>
              </section>

              <section className="bg-[#BEA163] rounded-3xl p-8">

                <div className="flex items-center gap-4 mb-5">
                  <Mail size={28} />

                  <h2 className="text-3xl font-semibold font-epilogue">
                    Contact Us
                  </h2>
                </div>

                <p className="leading-8 font-manrope text-black/80">
                  If you have questions regarding our Terms &
                  Conditions, feel free to contact us anytime.
                </p>

                <div className="mt-6 inline-flex bg-black text-white px-6 py-4 rounded-full font-semibold">
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