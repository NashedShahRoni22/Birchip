"use client";

import Link from "next/link";
import {
  Bed,
  Truck,
  Car,
  DollarSign,
  UtensilsCrossed,
  ArrowRight,
  Star,
} from "lucide-react";

const services = [
  {
    icon: Bed,
    title: "Motel Booking",
    description:
      "Book comfortable motel rooms with modern amenities and exceptional service. Perfect for travelers seeking quality accommodation.",
    features: [
      "24/7 Check-in",
      "Free WiFi",
      "Air Conditioning",
      "Private Bathroom",
    ],
    link: "/motels",
    buttonText: "Book Room",
    gradient: "from-[#B63D5E]/10 to-[#603C59]/10",
    accentColor: "text-[#B63D5E]",
    iconBg: "bg-[#B63D5E]/10",
    iconHover: "group-hover:bg-[#B63D5E]/20",
  },
  {
    icon: Car,
    title: "Caravan Booking",
    description:
      "Rent fully-equipped caravans for your road trip adventure. Modern facilities and comfortable interiors for memorable journeys.",
    features: [
      "Fully Equipped",
      "Kitchen & Bathroom",
      "Sleeping Arrangements",
      "GPS Navigation",
    ],
    link: "/caravans",
    buttonText: "Rent Caravan",
    gradient: "from-[#603C59]/10 to-[#95A996]/10",
    accentColor: "text-[#603C59]",
    iconBg: "bg-[#603C59]/10",
    iconHover: "group-hover:bg-[#603C59]/20",
  },
  {
    icon: Truck,
    title: "Caravan Parking",
    description:
      "Secure and spacious caravan parking spots with electrical hookups and water access. Ideal for extended stays.",
    features: [
      "Power Hookups",
      "Water Access",
      "Dump Station",
      "24/7 Security",
    ],
    link: "/caravan-parking",
    buttonText: "Reserve Spot",
    gradient: "from-[#95A996]/10 to-[#F5E6CE]/10",
    accentColor: "text-[#95A996]",
    iconBg: "bg-[#95A996]/10",
    iconHover: "group-hover:bg-[#95A996]/20",
  },
  {
    icon: DollarSign,
    title: "Gas Station Prices",
    description:
      "Check real-time fuel prices and save money on your journey. Compare prices across different stations and find the best deals.",
    features: [
      "Real-time Prices",
      "Price Comparison",
      "Fuel Calculator",
      "Station Locator",
    ],
    link: "/gas-stations",
    buttonText: "View Prices",
    gradient: "from-[#F5E6CE]/10 to-[#B63D5E]/10",
    accentColor: "text-[#F5A623]",
    iconBg: "bg-[#F5A623]/10",
    iconHover: "group-hover:bg-[#F5A623]/20",
  },
  {
    icon: UtensilsCrossed,
    title: "Food Ordering",
    description:
      "Order delicious meals from our restaurant menu. Fresh ingredients and authentic flavors delivered directly to your room.",
    features: [
      "Online Menu",
      "Room Service",
      "Fresh Ingredients",
      "Quick Delivery",
    ],
    link: "/foods",
    buttonText: "Order Food",
    gradient: "from-[#B63D5E]/10 to-[#603C59]/10",
    accentColor: "text-[#B63D5E]",
    iconBg: "bg-[#B63D5E]/10",
    iconHover: "group-hover:bg-[#B63D5E]/20",
  },
];

export default function ServicesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white py-20">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-[#B63D5E]/5 to-transparent blur-3xl"></div>
        <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tl from-[#95A996]/5 to-transparent blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-r from-[#603C59]/3 to-[#F5E6CE]/3 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Enhanced Section Header */}
        <div className="mb-20 text-center">
          <div className="border-line/20 mb-6 inline-flex items-center gap-2 rounded-full border bg-white px-4 py-2 backdrop-blur-sm">
            <Star className="text-primary h-4 w-4" />
            <span className="text-muted text-sm font-medium">
              Our Premium Services
            </span>
          </div>

          <h2 className="mb-6 text-5xl leading-tight font-bold text-gray-900 md:text-6xl">
            Everything You Need in
            <span className="block bg-gradient-to-r from-[#B63D5E] to-[#603C59] bg-clip-text text-transparent">
              One Place
            </span>
          </h2>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-600">
            From comfortable accommodation to delicious meals and fuel services,
            we've got your complete travel experience covered with premium
            quality and exceptional service.
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div key={index} className="group relative flex h-full">
              {" "}
              {/* Added flex here */}
              {/* Minimal Card */}
              <div className="relative flex flex-1 flex-col rounded-2xl border border-gray-200/30 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md">
                {" "}
                {/* Added flex-1 flex flex-col */}
                {/* Subtle Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-50`}
                ></div>
                {/* Content */}
                <div className="relative z-10 flex flex-1 flex-col">
                  {" "}
                  {/* Added flex-1 */}
                  <div className="flex-1">
                    {" "}
                    {/* This will now expand properly */}
                    {/* Clean Icon */}
                    <div className="mb-6">
                      <div
                        className={`h-16 w-16 ${service.iconBg} flex items-center justify-center rounded-xl transition-colors duration-300`}
                      >
                        <service.icon
                          className={`h-8 w-8 ${service.accentColor} transition-colors duration-300`}
                        />
                      </div>
                    </div>
                    {/* Clean Title */}
                    <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[#603C59]">
                      {service.title}
                    </h3>
                    {/* Clean Description */}
                    <p className="mb-6 leading-relaxed text-gray-600">
                      {service.description}
                    </p>
                    {/* Clean Features List */}
                    <div className="mb-8">
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-sm text-gray-600"
                          >
                            <div
                              className={`bg-primary mr-3 h-1.5 w-1.5 rounded-full`}
                            ></div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Clean Button - This will now stick to bottom */}
                  <Link
                    href={service.link}
                    className="group/button inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#B63D5E] to-[#603C59] px-6 py-3 font-semibold text-white transition-colors duration-300 hover:from-[#603C59] hover:to-[#B63D5E]"
                  >
                    <span>{service.buttonText}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
