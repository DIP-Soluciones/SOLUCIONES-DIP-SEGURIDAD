"use client";

import { useEffect, useState } from "react";
import { MessageSquareText } from "lucide-react";
import { LiveOrb } from "@/components/ui/LiveOrb";
import { siteContent } from "@/content/site";
import { cn } from "@/lib/utils";

export function FloatingOrbCta() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const [useStaticFallback, setUseStaticFallback] = useState(true);
  const [size, setSize] = useState(56);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    setIsFinePointer(pointerQuery.matches);

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");

    const evaluateCapability = () => {
      const isDesktop = desktopQuery.matches;
      setSize(isDesktop ? 64 : 56);

      if (reducedMotionQuery.matches) {
        setUseStaticFallback(true);
        return;
      }

      if (!isDesktop) {
        const cores = navigator.hardwareConcurrency ?? 4;
        const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
        const isLowEnd = cores <= 4 || memory <= 4;
        setUseStaticFallback(isLowEnd);
      } else {
        setUseStaticFallback(false);
      }
    };

    evaluateCapability();
    desktopQuery.addEventListener("change", evaluateCapability);
    reducedMotionQuery.addEventListener("change", evaluateCapability);

    const checkVisibility = () => {
      const contactSection = document.getElementById("contacto");
      let contactInView = false;

      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        contactInView = rect.top < window.innerHeight && rect.bottom > 0;
      }

      setIsVisible(window.scrollY > 600 && !contactInView);
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    checkVisibility();

    return () => {
      desktopQuery.removeEventListener("change", evaluateCapability);
      reducedMotionQuery.removeEventListener("change", evaluateCapability);
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);

  return (
    <a
      href={siteContent.floatingCta.href}
      aria-label={siteContent.floatingCta.label}
      tabIndex={isVisible ? 0 : -1}
      aria-hidden={!isVisible}
      style={{
        bottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
      }}
      className={cn(
        "group fixed right-5 z-50 flex min-h-14 min-w-14 items-center justify-center rounded-pill border-2 border-white/20 bg-surface/90 shadow-glow-brand backdrop-blur-md outline-none focus-visible:ring-2 focus-visible:ring-brand md:bottom-8 md:right-8",
        "transition-[opacity,translate] duration-300 motion-reduce:transition-none",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      {/* Tooltip */}
      <div className="pointer-events-none absolute right-full mr-4 hidden opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        <span className="whitespace-nowrap rounded-pill bg-pill px-3 py-1.5 text-sm font-bold text-pill-text shadow-card">
          {siteContent.floatingCta.label}
        </span>
      </div>

      {/* Orbe WebGL o fallback ligero sin WebGL */}
      {useStaticFallback ? (
        <span
          style={{ width: size, height: size }}
          className="relative flex items-center justify-center rounded-pill bg-gradient-to-br from-brand to-brand-dark text-white"
        >
          <MessageSquareText className="size-6" aria-hidden="true" />
        </span>
      ) : (
        <LiveOrb size={size} interactive={isFinePointer} />
      )}
    </a>
  );
}