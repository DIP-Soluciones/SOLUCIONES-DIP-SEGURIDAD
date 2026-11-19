"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

interface RandomLetterSwapProps {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: any; // Disponible si deseas pasar configuraciones extra a framer-motion
}

export function RandomLetterSwap({
  label,
  className = "",
  staggerDuration = 0.03,
}: RandomLetterSwapProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`inline-flex ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={label}
    >
      <span aria-hidden="true" className="flex">
        {label.split("").map((char, i) => (
          <AnimatedLetter
            key={i}
            char={char}
            isHovered={isHovered}
            delay={i * staggerDuration}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </span>
    </span>
  );
}

function AnimatedLetter({
  char,
  isHovered,
  delay,
  prefersReducedMotion,
}: {
  char: string;
  isHovered: boolean;
  delay: number;
  prefersReducedMotion: boolean | null;
}) {
  const [displayChar, setDisplayChar] = useState(char);

  useEffect(() => {
    if (prefersReducedMotion || char === " ") return;

    if (isHovered) {
      const startTimeout = setTimeout(() => {
        let swaps = 0;
        const maxSwaps = 4;
        const interval = setInterval(() => {
          setDisplayChar(CHARS[Math.floor(Math.random() * CHARS.length)]);
          swaps++;
          if (swaps >= maxSwaps) {
            clearInterval(interval);
            setDisplayChar(char);
          }
        }, 40); // Velocidad del cambio de letra

        return () => clearInterval(interval);
      }, delay * 1000);

      return () => {
        clearTimeout(startTimeout);
        setDisplayChar(char);
      };
    } else {
      setDisplayChar(char);
    }
  }, [isHovered, char, delay, prefersReducedMotion]);

  return <motion.span>{displayChar}</motion.span>;
}