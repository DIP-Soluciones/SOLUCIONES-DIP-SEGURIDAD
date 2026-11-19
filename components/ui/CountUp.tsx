"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1800,
}: CountUpProps) {
  // Inicializa con el valor final para SSR (evita parpadeos o layout shifts si JS falla)
  const [count, setCount] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      setCount(value);
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number;
          
          // Bajamos a 0 justo antes de iniciar la animación para que el efecto sea visual
          setCount(0);

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing ease-out cúbico para una desaceleración natural
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            setCount(easeOut * value);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(value);
            }
          };
          
          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  const formatted = new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(count);

  return (
    <span ref={ref} className="tabular-nums inline-block">
      {prefix && <span className="text-brand">{prefix}</span>}
      {formatted}
      {suffix && <span className="text-brand">{suffix}</span>}
    </span>
  );
}