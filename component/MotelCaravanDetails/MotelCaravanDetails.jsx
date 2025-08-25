"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Star,
  Users,
  Bed,
  Maximize,
  Clock,
  MapPin,
  ChevronLeft,
  Heart,
  Share2,
  CheckCircle,
  Camera,
} from "lucide-react";
import { BookingModal } from "../../app/components/shared/AnimatePresence";
import useGetApi from "@/hooks/useGetApi";
import { calculateDiscount } from "@/utils/calculateDiscount";
import Link from "next/link";

export default function MotelCaravanDetails({ params, isCaravan = false }) {
  const { slug } = React.use(params);
  const { data: details, isLoading } = useGetApi(
    `${isCaravan ? "/caravans" : "/motels"}/${slug}`
  );
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({ id: "", type: "" });
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // update all images for slider
  useEffect(() => {
    if (details?.status === true) {
      const thumbnailImg = {
        id: `img of ${details?.data?.title}`,
        path: details?.data?.thumbnail,
      };
      const imagesArr = [thumbnailImg, ...details?.data?.gallery];
      setAllImages(imagesArr);
    }
  }, [details?.status]);

  // When clicking a card:
  const handleCardClick = () => {
    setSelectedItem({
      id: details?.data?.id.toString(),
      type: isCaravan ? "caravan" : "room", // or 'caravan' or 'food' depending on what you're booking
    });
    setIsBookingOpen(true);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages?.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages?.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link
              href={isCaravan ? "/caravans" : "/motels"}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-medium">
                Back to {isCaravan ? "caravans" : "rooms"}
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 rounded-full border transition-all cursor-pointer ${
                  isLiked
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 rounded-full border bg-white border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={
                    allImages?.length > 0 && allImages[currentImageIndex]?.path
                  }
                  alt={`${details?.data?.title} - Image ${
                    currentImageIndex + 1
                  }`}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Image Navigation */}
                {allImages?.length > 1 && (
                  <>
                    <button
                      onClick={handlePreviousImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors cursor-pointer rotate-180"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  {currentImageIndex + 1} / {allImages?.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {allImages?.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {allImages?.map((image, index) => (
                    <button
                      key={image?.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        index === currentImageIndex
                          ? "border-primary"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image?.path}
                        alt={`Thumbnail ${index + 1}`}
                        width={80}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4 justify-between mb-4">
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {details?.data?.title}
                    </h1>
                    <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {details?.data?.address}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        Up to {details?.data?.capacity} guests
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-gray-900">
                        {/* TODO: rating missing */}
                        {details?.rating || 5}
                      </span>
                      <span className="text-gray-600">
                        {/* TODO: total reviews */}({details?.reviews || 140}{" "}
                        reviews)
                      </span>
                    </div>
                    {details?.popular && (
                      <span className="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                        Popular Choice
                      </span>
                    )}
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <Bed className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">
                      {details?.data?.bed_size}
                    </p>
                    <p className="text-xs text-gray-600">Bed Configuration</p>
                  </div>
                  <div className="text-center">
                    <Maximize className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">
                      {details?.data?.room_size}
                    </p>
                    <p className="text-xs text-gray-600">
                      {isCaravan ? "Caravan" : "Room"} Size
                    </p>
                  </div>
                  <div className="text-center">
                    <Users className="w-6 h-6 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">
                      {details?.data?.capacity} Guests
                    </p>
                    <p className="text-xs text-gray-600">Max Capacity</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {isCaravan ? "Caravan" : "Room"} Amenities
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {details?.data?.amenities?.map((amenity) => (
                    <div
                      key={amenity?.id}
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <Image
                        src={amenity?.icon}
                        alt={amenity?.title}
                        width={20}
                        height={20}
                        className="object-cover"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {amenity?.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  About This {isCaravan ? "Caravan" : "Room"}
                </h3>

                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {details?.data?.short_description}
                </p>

                <div className="prose prose-gray max-w-none">
                  {showFullDescription && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: details?.data?.description,
                      }}
                      className="mt-4"
                    ></div>
                  )}
                  <button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-primary hover:text-button font-medium mt-2 cursor-pointer"
                  >
                    {showFullDescription ? "Show Less" : "Read More"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="mb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      $
                      {calculateDiscount(
                        details?.data?.discount_type,
                        details?.data?.price,
                        details?.data?.discount
                      )}
                    </span>
                    <span className="text-lg text-gray-600">/ night</span>
                    {details?.data?.price > details?.data?.discount && (
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${details?.data?.price}
                      </span>
                    )}
                  </div>
                  {details?.data?.status && (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Available now</span>
                    </div>
                  )}
                </div>

                {/* Check-in/Check-out Info */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 mt-1 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Check-in
                      </p>
                      <p className="text-sm text-gray-600">
                        {/* TODO: checkOut time */}
                        {details?.checkOut || "3:00 PM"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Clock className="w-4 mt-1 h-4 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Check-out
                      </p>
                      <p className="text-sm text-gray-600">
                        {/* TODO: checkOut time */}
                        {details?.checkOut || "11:00 AM"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="space-y-4">
                  <button
                    onClick={handleCardClick}
                    className="w-full bg-primary text-white py-3 px-4 rounded-xl font-semibold hover:bg-button transition-colors cursor-pointer"
                  >
                    Reserve Now
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors cursor-pointer">
                    Check Availability
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600 text-center">
                    Free cancellation up to 24 hours before check-in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal  */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        itemId={selectedItem.id}
        itemType={selectedItem.type}
      />
    </div>
  );
}
