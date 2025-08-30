export default function SkeletonCard() {
  return (
    <div className="group relative h-full bg-white backdrop-blur-xl rounded-2xl border border-line/20 shadow transition-all duration-500 overflow-hidden animate-pulse">
      {/* Availability Badge Skeleton */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 bg-gray-200 rounded-full w-16 h-6 sm:w-20 sm:h-7"></div>

      {/* Image Skeleton */}
      <div className="relative h-52 sm:h-56 bg-gray-200 rounded-t-2xl"></div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Title and Rating Skeleton */}
        <div className="space-y-3">
          {/* Title */}
          <div className="h-6 bg-gray-200 rounded-lg w-4/5"></div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {/* Stars */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded-sm"
                ></div>
              ))}
            </div>
            {/* Rating text */}
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>

        {/* Room Details Skeleton */}
        <div className="space-y-2">
          {/* First row of details */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded"></div>
              <div className="h-3 bg-gray-200 rounded w-16"></div>
            </div>
          </div>

          {/* Second row of details */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
        </div>

        {/* Price & Booking Skeleton */}
        <div className="flex items-center justify-between gap-2 pt-2">
          {/* Price section */}
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-12 sm:w-16"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-8"></div>
            <div className="h-3 sm:h-4 bg-gray-200 rounded w-8"></div>
          </div>

          {/* Button skeleton */}
          <div className="h-8 sm:h-12 bg-gray-200 rounded-xl w-20 sm:w-24"></div>
        </div>
      </div>
    </div>
  );
}
