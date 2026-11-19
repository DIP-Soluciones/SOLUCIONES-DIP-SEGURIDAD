import React, { forwardRef } from "react";
import { serviceLayouts } from "./service-layouts";
import { ProductCard } from "@/content/site";

interface StackCardProps {
  card: ProductCard;
  index: number;
  totalCards: number;
  isLast: boolean;
}

export const StackCard = forwardRef<HTMLDivElement, StackCardProps>(
  ({ card, index }, ref) => {
    return (
      <div
        ref={ref}
        className="stack-card-wrapper sticky w-full top-[var(--card-top-mobile)] md:top-[var(--card-top-desktop)] h-[clamp(27rem,calc(100svh-var(--card-top-mobile)-1.5rem),44rem)] md:h-[clamp(32rem,calc(100svh-var(--card-top-desktop)-1.5rem),48rem)]"
        style={
          {
            "--card-top-mobile": `calc(5rem + ${index * 0.75}rem)`,
            "--card-top-desktop": `calc(6rem + ${index * 1.25}rem)`,
            zIndex: index,
          } as React.CSSProperties
        }
      >
        {/* Contenedor principal marco */}
        <div className="stack-card-inner relative flex h-full w-full origin-top transform-gpu flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-colors duration-300 will-change-transform hover:border-brand/40">
          {/* Capa de sombreado GSAP por profundidad */}
          <div className="stack-card-overlay pointer-events-none absolute inset-0 z-30 rounded-card bg-background opacity-0" />

          {/* Brillo superior */}
          <div className="pointer-events-none absolute inset-x-8 top-0 z-20 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />

          {/* Renderizado del layout correspondiente */}
          {card.layout === "showcase" && (
            <serviceLayouts.showcase
              id={card.id}
              category={card.category}
              kicker={card.kicker}
              headline={card.headline}
              headlineAccent={card.headlineAccent}
              subline={card.subline}
              image={card.image}
              imageSide={card.imageSide}
              features={card.features}
              cta={card.cta}
            />
          )}

          {card.layout === "collage" && (
            <serviceLayouts.collage
              headline={card.headline}
              subline={card.subline}
              tiles={card.tiles}
            />
          )}
        </div>
      </div>
    );
  }
);

StackCard.displayName = "StackCard";