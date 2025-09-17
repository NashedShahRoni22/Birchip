import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UtensilsCrossed,
  Calendar,
  CreditCard,
  LoaderCircle,
  Copy,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import AddReviewModal from "../modals/AddReviewModal";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import toast from "react-hot-toast";

const FoodOrderCard = ({ order }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);
  const [showItemsDropdown, setShowItemsDropdown] = useState(false);

  // Determine status display and actions
  const isConfirmed = order.status === 1;
  const isPendingOrder = order.status === 0;

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
      const itemTotal = (item.price - item.discount) * parseInt(item.qty);
      return total + itemTotal;
    }, 0);
  };

  const calculateOriginalTotal = (items) => {
    return items.reduce((total, item) => {
      return total + item.price * parseInt(item.qty);
    }, 0);
  };

  const calculateTotalDiscount = (items) => {
    return items.reduce((total, item) => {
      return total + item.discount * parseInt(item.qty);
    }, 0);
  };

  // Payment mutation
  const { mutate: makePayment, isPending } = usePostMutation({
    endPoint: "/checkout", // Same endpoint as BookingCard
    token: true,
  });

  const handleMakePayment = () => {
    const payload = {
      food_order_id: order?.id,
    };

    makePayment(payload, {
      onSuccess: (data) => {
        if (data?.status && data?.data?.checkout_url) {
          window.location.href = data.data.checkout_url;
        }
      },
      onError: (error) => {
        console.error("make payment error:", error);
        toast.error("Failed to initiate payment. Please try again.");
      },
    });
  };

  const copyOrderIdToClipboard = () => {
    navigator.clipboard.writeText(order.id.toString());
    toast.success("Order ID copied to clipboard!");
  };

  // Handle review type selection
  const handleReviewOverallOrder = () => {
    setSelectedFoodItem(null);
    setIsModalOpen(true);
    setShowItemsDropdown(false);
  };

  const handleReviewSpecificItem = (item) => {
    setSelectedFoodItem(item);
    setIsModalOpen(true);
    setShowItemsDropdown(false);
  };

  // Close dropdown when clicking outside
  const handleCloseDropdown = () => {
    setShowItemsDropdown(false);
  };

  const total = calculateTotal(order.reference_items);
  const originalTotal = calculateOriginalTotal(order.reference_items);
  const totalDiscount = calculateTotalDiscount(order.reference_items);

  return (
    <>
      {/* Backdrop overlay for dropdown */}
      {showItemsDropdown && (
        <div className="fixed inset-0 z-10" onClick={handleCloseDropdown} />
      )}

      <div className="rounded-lg border border-[#E0E0E0] bg-white p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-[#EDE9DA] p-3">
              <UtensilsCrossed size={24} className="text-[#603C59]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[#2F2F2F]">
                Food Order
              </h3>

              {/* Order ID with copy functionality */}
              <div className="flex items-center gap-1">
                <p className="text-sm text-[#888888]">Order #{order.id}</p>
                <button
                  onClick={copyOrderIdToClipboard}
                  className="p-1 text-[#888888] transition-colors hover:text-[#603C59]"
                  title="Copy order ID"
                >
                  <Copy size={14} />
                </button>
              </div>

              {/* Status Badge */}
              <div className="mt-1 flex items-center gap-2">
                <span
                  className={`inline-block rounded-full px-2 py-1 text-xs capitalize ${
                    isConfirmed
                      ? "bg-green-50 text-green-700"
                      : "bg-yellow-50 text-yellow-700"
                  }`}
                >
                  {isConfirmed ? "confirmed" : "pending"}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#2F2F2F]">
              {formatCurrency(total)}
            </p>
            {totalDiscount > 0 && (
              <p className="text-sm text-[#7BA693]">
                Save {formatCurrency(totalDiscount)}
              </p>
            )}
          </div>
        </div>

        {/* Food Items */}
        <div className="mb-4 space-y-3">
          {order.reference_items.map((item, index) => (
            <div
              key={item.id || index}
              className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
            >
              <div>
                <p className="font-medium text-[#2F2F2F]">{item.title}</p>
                <p className="text-sm text-[#888888]">Qty: {item.qty}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  {item.discount > 0 && (
                    <span className="text-sm text-[#888888] line-through">
                      {formatCurrency(item.price * parseInt(item.qty))}
                    </span>
                  )}
                  <span className="font-semibold text-[#2F2F2F]">
                    {formatCurrency(
                      (item.price - item.discount) * parseInt(item.qty),
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Breakdown */}
        {totalDiscount > 0 && (
          <div className="mb-4 rounded-lg bg-green-50 p-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#888888]">Original Total:</span>
              <span className="text-[#888888]">
                {formatCurrency(originalTotal)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Total Discount:</span>
              <span className="text-green-600">
                -{formatCurrency(totalDiscount)}
              </span>
            </div>
            <hr className="my-2 border-green-200" />
            <div className="flex justify-between font-semibold">
              <span className="text-[#2F2F2F]">Final Total:</span>
              <span className="text-[#2F2F2F]">{formatCurrency(total)}</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-[#E0E0E0] pt-4">
          <div className="flex items-center gap-4 text-sm text-[#888888]">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Ordered: {formatDate(order.created_at)}</span>
            </div>
            {order.gateway && (
              <div className="flex items-center gap-1">
                <CreditCard size={16} />
                <span className="capitalize">{order.gateway}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Show message if pending */}
            {isPendingOrder && (
              <span className="text-sm text-[#888888] italic">
                Order confirmation pending
              </span>
            )}

            {/* Show Make Payment button if status is 0 (pending) */}
            {isPendingOrder && (
              <motion.button
                onClick={handleMakePayment}
                disabled={isPending}
                className={`rounded-lg bg-[#C73E5B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#A53251] disabled:opacity-50 ${isPending ? "cursor-wait" : "cursor-pointer"}`}
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
                  <p>Make Payment</p>
                  {isPending && (
                    <LoaderCircle size={18} className="animate-spin" />
                  )}
                </div>
              </motion.button>
            )}

            {/* Enhanced Review Options for confirmed orders */}
            {isConfirmed && (
              <div className="relative">
                {order.reference_items.length === 1 ? (
                  // Single item - direct review button
                  <motion.button
                    onClick={() =>
                      handleReviewSpecificItem(order.reference_items[0])
                    }
                    className="cursor-pointer rounded-lg bg-[#7BA693] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6B9582]"
                    whileHover={{ scale: 1.03, y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    Write Review
                  </motion.button>
                ) : (
                  // Multiple items - dropdown with options
                  <>
                    <motion.button
                      onClick={() => setShowItemsDropdown(!showItemsDropdown)}
                      className="flex cursor-pointer items-center gap-2 rounded-lg bg-[#7BA693] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6B9582]"
                      whileHover={{ scale: 1.03, y: -1 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                      }}
                    >
                      Write Review
                      {showItemsDropdown ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </motion.button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {showItemsDropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          className="absolute top-full right-0 z-20 mt-2 w-64 rounded-lg border border-[#E0E0E0] bg-white shadow-lg"
                        >
                          <div className="p-2">
                            {/* Review Overall Order */}
                            {/* <button
                              onClick={handleReviewOverallOrder}
                              className="w-full rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-[#EDE9DA]"
                            >
                              <div className="font-medium text-[#2F2F2F]">
                                Review Overall Order
                              </div>
                              <div className="text-xs text-[#888888]">
                                Rate your entire food order experience
                              </div>
                            </button>

                            <hr className="my-2 border-[#E0E0E0]" /> */}

                            {/* Individual Items */}
                            <div className="px-3 py-1 text-xs font-medium tracking-wide text-[#888888] uppercase">
                              Review Individual Items
                            </div>
                            {order.reference_items.map((item, index) => (
                              <button
                                key={item.id || index}
                                onClick={() => handleReviewSpecificItem(item)}
                                className="w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-[#EDE9DA]"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="font-medium text-[#2F2F2F]">
                                    {item.title}
                                  </span>
                                  <span className="text-xs text-[#888888]">
                                    Qty: {item.qty}
                                  </span>
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            )}

            {/* If no buttons should show and not pending */}
            {!isPendingOrder && !isConfirmed && (
              <span className="text-sm text-[#888888] italic">
                No actions available
              </span>
            )}
          </div>
        </div>

        {/* Add Review Modal */}
        <AddReviewModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedFoodItem(null);
          }}
          referenceType="food"
          referenceId={order.booking_id}
          foodItems={order.reference_items}
          selectedFoodItem={selectedFoodItem}
        />
      </div>
    </>
  );
};

export default FoodOrderCard;
