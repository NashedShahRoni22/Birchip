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
import useGetQuery from "@/hooks/queries/useGetQuery";
import Pagination from "@/component/Pagination/Pagination";
import GasSkeleton from "@/component/loaders/GasSkeleton";

const GasStationSection = () => {
  // get gas pricing data
  const { data: apiData, isLoading } = useGetQuery({
    endpoint: "/gas-stations",
    queryKey: ["gas-stations"],
    enabled: true,
  });

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Function to get appropriate icon based on fuel type
  const getFuelIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("premium") || lowerTitle.includes("super")) {
      return <Zap className="h-5 w-5" />;
    } else if (lowerTitle.includes("diesel")) {
      return <Truck className="h-5 w-5" />;
    } else if (lowerTitle.includes("ethanol") || lowerTitle.includes("e85")) {
      return <Droplets className="h-5 w-5" />;
    } else {
      return <Car className="h-5 w-5" />;
    }
  };

  // Function to get color based on fuel type
  const getFuelColor = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes("premium") || lowerTitle.includes("super")) {
      return "bg-purple-500";
    } else if (lowerTitle.includes("diesel")) {
      return "bg-green-500";
    } else if (lowerTitle.includes("ethanol") || lowerTitle.includes("e85")) {
      return "bg-orange-500";
    } else {
      return "bg-blue-500";
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <GasSkeleton />;
  }

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="bg-secondary/60 border-line/20 mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm">
            <Fuel className="text-primary h-4 w-4" />
            <span className="text-muted text-sm font-medium">Live Updates</span>
          </div>
          <h2 className="text-text mb-4 text-4xl font-bold md:text-5xl">
            Current Fuel
            <span className="text-primary block">Market Prices</span>
          </h2>
          <p className="text-muted mx-auto mb-8 max-w-3xl text-xl">
            Stay informed with real-time fuel prices and make smart decisions
            for your journey ahead.
          </p>

          {/* Live indicator */}
          <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-green-600">
              Live • Updated {formatTime(currentTime)}
            </span>
          </div>
        </div>

        {/* Price Cards Grid */}
        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {apiData?.data?.map((fuel) => (
            <div
              key={fuel.id}
              className={`group border-line/20 relative overflow-hidden rounded-2xl border shadow backdrop-blur-xl transition-all duration-500 ${
                fuel.status !== 1 ? "opacity-75" : ""
              }`}
            >
              {/* Status Badge */}
              <div
                className={`absolute top-1.5 right-1.5 z-10 rounded-full px-2 py-1 text-xs font-bold shadow ${
                  fuel.status === 1
                    ? "border border-green-500/30 bg-green-500 text-white"
                    : "border border-red-500/30 bg-red-500 text-white"
                }`}
              >
                {fuel.status === 1 ? "Available" : "Out of Stock"}
              </div>

              {/* Color strip */}
              <div className="bg-primary h-1"></div>

              <div className="p-4 sm:p-6">
                {/* Icon and Type */}
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-primary rounded-xl p-3 text-white">
                    {fuel.icon ? (
                      <img
                        src={fuel.icon}
                        alt={fuel.title}
                        className="h-5 w-5 object-contain"
                      />
                    ) : (
                      getFuelIcon(fuel.title)
                    )}
                  </div>
                  <div>
                    <h3 className="text-text text-base leading-tight font-bold sm:text-lg">
                      {fuel.title}
                    </h3>
                    <div className="text-muted flex items-center gap-1 text-xs">
                      <MapPin className="h-3 w-3" />
                      <span>Per {fuel.unit}</span>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-3">
                  <div className="flex items-end gap-1">
                    <span className="text-primary text-2xl font-bold sm:text-3xl">
                      ${fuel.price.toFixed(2)}
                    </span>
                    <span className="text-muted mb-1 text-sm">
                      /{fuel.unit}
                    </span>
                  </div>
                </div>

                {/* Price Change */}
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    fuel.difference >= 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {fuel.difference >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>
                    {fuel.difference > 0 ? "+" : ""}$
                    {Math.abs(fuel.difference).toFixed(2)} today
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Price Table */}
        <div className="border-line/20 overflow-hidden rounded-2xl border shadow backdrop-blur-xl">
          <div className="border-line/20 border-b p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <Clock className="text-primary h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-text text-lg font-bold">
                    Today's Price History
                  </h3>
                  <p className="text-muted text-sm">
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
                <tr className="border-line/20 bg-secondary/40 border-b">
                  <th className="text-text p-4 text-left text-sm font-semibold">
                    Fuel Type
                  </th>
                  <th className="text-text hidden p-4 text-left text-sm font-semibold sm:table-cell">
                    Morning
                  </th>
                  <th className="text-text hidden p-4 text-left text-sm font-semibold md:table-cell">
                    Afternoon
                  </th>
                  <th className="text-text p-4 text-left text-sm font-semibold">
                    Current
                  </th>
                  <th className="text-text p-4 text-left text-sm font-semibold">
                    Change
                  </th>
                </tr>
              </thead>
              <tbody>
                {apiData?.data?.map((fuel, index) => (
                  <tr
                    key={fuel.id}
                    className={`border-line/10 border-b ${
                      index % 2 === 0 ? "bg-secondary/20" : ""
                    } hover:bg-secondary/40 transition-colors`}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary rounded-lg p-2 text-white">
                          {fuel.icon ? (
                            <img
                              src={fuel.icon}
                              alt={fuel.title}
                              className="h-4 w-4 object-contain"
                            />
                          ) : (
                            getFuelIcon(fuel.title)
                          )}
                        </div>
                        <div>
                          <span className="text-text text-sm font-medium sm:text-base">
                            {fuel.title}
                          </span>
                          <div className="text-muted text-xs sm:hidden">
                            Current: ${fuel.price.toFixed(2)}/{fuel.unit}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="text-muted hidden p-4 text-sm sm:table-cell">
                      ${fuel.morning_price?.toFixed(2) || "N/A"}
                    </td>
                    <td className="text-muted hidden p-4 text-sm md:table-cell">
                      ${fuel.afternoon_price?.toFixed(2) || "N/A"}
                    </td>
                    <td className="p-4">
                      <span className="text-primary text-base font-bold sm:text-lg">
                        ${fuel.price.toFixed(2)}
                      </span>
                    </td>
                    <td className="p-4">
                      <div
                        className={`flex items-center gap-1 text-sm font-medium ${
                          fuel.difference >= 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {fuel.difference >= 0 ? (
                          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                        ) : (
                          <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4" />
                        )}
                        <span className="hidden sm:inline">
                          {fuel.difference > 0 ? "+" : ""}$
                          {Math.abs(fuel.difference).toFixed(2)}
                        </span>
                        <span className="sm:hidden">
                          {fuel.difference >= 0 ? "↑" : "↓"}
                          {Math.abs(fuel.difference).toFixed(2)}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {apiData?.pagination && (
          <div className="mt-8 flex justify-center">
            <Pagination pagination={apiData.pagination} />
          </div>
        )}

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-muted text-sm">
            Prices are updated every 15 minutes • Data sourced from local gas
            stations
          </p>
        </div>
      </div>
    </section>
  );
};

export default GasStationSection;
