"use client";

import { useState } from "react";
import Image from "next/image";
import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

interface ShowcaseBackgroundProps {
  src: string;
  alt: string;
  objectPosition: string;
  icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  className?: string;
}

export function ShowcaseBackground({
  src,
  alt,
  objectPosition,
  icon: Icon,
  className,
}: ShowcaseBackgroundProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const failed = failedSrc === src;

  return (
    <div className={cn("absolute inset-0 z-0", className)}>
      {failed ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-surface-raised"
        >
          <Icon className="size-16 text-brand/40" strokeWidth={1.5} />
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition }}
          onError={() => setFailedSrc(src)}
        />
      )}
    </div>
  );
}