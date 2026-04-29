import {
  Truck,
  Clock3,
  Globe,
  PackageCheck,
  MapPin,
  Mail,
} from "lucide-react";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#1d1d1d]">

      {/* Hero */}
      <div className="relative overflow-hidden bg-[#1d1d1d] text-white px-6 md:px-16 py-24">

        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-[#BEA163]/20 blur-3xl" />

        <div className="max-w-6xl mx-auto relative z-10">

          <p className="uppercase tracking-[5px] text-[#BEA163] text-sm font-semibold mb-5">
            Delivery & Shipping
          </p>

          <h1 className="text-5xl md:text-7xl font-bold font-epilogue leading-tight max-w-4xl">
            Shipping Policy
          </h1>

          <p className="mt-8 text-gray-300 text-lg leading-9 font-manrope max-w-3xl">
            At Manssori Garment, we ensure every order is packed with
            care and delivered as quickly as possible. Below you’ll
            find complete details regarding shipping, delivery, and
            order tracking.
          </p>

        </div>
      </div>

      {/* Main */}
      <div className="px-6 md:px-16 py-20">

        <div className="max-w-6xl mx-auto space-y-10">

          {/* Top Cards */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <Clock3 className="text-[#BEA163] mb-5" size={34} />

              <h3 className="text-2xl font-semibold mb-3 font-epilogue">
                Fast Processing
              </h3>

              <p className="text-gray-600 leading-7 font-manrope">
                Orders are usually processed within 2–5 business days.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <Truck className="text-[#BEA163] mb-5" size={34} />

              <h3 className="text-2xl font-semibold mb-3 font-epilogue">
                Reliable Delivery
              </h3>

              <p className="text-gray-600 leading-7 font-manrope">
                We work with trusted courier partners for secure and
                timely delivery.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">
              <PackageCheck
                className="text-[#BEA163] mb-5"
                size={34}
              />

              <h3 className="text-2xl font-semibold mb-3 font-epilogue">
                Order Tracking
              </h3>

              <p className="text-gray-600 leading-7 font-manrope">
                Track your shipment easily through the tracking details
                shared after dispatch.
              </p>
            </div>

          </div>

          {/* Shipping Details */}
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Left */}
            <div className="space-y-8">

              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">

                <h2 className="text-3xl font-semibold mb-5 font-epilogue">
                  Processing Time
                </h2>

                <p className="text-gray-700 leading-8 font-manrope">
                  Orders are typically prepared and processed within
                  2–5 business days. During festive seasons or sale
                  periods, processing may require additional time.
                </p>
              </section>

              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">

                <div className="flex items-center gap-4 mb-5">
                  <MapPin className="text-[#BEA163]" size={28} />

                  <h2 className="text-3xl font-semibold font-epilogue">
                    Shipping Costs
                  </h2>
                </div>

                <p className="text-gray-700 leading-8 font-manrope">
                  Shipping charges are calculated automatically during
                  checkout based on order weight and delivery location.
                </p>
              </section>

              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">

                <h2 className="text-3xl font-semibold mb-5 font-epilogue">
                  Address Accuracy
                </h2>

                <p className="text-gray-700 leading-8 font-manrope">
                  Please ensure all shipping details are entered
                  correctly to avoid delays or failed deliveries.
                  Manssori Garment is not responsible for incorrect
                  addresses submitted by customers.
                </p>
              </section>

            </div>

            {/* Right */}
            <div className="space-y-8">

              <section className="bg-[#1d1d1d] text-white rounded-3xl p-8 md:p-10">

                <div className="flex items-center gap-4 mb-6">
                  <Globe className="text-[#BEA163]" size={30} />

                  <h2 className="text-3xl font-semibold font-epilogue">
                    Shipping Time
                  </h2>
                </div>

                <div className="space-y-6 font-manrope">

                  <div className="border border-white/10 rounded-2xl p-5">
                    <h3 className="text-xl font-semibold mb-2">
                      Domestic Orders
                    </h3>

                    <p className="text-gray-300 leading-7">
                      Orders within India are usually delivered within
                      3–10 business days.
                    </p>
                  </div>

                  <div className="border border-white/10 rounded-2xl p-5">
                    <h3 className="text-xl font-semibold mb-2">
                      International Orders
                    </h3>

                    <p className="text-gray-300 leading-7">
                      International deliveries may take 15–30 business
                      days depending on customs and destination.
                    </p>
                  </div>

                </div>
              </section>

              <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200">

                <h2 className="text-3xl font-semibold mb-5 font-epilogue">
                  Delivery Issues
                </h2>

                <p className="text-gray-700 leading-8 font-manrope">
                  If your order is delayed or lost during transit,
                  please contact us immediately with your order details.
                  Our team will coordinate with the courier partner to
                  resolve the issue quickly.
                </p>
              </section>

              <section className="bg-[#BEA163] rounded-3xl p-8">

                <div className="flex items-center gap-4 mb-5">
                  <Mail size={28} />

                  <h2 className="text-3xl font-semibold font-epilogue">
                    Contact Us
                  </h2>
                </div>

                <p className="leading-8 font-manrope text-black/80">
                  Have questions regarding shipping or delivery? Reach
                  out to us anytime.
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