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
  Clock,
} from "lucide-react";
import toast from "react-hot-toast";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { useState } from "react";
import AddReviewModal from "../modals/AddReviewModal";
import Link from "next/link";
import Image from "next/image";

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
  const isExpired = booking.status === "expired";
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
    <div className="rounded-lg border border-[#E0E0E0] bg-white p-4 sm:p-6">
      {/* Header Section - Mobile Optimized */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <Link
            href={
              isMotel
                ? `/motels/${booking?.reference?.slug}`
                : `/caravans/${booking?.reference?.slug}`
            }
            className="relative mt-1 size-9 flex-shrink-0 rounded-lg bg-[#EDE9DA] p-3"
          >
            <Image
              src={booking?.reference?.thumbnail}
              alt={booking?.reference?.title}
              fill
              className="rounded-lg object-cover"
            />
          </Link>
          <div className="min-w-0 flex-1">
            <Link
              href={
                isMotel
                  ? `/motels/${booking?.reference?.slug}`
                  : `/caravans/${booking?.reference?.slug}`
              }
              className="text-base font-semibold text-[#2F2F2F] sm:text-lg"
            >
              {booking?.reference?.title}
            </Link>

            {/* Invoice with copy functionality - Mobile Optimized */}
            <div className="flex items-center gap-1">
              <p className="truncate text-xs text-[#888888] sm:text-sm">
                Invoice: {booking.invoice}
              </p>
              <button
                onClick={copyInvoiceToClipboard}
                className="flex-shrink-0 p-1 text-[#888888] transition-colors hover:text-[#603C59]"
                title="Copy invoice ID"
              >
                <Copy size={12} className="sm:size-4" />
              </button>
            </div>

            {/* Status and Payment Status - Mobile Stack */}
            <div className="mt-2 flex flex-row gap-2">
              <span
                className={`inline-block w-fit rounded-full px-2 py-1 text-xs capitalize ${getStatusColor(booking.status)}`}
              >
                {booking.status}
              </span>

              {/* Payment Status Badge */}
              <span
                className={`inline-flex w-fit items-center gap-1 rounded-full px-2 py-1 text-xs ${
                  booking.payment_status === 1
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                <CreditCard size={10} className="sm:size-3" />
                {booking.payment_status === 1 ? "Paid" : "Unpaid"}
              </span>
            </div>
          </div>
        </div>

        {/* Price Section - Mobile Optimized */}
        <div className="flex-shrink-0 text-left sm:text-right">
          <p className="text-xl font-bold text-[#2F2F2F] sm:text-2xl">
            {formatCurrency(booking.total)}
          </p>
          {booking.discount && (
            <p className="text-xs text-[#7BA693] sm:text-sm">
              Saved {perNightSaved}{" "}
              <span className="text-xs text-gray-500">/per-night</span>
            </p>
          )}
        </div>
      </div>

      {/* Booking Details - Mobile Stack */}
      <div className="mb-4 space-y-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0">
        {/* Check-in */}
        <div className="flex items-center gap-3 text-sm text-[#2F2F2F]">
          <Calendar size={16} className="flex-shrink-0 text-[#888888]" />
          <div className="min-w-0 flex-1">
            <p className="font-medium">Check-in</p>
            <p className="text-[#888888]">{formatDate(booking.checkin)}</p>
          </div>
        </div>

        {/* Check-out */}
        <div className="flex items-center gap-3 text-sm text-[#2F2F2F]">
          <Calendar size={16} className="flex-shrink-0 text-[#888888]" />
          <div className="min-w-0 flex-1">
            <p className="font-medium">Check-out</p>
            <p className="text-[#888888]">{formatDate(booking.checkout)}</p>
          </div>
        </div>

        {/* Guests */}
        <div className="flex items-center gap-3 text-sm text-[#2F2F2F]">
          <Users size={16} className="flex-shrink-0 text-[#888888]" />
          <div className="min-w-0 flex-1">
            <p className="font-medium">Guests</p>
            <p className="text-[#888888]">
              {booking.adults} Adults
              {booking.children > 0 && `, ${booking.children} Children`}
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section - Mobile Optimized */}
      <div className="border-t border-[#E0E0E0] pt-4">
        {/* Booking Dates - Mobile Friendly */}
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[#888888] sm:gap-4 sm:text-sm">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>Booked: {formatDate(booking.created_at)}</span>
          </div>
          {booking.confirmed_at && (
            <>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1">
                <span>Confirmed: {formatDate(booking.confirmed_at)}</span>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons - Mobile Stack */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Status Messages */}
          <div className="flex-1">
            {/* Show message if pending */}
            {isBookingStatusPending && (
              <span className="text-xs text-[#888888] italic sm:text-sm">
                Waiting for admin confirmation before payment
              </span>
            )}

            {/* Expired message */}
            {isExpired && (
              <span className="flex items-center gap-1 text-xs text-[#888888] italic sm:text-sm">
                <Calendar size={12} />
                This booking has expired
              </span>
            )}

            {/* No actions message */}
            {!showMakePaymentButton &&
              !showWriteReviewButton &&
              !isBookingStatusPending &&
              !isExpired && (
                <span className="text-xs text-[#888888] italic sm:text-sm">
                  No actions available
                </span>
              )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
            {/* Make Payment Button */}
            {showMakePaymentButton && (
              <motion.button
                onClick={handleMakePayment}
                disabled={isPending}
                className={`w-full rounded-lg bg-[#C73E5B] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#A53251] disabled:opacity-50 sm:w-auto sm:py-2 ${isPending ? "cursor-wait" : "cursor-pointer"}`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                }}
                whileTap={{
                  scale: 0.98,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
                transition={{ type: "tween", duration: 0.2 }}
              >
                <div className="inline-flex items-center justify-center gap-2">
                  <span>Make Payment</span>
                  {isPending && (
                    <LoaderCircle
                      size={16}
                      className="animate-spin sm:size-4"
                    />
                  )}
                </div>
              </motion.button>
            )}

            {/* Write Review Button */}
            {showWriteReviewButton && (
              <motion.button
                onClick={() => setIsModalOpen(true)}
                className="w-full cursor-pointer rounded-lg bg-[#7BA693] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#6B9582] sm:w-auto sm:py-2"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                Write Review
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        referenceType={isMotel ? "motel" : isCaravan ? "caravan" : "food"}
        referenceId={booking.reference_id}
      />
    </div>
  );
};

export default BookingCard;
