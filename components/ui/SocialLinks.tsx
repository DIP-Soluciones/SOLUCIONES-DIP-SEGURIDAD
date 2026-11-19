import type { IconType } from "react-icons";
import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa6";
import { siteContent, type SocialLink } from "@/content/site";

export const socialIcons: Record<SocialLink["id"], IconType> = {
  whatsapp: FaWhatsapp,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  tiktok: FaTiktok,
  youtube: FaYoutube,
  linkedin: FaLinkedinIn,
};

interface SocialLinksProps {
  className?: string;
  socials?: readonly SocialLink[];
}

export function SocialLinks({
  className = "",
  socials = siteContent.socials,
}: SocialLinksProps) {
  const activeSocials = socials.filter(
    (item) => Boolean(item.href && item.href.trim().length > 0)
  );

  if (activeSocials.length === 0) {
    return null;
  }

  return (
    <ul className={`flex flex-wrap items-center gap-3 ${className}`} role="list">
      {activeSocials.map((social) => {
        const Icon = socialIcons[social.id];
        if (!Icon) return null;

        return (
          <li key={social.id}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${social.label} (se abre en una pestaña nueva)`}
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
