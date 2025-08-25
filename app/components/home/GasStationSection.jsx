"use client";
import React, { useState, useEffect } from "react";
import {
  Fuel,
  TrendingUp,
  TrendingDown,
  MapPin,
  Clock,
  Zap,
  Droplets,
  Car,
  Truck,
} from "lucide-react";

const GasStationSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Sample gas/oil prices data
  const fuelPrices = [
    {
      id: 1,
      type: "Regular Unleaded",
      icon: <Car className="w-5 h-5" />,
      price: 3.45,
      change: +0.12,
      trending: "up",
      color: "bg-blue-500",
      available: true,
    },
    {
      id: 2,
      type: "Premium Unleaded",
      icon: <Zap className="w-5 h-5" />,
      price: 3.89,
      change: +0.08,
      trending: "up",
      color: "bg-purple-500",
      available: true,
    },
    {
      id: 3,
      type: "Diesel",
      icon: <Truck className="w-5 h-5" />,
      price: 3.67,
      change: -0.05,
      trending: "down",
      color: "bg-green-500",
      available: true,
    },
    {
      id: 4,
      type: "E85 Ethanol",
      icon: <Droplets className="w-5 h-5" />,
      price: 2.89,
      change: +0.03,
      trending: "up",
      color: "bg-orange-500",
      available: false,
    },
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-secondary/60 backdrop-blur-sm px-4 py-2 rounded-full border border-line/20 mb-6">
            <Fuel className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted">Live Updates</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Current Fuel
            <span className="block text-primary">Market Prices</span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto mb-8">
            Stay informed with real-time fuel prices and make smart decisions
            for your journey ahead.
          </p>

          {/* Live indicator */}
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-600">
              Live • Updated {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* Price Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {fuelPrices.map((fuel) => (
            <div
              key={fuel.id}
              className={`group relative backdrop-blur-xl rounded-2xl border border-line/20 shadow transition-all duration-500 overflow-hidden ${
                !fuel.available ? "opacity-75" : ""
              }`}
            >
              {/* Status Badge */}
              <div
                className={`absolute top-1.5 right-1.5 z-10 px-2 py-1 rounded-full text-xs font-bold shadow ${
                  fuel.available
                    ? "bg-green-500 text-white border border-green-500/30"
                    : "bg-red-500 text-white border border-red-500/30"
                }`}
              >
                {fuel.available ? "Available" : "Out of Stock"}
              </div>

              {/* Color strip */}
              <div className={`h-1 ${fuel.color}`}></div>

              <div className="p-4 sm:p-6">
                {/* Icon and Type */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl ${fuel.color} text-white`}>
                    {fuel.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-text leading-tight">
                      {fuel.type}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted">
                      <MapPin className="w-3 h-3" />
                      <span>Per Gallon</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-end gap-1">
                    <span className="text-2xl sm:text-3xl font-bold text-primary">
                      ${fuel.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-muted mb-1">/gal</span>
                  </div>
                </div>

                {/* Price Change */}
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    fuel.trending === "up" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {fuel.trending === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>
                    {fuel.change > 0 ? "+" : ""}$
                    {Math.abs(fuel.change).toFixed(2)} today
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Price Table */}
        <div className=" backdrop-blur-xl rounded-2xl border border-line/20 shadow overflow-hidden">
          <div className="p-6 border-b border-line/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text">
                    Today's Price History
                  </h3>
                  <p className="text-sm text-muted">
                    Last updated: {formatTime(currentTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-line/20 bg-secondary/40">
                  <th className="text-left p-4 text-sm font-semibold text-text">
                    Fuel Type
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-text hidden sm:table-cell">
                    Morning
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-text hidden md:table-cell">
                    Afternoon
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-text">
                    Current
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-text">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {fuelPrices.map((fuel, index) => (
                  <tr
                    key={fuel.id}
                    className={`border-b border-line/10 ${
                      index % 2 === 0 ? "bg-secondary/20" : ""
                    } hover:bg-secondary/40 transition-colors`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${fuel.color} text-white`}
                        >
                          {fuel.icon}
                        </div>
                        <div>
                          <span className="font-medium text-text text-sm sm:text-base">
                            {fuel.type}
                          </span>
                          <div className="text-xs text-muted sm:hidden">
                            Current: ${fuel.price.toFixed(2)}/gal
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-muted text-sm hidden sm:table-cell">
                      ${(fuel.price - 0.03).toFixed(2)}
                    </td>
                    <td className="p-4 text-muted text-sm hidden md:table-cell">
                      ${(fuel.price - 0.01).toFixed(2)}
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-primary text-base sm:text-lg">
                        ${fuel.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                          fuel.trending === "up"
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {fuel.trending === "up" ? (
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                        <span className="hidden sm:inline">
                          {fuel.change > 0 ? "+" : ""}$
                          {Math.abs(fuel.change).toFixed(2)}
                        </span>
                        <span className="sm:hidden">
                          {fuel.change > 0 ? "↑" : "↓"}
                          {Math.abs(fuel.change).toFixed(2)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted">
            Prices are updated every 15 minutes • Data sourced from local gas
            stations
          </p>
        </div>
      </div>
    </section>
  );
};

export default GasStationSection;
