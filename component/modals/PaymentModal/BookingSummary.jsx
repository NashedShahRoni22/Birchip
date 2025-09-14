import { Calendar, Clock, Users } from "lucide-react";
import Image from "next/image";

export default function BookingSummary({ itemDetails, bookingData, nights }) {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-AU", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="mb-8 rounded-xl bg-gray-50 p-4">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Booking Summary
      </h3>

      <div className="flex gap-4">
        <div className="relative h-20 w-24 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={itemDetails.thumbnail}
            alt={itemDetails.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{itemDetails.title}</h4>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <div>
            <p className="font-medium">Check-in</p>
            <p className="text-gray-600">{formatDate(bookingData.checkin)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <div>
            <p className="font-medium">Check-out</p>
            <p className="text-gray-600">{formatDate(bookingData.checkout)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          <div>
            <p className="font-medium">Guests</p>
            <p className="text-gray-600">
              {bookingData.adults} adults
              {bookingData.children > 0 && `, ${bookingData.children} children`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          <div>
            <p className="font-medium">Duration</p>
            <p className="text-gray-600">
              {nights} night{nights > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
