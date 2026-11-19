"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteContent } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { StackCard } from "@/components/ui/StackCard";

export default function Solutions() {
  const { eyebrow, titleParts, intro, cards } = siteContent.sections.solutions;
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cardElements.length <= 1) return;

    const triggers: ScrollTrigger[] = [];
    const divisor = cardElements.length - 1;

    cardElements.forEach((card, index) => {
      if (index === 0) return;

      const prevInner = cardElements.slice(0, index).map((c) => c.querySelector(".stack-card-inner"));
      const prevOverlay = cardElements.slice(0, index).map((c) => c.querySelector(".stack-card-overlay"));

      const trigger = ScrollTrigger.create({
        trigger: card,
        start: "top bottom",
        end: () => {
          const topOffset = window.innerWidth >= 768 ? 96 + index * 20 : 80 + index * 12;
          return `top top+=${topOffset}`;
        },
        scrub: 0.8,
        invalidateOnRefresh: true,
        animation: gsap
          .timeline({ ease: "none" })
          .to(
            prevInner,
            {
              scale: `-=${0.08 / divisor}`,
              ease: "none",
            },
            0
          )
          .to(
            prevOverlay,
            {
              opacity: `+=${0.45 / divisor}`,
              ease: "none",
            },
            0
          ),
      });

      triggers.push(trigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <Section id="soluciones" variant="default">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            titleParts={titleParts}
            intro={intro}
            align="left"
          />
        </Reveal>
      </Container>

      <Container className="relative flex flex-col">
        {cards.map((card, index) => (
          <StackCard
            key={card.id}
            ref={(el: HTMLDivElement | null) => {
              cardsRef.current[index] = el;
            }}
            card={card}
            index={index}
            totalCards={cards.length}
            isLast={index === cards.length - 1}
          />
        ))}
      </Container>
    </Section>
  );
}