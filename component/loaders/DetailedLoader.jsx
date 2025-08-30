import React from "react";

const DetailedLoader = () => {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
              <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery Skeleton */}
            <div className="relative">
              {/* Main Image */}
              <div className="relative h-96 bg-gray-200 rounded-2xl overflow-hidden">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full"></div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-16 h-6 bg-black/20 rounded-full"></div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-20 h-16 bg-gray-200 rounded-lg"
                  ></div>
                ))}
              </div>
            </div>

            {/* Details Skeleton */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4 justify-between mb-4">
                  <div className="flex-1">
                    {/* Title */}
                    <div className="w-3/4 h-8 bg-gray-200 rounded mb-2"></div>

                    {/* Address and capacity */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="w-48 h-4 bg-gray-200 rounded"></div>
                      <div className="w-32 h-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>

                  <div className="text-right">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-1 justify-end">
                      <div className="w-5 h-5 bg-gray-200 rounded"></div>
                      <div className="w-8 h-4 bg-gray-200 rounded"></div>
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </div>
                    {/* Popular badge */}
                    <div className="w-24 h-6 bg-gray-200 rounded-full ml-auto"></div>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="text-center">
                      <div className="w-6 h-6 bg-gray-200 rounded mx-auto mb-2"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded mx-auto mb-1"></div>
                      <div className="w-20 h-3 bg-gray-200 rounded mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities Skeleton */}
              <div className="mb-6">
                <div className="w-32 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-5 h-5 bg-gray-200 rounded"></div>
                      <div className="w-20 h-4 bg-gray-200 rounded"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description Skeleton */}
              <div>
                <div className="w-40 h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-full h-4 bg-gray-200 rounded"></div>
                  <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                  <div className="w-20 h-4 bg-gray-200 rounded mt-4"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-2">
                    <div className="w-20 h-8 bg-gray-200 rounded"></div>
                    <div className="w-12 h-5 bg-gray-200 rounded"></div>
                    <div className="w-12 h-4 bg-gray-200 rounded"></div>
                  </div>
                  {/* Available status */}
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 bg-gray-200 rounded"></div>
                    <div className="w-24 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Check-in/Check-out Info */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-4 h-4 bg-gray-200 rounded mt-1"></div>
                      <div>
                        <div className="w-16 h-4 bg-gray-200 rounded mb-1"></div>
                        <div className="w-12 h-3 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Booking Buttons */}
                <div className="space-y-4">
                  <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
                  <div className="w-full h-12 bg-gray-200 rounded-xl"></div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="w-48 h-3 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedLoader;
