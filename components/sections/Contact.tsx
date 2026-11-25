import { siteContent } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "./ContactForm";
import { OrbSlot } from "@/components/ui/OrbSlot";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export default function Contact() {
  const { eyebrow, titleParts, intro, channelsTitle, phone, whatsapp } =
    siteContent.sections.contact;

  const whatsappHref = getWhatsAppUrl(
    whatsapp.number,
    "Hola, me gustaría solicitar más información o un diagnóstico de seguridad."
  );

  // Asegura que el botón de WhatsApp abra el mensaje prellenado configurado
  const contactChannels = siteContent.socials.map((item) =>
    item.id === "whatsapp" ? { ...item, href: whatsappHref } : item
  );

  return (
    <Section id="contacto" variant="default" className="relative z-10 overflow-hidden">
      <Container>
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          <div className="flex w-full flex-col justify-between lg:w-5/12">
            <div>
              <div className="mb-8 flex items-start justify-between">
                <Reveal>
                  <SectionHeading
                    eyebrow={eyebrow}
                    titleParts={titleParts}
                    intro={intro}
                    align="left"
                    compact
                  />
                </Reveal>

                {/* Orbe decorativo visible solo en Desktop */}
                <OrbSlot size={220} className="ml-8 hidden shrink-0 lg:block" />
              </div>
            </div>

            <Reveal delay={200} className="mt-4 lg:mt-0">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-text">
                  {channelsTitle}
                </p>

                <SocialLinks variant="blocks" socials={contactChannels} />

                <p className="pt-2 text-sm font-medium text-foreground/80">
                  Teléfono directo:{" "}
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="text-foreground transition-colors hover:text-brand"
                  >
                    {phone}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>

          <div className="w-full lg:w-7/12" id="diagnostico">
            <Reveal delay={150}>
              <div className="rounded-card border border-line bg-surface p-8 shadow-card md:p-12">
                <ContactForm />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}