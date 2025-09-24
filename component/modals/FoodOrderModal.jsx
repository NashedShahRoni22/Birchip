"use client";

import { useState } from "react";
import { X, Plus, Minus, ShoppingCart, MapPin } from "lucide-react";
import { calculateDiscount } from "@/utils/calculateDiscount";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import toast from "react-hot-toast";

export default function FoodOrderModal({ isOpen, onClose, selectedFood }) {
  const [roomNumber, setRoomNumber] = useState("");
  const [quantity, setQuantity] = useState(1);

  // const { mutate, isPending } = usePostMutation({ endPoint: "/food-order", token: true });

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const totalAmount = selectedFood?.discount
    ? calculateDiscount(
        selectedFood?.discount_type,
        selectedFood?.price,
        selectedFood?.discount,
      ) * quantity
    : selectedFood?.price * quantity;

  if (!isOpen || !selectedFood) return null;

  const handleSubmitOrder = () => {
    if (!roomNumber.trim()) {
      alert("Please enter your room number");
      return;
    }

    const payload = {
      booking_id: selectedFood?.id,
      [`references[0][id]`]: selectedFood?.user_id,
      [`references[0][qty]`]: quantity,
    };

    // mutate(payload, {
    //   onSuccess: (data) => {
    //     toast.success(
    //       data?.message || "Your order have been placed successfully!",
    //     );
    //     onClose();
    //   },
    //   onError: (error) => {
    //     console.error(error);
    //     toast.error(error?.message || "Order submission failed!");
    //   },
    // });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="mx-4 max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="relative border-b border-gray-100 p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full p-2 transition-colors hover:bg-gray-100"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 rounded-full p-2">
              <ShoppingCart className="text-primary h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              Place Your Order
            </h2>
          </div>
          <p className="text-gray-600">
            Fill in the details to complete your food order
          </p>
        </div>

        {/* Order Summary */}
        <div className="p-6 pb-4">
          <div className="mb-6 rounded-2xl bg-gray-50 p-4">
            <h3 className="mb-2 font-semibold text-gray-900">Order Summary</h3>
            <div className="flex items-center gap-3">
              {selectedFood.icon}
              <div className="flex-1">
                <p className="font-medium text-gray-900">{selectedFood.name}</p>
                <p className="text-sm text-gray-600">
                  ${selectedFood.price.toFixed(2)} each
                </p>
              </div>
            </div>
          </div>

          {/* Room Number Input */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-900">
              <div className="flex items-center gap-2">
                <MapPin className="text-primary h-4 w-4" />
                Room Number
              </div>
            </label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="Enter your motel room number"
              className="focus:ring-primary focus:border-primary w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 focus:ring-2"
              disabled={isPending}
            />
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-900">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1 || isPending}
                className="rounded-xl border border-gray-200 p-2 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Minus className="h-5 w-5 text-gray-600" />
              </button>
              <div className="flex-1 text-center">
                <span className="text-2xl font-bold text-gray-900">
                  {quantity}
                </span>
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={isPending}
                className="rounded-xl border border-gray-200 p-2 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-primary/5 mb-6 rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-gray-900">
                Total Amount:
              </span>
              <span className="text-primary text-2xl font-bold">
                $
                {Number.isInteger(totalAmount)
                  ? totalAmount
                  : totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isPending}
              className="flex-1 rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitOrder}
              disabled={isPending || !roomNumber.trim()}
              className="bg-primary hover:bg-button flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  Processing...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Place Order
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
