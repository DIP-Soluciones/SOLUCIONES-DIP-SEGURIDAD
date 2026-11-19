import { siteContent } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProductCarousel } from "@/components/ui/ProductCarousel";

export default function FeaturedProducts() {
  if (!siteContent.features.featuredProducts) return null;

  const { eyebrow, titleParts, intro } = siteContent.sections.featuredProducts;

  return (
    <Section id="productos" variant="default">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            titleParts={titleParts}
            intro={intro}
            align="center"
          />
        </Reveal>
      </Container>

      

<ProductCarousel />
    </Section>
  );
}