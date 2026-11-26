"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2, Check, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import {
  siteContent,
  type SpecializedServiceIconId,
  type SpecializedServiceItem,
} from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const serviceCardIcons: Record<SpecializedServiceIconId, LucideIcon> = {
  condos: Building2,
  solar: Sun,
};

function SpecializedServiceCard({ item }: { item: SpecializedServiceItem }) {
  const [imageFailed, setImageFailed] = useState(false);
  const Icon = serviceCardIcons[item.icon];

  const ctaHref = getWhatsAppUrl(
    siteContent.sections.contact.whatsapp.number,
    item.whatsappMessage
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-colors duration-300 hover:border-brand/40">
      {/* Cabecera visual */}
      <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-line bg-background">
        {imageFailed ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-surface via-background to-surface p-6 text-center">
            <div className="inline-flex size-16 items-center justify-center rounded-2xl border border-brand/30 bg-brand/10 text-brand">
              <Icon className="size-8" strokeWidth={1.75} aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-text">
              {item.kicker}
            </span>
          </div>
        ) : (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        )}

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface via-surface/20 to-transparent"
        />

        <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-pill border border-line bg-background/85 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand backdrop-blur-xs">
          <Icon className="size-3.5" aria-hidden="true" />
          <span>{item.kicker}</span>
        </span>
      </div>

      {/* Cuerpo de la tarjeta */}
      <div className="flex flex-1 flex-col justify-between gap-6 p-6 sm:p-8">
        <div>
          <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-[1.65rem]">
            {item.title}{" "}
            {item.titleAccent && (
              <span className="text-brand">{item.titleAccent}</span>
            )}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-text sm:text-base">
            {item.description}
          </p>

          <ul
            role="list"
            className="mt-6 flex flex-col divide-y divide-line border-t border-line"
          >
            {item.highlights.map((point, index) => (
              <li
                key={`${item.id}-point-${index}`}
                className="flex items-start gap-3 py-3 first:pt-4 last:pb-0"
              >
                <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                  <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
                </span>
                <span className="text-sm leading-snug text-foreground/90">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Botón de cotización WhatsApp */}
        <div className="pt-2">
          <Button
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="w-full sm:w-auto"
            icon={<FaWhatsapp className="size-4" aria-hidden="true" />}
          >
            {item.ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default function SpecializedServices() {
  if (!siteContent.features.specializedServices) return null;

  const { eyebrow, titleParts, intro, items } =
    siteContent.sections.specializedServices;

  if (items.length === 0) return null;

  return (
    <Section
      id="servicios-especializados"
      variant="default"
      className="relative overflow-hidden"
    >
      <Container>
        <div className="mb-10 md:mb-12">
          <Reveal>
            <SectionHeading
              eyebrow={eyebrow}
              titleParts={titleParts}
              intro={intro}
              align="left"
              compact
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 120} className="h-full">
              <SpecializedServiceCard item={item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}