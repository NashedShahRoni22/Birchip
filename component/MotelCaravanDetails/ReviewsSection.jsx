"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import calculateAvgRating from "@/utils/calculateAvgRating";
import { format } from "date-fns";

const ReviewsSection = ({ reviews = [], isCaravan = false }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState(new Set());

  // Calculate rating statistics
  const totalReviews = reviews.length;
  const averageRating = calculateAvgRating(reviews);

  // Show first 6 reviews by default
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 6);

  const toggleReviewExpansion = (reviewId) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (totalReviews === 0) {
    return (
      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <div className="py-12 text-center">
          <MessageCircle className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            No Reviews Yet
          </h3>
          <p className="text-gray-600">
            Be the first to share your experience with this{" "}
            {isCaravan ? "caravan" : "room"}!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-6 flex items-center gap-4">
          <Star className="h-7 w-7 fill-yellow-400 text-yellow-400" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {averageRating} · {totalReviews} review
              {totalReviews !== 1 ? "s" : ""}
            </h2>
          </div>
        </div>

        {/* Simple Rating Summary */}
        <div className="rounded-xl bg-gray-50 p-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 ${
                  star <= Math.round(averageRating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">
            Based on {totalReviews} guest review{totalReviews !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => {
          const isExpanded = expandedReviews.has(review.id);
          const shouldTruncate = review.comment && review.comment.length > 150;

          return (
            <div
              key={review.id}
              className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0"
            >
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <div className="flex-shrink-0">
                  <Image
                    src={review.user?.avatar || "/placeholder-avatar.jpg"}
                    alt={review.user?.name || "User"}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full border-2 border-gray-100 object-cover"
                  />
                </div>

                {/* Review Content */}
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.user?.name || "Anonymous User"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {format(review.created_at, "MMMM yyyy")}
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Comment */}
                  {review.comment && (
                    <div className="prose prose-sm max-w-none">
                      <p className="leading-relaxed text-gray-700">
                        {shouldTruncate && !isExpanded
                          ? truncateText(review.comment)
                          : review.comment}
                      </p>

                      {shouldTruncate && (
                        <button
                          onClick={() => toggleReviewExpansion(review.id)}
                          className="mt-2 flex items-center gap-1 text-sm font-medium text-[#603C59] transition-colors hover:text-[#C73E5B]"
                        >
                          {isExpanded ? (
                            <>
                              Show less <ChevronUp className="h-4 w-4" />
                            </>
                          ) : (
                            <>
                              Show more <ChevronDown className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {totalReviews > 6 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="inline-flex items-center gap-2 rounded-xl border-2 border-[#603C59] px-6 py-3 font-semibold text-[#603C59] transition-all duration-200 hover:bg-[#603C59] hover:text-white"
          >
            {showAllReviews ? (
              <>
                Show fewer reviews <ChevronUp className="h-5 w-5" />
              </>
            ) : (
              <>
                Show all {totalReviews} reviews{" "}
                <ChevronDown className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;
