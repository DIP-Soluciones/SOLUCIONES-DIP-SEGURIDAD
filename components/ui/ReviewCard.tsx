import { StarRating } from "./StarRating";
import type { Review } from "@/content/site";

export interface CarouselReview extends Review {
  uniqueKey: number;
}

interface ReviewCardProps {
  review: CarouselReview;
  position: number;
  cardSize: number;
  isCenter: boolean;
  onSelect: (pos: number) => void;
  ariaLabelTemplate: string;
  starsLabelTemplate: string;
  isGrid?: boolean;
}

export function ReviewCard({ 
  review, 
  position, 
  cardSize, 
  isCenter, 
  onSelect, 
  ariaLabelTemplate, 
  starsLabelTemplate,
  isGrid = false
}: ReviewCardProps) {
  const formattedDate = new Intl.DateTimeFormat("es-CL", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(review.date));

  const initial = review.authorName ? review.authorName.charAt(0).toUpperCase() : "";
  const ariaLabel = ariaLabelTemplate.replace("{name}", review.authorName);
  const starsLabel = starsLabelTemplate.replace("{rating}", String(review.rating));

  const baseClasses = "rounded-3xl p-6 md:p-8 text-left transition-all duration-500 ease-in-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  
  // Estilos según estado
  const centerClasses = "z-10 bg-brand text-white border-transparent shadow-[0_20px_50px_-15px_var(--color-brand)]";
  const lateralClasses = "z-0 bg-surface text-foreground border border-line hover:border-brand/50 shadow-[0_8px_24px_rgb(0_0_0/0.4)]";
  
  // En grilla mostramos todo como "lateral" visualmente, salvo que quieras destacar alguno
  const activeClasses = (isCenter && !isGrid) ? centerClasses : lateralClasses;

  const Component = (isCenter && !isGrid) || isGrid ? "article" : "button";

  const transform = isGrid 
    ? undefined 
    : `translate(-50%, -50%) translateX(${(cardSize / 1.5) * position}px) translateY(${isCenter ? -30 : position % 2 ? 15 : -15}px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)`;

  return (
    <Component
      type={Component === "button" ? "button" : undefined}
      onClick={Component === "button" ? () => onSelect(position) : undefined}
      className={`${baseClasses} ${activeClasses} ${isGrid ? "w-full h-full flex flex-col relative" : "absolute left-1/2 top-1/2 cursor-pointer"}`}
      style={isGrid ? undefined : { width: `${cardSize}px`, height: `${cardSize}px`, transform }}
      aria-label={Component === "button" ? ariaLabel : undefined}
      aria-current={(isCenter && !isGrid) ? "true" : undefined}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-bold text-lg ${isCenter && !isGrid ? "bg-white/20 text-white" : "bg-brand/15 text-brand"}`}>
          {initial}
        </div>
        <div className="flex flex-col">
          <span className="font-semibold line-clamp-1">{review.authorName}</span>
          <span className={`text-sm ${isCenter && !isGrid ? "text-white/80" : "text-muted-text"}`}>
            {formattedDate}
          </span>
        </div>
      </div>
      
      <StarRating 
        rating={review.rating} 
        ariaLabel={starsLabel} 
        className="mb-4"
        activeClass={isCenter && !isGrid ? "text-white" : "text-brand"}
        inactiveClass={isCenter && !isGrid ? "text-white/30" : "text-foreground/20"}
      />

      <p className="line-clamp-4 text-base leading-relaxed flex-grow">
        {review.comment}
      </p>
    </Component>
  );
}