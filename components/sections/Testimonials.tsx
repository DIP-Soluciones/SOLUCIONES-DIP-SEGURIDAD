import { siteContent } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewCarousel } from "@/components/ui/ReviewCarousel";
import { StarRating } from "@/components/ui/StarRating";

export default function Testimonials() {
  if (!siteContent.features.testimonials) return null;

  const {
    eyebrow,
    titleParts,
    isDemo,
    demoNotice,
    summaryLabel,
    starsLabel,
    reviewAriaLabel,
    prevLabel,
    nextLabel,
    items,
  } = siteContent.sections.testimonials;

  const totalReviews = items.length;
  const avgRating =
    totalReviews > 0 ? items.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews : 0;
  const formattedAvg = new Intl.NumberFormat("es-CL", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(avgRating);
  const summaryText =
    totalReviews === 1
      ? summaryLabel.one.replace("{count}", "1")
      : summaryLabel.other.replace("{count}", String(totalReviews));

  return (
    <Section id="resenas" variant="default" className="overflow-hidden">
      <Container className="mb-12 md:mb-16">
        <Reveal>
          <div className="flex flex-col items-start gap-8">
            <div className="w-full">
              <SectionHeading
                eyebrow={eyebrow}
                titleParts={titleParts}
                align="center"
                compact
              />
              {isDemo && demoNotice && (
                <div className="mt-4 flex justify-start md:justify-center">
                  <span className="inline-block rounded-pill border border-line bg-surface px-4 py-1.5 text-xs text-muted-text md:text-sm">
                    {demoNotice}
                  </span>
                </div>
              )}
            </div>

            {totalReviews > 0 && (
              <div className="flex items-center justify-start gap-4 md:mx-auto">
                <span className="text-5xl font-bold text-brand">{formattedAvg}</span>
                <div className="flex flex-col gap-1">
                  <StarRating
                    rating={Math.round(avgRating)}
                    ariaLabel={starsLabel.replace("{rating}", String(Math.round(avgRating)))}
                    size={20}
                  />
                  <span className="text-sm font-medium text-muted-text">{summaryText}</span>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </Container>

      <div className="relative z-10 w-full">
        <ReviewCarousel
          items={items}
          prevLabel={prevLabel}
          nextLabel={nextLabel}
          reviewAriaLabel={reviewAriaLabel}
          starsLabel={starsLabel}
        />
      </div>
    </Section>
  );
}