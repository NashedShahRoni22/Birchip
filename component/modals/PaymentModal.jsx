"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import toast from "react-hot-toast";
import BookingSummary from "./PaymentModal/BookingSummary";
import PriceBreakdown from "./PaymentModal/PriceBreakdown";
import ReservationInfo from "./PaymentModal/ReservationInfo";
import PaymentNotice from "./PaymentModal/PaymentNotice";
import ImportantNotice from "./PaymentModal/ImportantNotice";

export function PaymentModal({ isOpen, onClose, bookingData, itemDetails }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("reserveOnly");

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

  // API mutation hooks for both motel and caravan payment options
  const { mutate: reserveOnly, isLoading: isReserving } = usePostMutation({
    endPoint: `/booking/${bookingData?.itemType === "room" ? "motel" : "caravan"}/${bookingData?.itemId}`,
    token: true,
  });

  // COMMENTED FOR FUTURE USE - Pay Now functionality
  // const { mutate: payNow, isLoading: isProcessingPayment } = usePostMutation({
  //   endPoint: "/checkout",
  //   token: true,
  // });

  if (!bookingData || !itemDetails) return null;

  const calculateNights = () => {
    const start = new Date(bookingData.checkin);
    const end = new Date(bookingData.checkout);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const nights = calculateNights();

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

    // COMMENTED FOR FUTURE USE - Pay Now functionality
    // const paymentPayload = {
    //   booking_id: parseInt(bookingData?.itemId),
    // };

    // if (selectedPaymentMethod === "payNow") {
    //   payNow(paymentPayload, {
    //     onSuccess: (data) => {
    //       console.log(data);
    //       if (data?.checkoutUrl) {
    //         window.location.href = data.checkoutUrl;
    //       } else if (data?.paymentIntentId) {
    //         window.location.href = `/payment/stripe?paymentIntent=${data.paymentIntentId}`;
    //       } else {
    //         toast.success("Booking confirmed!");
    //         onClose();
    //       }
    //     },
    //     onError: (error) => {
    //       console.error("Payment Error:", error);
    //       toast.error(error?.message || "Payment failed. Please try again.");
    //     },
    //   });
    // } else {
    reserveOnly(reservePayload, {
      onSuccess: (data) => {
        toast.success(
          bookingData?.itemType === "room"
            ? "Room reserved for 30 minutes! Complete payment from My Bookings to confirm your booking."
            : "Caravan reserved for 30 minutes! Complete payment from My Bookings to confirm your booking.",
        );
        onClose();
      },
      onError: (error) => {
        console.error("Reserve Error:", error);
        toast.error(error?.message || "Failed to reserve. Please try again.");
      },
    });
    // }
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
                  <h2 className="text-2xl font-bold">Reserve Your Booking</h2>
                  <button
                    onClick={onClose}
                    className="cursor-pointer rounded-full p-1 transition-colors hover:bg-white/20"
                  >
                    <X size={24} />
                  </button>
                </div>
                <p className="mt-2 text-sm opacity-90">
                  Reserve now and complete payment within 30 minutes
                </p>
              </div>

              <div className="max-h-[80vh] overflow-y-auto p-6">
                {/* Booking Summary */}
                <BookingSummary
                  itemDetails={itemDetails}
                  bookingData={bookingData}
                  nights={nights}
                />

                {/* Price Breakdown */}
                <PriceBreakdown
                  itemDetails={itemDetails}
                  bookingData={bookingData}
                  nights={nights}
                />

                {/* Reservation Info */}
                <ReservationInfo />

                {/* COMMENTED FOR FUTURE USE - Payment Method Selection */}
                {/* <div className="mb-6">
                  <h3 className="mb-4 text-lg font-semibold text-gray-900">
                    Choose Payment Method
                  </h3>

                  <div className="space-y-3">
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
                </div> */}

                {/* Confirm Button */}
                <button
                  onClick={handleConfirmPayment}
                  disabled={isReserving}
                  className="bg-primary hover:bg-primary/90 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl p-4 font-semibold text-white transition-all disabled:opacity-50"
                >
                  {isReserving ? "Reserving..." : "Reserve Now - FREE"}
                  {isReserving && (
                    <LoaderCircle size={18} className="animate-spin" />
                  )}
                </button>

                {/* Payment Notice with Link */}
                <PaymentNotice />

                {/* Important Notice */}
                <ImportantNotice />

                {/* COMMENTED FOR FUTURE USE - Selected Method Info */}
                {/* {selectedPaymentMethod === "payNow" && (
                  <div className="mt-4 rounded-lg bg-green-50 p-4">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-green-600" />
                      <p className="text-sm font-medium text-green-900">
                        You'll be redirected to Stripe for secure payment
                      </p>
                    </div>
                  </div>
                )} */}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
