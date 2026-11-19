"use client";

import { useState } from "react";
import Image from "next/image";
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
          "relative flex w-full shrink-0 items-center justify-center md:h-full",
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

        {/* Imagen recortada con transparencia (~34svh max-h-64 en móvil; altura completa centrada en desktop) */}
        <div className="relative z-10 h-[34svh] max-h-64 w-full [@media(max-height:680px)]:h-[24svh] md:h-full md:max-h-[26rem] lg:max-h-[30rem]">
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

      {/* --- COLUMNA DE CONTENIDO (sin paneles, bordes ni blur) --- */}
      <div
        className={cn(
          "relative z-10 flex min-h-0 flex-1 flex-col justify-between gap-4 pt-3 md:flex-initial md:justify-center md:gap-6 md:pt-0",
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

          {features.length > 0 && <ShowcaseFeatures features={features} />}
        </div>

        {cta && (
          <div className="pt-1">
            <Button
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              className="w-full md:w-auto"
              icon={<FaWhatsapp className="size-4" aria-hidden="true" />}
            >
              {cta.label}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}