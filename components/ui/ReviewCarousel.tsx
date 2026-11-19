"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReviewCard, type CarouselReview } from "./ReviewCard";
import type { Review } from "@/content/site";

interface ReviewCarouselProps {
  items: readonly Review[];
  prevLabel: string;
  nextLabel: string;
  reviewAriaLabel: string;
  starsLabel: string;
}

export function ReviewCarousel({
  items,
  prevLabel,
  nextLabel,
  reviewAriaLabel,
  starsLabel,
}: ReviewCarouselProps) {
  const uniqueIdCounter = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const [cardSize, setCardSize] = useState(340);
  const [reviews, setReviews] = useState<CarouselReview[]>(() =>
    items.map((item) => ({ ...item, uniqueKey: ++uniqueIdCounter.current }))
  );

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth >= 640) {
        setCardSize(365);
      } else if (window.innerWidth < 380) {
        setCardSize(272);
      } else {
        setCardSize(290);
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const handleMove = useCallback((steps: number) => {
    setReviews((currentList) => {
      const newList = [...currentList];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (item) newList.push({ ...item, uniqueKey: ++uniqueIdCounter.current });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (item) newList.unshift({ ...item, uniqueKey: ++uniqueIdCounter.current });
        }
      }
      return newList;
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") handleMove(-1);
    else if (e.key === "ArrowRight") handleMove(1);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const touch = e.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - touchStartX.current;
    const deltaY = touch.clientY - touchStartY.current;

    touchStartX.current = null;
    touchStartY.current = null;

    // Solo dispara swipe si el gesto horizontal domina claramente sobre el vertical
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      handleMove(deltaX < 0 ? 1 : -1);
    }
  };

  // Grilla simple para menos de 5 reseñas
  if (items.length < 5) {
    return (
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3">
        {items.map((item, index) => (
          <ReviewCard
            key={item.id}
            review={{ ...item, uniqueKey: index }}
            position={0}
            cardSize={cardSize}
            isCenter={false}
            onSelect={() => {}}
            ariaLabelTemplate={reviewAriaLabel}
            starsLabelTemplate={starsLabel}
            isGrid={true}
          />
        ))}
      </div>
    );
  }

  // Carrusel rotativo con contención de overflow horizontal y swipe táctil
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-x-clip">
      <div
        className="relative h-[520px] w-full max-w-7xl touch-pan-y select-none rounded-panel outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background md:h-[580px]"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-roledescription="carrusel"
      >
        {reviews.map((review, index) => {
          const position =
            reviews.length % 2
              ? index - (reviews.length - 1) / 2
              : index - reviews.length / 2;

          const isCenter = position === 0;

          return (
            <ReviewCard
              key={review.uniqueKey}
              review={review}
              position={position}
              cardSize={cardSize}
              isCenter={isCenter}
              onSelect={handleMove}
              ariaLabelTemplate={reviewAriaLabel}
              starsLabelTemplate={starsLabel}
            />
          );
        })}

        <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 gap-4">
          <button
            type="button"
            onClick={() => handleMove(-1)}
            aria-label={prevLabel}
            className="flex h-12 w-12 items-center justify-center rounded-pill border border-line bg-surface text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={() => handleMove(1)}
            aria-label={nextLabel}
            className="flex h-12 w-12 items-center justify-center rounded-pill border border-line bg-surface text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}