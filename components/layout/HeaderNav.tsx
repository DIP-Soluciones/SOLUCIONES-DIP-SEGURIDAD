'use client';

import React, { useEffect, useState } from 'react';
import BrandLogo from '@/components/layout/BrandLogo';
import { GlobeIcon, MenuIcon, CloseIcon } from '@/components/ui/icons';
import { RandomLetterSwap } from '@/components/ui/random-letter-swap';
import { siteContent } from '@/content/site';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMenu = () => setIsMobileMenuOpen(false);

  const forceExpanded = isScrolled || isMobileMenuOpen;
  
  const transitionClass = "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none";

  return (
    <div 
      // z-[100] isolate asegura que esta barra quede en su propio contexto superior, intocable por el contenido
      className={cn(
        "fixed inset-x-0 top-0 z-[100] isolate flex flex-col items-center pointer-events-none",
        transitionClass,
        forceExpanded ? "pt-0 px-0" : "pt-4 px-4"
      )}
    >
      <header 
        // Fondo 100% opaco para evitar mezcla con las tarjetas
        className={cn(
          "pointer-events-auto w-full bg-pill flex items-center justify-center",
          transitionClass,
          forceExpanded 
            ? "max-w-full rounded-none border-x-transparent border-t-transparent border-b border-line shadow-sm" 
            : "max-w-6xl rounded-[2rem] border border-line shadow-lg"
        )}
      >
        <div className="w-full max-w-6xl mx-auto px-4 py-2.5 md:px-6 flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer shrink-0 select-none"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              closeMenu();
            }}
          >
            <BrandLogo className="text-pill-text" />
          </div>

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

          <div className="hidden md:flex items-center gap-4">
            <button 
              aria-label={siteContent.nav.languageLabel} 
              className="text-pill-text hover:text-pill-text/70 transition-colors p-2"
            >
              <GlobeIcon className="w-5 h-5" />
            </button>

            <Button href={siteContent.nav.ctaHref} variant="primary" size="sm">
              {siteContent.nav.ctaLabel}
            </Button>
          </div>

          <button
            className="md:hidden p-2 text-pill-text hover:text-pill-text/70 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {isMobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div 
          className={cn(
            "pointer-events-auto w-full bg-pill flex flex-col gap-6 md:hidden px-6 py-6",
            transitionClass,
            forceExpanded 
              ? "max-w-full rounded-b-3xl border-b border-line shadow-sm" 
              : "max-w-6xl rounded-3xl border border-line shadow-lg mt-2"
          )}
        >
          <nav className="flex flex-col gap-5 text-base font-medium">
            {siteContent.nav.links.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className="text-pill-text hover:text-brand transition-colors"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center justify-between pt-5 border-t border-line">
            <button 
              aria-label={siteContent.nav.languageLabel} 
              className="flex items-center gap-2 text-pill-text hover:text-pill-text/70 transition-colors font-medium"
            >
              <GlobeIcon className="w-5 h-5" />
              <span>{siteContent.nav.languageLabel}</span>
            </button>
            
            <Button 
              href={siteContent.nav.ctaHref} 
              variant="primary" 
              size="sm" 
              onClick={closeMenu}
            >
              {siteContent.nav.ctaLabel}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}