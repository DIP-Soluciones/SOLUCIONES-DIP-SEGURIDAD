"use client";

import { useState } from "react";
import Image from "next/image";

interface CollageLayoutProps {
  headline: string;
  subline: string;
  tiles: readonly {
    src: string;
    alt: string;
  }[];
}

export function CollageLayout({ headline, subline, tiles }: CollageLayoutProps) {
  const [failedIndices, setFailedIndices] = useState<number[]>([]);

  const handleTileError = (index: number) => {
    setFailedIndices((prev) => [...prev, index]);
  };

  return (
    <div className="relative w-full h-full overflow-hidden rounded-[inherit] min-h-0">
      {/* Grilla 2x2 de fondo */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
        {tiles.slice(0, 4).map((tile, idx) => {
          const isFailed = failedIndices.includes(idx);
          return (
            <div key={idx} className="relative w-full h-full bg-surface-raised overflow-hidden">
              {!isFailed ? (
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  onError={() => handleTileError(idx)}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-surface-raised text-muted-text p-4 text-center">
                  <span className="text-xs uppercase tracking-widest font-bold">Imagen no disponible</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Panel central */}
      <div className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-brand text-white rounded-2xl px-5 py-3 md:px-8 md:py-5 text-center max-w-[90%] shadow-card border border-white/25 pointer-events-auto">
          <h3 className="font-extrabold uppercase text-2xl md:text-5xl lg:text-6xl tracking-tight mb-1 md:mb-2 [text-shadow:_0_2px_8px_rgba(0,0,0,0.3)]">
            {headline}
          </h3>
          <p className="text-xs md:text-lg font-medium text-white/95">
            {subline}
          </p>
        </div>
      </div>
    </div>
  );
}