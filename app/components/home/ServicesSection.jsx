'use client';

import Link from 'next/link';
import { Bed, Truck, DollarSign, UtensilsCrossed, ArrowRight, Star } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: Bed,
      title: 'Motel Booking',
      description: 'Book comfortable motel rooms and caravan spots with modern amenities. Perfect for travelers seeking quality accommodation.',
      features: ['24/7 Check-in', 'Free WiFi', 'Air Conditioning', 'Private Bathroom'],
      link: '/motel',
      buttonText: 'Book Room',
      gradient: 'from-[#B63D5E]/20 to-[#603C59]/20',
    },
    {
      icon: Truck,
      title: 'Caravan Booking',
      description: 'Secure and spacious caravan parking spots with electrical hookups and water access. Ideal for road trip adventures.',
      features: ['Power Hookups', 'Water Access', 'Dump Station', 'Security'],
      link: '/caravan',
      buttonText: 'Reserve Spot',
      gradient: 'from-[#603C59]/20 to-[#95A996]/20',
    },
    {
      icon: DollarSign,
      title: 'Gas Station Prices',
      description: 'Check real-time fuel prices and save money on your journey. Compare prices and find the best deals.',
      features: ['Real-time Prices', 'Price Comparison', 'Fuel Calculator', 'Location Map'],
      link: '/gas',
      buttonText: 'View Prices',
      gradient: 'from-[#95A996]/20 to-[#B63D5E]/20',
    },
    {
      icon: UtensilsCrossed,
      title: 'Food Ordering',
      description: 'Order delicious meals from our restaurant. Fresh ingredients and authentic flavors delivered to your room.',
      features: ['Online Menu', 'Room Service', 'Fresh Ingredients', 'Quick Delivery'],
      link: '/food',
      buttonText: 'Order Now',
      gradient: 'from-[#B63D5E]/20 to-[#F5E6CE]/20',
    },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(96,60,89,0.1),transparent_50%)]"></div> */}
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(123,166,147,0.1),transparent_50%)]"></div> */}

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary backdrop-blur-sm px-4 py-2 rounded-full border border-line/20 mb-6">
            <Star className="w-4 h-4 text-info" />
            <span className="text-sm font-medium text-primary">Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Everything You Need in
            <span className="block text-primary">
              One Place
            </span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            From comfortable accommodation to delicious meals and fuel services,
            we've got your travel needs covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Card */}
              <div className="relative backdrop-blur-xl rounded-2xl p-8 border border-line/20 shadow hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 h-full">
                {/* Gradient Background */}
                {/* <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div> */}

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-secondary/60 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-line/20 group-hover:bg-secondary/80 transition-all duration-300">
                      <service.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors duration-300" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-text mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-muted">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <Link
                    href={service.link}
                    className="inline-flex items-center gap-2 bg-primary backdrop-blur-sm px-6 py-3 rounded-xl font-semibold hover:bg-button text-white transition-all duration-300 transform border border-line/20 group/button"
                  >
                    {service.buttonText}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/button:translate-x-1" />
                  </Link>
                </div>

                {/* Shine Effect */}
                {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}