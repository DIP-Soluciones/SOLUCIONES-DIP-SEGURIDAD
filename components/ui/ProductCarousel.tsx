"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { siteContent } from "@/content/site";

export function ProductCarousel() {
  const scrollRef = useRef<HTMLUListElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const featured = siteContent.sections.featuredProducts;

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    // Tolerancia de 1px por redondeos del navegador
    setCanScrollPrev(scrollLeft > 1);
    setCanScrollNext(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(() => checkScroll());
    resizeObserver.observe(el);
    
    return () => resizeObserver.disconnect();
  }, [checkScroll]);

  const onScroll = () => {
    requestAnimationFrame(checkScroll);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.8;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div 
      className="relative w-full max-w-7xl mx-auto" 
      role="region" 
      aria-roledescription="carousel" 
      aria-label={featured.carouselLabel}
    >
      {/* Sombra Degradado Izquierdo */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-10 bg-linear-to-r from-background to-transparent pointer-events-none z-10 transition-opacity duration-300 ${canScrollPrev ? 'opacity-100' : 'opacity-0'}`} 
      />
      
      {/* Botón Izquierdo (Oculto en móvil) */}
      <button
        onClick={() => scroll("left")}
        disabled={!canScrollPrev}
        className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex size-11 items-center justify-center rounded-full border border-line bg-background/80 text-foreground transition-all duration-300 hover:bg-brand hover:border-brand hover:text-white disabled:opacity-0 disabled:pointer-events-none shadow-sm"
        aria-label={featured.prevLabel}
      >
        <ChevronLeft className="size-6" />
      </button>

      {/* Lista scrolleable */}
      <ul
        ref={scrollRef}
        onScroll={onScroll}
        role="list"
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-px-4 px-4 pt-3 pb-6 -mt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {featured.items.map((item) => (
          <li key={item.id} className="contents">
            <ProductCard product={item} />
          </li>
        ))}
      </ul>

      {/* Sombra Degradado Derecho */}
      <div 
        className={`absolute right-0 top-0 bottom-0 w-10 bg-linear-to-l from-background to-transparent pointer-events-none z-10 transition-opacity duration-300 ${canScrollNext ? 'opacity-100' : 'opacity-0'}`} 
      />
      
      {/* Botón Derecho (Oculto en móvil) */}
      <button
        onClick={() => scroll("right")}
        disabled={!canScrollNext}
        className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex size-11 items-center justify-center rounded-full border border-line bg-background/80 text-foreground transition-all duration-300 hover:bg-brand hover:border-brand hover:text-white disabled:opacity-0 disabled:pointer-events-none shadow-sm"
        aria-label={featured.nextLabel}
      >
        <ChevronRight className="size-6" />
      </button>
    </div>
  );
}