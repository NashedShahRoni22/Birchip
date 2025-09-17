"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Star,
  Users,
  Bed,
  Maximize,
  Clock,
  ChevronLeft,
  Heart,
  Share2,
  CheckCircle,
  Camera,
  CircleX,
} from "lucide-react";
import { BookingModal } from "../../app/components/shared/AnimatePresence";
import { calculateDiscount } from "@/utils/calculateDiscount";
import Link from "next/link";
import DetailedLoader from "../loaders/DetailedLoader";
import useGetQuery from "@/hooks/queries/useGetQuery";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { PaymentModal } from "../modals/PaymentModal";
import { motion } from "framer-motion";
import ReviewsSection from "./ReviewsSection";
import calculateAvgRating from "@/utils/calculateAvgRating";

export default function MotelCaravanDetails({ params, isCaravan = false }) {
  const { slug } = React.use(params);
  const router = useRouter();
  const { authInfo } = useAuth();

  const {
    data: details,
    isLoading,
    refetch,
  } = useGetQuery({
    endpoint: isCaravan ? `/caravans/${slug}` : `/motels/${slug}`,
    queryKey: [isCaravan ? "caravans" : "motels", slug],
    enabled: !!slug,
  });

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingFormData, setBookingFormData] = useState(null);
  const [selectedItem, setSelectedItem] = useState({ id: "", type: "" });
  const [allImages, setAllImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

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
    if (authInfo?.token) {
      setSelectedItem({
        id: details?.data?.id.toString(),
        type: isCaravan ? "caravan" : "room",
      });
      setIsBookingOpen(true);
    } else {
      const currentPath = isCaravan ? `/caravans/${slug}` : `/motels/${slug}`;
      router.push(`/auth?redirect=${encodeURIComponent(currentPath)}`);
    }
  };

  // Handle Check Availability button click
  const handleCheckAvailability = async () => {
    setIsCheckingAvailability(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Error checking availability:", error);
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages?.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages?.length - 1 ? 0 : prev + 1,
    );
  };

  const totalReviews = details?.data?.reviews?.length;
  const averageRating = calculateAvgRating(details?.data?.reviews);

  if (isLoading) {
    return <DetailedLoader />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link
              href={isCaravan ? "/caravans" : "/motels"}
              className="flex cursor-pointer items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="font-medium">
                Back to {isCaravan ? "caravans" : "rooms"}
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`cursor-pointer rounded-full border p-2 transition-all ${
                  isLiked
                    ? "border-red-200 bg-red-50 text-red-600"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
              <button className="cursor-pointer rounded-full border border-gray-200 bg-white p-2 text-gray-600 transition-colors hover:bg-gray-50">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Column - Images and Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-2xl">
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
                      className="absolute top-1/2 left-4 -translate-y-1/2 cursor-pointer rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute top-1/2 right-4 -translate-y-1/2 rotate-180 cursor-pointer rounded-full bg-white/90 p-2 shadow-lg backdrop-blur-sm transition-colors hover:bg-white"
                    >
                      <ChevronLeft className="h-5 w-5 text-gray-700" />
                    </button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute right-4 bottom-4 flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-sm text-white backdrop-blur-sm">
                  <Camera className="h-4 w-4" />
                  {currentImageIndex + 1} / {allImages?.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {allImages?.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {allImages?.map((image, index) => (
                    <button
                      key={image?.id}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-16 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition-all ${
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
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="mb-6">
                <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <h1 className="mb-2 text-xl font-bold text-gray-900 md:text-2xl">
                      {details?.data?.title}
                    </h1>
                    <div className="flex flex-col gap-4 text-sm text-gray-600 md:flex-row md:items-center">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        Up to {details?.data?.capacity} guests
                      </div>
                    </div>
                  </div>

                  {/* average rating & reviews */}
                  {totalReviews > 0 && (
                    <div className="text-right">
                      <div className="mb-1 flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">
                          {averageRating}
                        </span>
                        <span className="text-gray-600">
                          ({totalReviews} reviews)
                        </span>
                      </div>
                      {details?.popular && (
                        <span className="inline-block rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">
                          Popular Choice
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4 md:grid-cols-3">
                  <div className="text-center">
                    <Bed className="mx-auto mb-2 h-6 w-6 text-gray-600" />
                    <p className="text-sm font-medium text-gray-900">
                      {details?.data?.bed_size || "Standard"}
                    </p>
                    <p className="text-xs text-gray-600">Bed Configuration</p>
                  </div>
                  <div className="text-center">
                    <Maximize className="mx-auto mb-2 h-6 w-6 text-gray-600" />
                    <p className="text-sm font-medium text-gray-900">
                      {details?.data?.room_size || "Contact for details"}
                    </p>
                    <p className="text-xs text-gray-600">
                      {isCaravan ? "Caravan" : "Room"} Size
                    </p>
                  </div>
                  <div className="text-center">
                    <Users className="mx-auto mb-2 h-6 w-6 text-gray-600" />
                    <p className="text-sm font-medium text-gray-900">
                      {details?.data?.capacity || "Ask us"}{" "}
                      {details?.data?.capacity ? "Guests" : ""}
                    </p>
                    <p className="text-xs text-gray-600">Max Capacity</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {details?.data?.amenities &&
                details.data.amenities.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">
                      {isCaravan ? "Caravan" : "Room"} Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {details.data.amenities.map((amenity) => (
                        <div
                          key={amenity?.id}
                          className="flex items-center gap-3 rounded-xl bg-gray-50 p-3"
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
                )}

              {/* Description */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  About This {isCaravan ? "Caravan" : "Room"}
                </h3>

                <p className="leading-relaxed whitespace-pre-line text-gray-700">
                  {details?.data?.short_description}
                </p>

                {details?.data?.description && (
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
                      onClick={() =>
                        setShowFullDescription(!showFullDescription)
                      }
                      className="text-primary hover:text-button mt-2 cursor-pointer font-medium"
                    >
                      {showFullDescription ? "Show Less" : "Read More"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="mb-6">
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">
                      $
                      {calculateDiscount(
                        details?.data?.discount_type,
                        details?.data?.price,
                        details?.data?.discount,
                      )}
                    </span>
                    <span className="text-lg text-gray-600">/ night</span>
                    {details?.data?.discount_type &&
                      details?.data?.discount && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${details?.data?.price}
                        </span>
                      )}
                  </div>
                  {details?.data?.is_booked ? (
                    <div className="flex items-center gap-1 text-sm text-red-600">
                      <CircleX className="h-4 w-4" />
                      <span>Not Available</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      <span>Available now</span>
                    </div>
                  )}
                </div>

                {/* Check-in/Check-out Info */}
                <div className="mb-6 grid grid-cols-2 gap-4 rounded-xl bg-gray-50 p-4">
                  <div className="flex items-start gap-2">
                    <Clock className="mt-1 h-4 w-4 text-gray-600" />
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
                    <Clock className="mt-1 h-4 w-4 text-gray-600" />
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
                    disabled={details?.data?.is_booked}
                    className="bg-primary hover:bg-button disabled:hover:bg-primary w-full cursor-pointer rounded-xl px-4 py-3 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Reserve Now
                  </button>
                  <motion.button
                    onClick={handleCheckAvailability}
                    disabled={isCheckingAvailability}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full cursor-pointer rounded-xl border border-gray-300 px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <motion.span
                      animate={
                        isCheckingAvailability
                          ? {
                              opacity: [1, 0.5, 1],
                            }
                          : {}
                      }
                      transition={
                        isCheckingAvailability
                          ? {
                              duration: 1,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }
                          : {}
                      }
                    >
                      {isCheckingAvailability
                        ? "Checking..."
                        : "Check Availability"}
                    </motion.span>
                  </motion.button>
                </div>

                <div className="mt-4 border-t border-gray-200 pt-4">
                  <p className="text-center text-xs text-gray-600">
                    Free cancellation up to 24 hours before check-in
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ReviewsSection
          reviews={details?.data?.reviews || []}
          isCaravan={isCaravan}
        />
      </div>

      {/* Booking Modal  */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        itemId={selectedItem.id}
        itemType={selectedItem.type}
        onBookingSuccess={(formData) => {
          // Store form data and close booking modal
          setBookingFormData({
            ...formData,
            itemDetails: {
              title: details?.data?.title,
              thumbnail: details?.data?.thumbnail,
              price: details?.data?.price,
              discount_type: details?.data?.discount_type,
              discount: details?.data?.discount,
              address: details?.data?.address,
            },
          });
          setIsBookingOpen(false);
        }}
        details={details}
      />

      <PaymentModal
        isOpen={!!bookingFormData}
        onClose={() => setBookingFormData(null)}
        bookingData={bookingFormData}
        itemDetails={bookingFormData?.itemDetails}
        isCaravan={isCaravan}
        slug={slug}
      />
    </div>
  );
}
