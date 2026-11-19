"use client";

import { useState, useEffect } from "react";
import { LiveOrb } from "./LiveOrb";
import { cn } from "@/lib/utils";

export function OrbSlot({ size, className }: { size: number; className?: string }) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const checkDesktop = () => window.matchMedia("(min-width: 768px)").matches;
    setShouldRender(checkDesktop());
    
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setShouldRender(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div className={cn("shrink-0 relative", className)} style={{ width: size, height: size }}>
      {shouldRender && <LiveOrb size={size} interactive={true} className="absolute inset-0" />}
    </div>
  );
}