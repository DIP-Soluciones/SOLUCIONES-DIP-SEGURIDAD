import React from "react";
import { cn } from "@/lib/utils";
import type { TitlePart } from "@/content/site";

interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  titleParts?: readonly TitlePart[];
  srTitle?: string;
  eyebrow?: string;
  intro?: string;
  align?: "left" | "center";
  compact?: boolean;
}

export function SectionHeading({
  titleParts,
  srTitle,
  eyebrow,
  intro,
  align = "left",
  compact = false,
  className,
  ...props
}: SectionHeadingProps) {
  const isCenterDesktop = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col items-start text-left",
        isCenterDesktop && "md:items-center md:text-center",
        !compact && "mb-12 md:mb-16",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className="mb-3 text-(length:--text-eyebrow) font-bold uppercase tracking-[0.2em] text-brand">
          {eyebrow}
        </p>
      )}

      {titleParts && titleParts.length > 0 ? (
        <h2
          className={cn(
            "max-w-2xl text-(length:--text-h2) font-bold leading-[1.1] tracking-tight text-foreground",
            intro && "mb-4"
          )}
        >
          {titleParts.map((part, idx) => (
            <span key={idx} className={part.highlight ? "text-brand" : undefined}>
              {part.text}
            </span>
          ))}
        </h2>
      ) : (
        srTitle && <h2 className="sr-only">{srTitle}</h2>
      )}

      {intro && (
        <p
          className={cn(
            "max-w-xl text-(length:--text-intro) leading-relaxed text-muted-text",
            isCenterDesktop && "md:mx-auto"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}