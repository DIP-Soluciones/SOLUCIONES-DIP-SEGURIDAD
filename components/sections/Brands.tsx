import { siteContent } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

export default function Brands() {
  const { eyebrow, items } = siteContent.sections.brands;
  const marqueeSets = [1, 2, 3, 4];

  return (
    <Section variant="surface" className="overflow-hidden">
      <Container className="mb-10">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            srTitle={eyebrow}
            align="center"
            compact
          />
        </Reveal>
      </Container>

      {/* Contenedor de las marquesinas con desvanecimientos en los bordes */}
      <div className="mask-fade-edges relative flex w-full flex-col gap-4 overflow-hidden">
        {/* Fila 1: Se mueve hacia la izquierda */}
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee-left flex shrink-0 items-center gap-12 md:gap-16">
            {marqueeSets.map((setIdx) =>
              items.map((brand, idx) => (
                <div
                  key={`row1-set${setIdx}-${brand.name}-${idx}`}
                  className="flex items-center justify-center px-4 grayscale-0 transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src={brand.logo}
                    alt={brand.alt}
                    width={140}
                    height={56}
                    className="h-12 w-auto object-contain transition-transform md:h-16"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fila 2: Pegada abajo, se mueve en sentido contrario (hacia la derecha) */}
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee-right flex shrink-0 items-center gap-12 md:gap-16">
            {marqueeSets.map((setIdx) =>
              items.map((brand, idx) => (
                <div
                  key={`row2-set${setIdx}-${brand.name}-${idx}`}
                  className="flex items-center justify-center px-4 grayscale-0 transition-all duration-300 hover:scale-105"
                >
                  <Image
                    src={brand.logo}
                    alt={brand.alt}
                    width={140}
                    height={56}
                    className="h-12 w-auto object-contain transition-transform md:h-16"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}