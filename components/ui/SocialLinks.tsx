import type { IconType } from "react-icons";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaEnvelope,
  FaTiktok,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { siteContent, type SocialLink } from "@/content/site";

export const socialIcons: Record<SocialLink["id"], IconType> = {
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  email: FaEnvelope,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
};

interface SocialLinksProps {
  className?: string;
  socials?: readonly SocialLink[];
  variant?: "icons" | "blocks";
}

export function SocialLinks({
  className = "",
  socials = siteContent.socials,
  variant = "icons",
}: SocialLinksProps) {
  const activeSocials = socials.filter(
    (item) => Boolean(item.href && item.href.trim().length > 0)
  );

  if (activeSocials.length === 0) {
    return null;
  }

  if (variant === "blocks") {
    return (
      <ul className={cn("flex w-full flex-col gap-3", className)} role="list">
        {activeSocials.map((social) => {
          const Icon = socialIcons[social.id];
          if (!Icon) return null;

          const isMailto = social.href.startsWith("mailto:");

          return (
            <li key={social.id}>
              <a
                href={social.href}
                target={isMailto ? undefined : "_blank"}
                rel={isMailto ? undefined : "noopener noreferrer"}
                aria-label={
                  isMailto
                    ? `Enviar ${social.label}`
                    : `${social.label} (se abre en una pestaña nueva)`
                }
                className="flex min-h-12 w-full items-center gap-3.5 rounded-2xl bg-brand px-5 py-3 text-base font-semibold text-white shadow-sm transition-colors duration-200 motion-reduce:transition-none hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Icon className="size-6 shrink-0" aria-hidden="true" />
                <span>{social.label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className={cn("flex flex-wrap items-center gap-3", className)} role="list">
      {activeSocials.map((social) => {
        const Icon = socialIcons[social.id];
        if (!Icon) return null;

        const isMailto = social.href.startsWith("mailto:");

        return (
          <li key={social.id}>
            <a
              href={social.href}
              target={isMailto ? undefined : "_blank"}
              rel={isMailto ? undefined : "noopener noreferrer"}
              aria-label={
                isMailto
                  ? `Enviar ${social.label}`
                  : `${social.label} (se abre en una pestaña nueva)`
              }
              className="inline-flex size-11 items-center justify-center rounded-pill border border-line text-muted-text transition-colors duration-200 motion-reduce:transition-none hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <Icon className="size-5 shrink-0" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default SocialLinks;