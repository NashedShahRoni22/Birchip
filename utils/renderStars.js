import { Star } from "lucide-react";

export const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: fullStars }, (_, i) => (
        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
      ))}
      {hasHalfStar && (
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 opacity-50" />
      )}
    </div>
  );
};
