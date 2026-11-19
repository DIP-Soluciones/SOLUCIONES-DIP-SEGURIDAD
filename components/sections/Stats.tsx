import { siteContent } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";

export default function Stats() {
  if (!siteContent.features.stats) return null;

  const { eyebrow, items } = siteContent.sections.stats;

  return (
    <Section id="trayectoria" variant="default">
      <Container>
        <Reveal className="mb-10 md:mb-14">
          <SectionHeading
            eyebrow={eyebrow}
            srTitle={eyebrow}
            align="left"
            compact
          />
        </Reveal>

        <div className="grid grid-cols-1 divide-y divide-line border-b border-t border-line md:grid-cols-2 md:divide-x md:divide-y-0 md:border-b-0">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start py-10 text-left first:md:pl-0 last:md:pr-0 md:px-12 md:py-8"
            >
              <Reveal delay={index * 120}>
                <div className="mb-4 text-5xl font-bold text-foreground md:text-6xl lg:text-7xl">
                  <CountUp
                    value={item.value}
                    decimals={item.decimals}
                    prefix={item.prefix}
                    suffix={item.suffix}
                  />
                </div>
                <p className="text-lg text-muted-text md:text-xl">{item.label}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}