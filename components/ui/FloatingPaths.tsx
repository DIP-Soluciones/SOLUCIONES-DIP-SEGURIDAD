"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export function FloatingPaths({ className }: { className?: string }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView((prev) => (prev !== entry.isIntersecting ? entry.isIntersecting : prev));
      },
      { rootMargin: "100px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const renderPaths = (position: 1 | -1) => {
    return Array.from({ length: 10 }, (_, index) => {
      const i = index * 3.6;
      
      const d = `M-${380 - i * 5 * position} -${189 + i * 6}C-${
        380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
        152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
        684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`;
      
      const strokeWidth = 0.5 + (i / 36) * 0.9;
      const strokeOpacity = 0.08 + (i / 36) * 0.2;
      const animationDuration = `${20 + ((index * 7) % 10)}s`;
      const animationDelay = `-${(index * 3) % 20}s`;

      return (
        <path
          key={index}
          d={d}
          pathLength="1"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeOpacity={strokeOpacity}
          className={cn(
            "animate-path-flow [stroke-dasharray:0.3_0.7] motion-reduce:animate-none motion-reduce:[stroke-dasharray:none] group-data-[paused=true]:[animation-play-state:paused]",
            index >= 6 ? "max-sm:hidden" : ""
          )}
          style={{ animationDuration, animationDelay }}
        />
      );
    });
  };

  return (
    <div 
      ref={ref} 
      data-paused={!isInView} 
      className={cn("group pointer-events-none absolute inset-0 [contain:paint]", className)}
    >
      <svg
        className="absolute inset-0 h-full w-full text-white"
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {renderPaths(1)}
      </svg>
      <svg
        className="absolute inset-0 h-full w-full text-white"
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {renderPaths(-1)}
      </svg>
    </div>
  );
}