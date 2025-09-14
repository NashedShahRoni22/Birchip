import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  UtensilsCrossed,
  Calendar,
  CreditCard,
  LoaderCircle,
} from "lucide-react";

const FoodOrderCard = ({ order }) => {
  const [isPending, setIsPending] = useState(false);

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

  const handleMakePayment = () => {
    setIsPending(true);
    // Your payment logic here
    setTimeout(() => setIsPending(false), 2000); // Simulate API call
  };

  const total = calculateTotal(order.reference_items);
  const originalTotal = calculateOriginalTotal(order.reference_items);
  const totalDiscount = calculateTotalDiscount(order.reference_items);

  return (
    <div className="rounded-lg border border-[#E0E0E0] bg-white p-6">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-[#EDE9DA] p-3">
            <UtensilsCrossed size={24} className="text-[#603C59]" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#2F2F2F]">Food Order</h3>
            <p className="text-sm text-[#888888]">Order #{order.booking_id}</p>

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
        {order.reference_items.map((item) => (
          <div
            key={item.id}
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
          <div className="flex items-center gap-1">
            <CreditCard size={16} />
            <span className="capitalize">{order.gateway}</span>
          </div>
        </div>

        <div className="flex gap-2">
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

          {/* Show Write Review button if status is 1 (confirmed) */}
          {isConfirmed && (
            <motion.button
              className="cursor-pointer rounded-lg bg-[#7BA693] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#6B9582]"
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
  );
};

export default FoodOrderCard;
