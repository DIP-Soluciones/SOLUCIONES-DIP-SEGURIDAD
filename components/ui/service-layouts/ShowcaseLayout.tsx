"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { serviceIcons, type ServiceIconId } from "@/components/ui/service-icons";
import { siteContent, type ShowcaseFeature } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { ShowcaseFeatures } from "./showcase/ShowcaseFeatures";
import { ShowcaseText } from "./showcase/ShowcaseText";

interface ShowcaseLayoutProps {
  id: string;
  title?: string;
  category: string;
  kicker?: string;
  headline: string;
  headlineAccent?: string;
  subline?: string;
  image: {
    src: string;
    alt: string;
    position?: {
      desktop?: string;
      mobile?: string;
    };
  };
  imageSide?: "left" | "right";
  features: readonly ShowcaseFeature[];
  cta?: { label: string; href?: string };
}

export function ShowcaseLayout({
  title,
  category,
  kicker,
  headline,
  headlineAccent,
  subline,
  image,
  imageSide = "left",
  features,
  cta,
}: ShowcaseLayoutProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const imageFailed = failedSrc === image.src;

  const CategoryIcon = serviceIcons[category as ServiceIconId] ?? serviceIcons.other;

  const fullTitle = title ?? [headline, headlineAccent].filter(Boolean).join(" ");
  const message = siteContent.sections.solutions.cardCtaMessage.replace("{title}", fullTitle);
  const ctaHref = cta?.href || getWhatsAppUrl(siteContent.sections.contact.whatsapp.number, message);

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col justify-between overflow-hidden rounded-[inherit] bg-surface bg-linear-to-br from-surface via-surface to-background p-5 sm:p-6 md:grid md:grid-cols-2 md:items-center md:gap-10 md:p-10 lg:gap-14 lg:p-12">
      {/* --- COLUMNA DE PRODUCTO --- */}
      <div
        className={cn(
          "relative flex w-full flex-1 items-center justify-center md:h-full md:flex-initial",
          imageSide === "right" && "md:order-2"
        )}
      >
        {/* Resplandor radial rojo suave detrás del producto */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 m-auto size-52 rounded-full blur-2xl sm:size-64 md:size-80 lg:size-96"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-brand) 25%, transparent) 0%, transparent 70%)",
          }}
        />

        {/* Elipse de sombra bajo el producto */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-1 h-4 w-3/5 rounded-full bg-background/90 blur-md md:bottom-4 md:h-6 md:w-2/3 md:blur-lg"
        />

        {/* Imagen recortada con transparencia */}
        <div className="relative z-10 h-full max-h-56 w-full sm:max-h-64 md:max-h-[26rem] lg:max-h-[30rem]">
          {imageFailed ? (
            <div
              aria-hidden="true"
              className="flex h-full w-full items-center justify-center"
            >
              <CategoryIcon className="size-24 text-brand/60 md:size-32" strokeWidth={1.5} />
            </div>
          ) : (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 90vw, 45vw"
              className="object-contain drop-shadow-xl"
              style={
                image.position?.desktop || image.position?.mobile
                  ? { objectPosition: image.position?.desktop ?? image.position?.mobile }
                  : undefined
              }
              onError={() => setFailedSrc(image.src)}
            />
          )}
        </div>
      </div>

      {/* --- COLUMNA DE CONTENIDO --- */}
      <div
        className={cn(
          "relative z-10 flex shrink-0 flex-col justify-between gap-4 pt-3 md:min-h-0 md:justify-center md:gap-6 md:pt-0",
          imageSide === "right" && "md:order-1"
        )}
      >
        <div className="flex flex-col gap-4 md:gap-6">
          <ShowcaseText
            kicker={kicker}
            headline={headline}
            headlineAccent={headlineAccent}
            subline={subline}
          />

          {/* En móvil ocultamos las features en la vista compacta; en desktop siempre visibles */}
          {features.length > 0 && (
            <div className="hidden md:block">
              <ShowcaseFeatures features={features} />
            </div>
          )}
        </div>

        {/* Acciones en móvil: botón "Más detalles" + botón de consulta */}
        <div className="flex flex-col gap-2.5 pt-1 md:hidden">
          {features.length > 0 && (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              aria-expanded={isExpanded}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-pill border border-line bg-background/70 px-5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-brand/50 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span>Más detalles</span>
              <ChevronDown className="size-4 text-brand" aria-hidden="true" />
            </button>
          )}

          {cta && (
            <Button
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              className="w-full"
              icon={<FaWhatsapp className="size-4" aria-hidden="true" />}
            >
              {cta.label}
            </Button>
          )}
        </div>

        {/* Acción en escritorio */}
        {cta && (
          <div className="hidden pt-1 md:block">
            <Button
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              className="w-auto"
              icon={<FaWhatsapp className="size-4" aria-hidden="true" />}
            >
              {cta.label}
            </Button>
          </div>
        )}
      </div>

      {/* --- PANEL DESPLEGABLE DE DETALLES (SOLO MÓVIL < md) --- */}
      {isExpanded && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label={`Detalles de ${fullTitle}`}
          className="absolute inset-0 z-30 flex flex-col justify-between bg-surface/95 p-5 backdrop-blur-md md:hidden"
        >
          {/* Cabecera del panel desplegado */}
          <div className="flex items-start justify-between gap-3 border-b border-line pb-3">
            <div className="min-w-0">
              {kicker && (
                <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-brand">
                  {kicker}
                </span>
              )}
              <h3 className="truncate text-lg font-extrabold tracking-tight text-foreground">
                {headline}{" "}
                {headlineAccent && <span className="text-brand">{headlineAccent}</span>}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label="Cerrar detalles"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-pill border border-line bg-background/80 text-foreground transition-colors hover:border-brand/50 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {/* Lista completa de características con scroll interno */}
          <div className="my-3 min-h-0 flex-1 overflow-y-auto pr-1">
            {subline && (
              <p className="mb-3 text-xs leading-relaxed text-muted-text">
                {subline}
              </p>
            )}
            <ShowcaseFeatures features={features} showAllOnMobile />
          </div>

          {/* Pie fijo con botón de consulta WhatsApp */}
          <div className="border-t border-line pt-3">
            {cta && (
              <Button
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                size="sm"
                className="w-full"
                icon={<FaWhatsapp className="size-4" aria-hidden="true" />}
              >
                {cta.label}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}