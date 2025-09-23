import Link from "next/link";
import Image from "next/image";
import { Bed, MapPin, Users } from "lucide-react";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { renderStars } from "@/utils/renderStars";
import calculateAvgRating from "@/utils/calculateAvgRating";

export default function MotelCaravanCard({ data, isCaravan = false }) {
  const totalReviews = data?.reviews?.length;
  const averageRating = calculateAvgRating(data?.reviews);

  return (
    <div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow backdrop-blur-xl transition-all duration-500 ${
        data?.status ? "border-line/20" : "border-line/10 opacity-75"
      }`}
    >
      {/* Popular Badge */}
      {/* TODO: need popular badge property */}
      {/* {room.popular && (
    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 bg-primary text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow">
      POPULAR
    </div>
  )} */}

      {/* Availability Badge */}
      <div
        className={`absolute top-3 right-3 z-10 rounded-full px-2 py-1 text-xs font-bold shadow sm:top-4 sm:right-4 sm:px-3 sm:py-1 ${
          data?.is_booked
            ? "border border-red-500/30 bg-red-500 text-white"
            : "bg-success border-success/30 border text-white"
        }`}
      >
        {data?.is_booked ? "Booked" : "Available"}
      </div>

      {/* Image Placeholder */}
      <Link href={`${isCaravan ? "/caravans" : "/motels"}/${data?.slug}`}>
        <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-t-2xl sm:h-56">
          <Image
            src={data?.thumbnail}
            alt="Room Image"
            fill
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-6">
        {/* Top Content - Will expand to fill space */}
        <div className="flex-1">
          {/* Room Name & Rating */}
          <div className="mb-3 sm:mb-4">
            <div className="mb-2 flex items-start justify-between gap-2">
              <Link
                href={`${isCaravan ? "/caravans" : "/motels"}/${data?.slug}`}
                className="text-text hover:text-button line-clamp-2 text-lg leading-tight font-bold transition-all duration-200 ease-linear sm:text-xl"
              >
                {data?.title}
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {averageRating > 0 && renderStars(averageRating)}
              <span className="text-muted text-xs sm:text-sm">
                {averageRating > 0 ? averageRating : "Not rated"} (
                {totalReviews > 0
                  ? `${totalReviews} reviews`
                  : "No reviews yet"}
                )
              </span>
            </div>
          </div>

          {/* Room Details */}
          <div className="mb-3 space-y-2 sm:mb-4">
            <div className="text-muted flex items-center gap-3 text-xs sm:gap-4 sm:text-sm">
              {data?.capacity && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{data.capacity} guests</span>
                </div>
              )}

              {data?.bed_size && (
                <div className="flex items-center gap-1">
                  <Bed className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{data?.bed_size}</span>
                </div>
              )}
            </div>

            {data?.room_size && (
              <div className="text-muted flex items-center gap-1 text-xs sm:text-sm">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{data?.room_size}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price & Booking - Will stick to bottom */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1 sm:gap-2">
            <div className="text-primary text-xl font-bold sm:text-2xl">
              $
              {calculateDiscount(
                data?.discount_type,
                data?.price,
                data?.discount,
              )}
            </div>
            {data?.discount_type && data?.discount && (
              <div className="text-muted text-xs line-through sm:text-sm">
                ${data?.price}
              </div>
            )}
            <div className="text-muted text-xs sm:text-sm">/night</div>
          </div>

          <Link
            href={`${isCaravan ? "/caravans" : "/motels"}/${data?.slug}`}
            disabled={!data?.status}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all duration-300 sm:px-6 sm:py-3 sm:text-sm ${
              data?.status
                ? "bg-primary hover:bg-button cursor-pointer text-white"
                : "bg-line/20 text-muted cursor-not-allowed"
            }`}
          >
            {data?.is_booked ? "See Details" : "Book Now"}
          </Link>
        </div>
      </div>

      {/* Gradient Border Effect */}
      {data?.status === 0 && (
        <div className="from-primary/10 to-accent/10 pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r via-transparent opacity-0 transition-opacity duration-500 hover:opacity-100"></div>
      )}
    </div>
  );
}
