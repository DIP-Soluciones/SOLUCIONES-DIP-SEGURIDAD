"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface FloatingPathsProps {
  className?: string;
  colorClassName?: string;
}

export function FloatingPaths({
  className,
  colorClassName = "text-black",
}: FloatingPathsProps) {
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

      const strokeWidth = 1.0 + (index / 10) * 1.4;
      const strokeOpacity = 0.18 + (index / 10) * 0.30;
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
            "animate-path-flow [stroke-dasharray:0.35_0.35] motion-reduce:animate-none motion-reduce:[stroke-dasharray:none] group-data-[paused=true]:[animation-play-state:paused]",
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
      className={cn("group pointer-events-none absolute inset-0 overflow-hidden [contain:paint]", className)}
    >
      <svg
        className={cn(
          "absolute top-0 h-full left-1/2 -translate-x-1/2 w-[220%] sm:w-full sm:left-0 sm:translate-x-0 pointer-events-none",
          colorClassName
        )}
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {renderPaths(1)}
      </svg>
      <svg
        className={cn(
          "absolute top-0 h-full left-1/2 -translate-x-1/2 w-[220%] sm:w-full sm:left-0 sm:translate-x-0 pointer-events-none",
          colorClassName
        )}
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

export default FloatingPaths;
