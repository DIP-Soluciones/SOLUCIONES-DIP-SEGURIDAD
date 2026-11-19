import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "surface" | "none";
}

export function Section({
  variant = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-section-y-mobile md:py-section-y-desktop",
        variant === "default" && "bg-background",
        variant === "surface" && "bg-surface/50 border-y border-line",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}