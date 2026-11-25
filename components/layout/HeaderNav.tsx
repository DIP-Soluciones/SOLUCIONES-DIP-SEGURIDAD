'use client';

import React, { useEffect, useState } from 'react';
import BrandLogo from '@/components/layout/BrandLogo';
import { FaWhatsapp } from 'react-icons/fa6';
import { getWhatsAppUrl } from '@/lib/whatsapp';
import { RandomLetterSwap } from '@/components/ui/random-letter-swap';
import { siteContent } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  const whatsappHref = getWhatsAppUrl(
    siteContent.sections.contact.whatsapp.number,
    'Hola, me gustaría solicitar más información o un diagnóstico de seguridad.'
  );

  useEffect(() => {
    let isCurrentlyScrolled = window.scrollY > 16;
    setIsScrolled(isCurrentlyScrolled);

    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 16 && !isCurrentlyScrolled) {
        isCurrentlyScrolled = true;
        setIsScrolled(true);
      } else if (currentScrollY <= 8 && isCurrentlyScrolled) {
        isCurrentlyScrolled = false;
        setIsScrolled(false);
      }

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const transitionClass =
    'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-0 z-[100] isolate flex flex-col items-center pointer-events-none',
        transitionClass,
        isScrolled ? 'pt-0 px-0' : 'pt-4 px-4'
      )}
    >
      <header
        className={cn(
          'pointer-events-auto w-full bg-pill flex items-center justify-center',
          transitionClass,
          isScrolled
            ? 'max-w-full rounded-none border-x-transparent border-t-transparent border-b border-line shadow-sm'
            : 'max-w-6xl rounded-[2rem] border border-line shadow-lg'
        )}
      >
        <div className="w-full max-w-6xl mx-auto px-4 py-2 sm:py-2.5 md:px-6 flex items-center justify-between gap-3">
          {/* Logo de la empresa */}
          <div
            className="flex items-center cursor-pointer shrink-0 select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <BrandLogo className="text-pill-text" />
          </div>

          {/* Enlaces escritorio */}
          <nav className="hidden md:flex items-center gap-8">
            {siteContent.nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="cursor-pointer text-sm font-medium text-pill-text/70 hover:text-pill-text transition-colors"
              >
                <RandomLetterSwap label={link.label} />
              </a>
            ))}
          </nav>

          {/* Acciones: WhatsApp (escritorio) + Botón rojo Solicitar diagnóstico */}
          <div className="flex items-center gap-3 md:gap-4">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Solicitar diagnóstico por WhatsApp"
              className="hidden md:inline-flex items-center justify-center p-2 text-pill-text hover:text-brand transition-colors"
            >
              <FaWhatsapp className="w-5 h-5 text-brand" />
            </a>

            <Button
              href={siteContent.nav.ctaHref}
              variant="primary"
              size="sm"
              className="px-3.5 text-xs tracking-wide whitespace-nowrap sm:px-5 sm:tracking-wider"
            >
              {siteContent.nav.ctaLabel}
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}