'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  as?: React.ElementType;
  delay?: number;
  direction?: Direction;
  className?: string;
}

export function Reveal({
  children,
  as: Component = 'div',
  delay = 0,
  direction = 'up',
  className
}: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [enableTransition, setEnableTransition] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      if (process.env.NODE_ENV === 'development') {
        console.info('Reveal.tsx: Animación omitida por prefers-reduced-motion.');
      }
      setIsVisible(true);
      setHasMounted(true);
      return;
    }

    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const isAlreadyInView = rect.top < (windowHeight * 0.92);

    if (isAlreadyInView) {
      setIsVisible(true);
      setHasMounted(true);
      return;
    }

    // Si no está en vista, lo preparamos oculto ANTES de habilitar las transiciones
    setHasMounted(true);
    
    // Pequeño delay para permitir que el DOM aplique el estado oculto instantáneamente 
    // antes de inyectar las clases de transition duration.
    const transitionTimer = setTimeout(() => setEnableTransition(true), 50);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      clearTimeout(transitionTimer);
    };
  }, []);

  const getHiddenTransform = () => {
    if (direction === 'none') return '';
    switch (direction) {
      case 'up': return 'translate-y-6';
      case 'left': return 'translate-x-6';
      case 'right': return '-translate-x-6';
    }
  };

  const shouldHide = hasMounted && !isVisible;

  return (
    <Component
      ref={ref}
      className={cn(
        enableTransition && "transition-all duration-700 ease-out",
        shouldHide ? "opacity-0" : "opacity-100",
        shouldHide ? getHiddenTransform() : "translate-y-0 translate-x-0",
        shouldHide && "will-change-transform",
        className
      )}
      style={enableTransition ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}