import { Calendar, Car, Clock, CreditCard, MapPin } from "lucide-react";

export default function ParkingBookingCard({ order }) {
  const formatCurrency = (amount) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      return total + item.price;
    }, 0);
  };

  const calculateDuration = (checkin, checkout) => {
    const start = new Date(checkin);
    const end = new Date(checkout);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getVehicleTypeDisplay = (type) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const total = calculateTotal(order.reference_items);
  const duration = calculateDuration(order.checkin, order.checkout);
  const isActive = new Date(order.checkout) > new Date();

  return (
    <div className="rounded-lg border border-[#E0E0E0] bg-white p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#EDE9DA] p-3">
            <Car size={24} className="text-[#603C59]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#2F2F2F]">
              Parking Booking
            </h3>
            <p className="text-sm text-[#888888]">Invoice: {order.invoice}</p>

            {/* Status Badge */}
            <div className="mt-1 flex items-center gap-2">
              <span className="inline-block rounded-full bg-green-50 px-2 py-1 text-xs text-green-700">
                Confirmed
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs text-green-700">
                <CreditCard size={12} />
                Paid
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#2F2F2F]">
            {formatCurrency(total)}
          </p>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center gap-2 text-sm text-[#2F2F2F]">
          <MapPin size={16} className="text-[#888888]" />
          <div>
            <p className="font-medium">Check-in</p>
            <p className="text-[#888888]">{formatDate(order.checkin)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#2F2F2F]">
          <Clock size={16} className="text-[#888888]" />
          <div>
            <p className="font-medium">Check-out</p>
            <p className="text-[#888888]">{formatDate(order.checkout)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#2F2F2F]">
          <Car size={16} className="text-[#888888]" />
          <div>
            <p className="font-medium">Vehicle</p>
            <p className="text-[#888888]">
              {getVehicleTypeDisplay(order.vehicle_type)}
            </p>
          </div>
        </div>
      </div>

      {/* Vehicle Details */}
      <div className="mb-4 rounded-lg bg-gray-50 p-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-[#888888]">License Plate</p>
            <p className="font-medium text-[#2F2F2F]">{order.license_plate}</p>
          </div>
          <div>
            <p className="text-[#888888]">License State</p>
            <p className="font-medium text-[#2F2F2F]">{order.license_state}</p>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mb-4 space-y-2">
        <h4 className="text-sm font-medium text-[#2F2F2F]">
          Included Services:
        </h4>
        {order.reference_items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between text-sm"
          >
            <p className="text-[#2F2F2F]">{item.title}</p>
            <p className="font-medium text-[#2F2F2F]">
              {formatCurrency(item.price)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-[#E0E0E0] pt-4">
        <div className="flex items-center gap-4 text-sm text-[#888888]">
          <span>Booked: {formatDate(order.created_at)}</span>
        </div>

        <div className="flex gap-2">
          <span className="text-sm text-[#888888] italic">
            Parking space confirmed
          </span>
        </div>
      </div>
    </div>
  );
}
