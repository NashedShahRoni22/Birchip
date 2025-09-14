import { calculateDiscount } from "@/utils/calculateDiscount";
import { renderStars } from "@/utils/renderStars";
import Image from "next/image";

export default function foodDataCard({ foodData, handleOrderClick }) {
  return (
    <div className="group border-line/20 flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow backdrop-blur-xl transition-all duration-500">
      {/* Availability Badge */}
      <div
        className={`absolute top-3 right-3 z-10 rounded-full px-2 py-1 text-xs font-bold shadow sm:px-3 sm:py-1 ${
          foodData?.status
            ? "border border-green-500/30 bg-green-500 text-white"
            : "border border-red-500/30 bg-red-500 text-white"
        }`}
      >
        {foodData?.status ? "Available" : "Out of Stock"}
      </div>

      {/* Image Section */}
      <div className="relative flex h-40 items-center justify-center overflow-hidden sm:h-48">
        <Image
          src={foodData?.thumbnail}
          alt="foodData Image"
          fill
          className="h-full w-full rounded-t-2xl object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Price Overlay */}
        <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-2 py-1 text-white backdrop-blur-sm sm:px-3 sm:py-1">
          {foodData?.discount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold sm:text-base">
                $
                {calculateDiscount(
                  foodData?.discount_type,
                  foodData?.price,
                  foodData?.discount,
                )}
              </span>
              <span className="text-muted text-xs line-through sm:text-sm">
                ${foodData?.price}
              </span>
            </div>
          ) : (
            <span className="text-sm font-bold sm:text-base">
              ${foodData?.price}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="mt-2 flex flex-1 flex-col items-center p-4 text-center sm:mt-4 sm:p-6">
        {/* Top Content - Will expand to fill space */}
        <div className="flex-1">
          <h3 className="mb-2 line-clamp-2 text-base font-semibold text-[#41393D] transition-colors group-hover:text-[#B63D5E] sm:text-lg">
            {foodData?.title}
          </h3>

          <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-600 sm:text-sm">
            {foodData?.short_description}
          </p>

          {/* TODO: ratings is unavailable */}
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {foodData?.rating && renderStars(foodData?.rating)}
            <span className="text-muted text-xs sm:text-sm">
              {foodData?.rating ? foodData.rating : "Not rated"} (
              {foodData?.reviews && foodData.reviews > 0
                ? `${foodData.reviews} reviews`
                : "No reviews yet"}
              )
            </span>
          </div>
        </div>

        {/* Button - Will stick to bottom */}
        <button
          onClick={() => handleOrderClick(foodData)}
          disabled={!foodData?.status}
          className={`mt-3 w-full rounded-xl px-4 py-2 text-xs font-bold transition-all duration-300 sm:py-3 sm:text-sm ${
            foodData?.status
              ? "bg-primary hover:bg-button cursor-pointer text-white hover:shadow active:scale-95"
              : "cursor-not-allowed bg-gray-200 text-gray-500"
          }`}
        >
          {foodData?.status ? "Add to cart" : "Out of stock"}
        </button>
      </div>

      {/* Gradient Border Effect */}
      {foodData?.status === 0 && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-[#B63D5E]/5 via-transparent to-[#B63D5E]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      )}
    </div>
  );
}
