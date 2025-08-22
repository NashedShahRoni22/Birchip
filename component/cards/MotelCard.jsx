import { calculateDiscount } from "@/utils/calculateDiscount";
import { renderStars } from "@/utils/renderStars";
import { Bed, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function MotelCard({ motelData }) {
  return (
    <div
      className={`group relative bg-white backdrop-blur-xl rounded-2xl border shadow transition-all duration-500 overflow-hidden ${
        motelData?.status ? "border-line/20" : "border-line/10 opacity-75"
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
        className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-10 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow ${
          motelData?.status
            ? "bg-success text-white border border-success/30"
            : "bg-red-500 text-white border border-red-500/30"
        }`}
      >
        {motelData?.status ? "Available" : "Booked"}
      </div>

      {/* Image Placeholder */}
      <div className="relative h-52 sm:h-56 flex items-center justify-center overflow-hidden rounded-t-2xl">
        <Image
          src={`https://birchip.nsrdev.com/public/storage/${motelData?.thumbnail}`}
          alt="Room Image"
          fill
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        {/* Room Name & Rating */}
        <div className="mb-3 sm:mb-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-lg sm:text-xl font-bold text-text leading-tight">
              {motelData?.title}
            </h3>
          </div>

          {/* TODO: ratings is unavailable */}
          <div className="flex items-center gap-2 sm:gap-3">
            {motelData?.rating && renderStars(motelData?.rating)}
            <span className="text-xs sm:text-sm text-muted">
              {motelData?.rating ? motelData.rating : "Not rated"} (
              {motelData?.reviews && motelData.reviews > 0
                ? `${motelData.reviews} reviews`
                : "No reviews yet"}
              )
            </span>
          </div>
        </div>

        {/* Room Details */}
        <div className="mb-3 sm:mb-4 space-y-2">
          <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted">
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{motelData?.capacity} guests</span>
            </div>
            <div className="flex items-center gap-1">
              <Bed className="w-3 h-3 sm:w-4 sm:h-4" />
              <span>{motelData?.bed_size}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs sm:text-sm text-muted">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{motelData?.room_size}</span>
          </div>
        </div>

        {/* Price & Booking */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <div className="text-xl sm:text-2xl font-bold text-primary">
              $
              {calculateDiscount(
                motelData?.discount_type,
                motelData?.price,
                motelData?.discount
              )}
            </div>
            <div className="text-xs sm:text-sm text-muted line-through">
              ${motelData?.price}
            </div>
            <div className="text-xs sm:text-sm text-muted">/night</div>
          </div>

          <Link
            href={`/room-details/${motelData?.slug}`}
            disabled={!motelData?.status}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 ${
              motelData?.status
                ? "bg-primary text-white cursor-pointer hover:bg-button"
                : "bg-line/20 text-muted cursor-not-allowed"
            }`}
          >
            {motelData?.status ? "Book Now" : "Unavailable"}
          </Link>
        </div>
      </div>

      {/* Gradient Border Effect */}
      {motelData?.status === 0 && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      )}
    </div>
  );
}
