"use client";

import { useState } from "react";
import Image from "next/image";
import { Building2 } from "lucide-react";
import { siteContent, type ClientItem } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

function ClientCard({ client }: { client: ClientItem }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      title={client.name}
      className="group relative flex h-32 flex-col items-center justify-center rounded-card border border-line bg-surface p-4 transition-colors duration-300 hover:border-brand/40 sm:h-36 sm:p-5"
    >
      {failed ? (
        <div className="flex flex-col items-center justify-center gap-1.5 text-center">
          <Building2
            className="size-7 text-muted-text transition-colors group-hover:text-brand"
            strokeWidth={1.75}
            aria-hidden="true"
          />
          <span className="line-clamp-1 text-xs font-semibold tracking-wide text-foreground/90">
            {client.name}
          </span>
          {client.sector && (
            <span className="text-[10px] uppercase tracking-wider text-muted-text">
              {client.sector}
            </span>
          )}
        </div>
      ) : (
        <div className="relative h-20 w-full max-w-[14rem] sm:h-24">
          <Image
            src={client.logo}
            alt={client.alt}
            fill
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
            className="object-contain transition-transform duration-300 ease-out group-hover:scale-105"
            onError={() => setFailed(true)}
          />
        </div>
      )}
    </div>
  );
}

export default function Clients() {
  if (!siteContent.features.clients) return null;

  const { eyebrow, titleParts, intro, items } = siteContent.sections.clients;

  if (items.length === 0) return null;

  return (
    <Section id="clientes" variant="default" className="relative overflow-hidden">
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

        <Reveal delay={150}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {items.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}