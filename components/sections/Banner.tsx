import { siteContent } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { FloatingPaths } from "@/components/ui/FloatingPaths";

export default function Banner() {
  const { title } = siteContent.sections.banner;

  return (
    <section className="relative w-full bg-brand overflow-hidden py-20 md:py-28 flex items-center justify-center">
      {/* Fondo animado optimizado con IntersectionObserver nativo y CSS puro */}
      <FloatingPaths />

      {/* Degradado para dar profundidad */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-brand-dark))] opacity-60 pointer-events-none" />

      {/* Contenido principal */}
      <Container className="relative z-10">
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white text-center max-w-6xl mx-auto text-balance tracking-tight leading-[1.1]">
          {title}
        </h2>
      </Container>
    </section>
  );
}