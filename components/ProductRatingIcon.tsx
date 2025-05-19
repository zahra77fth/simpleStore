import { Star } from "lucide-react";

interface ProductRatingIconProps {
  rating: number;
  className?: string;
}

export const ProductRatingIcon = ({
  rating,
  className = "",
}: ProductRatingIconProps) => {
  let iconColor = "";

  if (rating < 3) {
    iconColor = "text-red-500";
  } else if (rating >= 3 && rating <= 4) {
    iconColor = "text-yellow-500";
  } else {
    iconColor = "text-green-500";
  }

  return (
    <div className={`flex items-center ${className}`}>
      <Star className={`w-5 h-5 ${iconColor} fill-current`} />
      <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
    </div>
  );
};
