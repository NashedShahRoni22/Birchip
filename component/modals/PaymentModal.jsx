"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, MapPin, Clock, CreditCard } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import toast from "react-hot-toast";
import { calculateDiscount } from "@/utils/calculateDiscount";
import { formatDecimal } from "@/utils/formatDecimal";

export function PaymentModal({ isOpen, onClose, bookingData, itemDetails }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("payNow");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // API mutation hooks for both payment options
  const { mutate: reserveOnly, isLoading: isReserving } = usePostMutation({
    endPoint: `/booking/${bookingData?.itemType === "room" ? "motel" : "caravan"}/${bookingData?.itemId}`,
    token: true,
  });

  const { mutate: payNow, isLoading: isProcessingPayment } = usePostMutation({
    endPoint: "/checkout",
    token: true,
  });

  if (!bookingData || !itemDetails) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-AU", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const calculateNights = () => {
    const start = new Date(bookingData.checkin);
    const end = new Date(bookingData.checkout);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();
  const totalPrice =
    calculateDiscount(
      itemDetails.discount_type,
      itemDetails.price,
      itemDetails.discount,
    ) * nights;
  const serviceFee = 0;
  const finalTotal = totalPrice + serviceFee;

  const handleConfirmPayment = () => {
    const reservePayload = {
      driving_license: bookingData?.driving_license,
      license_state: bookingData?.license_state,
      dob: bookingData?.dob,
      checkin: bookingData?.checkin,
      checkout: bookingData?.checkout,
      adults: bookingData?.adults,
      children: bookingData?.children,
    };

    const paymentPayload = {
      booking_id: parseInt(bookingData?.itemId),
    };

    if (selectedPaymentMethod === "payNow") {
      payNow(paymentPayload, {
        onSuccess: (data) => {
          console.log(data);
          // if (data?.checkoutUrl) {
          //   window.location.href = data.checkoutUrl;
          // } else if (data?.paymentIntentId) {
          //   window.location.href = `/payment/stripe?paymentIntent=${data.paymentIntentId}`;
          // } else {
          //   toast.success("Booking confirmed!");
          //   onClose();
          // }
        },
        onError: (error) => {
          console.error("Payment Error:", error);
          toast.error(error?.message || "Payment failed. Please try again.");
        },
      });
    } else {
      reserveOnly(reservePayload, {
        onSuccess: (data) => {
          toast.success(
            bookingData?.itemType === "room"
              ? "Room reserved for 30 minutes! Complete payment to confirm your booking."
              : "Caravan reserved for 30 minutes! Complete payment to confirm your booking.",
          );
          onClose();
        },
        onError: (error) => {
          console.error("Reserve Error:", error);
          toast.error(error?.message || "Failed to reserve. Please try again.");
        },
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <motion.div
            initial={{ backdropFilter: "blur(0px)" }}
            animate={{ backdropFilter: "blur(4px)" }}
            exit={{ backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-black/40"
            onClick={onClose}
          />

          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-primary p-6 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Complete Your Booking</h2>
                  <button
                    onClick={onClose}
                    className="rounded-full p-1 transition-colors hover:bg-white/20"
                  >
                    <X size={24} />
                  </button>
                </div>
                <p className="mt-2 text-sm opacity-90">
                  Choose your payment option to secure your reservation
                </p>
              </div>

              <div className="max-h-[80vh] overflow-y-auto p-6">
                {/* Booking Summary */}
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
                      <h4 className="font-semibold text-gray-900">
                        {itemDetails.title}
                      </h4>
                      <div className="mt-1 flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="h-3 w-3" />
                        {itemDetails.address}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Check-in</p>
                        <p className="text-gray-600">
                          {formatDate(bookingData.checkin)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Check-out</p>
                        <p className="text-gray-600">
                          {formatDate(bookingData.checkout)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="font-medium">Guests</p>
                        <p className="text-gray-600">
                          {bookingData.adults} adults
                          {bookingData.children > 0 &&
                            `, ${bookingData.children} children`}
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
                {/* Price Breakdown */}
                <div className="mb-8 rounded-xl border border-gray-200 p-4">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Price Details
                  </h3>

                  <div className="space-y-4 text-sm">
                    {/* Accommodation costs */}
                    <div className="space-y-2">
                      {/* Original price (always show if discount) */}
                      {itemDetails.discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-900">
                            ${itemDetails.price} × {nights} night
                            {nights > 1 ? "s" : ""}
                          </span>
                          <span className="text-gray-900">
                            ${(itemDetails.price * nights).toFixed(2)}
                          </span>
                        </div>
                      )}

                      {/* Discount (show before discounted price) */}
                      {itemDetails.discount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>
                            {itemDetails.discount_type === "percentage"
                              ? `Discount (${itemDetails.discount}% off)`
                              : "Weekly discount"}
                          </span>
                          <span>
                            -$
                            {(
                              (itemDetails.price -
                                calculateDiscount(
                                  itemDetails.discount_type,
                                  itemDetails.price,
                                  itemDetails.discount,
                                )) *
                              nights
                            ).toFixed(2)}
                          </span>
                        </div>
                      )}

                      {/* Final accommodation price */}
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900">
                          Accommodation total
                        </span>
                        <span className="font-medium text-gray-900">
                          ${totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Service fee */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-900">Service fee</span>
                      <span className="text-gray-900">
                        ${serviceFee.toFixed(2)}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200"></div>

                    {/* Total */}
                    <div className="flex justify-between text-base font-semibold">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Choose Payment Method
                  </h3>

                  <div className="space-y-3">
                    {/* Pay Now Option */}
                    <label
                      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all ${selectedPaymentMethod === "payNow" ? "border-primary" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="payNow"
                        checked={selectedPaymentMethod === "payNow"}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="accent-primary focus:ring-primary h-4 w-4"
                      />
                      <div className="flex flex-1 items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-gray-900">
                              Pay Now
                            </p>
                            <p className="text-sm text-gray-600">
                              Secure payment with Stripe
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">
                            ${formatDecimal(finalTotal)}
                          </p>
                          <p className="text-xs text-green-600">
                            Instant confirmation
                          </p>
                        </div>
                      </div>
                    </label>

                    {/* Reserve Only Option */}
                    <label
                      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all ${selectedPaymentMethod === "reserveOnly" ? "border-primary" : "border-gray-200 hover:border-gray-300"}`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="reserveOnly"
                        checked={selectedPaymentMethod === "reserveOnly"}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="accent-primary focus:ring-primary h-4 w-4"
                      />
                      <div className="flex flex-1 items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-gray-900">
                              Reserve Only
                            </p>
                            <p className="text-sm text-gray-600">
                              Hold for 30 minutes
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">FREE</p>
                          <p className="text-xs text-orange-600">
                            Auto-cancels in 30min
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                {/* Confirm Button */}
                <button
                  onClick={handleConfirmPayment}
                  disabled={isProcessingPayment || isReserving}
                  className="bg-primary hover:bg-primary/90 w-full rounded-xl p-4 font-semibold text-white transition-all disabled:opacity-50"
                >
                  {isProcessingPayment || isReserving
                    ? "Processing..."
                    : selectedPaymentMethod === "payNow"
                      ? "Confirm Payment"
                      : "Confirm Reservation"}
                </button>
                {/* Important Notice */}
                <div className="mt-6 rounded-lg bg-orange-50 p-4">
                  <h4 className="font-medium text-orange-900">Important:</h4>
                  <ul className="mt-2 space-y-1 text-sm text-orange-800">
                    <li>• "Pay Now" gives instant confirmation</li>
                    <li>• "Reserve Only" holds the room for 30 minutes</li>
                    <li>
                      • Reservations auto-cancel if not paid within 30 minutes
                    </li>
                    <li>• Free cancellation up to 24 hours before check-in</li>
                  </ul>
                </div>
                {/* Selected Method Info */}
                {selectedPaymentMethod === "payNow" && (
                  <div className="mt-4 rounded-lg bg-green-50 p-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <p className="text-sm font-medium text-green-900">
                        You'll be redirected to Stripe for secure payment
                      </p>
                    </div>
                  </div>
                )}
                {selectedPaymentMethod === "reserveOnly" && (
                  <div className="mt-4 rounded-lg bg-orange-50 p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-orange-600" />
                      <p className="text-sm font-medium text-orange-900">
                        Room will be held for 30 minutes without payment
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
