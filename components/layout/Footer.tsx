import { Mail, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { siteContent } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function Footer() {
  const { brand, nav, footer, sections, socials } = siteContent;
  const { email, phone, whatsapp } = sections.contact;

  const isEmailTodo = !email || email.trim() === "" || email.toUpperCase().includes("TODO");
  const hasSocials = socials.some((s) => Boolean(s.href && s.href.trim().length > 0));

  const whatsappHref = getWhatsAppUrl(
    whatsapp.number,
    "Hola, me gustaría solicitar información sobre sus servicios de seguridad."
  );

  return (
    <footer className="border-t border-line bg-surface text-muted-text">
      <Container className="py-12 md:py-16">
        <div
          className={`grid grid-cols-1 gap-10 md:gap-8 ${
            hasSocials ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
          }`}
        >
          {/* Columna 1: Logo y tagline */}
          <div className="flex flex-col items-start gap-4">
            <a
              href="#"
              aria-label={brand.name}
              className="inline-flex min-h-11 items-center"
            >
              <BrandLogo />
            </a>
            <p className="max-w-sm text-sm leading-relaxed text-muted-text">
              {footer.tagline}
            </p>
          </div>

          {/* Columna 2: Navegación */}
          <nav
            aria-label="Navegación del pie de página"
            className="flex flex-col items-start gap-1"
          >
            <p className="mb-2 text-(length:--text-eyebrow) font-bold uppercase tracking-[0.2em] text-foreground">
              {footer.navTitle}
            </p>
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="inline-flex min-h-11 items-center text-sm font-medium text-muted-text transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            {nav.ctaHref && (
              <a
                href={nav.ctaHref}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-brand transition-colors hover:text-foreground"
              >
                {nav.ctaLabel}
              </a>
            )}
          </nav>

          {/* Columna 3: Contacto */}
          <div className="flex flex-col items-start gap-1">
            <p className="mb-2 text-(length:--text-eyebrow) font-bold uppercase tracking-[0.2em] text-foreground">
              {footer.contactTitle}
            </p>
            {phone && (
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="inline-flex min-h-11 items-center gap-2.5 text-sm font-medium text-muted-text transition-colors hover:text-foreground"
              >
                <Phone className="size-4 shrink-0 text-brand" aria-hidden="true" />
                <span>{phone}</span>
              </a>
            )}
            {!isEmailTodo && (
              <a
                href={`mailto:${email}`}
                className="inline-flex min-h-11 items-center gap-2.5 text-sm font-medium text-muted-text transition-colors hover:text-foreground"
              >
                <Mail className="size-4 shrink-0 text-brand" aria-hidden="true" />
                <span className="break-all">{email}</span>
              </a>
            )}
            {whatsapp?.number && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2.5 rounded-pill border border-brand/30 bg-brand/10 px-4 text-sm font-semibold text-foreground transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <FaWhatsapp className="size-4 shrink-0 text-brand" aria-hidden="true" />
                <span>Escribir por WhatsApp</span>
              </a>
            )}
          </div>

          {/* Columna 4: Síguenos (solo si hay redes configuradas) */}
          {hasSocials && (
            <div className="flex flex-col items-start gap-3">
              <p className="mb-2 text-(length:--text-eyebrow) font-bold uppercase tracking-[0.2em] text-foreground">
                {footer.socialsTitle}
              </p>
              <SocialLinks />
            </div>
          )}
        </div>

        {/* Barra inferior de copyright */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 text-xs text-muted-text sm:flex-row sm:items-center">
          <p>{footer.copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
