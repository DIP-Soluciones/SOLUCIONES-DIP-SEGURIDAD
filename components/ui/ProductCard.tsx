"use client";

import { useState } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa6";
import { serviceIcons, ServiceIconId } from "./service-icons";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { siteContent, FeaturedProduct } from "@/content/site";

export function ProductCard({ product }: { product: FeaturedProduct }) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = serviceIcons[product.category as ServiceIconId] || serviceIcons.other;

  const catLabel = siteContent.services.find((s) => s.id === product.category)?.label || "";
  const featured = siteContent.sections.featuredProducts;

  // Utiliza el número de WhatsApp configurado en contact
  const whatsappNumber = siteContent.sections.contact.whatsapp.number;
  const msg = featured.whatsappMessage.replace("{title}", product.title);
  const href = getWhatsAppUrl(whatsappNumber, msg);
  const ariaLabel = featured.cardAriaLabel.replace("{title}", product.title);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      onFocus={(e) => e.currentTarget.scrollIntoView({ inline: "nearest", block: "nearest" })}
      className="group relative flex h-full w-[280px] shrink-0 snap-start flex-col overflow-hidden rounded-panel border border-line bg-surface shadow-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:w-[300px]"
    >
      {/* Brillo superior consistente con StackCard */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 z-20 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
      />

      {/* Imagen */}
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-pill">
        {!imageFailed ? (
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
            sizes="(max-width: 640px) 280px, 300px"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-pill">
            <Icon className="size-16 text-pill-text/30" strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="flex flex-col gap-2.5">
          {catLabel && (
            <span className="inline-flex w-fit items-center gap-1.5 rounded-pill border border-brand/30 bg-brand/10 px-2.5 py-1 text-xs font-medium text-foreground">
              <Icon className="size-3.5 shrink-0 text-brand" strokeWidth={2} />
              <span className="truncate">{catLabel}</span>
            </span>
          )}

          <h3 className="line-clamp-2 min-h-[2.75rem] text-lg font-bold leading-snug text-foreground">
            {product.title}
          </h3>

          <p className="line-clamp-3 min-h-[3.75rem] text-sm leading-relaxed text-muted-text">
            {product.description}
          </p>
        </div>

        {/* Footer de Tarjeta */}
        <div className="mt-5 flex min-h-11 items-center justify-between border-t border-line pt-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-text">
            {product.brand}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-brand">
              {featured.ctaLabel}
            </span>
            <div className="flex size-10 items-center justify-center rounded-pill bg-brand text-white transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none">
              <FaWhatsapp className="size-5" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}