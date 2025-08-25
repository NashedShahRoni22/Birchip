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
  MapPin,
} from "lucide-react";

export default function ServicesSection() {
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

  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-[#B63D5E]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-[#95A996]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#603C59]/3 to-[#F5E6CE]/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white backdrop-blur-sm px-4 py-2 rounded-full border border-line/20 mb-6">
            <Star className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted">
              Our Premium Services
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Everything You Need in
            <span className="block bg-gradient-to-r from-[#B63D5E] to-[#603C59] bg-clip-text text-transparent">
              One Place
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            From comfortable accommodation to delicious meals and fuel services,
            we've got your complete travel experience covered with premium
            quality and exceptional service.
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group relative">
              {/* Minimal Card */}
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/30 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                {/* Subtle Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Clean Icon */}
                  <div className="mb-6">
                    <div
                      className={`w-16 h-16 ${service.iconBg} rounded-xl flex items-center justify-center transition-colors duration-300`}
                    >
                      <service.icon
                        className={`w-8 h-8 ${service.accentColor} transition-colors duration-300`}
                      />
                    </div>
                  </div>

                  {/* Clean Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#603C59] transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Clean Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
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
                            className={`w-1.5 h-1.5 bg-primary rounded-full mr-3`}
                          ></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Clean Button */}
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#B63D5E] to-[#603C59] px-6 py-3 rounded-xl font-semibold text-white transition-colors duration-300 hover:from-[#603C59] hover:to-[#B63D5E] group/button"
                  >
                    <span>{service.buttonText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
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
