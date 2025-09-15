"use client";

import { useState } from "react";
import {
  X,
  Plus,
  Minus,
  ShoppingCart,
  MapPin,
  Trash2,
  User,
  Phone,
  FileText,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";
import CartItem from "../CartItem";
import { redirect, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

export default function CartModal({ isOpen, onClose }) {
  const { authInfo } = useAuth();
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    getTotalItems,
    isEmpty,
  } = useCart();
  const router = useRouter();

  // Customer type state
  const [customerType, setCustomerType] = useState("guest");

  // Guest customer fields
  const [invoiceId, setInvoiceId] = useState("");

  // Walk-in customer fields
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const { mutate, isPending: isSubmitting } = usePostMutation({
    endPoint: "/food-order",
    token: customerType === "guest" ? true : false,
  });

  const handleQuantityChange = (foodId, change) => {
    const currentItem = cart.find((item) => item.id === foodId);
    if (currentItem) {
      const newQuantity = currentItem.quantity + change;
      if (newQuantity >= 1) {
        updateQuantity(foodId, newQuantity);
      }
    }
  };

  const handleRemoveItem = (foodId) => {
    removeFromCart(foodId);
    toast.success("Item removed from cart");
  };

  const validateForm = () => {
    if (isEmpty()) {
      toast.error("Your cart is empty");
      return false;
    }

    if (customerType === "guest") {
      if (authInfo?.token && !invoiceId.trim()) {
        toast.error("Please enter your invoice ID");
        return false;
      }
    } else if (customerType === "walk-in") {
      if (!customerName.trim()) {
        toast.error("Please enter your name");
        return false;
      }
      if (!customerPhone.trim()) {
        toast.error("Please enter your phone number");
        return false;
      }
    }

    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateForm()) {
      return;
    }

    if (!authInfo?.token && customerType === "guest") {
      return redirect("/auth?redirect=foods");
    }

    // Prepare FormData according to API requirements
    const formData = new FormData();

    // Add customer type
    formData.append("customer_type", customerType);

    // Add customer-specific fields
    if (customerType === "guest") {
      formData.append("invoice", invoiceId);
    } else if (customerType === "walk-in") {
      formData.append("name", customerName);
      formData.append("phone", customerPhone);
    }

    // Add cart items as references
    cart.forEach((item, index) => {
      formData.append(`references[${index}][id]`, item.id);
      formData.append(`references[${index}][qty]`, item.quantity);
    });

    mutate(formData, {
      onSuccess: (data) => {
        // Clear cart and form first
        clearCart();
        setInvoiceId("");
        setCustomerName("");
        setCustomerPhone("");
        onClose();

        if (data?.data?.checkout_url) {
          router.push(data.data.checkout_url);
          clearCart();
        } else {
          toast.success(
            data?.message || "Your order has been placed successfully!",
          );
        }
      },
      onError: (error) => {
        console.error(error);
        toast.error(error?.message || "Order submission failed!");
      },
    });
  };

  const resetForm = () => {
    setInvoiceId("");
    setCustomerName("");
    setCustomerPhone("");
  };

  const handleCustomerTypeChange = (type) => {
    setCustomerType(type);
    resetForm();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Cart Modal */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="relative border-b border-gray-100 bg-white p-6 pb-4">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
              <div className="mb-2 flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <ShoppingCart className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Cart
                  </h2>
                  <p className="text-sm text-gray-600">
                    {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} in
                    your cart
                  </p>
                </div>
              </div>
            </div>

            {/* Cart Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              {isEmpty() ? (
                // Empty Cart State
                <div className="flex h-full flex-col items-center justify-center p-6">
                  <div className="mb-4 rounded-full bg-gray-100 p-4">
                    <ShoppingCart className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Your cart is empty
                  </h3>
                  <p className="mb-4 text-center text-gray-600">
                    Add some delicious items to your cart to get started!
                  </p>
                  <button
                    onClick={onClose}
                    className="bg-primary hover:bg-button cursor-pointer rounded-xl px-6 py-2 font-medium text-white transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4 p-6">
                  {/* Cart Items */}
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        handleRemoveItem={handleRemoveItem}
                        handleQuantityChange={handleQuantityChange}
                        isSubmitting={isSubmitting}
                      />
                    ))}
                  </div>

                  {/* Clear Cart Button */}
                  {!isEmpty() && (
                    <button
                      onClick={() => {
                        clearCart();
                        toast.success("Cart cleared");
                      }}
                      className="w-full rounded-lg py-2 font-medium text-red-500 transition-colors hover:bg-red-50"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Footer - Checkout Section */}
            {!isEmpty() && (
              <div className="space-y-4 border-t border-gray-100 bg-white p-6">
                {/* Customer Type Selection */}
                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-900">
                    Customer Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCustomerTypeChange("guest")}
                      disabled={isSubmitting}
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                        customerType === "guest"
                          ? "bg-primary text-white"
                          : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <MapPin className="h-4 w-4" />
                      Motel Guest
                    </button>
                    <button
                      onClick={() => handleCustomerTypeChange("walk-in")}
                      disabled={isSubmitting}
                      className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                        customerType === "walk-in"
                          ? "bg-primary text-white"
                          : "border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <User className="h-4 w-4" />
                      Walk-in
                    </button>
                  </div>
                </div>

                {/* Customer-specific Fields */}
                {customerType === "guest" && (
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-900">
                      <div className="flex items-center gap-2">
                        <FileText className="text-primary h-4 w-4" />
                        Invoice ID
                      </div>
                    </label>
                    <input
                      type="text"
                      value={invoiceId}
                      onChange={(e) =>
                        setInvoiceId(e.target.value.toUpperCase())
                      }
                      placeholder="Enter your invoice ID (e.g., T6TNMHJFML)"
                      className="focus:ring-primary focus:border-primary w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 focus:ring-2"
                      disabled={isSubmitting}
                    />
                  </div>
                )}

                {customerType === "walk-in" && (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">
                        <div className="flex items-center gap-2">
                          <User className="text-primary h-4 w-4" />
                          Full Name
                        </div>
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Enter your full name"
                        className="focus:ring-primary focus:border-primary w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 focus:ring-2"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-gray-900">
                        <div className="flex items-center gap-2">
                          <Phone className="text-primary h-4 w-4" />
                          Phone Number
                        </div>
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="Enter your phone number"
                        className="focus:ring-primary focus:border-primary w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 transition-colors placeholder:text-gray-500 focus:ring-2"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                )}

                {/* Total Amount */}
                <div className="bg-primary/5 rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      Total Amount:
                    </span>
                    <span className="text-primary text-2xl font-bold">
                      ${getTotalPrice()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting || isEmpty()}
                    className="bg-primary hover:bg-button flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-3 font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? (
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
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
