"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/content/site";

interface FaqAccordionProps {
  title?: string;
  items: readonly FaqItem[];
  className?: string;
}

export function FaqAccordion({
  title = "Preguntas frecuentes",
  items,
  className,
}: FaqAccordionProps) {
  // Primer ítem abierto por defecto (índice 0)
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div
      className={cn(
        "w-full rounded-card border border-line bg-background p-6 md:p-8 shadow-card",
        className
      )}
    >
      {title && (
        <p className="mb-4 text-(length:--text-eyebrow) font-bold uppercase tracking-[0.2em] text-muted-text">
          {title}
        </p>
      )}

      <div className="divide-y divide-line" role="presentation">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const questionId = `faq-question-${index}`;
          const answerId = `faq-answer-${index}`;

          return (
            <div key={index} className="py-2 first:pt-0 last:pb-0">
              <h3>
                <button
                  type="button"
                  id={questionId}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => toggleItem(index)}
                  className="flex min-h-11 w-full items-center justify-between gap-4 py-3 text-left font-semibold text-foreground transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <span className="text-sm md:text-base leading-snug">{item.question}</span>
                  <Plus
                    className={cn(
                      "size-5 shrink-0 text-brand transition-transform duration-300 ease-out motion-reduce:transition-none",
                      isOpen && "rotate-45"
                    )}
                    aria-hidden="true"
                  />
                </button>
              </h3>

              <div
                id={answerId}
                role="region"
                aria-labelledby={questionId}
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="pb-3 pt-1 text-xs md:text-sm leading-relaxed text-muted-text">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FaqAccordion;
