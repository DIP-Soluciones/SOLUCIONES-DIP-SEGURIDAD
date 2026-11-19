import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderNav from "@/components/layout/HeaderNav";
import Footer from "@/components/layout/Footer";
import { siteContent } from "@/content/site";
import { FloatingOrbCta } from "@/components/layout/FloatingOrbCta";
import { FloatingSocials } from "@/components/layout/FloatingSocials";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dipseguridad.cl";
  const activeSocialUrls = siteContent.socials
    .map((s) => s.href)
    .filter((href) => Boolean(href && href.trim().length > 0));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteContent.brand.name,
    url: siteUrl,
    telephone: siteContent.sections.contact.phone,
    ...(activeSocialUrls.length > 0 ? { sameAs: activeSocialUrls } : {}),
  };

  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-background text-foreground antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <HeaderNav />
        {children}
        <Footer />
        
        {/* Barra lateral flotante fija a la izquierda y centrada verticalmente */}
        <FloatingSocials />

        {/* Renderiza el botón global del Orbe Flotante */}
        <FloatingOrbCta />
      </body>
    </html>
  );
}