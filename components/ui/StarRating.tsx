import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
  activeClass?: string;
  inactiveClass?: string;
  ariaLabel: string;
}

export function StarRating({ 
  rating, 
  size = 18, 
  className = "", 
  activeClass = "text-brand", 
  inactiveClass = "text-foreground/20", 
  ariaLabel 
}: StarRatingProps) {
  return (
    <div className={`flex gap-1 ${className}`} aria-label={ariaLabel}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          aria-hidden="true"
          className={`fill-current ${star <= rating ? activeClass : inactiveClass}`}
        />
      ))}
    </div>
  );
}