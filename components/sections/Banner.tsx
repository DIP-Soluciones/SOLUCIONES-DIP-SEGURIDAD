import { siteContent } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { FloatingPaths } from "@/components/ui/FloatingPaths";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

export default function Banner() {
  const { title, faqTitle, faqs } = siteContent.sections.banner;

  return (
    <section className="relative w-full bg-brand overflow-hidden py-16 md:py-24 lg:py-28 flex items-center justify-center">
      {/* Fondo animado con líneas negras de opacidad visible (pointer-events-none) */}
      <FloatingPaths colorClassName="text-black" />

      {/* Degradado para dar profundidad */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-brand-dark))] opacity-60 pointer-events-none" />

      {/* Contenido principal en z-10 (respetando la escala de capas de globals.css) */}
      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Columna Izquierda: Frase alineada a la izquierda */}
          <div className="flex flex-col items-start text-left">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-balance tracking-tight leading-[1.1]">
              {title}
            </h2>
          </div>

          {/* Columna Derecha: Panel FAQ */}
          <div className="w-full flex justify-center lg:justify-end">
            <FaqAccordion title={faqTitle} items={faqs} />
          </div>
        </div>
      </Container>
    </section>
  );
}
