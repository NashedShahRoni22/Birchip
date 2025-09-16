import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  X, 
  Building2, 
  Car, 
  UtensilsCrossed,
  LoaderCircle 
} from "lucide-react";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import toast from "react-hot-toast";


const AddReviewModal = ({ 
  isOpen, 
  onClose, 
  referenceType, 
  referenceId,
}) => {

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  // post mutation hook
  const {mutate, isPending} = usePostMutation({endPoint: '/reviews/store' , token: true})

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
      case 'motel':
        return <Building2 size={24} className="text-[#603C59]" />;
      case 'caravan':
        return <Car size={24} className="text-[#603C59]" />;
      case 'food':
        return <UtensilsCrossed size={24} className="text-[#603C59]" />;
      default:
        return <Star size={24} className="text-[#603C59]" />;
    }
  };

  const getTitle = () => {
    switch (referenceType) {
      case 'motel':
        return 'Rate Your Motel Stay';
      case 'caravan':
        return 'Rate Your Caravan Experience';
      case 'food':
        return 'Rate Your Food Order';
      default:
        return 'Write a Review';
    }
  };

  const handleSubmit = () => {
    if (rating === 0) return;

    const reviewData = {
      reference_type: referenceType,
      reference_id: referenceId,
      comment: comment.trim(),
      rating: rating
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
        toast.success(data?.message || 'Review submitted successfully!');
        
        console.log(data);
      },
      onError: (err) => {
        console.error(err?.message || 'review post error');
        toast.error(err?.message || 'Failed to submit review. Please try again.');
      }
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
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#E0E0E0]">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#EDE9DA] p-2">
                  {getIcon()}
                </div>
                <h2 className="text-xl font-semibold text-[#2F2F2F]">
                  {getTitle()}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-[#888888] hover:text-[#603C59] transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Star Rating */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#2F2F2F] mb-3">
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
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
                {rating > 0 && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-[#888888] mt-2"
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
                  className="block text-sm font-medium text-[#2F2F2F] mb-2"
                >
                  Share your experience (optional)
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={`Tell us about your ${referenceType} experience...`}
                  rows={4}
                  className="w-full px-3 py-2 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#603C59] focus:border-[#603C59] outline-none resize-none text-sm"
                  maxLength={500}
                />
                <p className="text-xs text-[#888888] mt-1">
                  {comment.length}/500 characters
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <motion.button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-[#888888] hover:text-[#603C59] transition-colors cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                
                                <motion.button
                  onClick={handleSubmit}
                  disabled={rating === 0 || isPending}
                  className={`px-6 py-2 text-sm font-medium text-white rounded-lg transition-all ${
                    rating === 0 || isPending
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-[#C73E5B] hover:bg-[#A53251] cursor-pointer'
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