import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa6";
import { Mail } from "lucide-react";
import { siteContent } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingSocials() {
  const { socials } = siteContent;
  const { email, whatsapp } = siteContent.sections.contact;

  const instagramLink =
    socials.find((s) => s.id === "instagram")?.href || "https://www.instagram.com/soluciones_dip?knvt=ajVqMW5qeGw5aGUz";
  const facebookLink =
    socials.find((s) => s.id === "facebook")?.href || "https://www.facebook.com/share/1BKSnmHuTN/";
  const whatsappCustomLink = socials.find((s) => s.id === "whatsapp")?.href;
  const whatsappHref =
    whatsappCustomLink ||
    getWhatsAppUrl(
      whatsapp.number,
      "Hola, me gustaría solicitar información sobre sus servicios de seguridad."
    );

  const items = [
    {
      id: "instagram",
      label: "Instagram",
      href: instagramLink,
      icon: FaInstagram,
      isExternal: true,
    },
    {
      id: "facebook",
      label: "Facebook",
      href: facebookLink,
      icon: FaFacebook,
      isExternal: true,
    },
    {
      id: "email",
      label: "Correo electrónico",
      href: `mailto:${email}`,
      icon: Mail,
      isExternal: false,
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: whatsappHref,
      icon: FaWhatsapp,
      isExternal: true,
    },
  ];

  return (
    <aside
      aria-label="Redes sociales y contacto rápido"
      className="fixed left-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-2"
    >
      <ul className="flex flex-col gap-2" role="list">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="relative group">
              <a
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                aria-label={`${item.label}${item.isExternal ? " (se abre en una pestaña nueva)" : ""}`}
                className="flex size-11 sm:size-12 items-center justify-center rounded-r-lg border-y border-r border-white/15 bg-gradient-to-r from-brand to-brand-dark text-white shadow-glow-brand transition-all duration-200 hover:brightness-110 hover:translate-x-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:translate-x-0"
              >
                <Icon
                  className="size-5.5 sm:size-6 transition-transform duration-200 group-hover:scale-110 motion-reduce:group-hover:scale-100"
                  aria-hidden="true"
                />
              </a>

              {/* Tooltip accesible que muestra el nombre de la red al pasar el mouse */}
              <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 hidden opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 sm:block">
                <span className="whitespace-nowrap rounded-pill border border-line bg-surface/95 px-3 py-1.5 text-xs font-semibold text-foreground shadow-card backdrop-blur-md">
                  {item.label}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default FloatingSocials;
