import { calculateDiscount } from "@/utils/calculateDiscount";
import { renderStars } from "@/utils/renderStars";
import Image from "next/image";

export default function foodDataCard({ foodData, handleOrderClick }) {
  return (
    <div className="group bg-white backdrop-blur-xl rounded-2xl border border-line/20 shadow transition-all duration-500 overflow-hidden h-full flex flex-col">
      {/* Availability Badge */}
      <div
        className={`absolute top-3 right-3 z-10 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold shadow ${
          foodData?.status
            ? "bg-green-500 text-white border border-green-500/30"
            : "bg-red-500 text-white border border-red-500/30"
        }`}
      >
        {foodData?.status ? "Available" : "Out of Stock"}
      </div>

      {/* Image Section */}
      <div className="relative h-40 sm:h-48 flex items-center justify-center overflow-hidden">
        <Image
          src={foodData?.thumbnail}
          alt="foodData Image"
          fill
          className="w-full h-full object-cover rounded-t-2xl group-hover:scale-110 transition-transform duration-500"
        />
        {/* Price Overlay */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white px-2 py-1 sm:px-3 sm:py-1 rounded-lg">
          {foodData?.discount > 0 ? (
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-bold">
                $
                {calculateDiscount(
                  foodData?.discount_type,
                  foodData?.price,
                  foodData?.discount
                )}
              </span>
              <span className="text-xs sm:text-sm text-muted line-through">
                ${foodData?.price}
              </span>
            </div>
          ) : (
            <span className="text-sm sm:text-base font-bold">
              ${foodData?.price}
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 mt-2 sm:mt-4 flex flex-col items-center text-center flex-1">
        {/* Top Content - Will expand to fill space */}
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-[#41393D] mb-2 line-clamp-2 group-hover:text-[#B63D5E] transition-colors">
            {foodData?.title}
          </h3>

          <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
            {foodData?.short_description}
          </p>

          {/* TODO: ratings is unavailable */}
          <div className="flex items-center gap-2 sm:gap-3 justify-center">
            {foodData?.rating && renderStars(foodData?.rating)}
            <span className="text-xs sm:text-sm text-muted">
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
          className={`w-full px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 mt-3 ${
            foodData?.status
              ? "bg-primary text-white hover:bg-button hover:shadow active:scale-95 cursor-pointer"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
        >
          {foodData?.status ? "Order Now" : "Unavailable"}
        </button>
      </div>

      {/* Gradient Border Effect */}
      {foodData?.status === 0 && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#B63D5E]/5 via-transparent to-[#B63D5E]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      )}
    </div>
  );
}
