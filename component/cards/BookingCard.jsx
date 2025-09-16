import usePostMutation from "@/hooks/mutations/usePostMutation";
import formatCurrency from "@/utils/formatCurrency";
import formatDate from "@/utils/formatDate";
import getStatusColor from "@/utils/getStatusColor";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  Car,
  Users,
  CreditCard,
  LoaderCircle,
  Copy,
} from "lucide-react";
import toast from "react-hot-toast";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { useState } from "react";
import AddReviewModal from "../modals/AddReviewModal";

const BookingCard = ({ booking }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMotel = booking.reference_type === "App\\Models\\Motel";
  const isCaravan = booking.reference_type === "App\\Models\\Caravan";
  const perNightSaved = formatCurrency(
    booking.amount -
      calculateDiscount(
        booking.discount_type,
        booking.amount,
        booking.discount,
      ),
  );

  // Determine which buttons to show
  const isExpired = booking.status === 'expired';
  const isBookingStatusPending = booking.status === "pending";
  const showMakePaymentButton = booking.status === "confirmed"; // Unpaid
  const showWriteReviewButton = booking.status === "booked";


  const { mutate, isPending } = usePostMutation({
    endPoint: "/checkout",
    token: true,
  });

  const copyInvoiceToClipboard = () => {
    navigator.clipboard.writeText(booking.invoice);
    toast.success("Invoice ID copied to clipboard!");
  };

  const handleMakePayment = () => {
    const payload = {
      booking_id: booking?.id,
    };

    mutate(payload, {
      onSuccess: (data) => {
        if (data?.status) {
          window.location.href = data?.data?.checkout_url;
        }
      },
      onError: (error) => {
        console.error("make payment error:", error);
      },
    });
  };

  return (
    <div className="rounded-lg border border-[#E0E0E0] bg-white p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#EDE9DA] p-3">
            {isMotel ? (
              <Building2 size={24} className="text-[#603C59]" />
            ) : isCaravan ? (
              <Car size={24} className="text-[#603C59]" />
            ) : (
              <Building2 size={24} className="text-[#603C59]" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#2F2F2F]">
              {isMotel
                ? "Motel Booking"
                : isCaravan
                  ? "Caravan Booking"
                  : "Property Booking"}
            </h3>

            {/* Invoice with copy functionality */}
            <div className="flex items-center gap-1">
              <p className="text-sm text-[#888888]">
                Invoice: {booking.invoice}
              </p>
              <button
                onClick={copyInvoiceToClipboard}
                className="p-1 text-[#888888] transition-colors hover:text-[#603C59]"
                title="Copy invoice ID"
              >
                <Copy size={14} />
              </button>
            </div>

            {/* Status and Payment Status */}
            <div className="mt-1 flex items-center gap-2">
              <span
                className={`inline-block rounded-full px-2 py-1 text-xs capitalize ${getStatusColor(booking.status)}`}
              >
                {booking.status}
              </span>

              {/* Payment Status Badge */}
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                  booking.payment_status === 1
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <CreditCard size={12} />
                {booking.payment_status === 1 ? "Paid" : "Unpaid"}
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[#2F2F2F]">
            {formatCurrency(booking.total)}
          </p>
          {booking.discount && (
            <p className="text-sm text-[#7BA693]">
              Saved
              {perNightSaved}{" "}
              <span className="text-xs text-gray-500">/per-night</span>
            </p>
          )}
        </div>
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="flex items-center gap-2 text-sm text-[#2F2F2F]">
          <Calendar size={16} className="text-[#888888]" />
          <div>
            <p className="font-medium">Check-in</p>
            <p className="text-[#888888]">{formatDate(booking.checkin)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#2F2F2F]">
          <Calendar size={16} className="text-[#888888]" />
          <div>
            <p className="font-medium">Check-out</p>
            <p className="text-[#888888]">{formatDate(booking.checkout)}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#2F2F2F]">
          <Users size={16} className="text-[#888888]" />
          <div>
            <p className="font-medium">Guests</p>
            <p className="text-[#888888]">
              {booking.adults} Adults
              {booking.children > 0 && `, ${booking.children} Children`}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#E0E0E0] pt-4">
        <div className="flex items-center gap-4 text-sm text-[#888888]">
          <span>Booked: {formatDate(booking.created_at)}</span>
          {booking.confirmed_at && (
            <span>Confirmed: {formatDate(booking.confirmed_at)}</span>
          )}
        </div>

        <div className="flex gap-2">
          {/* Show message if pending */}
          {isBookingStatusPending && (
            <span className="text-sm text-[#888888] italic">
              Waiting for admin confirmation before payment
            </span>
          )}

          {/* Show Make Payment button if status is confirmed and payment_status is 0 (unpaid) */}
          {showMakePaymentButton && (
            <motion.button
              onClick={handleMakePayment}
              disabled={isPending}
              className={`rounded-lg bg-[#C73E5B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#A53251] disabled:opacity-50 ${isPending ? "cursor-wait" : "cursor-pointer"}`}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
              whileTap={{ scale: 0.98, boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <div className="inline-flex items-center justify-center gap-2">
                <p>Make Payment</p>
                {isPending && (
                  <LoaderCircle size={18} className="animate-spin" />
                )}
              </div>
            </motion.button>
          )}

          {/* Show Write Review button if payment_status is 1 (paid) */}
          {showWriteReviewButton && (
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer rounded-lg bg-[#7BA693] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6B9582]"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              Write Review
            </motion.button>
          )}

          {/* If no buttons should show, display a message or keep empty */}
         {!showMakePaymentButton &&
  !showWriteReviewButton &&
  !isBookingStatusPending && (
    <>
      {isExpired ? (
        <span className="text-sm text-[#888888] italic flex items-center gap-1">
          <Calendar size={14} />
          This booking has expired
        </span>
      ) : (
        <span className="text-sm text-[#888888] italic">
          No actions available
        </span>
      )}
    </>
  )}
        </div>
      </div>

       <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        referenceType={isMotel ? 'motel' : isCaravan ? 'caravan' : 'food'}
        referenceId={booking.id}
      />
    </div>
  );
};

export default BookingCard;
