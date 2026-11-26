"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { siteContent } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Hero() {
  const {
    eyebrow,
    rotatingWords,
    subtitle,
    ctaLabel,
    ctaHref,
    secondaryLabel,
    secondaryHref,
  } = siteContent.sections.hero;

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let interval: ReturnType<typeof setInterval> | undefined;

    const stopInterval = () => {
      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
    };

    const startInterval = () => {
      stopInterval();
      interval = setInterval(() => {
        setWordIndex((prev) => (prev + 1) % rotatingWords.length);
      }, 2500);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        stopInterval();
      } else {
        startInterval();
      }
    };

    startInterval();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopInterval();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [rotatingWords.length]);

  const longestWord = [...rotatingWords].reduce((a, b) =>
    a.length > b.length ? a : b
  );

  return (
    <section
      id="inicio"
      className="relative isolate min-h-[85svh] md:min-h-svh flex items-center bg-background overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center md:object-[70%_center] opacity-60"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,var(--color-brand-dark),transparent_60%)] opacity-30" />
        <div className="absolute inset-0 bg-background/60 md:hidden" />
        <div className="absolute inset-0 hidden md:block bg-linear-to-r from-background via-background/70 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-background to-transparent" />
      </div>

      <Container className="relative z-10 pt-32 pb-24 w-full">
        <div className="max-w-5xl text-left">
          <span className="block mb-6 text-sm md:text-base font-bold uppercase tracking-[0.2em] text-brand">
            {eyebrow}
          </span>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            <span className="sr-only">
              Soluciones DiP {rotatingWords.join(", ")}
            </span>

            <span aria-hidden="true" className="flex flex-col items-start gap-2">
              {/* Alineado abajo (items-end) para que repose sobre la base del texto */}
              <span className="flex items-end flex-wrap gap-x-4">
                <span className="text-foreground leading-none">Soluciones</span>
                <span className="relative inline-block h-14 sm:h-18 md:h-24 w-28 sm:w-36 md:w-48 shrink-0 translate-y-1 sm:translate-y-1.5 md:translate-y-2">
                  <Image
                    src="/images/dip-logo-cortado.webp"
                    alt="DiP"
                    fill
                    priority
                    className="object-contain object-left"
                  />
                </span>
              </span>

              <span className="relative block overflow-hidden pb-[0.15em] text-brand">
                <span className="invisible pointer-events-none block">
                  {longestWord}
                </span>

                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute left-0 top-0 block w-full whitespace-nowrap text-left"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-text max-w-xl mb-12 leading-relaxed">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button href={ctaHref} variant="primary">
              {ctaLabel}
            </Button>
            <Button href={secondaryHref} variant="outline">
              {secondaryLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}