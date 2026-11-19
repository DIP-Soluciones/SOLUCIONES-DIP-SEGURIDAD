import { siteContent } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export default function Process() {
  const { eyebrow, titleParts, intro, steps } = siteContent.sections.process;

  return (
    <Section id="como-trabajamos" variant="default">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Izquierda: Encabezado e Intro */}
          <div className="lg:sticky lg:top-32">
            <Reveal direction="up">
              <SectionHeading
                eyebrow={eyebrow}
                titleParts={titleParts}
                intro={intro}
                align="left"
                compact
              />
            </Reveal>
          </div>

          {/* Derecha: Lista de pasos */}
          <div className="flex flex-col">
            {steps.map((step, index) => (
              <Reveal
                key={index}
                delay={index * 120}
                direction="up"
                className="group flex flex-col gap-4 border-b border-line py-8 transition-colors duration-300 first:pt-0 last:border-b-0 hover:border-brand sm:flex-row sm:gap-8 md:py-10"
              >
                <div className="shrink-0 select-none text-3xl font-black text-brand sm:w-16 md:text-4xl">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <h3 className="mb-3 text-xl font-bold text-foreground transition-colors duration-300 md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="leading-relaxed text-muted-text transition-colors duration-300 group-hover:text-foreground/90">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}