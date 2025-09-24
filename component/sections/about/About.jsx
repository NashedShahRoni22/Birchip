import Image from "next/image";
import aboutImg from "@/public/banners/banner (2).jpg";
import Link from "next/link";

export default function About() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50/50 to-teal-50/50 text-gray-800">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-indigo-200/20 blur-3xl filter"></div>
        <div className="absolute -right-20 bottom-1/3 h-96 w-96 rounded-full bg-teal-200/20 blur-3xl filter"></div>
      </div>

      {/* Hero Section */}
      <div className="relative mb-24 min-h-[60vh] w-full overflow-hidden lg:min-h-[90vh]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={aboutImg}
            alt="Birchip Motel & Caravan Park"
            fill
            className="object-cover"
            quality={100}
            priority
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent"></div>

          {/* Text Content */}
          <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-24 md:pb-32 lg:pb-40">
            <div className="mx-auto max-w-4xl space-y-6 text-center">
              <h1 className="to-button bg-gradient-to-r from-white bg-clip-text text-5xl font-bold tracking-tight text-transparent drop-shadow md:text-6xl lg:text-7xl">
                Birchip Motel & Caravan Park
              </h1>
              <p className="mx-auto max-w-2xl text-xl leading-relaxed text-white/90 drop-shadow-md md:text-2xl">
                Welcome to your all-in-one travel companion. We provide
                essential services that make your journey smoother—from motel
                stays to food, parking, and fuel.
              </p>
              <div className="pt-6">
                <Link
                  href={"/motel"}
                  className="from-primary to-button hover:from-button hover:to-primary group inline-flex items-center rounded-full bg-gradient-to-r px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                >
                  Explore Our Services
                  <svg
                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform">
          <div className="h-8 w-8 animate-bounce rounded-full border-4 border-white/50"></div>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
        {/* Services Grid */}
        <div className="mb-24 grid gap-8 md:grid-cols-2">
          {/* Motel & Caravan Booking */}
          <div className="rounded-2xl border border-white/40 bg-white p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
            <div className="mb-4 flex items-start">
              <div className="mr-4 rounded-xl bg-indigo-100/50 p-3">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-balance text-gray-800 md:text-3xl">
                Motel & Caravan Booking
              </h2>
            </div>
            <p className="mb-6 leading-relaxed text-gray-600">
              Whether you're on a road trip or need a restful stop, our
              fully-furnished motel rooms and caravans offer the perfect stay.
              Quick booking, flexible options, and 24/7 support.
            </p>
            <ul className="space-y-2">
              {[
                "Air-conditioned motel rooms",
                "Caravan booking with flexible time slots",
                "Cancelation & instant confirmation",
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg
                    className="mr-2 h-5 w-5 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Food Ordering */}
          <div className="rounded-2xl border border-white/40 bg-white p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
            <div className="mb-4 flex items-start">
              <div className="mr-4 rounded-xl bg-teal-100/50 p-3">
                <svg
                  className="h-8 w-8 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                On-the-Go Food Ordering
              </h2>
            </div>
            <p className="mb-6 leading-relaxed text-gray-600">
              Fuel up with delicious meals while you travel. Order from our
              in-house kitchen with a range of options to satisfy your hunger at
              any time.
            </p>
            <ul className="space-y-2">
              {[
                "Breakfast, lunch, dinner & dessert options",
                "Instant order & pick-up",
                "Freshly cooked, hygienic, and affordable",
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg
                    className="mr-2 h-5 w-5 text-teal-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Gas Station Service */}
          <div className="rounded-2xl border border-white/40 bg-white p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
            <div className="mb-4 flex items-start">
              <div className="mr-4 rounded-xl bg-amber-100/50 p-3">
                <svg
                  className="h-8 w-8 text-amber-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                Gas Station Support
              </h2>
            </div>
            <p className="mb-6 leading-relaxed text-gray-600">
              We provide easy access to fueling stations with transparent
              pricing. Pay directly via the app and avoid long queues.
            </p>
            <ul className="space-y-2">
              {[
                "Available 24/7 across multiple stops",
                "Fast pay-and-go experience",
                "Regular fuel updates in the app",
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg
                    className="mr-2 h-5 w-5 text-amber-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Caravan Parking */}
          <div className="rounded-2xl border border-white/40 bg-white p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">
            <div className="mb-4 flex items-start">
              <div className="mr-4 rounded-xl bg-purple-100/50 p-3">
                <svg
                  className="h-8 w-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 md:text-3xl">
                Caravan Parking Areas
              </h2>
            </div>
            <p className="mb-6 leading-relaxed text-gray-600">
              Safe and spacious parking areas for your caravan. Easily locate,
              book, and manage your parking slot—all from your dashboard.
            </p>
            <ul className="space-y-2">
              {[
                "Secure overnight caravan parking",
                "Water, power, and waste services",
                "Real-time availability & smart alerts",
              ].map((item, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <svg
                    className="mr-2 h-5 w-5 text-purple-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-24 rounded-2xl border border-white/40 bg-white p-12 backdrop-blur-xl">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { number: "10K+", label: "Happy Travelers" },
              { number: "24/7", label: "Support Available" },
              { number: "50+", label: "Service Locations" },
              { number: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div key={index} className="p-4">
                <div className="from-primary to-button mb-2 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent">
                  {stat.number}
                </div>
                <div className="text-lg text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-800">
            Ready for Your Next Journey?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600">
            Join thousands of travelers who trust us for their accommodation,
            dining, and fueling needs on the road.
          </p>
          <button className="from-primary to-button hover:from-button hover:to-primary cursor-pointer rounded-full bg-gradient-to-r px-8 py-3 text-lg font-semibold text-white shadow transition-all duration-300 hover:shadow-lg">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}
