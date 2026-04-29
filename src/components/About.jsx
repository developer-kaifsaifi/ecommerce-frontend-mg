export default function About() {
  return (
    <div className="min-h-screen bg-[#f8f5f0] text-[#1d1d1d] px-6 md:px-16 py-16">

      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-16">
          <p className="uppercase tracking-[4px] text-sm text-[#BEA163] font-semibold mb-4">
            About Us
          </p>

          <h1 className="text-4xl md:text-6xl font-bold font-epilogue leading-tight">
            Welcome to Manssori Garment
          </h1>

          <p className="mt-8 text-lg text-gray-700 leading-9 font-manrope max-w-4xl">
            At Manssori Garment, we believe fashion should combine
            comfort, confidence, and timeless style. Our mission is to
            provide modern gentlemen with premium-quality Blazers,
            Shirts, T-Shirts, Linen Outfits, Footwear, and other
            fashion essentials designed with attention to detail and
            superior craftsmanship.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-16">

          {/* Story */}
          <section>
            <h2 className="text-3xl font-semibold mb-6 font-epilogue">
              Our Story
            </h2>

            <p className="text-gray-700 leading-9 font-manrope text-lg">
              Founded with a passion for style and quality, Manssori
              Garment has become a trusted name for men who appreciate
              elegance and modern fashion. We believe clothing is more
              than just an outfit — it reflects personality, lifestyle,
              and confidence.
            </p>
          </section>

          {/* Commitment */}
          <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm">
            <h2 className="text-3xl font-semibold mb-6 font-epilogue">
              Our Commitment
            </h2>

            <p className="text-gray-700 leading-9 font-manrope text-lg">
              Every product at Manssori Garment is carefully selected
              and crafted to meet the highest standards of quality and
              style. From fabric selection to final finishing, we focus
              on delivering outfits that make you look and feel your
              best for every occasion.
            </p>
          </section>

          {/* Difference */}
          <section>
            <h2 className="text-3xl font-semibold mb-6 font-epilogue">
              Why Choose Manssori Garment
            </h2>

            <p className="text-gray-700 leading-9 font-manrope text-lg">
              Whether you are dressing for a formal event, casual
              outing, or everyday wear, Manssori Garment offers styles
              that blend sophistication with comfort. Our collection is
              designed to help you create a lasting impression with
              confidence and class.
            </p>
          </section>

          {/* Journey */}
          <section className="border-l-4 border-[#BEA163] pl-8">
            <h2 className="text-3xl font-semibold mb-6 font-epilogue">
              Join Our Journey
            </h2>

            <p className="text-gray-700 leading-9 font-manrope text-lg">
              Thank you for being part of the Manssori Garment family.
              We are committed to bringing you premium fashion and an
              exceptional shopping experience every step of the way.
            </p>
          </section>

          {/* Connect */}
          <section className="bg-[#1d1d1d] text-white rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl font-semibold mb-6 font-epilogue">
              Connect With Us
            </h2>

            <p className="leading-9 font-manrope text-lg text-gray-300">
              Stay updated with our newest arrivals, exclusive
              collections, and special offers by following Manssori
              Garment on social media. Become a part of our growing
              fashion community.
            </p>

            <div className="flex gap-4 mt-8">
              <button className="px-6 py-3 rounded-full bg-[#BEA163] text-black font-semibold cursor-pointer">
                Instagram
              </button>

              <button className="px-6 py-3 rounded-full border border-white cursor-pointer">
                Facebook
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}