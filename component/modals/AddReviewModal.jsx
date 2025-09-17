import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  X,
  Building2,
  Car,
  UtensilsCrossed,
  LoaderCircle,
} from "lucide-react";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import toast from "react-hot-toast";

const AddReviewModal = ({
  isOpen,
  onClose,
  referenceType,
  referenceId,
  foodItems = null,
  selectedFoodItem = null, // New prop for specific food item
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  // post mutation hook
  const { mutate, isPending } = usePostMutation({
    endPoint: "/reviews/store",
    token: true,
  });

  // Reset form when modal opens/closes
  const handleClose = () => {
    setRating(0);
    setHoveredRating(0);
    setComment("");
    onClose();
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const getIcon = () => {
    switch (referenceType) {
      case "motel":
        return <Building2 size={24} className="text-[#603C59]" />;
      case "caravan":
        return <Car size={24} className="text-[#603C59]" />;
      case "food":
        return <UtensilsCrossed size={24} className="text-[#603C59]" />;
      default:
        return <Star size={24} className="text-[#603C59]" />;
    }
  };

  const getTitle = () => {
    if (referenceType === "food" && selectedFoodItem) {
      return `Rate "${selectedFoodItem.title}"`;
    }

    switch (referenceType) {
      case "motel":
        return "Rate Your Motel Stay";
      case "caravan":
        return "Rate Your Caravan Experience";
      case "food":
        return "Rate Your Food Order";
      default:
        return "Write a Review";
    }
  };

  const getPlaceholderText = () => {
    if (referenceType === "food" && selectedFoodItem) {
      return `Tell us about your experience with ${selectedFoodItem.title}...`;
    }

    if (referenceType === "food") {
      return "Tell us about your food order experience...";
    }

    return `Tell us about your ${referenceType} experience...`;
  };

  const handleSubmit = () => {
    if (rating === 0) return;

    const reviewData = {
      reference_type: referenceType,
      reference_id: selectedFoodItem?.id ? selectedFoodItem.id : referenceId,
      comment: comment.trim(),
      rating: rating,
    };

    mutate(reviewData, {
      onSuccess: (data) => {
        // Reset form state
        setRating(0);
        setHoveredRating(0);
        setComment("");

        // Close modal
        onClose();

        // Show success feedback
        toast.success(data?.message || "Review submitted successfully!");

        console.log(data);
      },
      onError: (err) => {
        console.error(err?.message || "review post error");
        toast.error(
          err?.message || "Failed to submit review. Please try again.",
        );
      },
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E0E0E0] p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#EDE9DA] p-2">{getIcon()}</div>
                <div>
                  <h2 className="text-xl font-semibold text-[#2F2F2F]">
                    {getTitle()}
                  </h2>
                  {selectedFoodItem && (
                    <p className="text-sm text-[#888888]">
                      From Order #{referenceId}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={handleClose}
                className="cursor-pointer p-2 text-[#888888] transition-colors hover:text-[#603C59]"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Selected Food Item Preview */}
              {selectedFoodItem && (
                <div className="mb-6">
                  <div className="rounded-lg bg-gradient-to-r from-[#EDE9DA] to-[#F5F3E8] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-[#2F2F2F]">
                          {selectedFoodItem.title}
                        </h3>
                        <p className="text-sm text-[#888888]">
                          Quantity: {selectedFoodItem.qty}
                        </p>
                      </div>
                      <div className="text-right">
                        {selectedFoodItem.discount > 0 && (
                          <p className="text-xs text-[#888888] line-through">
                            $
                            {(
                              selectedFoodItem.price *
                              parseInt(selectedFoodItem.qty)
                            ).toFixed(2)}
                          </p>
                        )}
                        <p className="font-semibold text-[#2F2F2F]">
                          $
                          {(
                            (selectedFoodItem.price -
                              selectedFoodItem.discount) *
                            parseInt(selectedFoodItem.qty)
                          ).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* All Food Items Preview (only for overall order reviews) */}
              {referenceType === "food" &&
                !selectedFoodItem &&
                foodItems &&
                foodItems.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-medium text-[#2F2F2F]">
                      Items in this order:
                    </h3>
                    <div className="max-h-32 space-y-2 overflow-y-auto">
                      {foodItems.map((item, index) => (
                        <div
                          key={item.id || index}
                          className="flex items-center justify-between rounded bg-gray-50 p-2 text-sm"
                        >
                          <span className="text-[#2F2F2F]">{item.title}</span>
                          <span className="text-[#888888]">
                            Qty: {item.qty}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Star Rating */}
              <div className="mb-6">
                <label className="mb-3 block text-sm font-medium text-[#2F2F2F]">
                  How would you rate your experience?
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      className="p-1 focus:outline-none"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Star
                        size={32}
                        className={`transition-colors ${
                          star <= (hoveredRating || rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                {rating > 0 && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-sm text-[#888888]"
                  >
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent"}
                  </motion.p>
                )}
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label
                  htmlFor="comment"
                  className="mb-2 block text-sm font-medium text-[#2F2F2F]"
                >
                  Share your experience (optional)
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={getPlaceholderText()}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-[#E0E0E0] px-3 py-2 text-sm outline-none focus:border-[#603C59] focus:ring-2 focus:ring-[#603C59]"
                  maxLength={500}
                />
                <p className="mt-1 text-xs text-[#888888]">
                  {comment.length}/500 characters
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <motion.button
                  onClick={handleClose}
                  className="cursor-pointer px-4 py-2 text-sm font-medium text-[#888888] transition-colors hover:text-[#603C59]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  onClick={handleSubmit}
                  disabled={rating === 0 || isPending}
                  className={`rounded-lg px-6 py-2 text-sm font-medium text-white transition-all ${
                    rating === 0 || isPending
                      ? "cursor-not-allowed bg-gray-400"
                      : "cursor-pointer bg-[#C73E5B] hover:bg-[#A53251]"
                  }`}
                  whileHover={rating > 0 && !isPending ? { scale: 1.02 } : {}}
                  whileTap={rating > 0 && !isPending ? { scale: 0.98 } : {}}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>Submit Review</span>
                    {isPending && (
                      <LoaderCircle size={16} className="animate-spin" />
                    )}
                  </div>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddReviewModal;
