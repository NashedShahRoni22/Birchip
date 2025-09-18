import Image from "next/image";
import { useState } from "react";

export default function Amenities({ isCaravan, amenities = [] }) {
  const [showAll, setShowAll] = useState(false);

  const defaultCount = 6;
  const shouldShowBtn = amenities && amenities.length > defaultCount;
  const renderedAmenities = showAll
    ? amenities
    : amenities?.slice(0, defaultCount);

  return (
    <div className="mb-6">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        {isCaravan ? "Caravan" : "Room"} Amenities
      </h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {renderedAmenities?.map((amenity) => (
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

      {shouldShowBtn && (
        <div className="mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {showAll
              ? "Show Less"
              : `Show More (${amenities.length - defaultCount})`}
          </button>
        </div>
      )}
    </div>
  );
}
