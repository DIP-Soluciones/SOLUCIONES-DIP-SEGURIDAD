"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  DoorClosed,
  Expand,
  Images,
  Lightbulb,
  Volume2,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  siteContent,
  type ProjectCategoryId,
  type WorkProject,
} from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const projectCategoryIcons: Record<ProjectCategoryId, LucideIcon> = {
  camaras: Camera,
  portones: DoorClosed,
  audio: Volume2,
  iluminacion: Lightbulb,
};

function ProjectPhoto({
  project,
  categoryLabel,
  sizes,
  priority = false,
  fit = "cover",
}: {
  project: WorkProject;
  categoryLabel: string;
  sizes: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);
  const CategoryIcon = projectCategoryIcons[project.category];

  if (failed) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-surface p-4 text-center">
        <CategoryIcon className="size-10 text-brand/60" strokeWidth={1.5} />
        <span className="line-clamp-2 text-xs text-muted-text">
          {project.title || categoryLabel}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={project.image}
      alt={project.alt || project.title || categoryLabel}
      fill
      sizes={sizes}
      priority={priority}
      className={cn(
        fit === "contain"
          ? "object-contain p-2 sm:p-4"
          : "object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      )}
      onError={() => setFailed(true)}
    />
  );
}

export default function Projects() {
  const {
    eyebrow,
    titleParts,
    intro,
    viewMoreLabel,
    modalTitle,
    modalSubtitle,
    allFilterLabel,
    closeLabel,
    categories,
    items,
  } = siteContent.sections.projects;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const previewItems = items.slice(0, 5);
  const remainingCount = Math.max(0, items.length - previewItems.length);

  const categoryLabels = useMemo(() => {
    const map: Record<string, string> = {};
    for (const cat of categories) {
      map[cat.id] = cat.label;
    }
    return map;
  }, [categories]);

  const availableCategories = useMemo(() => {
    const presentIds = new Set(items.map((item) => item.category));
    return categories.filter((cat) => presentIds.has(cat.id));
  }, [categories, items]);

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;
    return items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const openModal = (initialProjectId?: string) => {
    setActiveCategory("all");
    setIsModalOpen(true);

    if (initialProjectId) {
      const idx = items.findIndex((item) => item.id === initialProjectId);
      setLightboxIndex(idx >= 0 ? idx : null);
    } else {
      setLightboxIndex(null);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLightboxIndex(null);
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          closeModal();
        }
      } else if (lightboxIndex !== null && filteredItems.length > 0) {
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) =>
            prev === null ? 0 : (prev + 1) % filteredItems.length
          );
        } else if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) =>
            prev === null
              ? 0
              : (prev - 1 + filteredItems.length) % filteredItems.length
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, lightboxIndex, filteredItems.length]);

  if (items.length === 0) return null;

  const activeLightboxItem =
    lightboxIndex !== null ? filteredItems[lightboxIndex] ?? null : null;

  return (
    <Section id="trabajos" variant="default" className="relative overflow-hidden">
      <Container>
        {/* Cabecera + Botón Ver más en escritorio */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading
              eyebrow={eyebrow}
              titleParts={titleParts}
              intro={intro}
              align="left"
              compact
            />
          </Reveal>

          {items.length > 5 && (
            <Reveal delay={100} className="shrink-0">
              <button
                type="button"
                onClick={() => openModal()}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill border border-line bg-surface px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-brand/50 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Images className="size-4 text-brand" aria-hidden="true" />
                <span>
                  {viewMoreLabel} ({items.length})
                </span>
              </button>
            </Reveal>
          )}
        </div>

        {/* Bento Grid de 5 fotos */}
        <Reveal delay={150}>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
            {previewItems.map((project, index) => {
              const isHero = index === 0;
              const isFifthWithMore = index === 4 && remainingCount > 0;
              const catLabel = categoryLabels[project.category] ?? "Proyecto";

              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() =>
                    isFifthWithMore ? openModal() : openModal(project.id)
                  }
                  aria-label={
                    isFifthWithMore
                      ? `${viewMoreLabel}: ver las ${items.length} fotos`
                      : `Ampliar foto: ${project.title || catLabel}`
                  }
                  className={cn(
                    "group relative overflow-hidden rounded-card border border-line bg-surface text-left transition-colors duration-300 hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                    isHero
                      ? "col-span-2 aspect-[4/3] md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[26rem]"
                      : "aspect-[4/3]"
                  )}
                >
                  <ProjectPhoto
                    project={project}
                    categoryLabel={catLabel}
                    priority={isHero}
                    sizes={
                      isHero
                        ? "(max-width: 768px) 100vw, 50vw"
                        : "(max-width: 768px) 50vw, 25vw"
                    }
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent opacity-85 transition-opacity group-hover:opacity-95"
                  />

                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3.5 sm:p-4">
                    <div className="min-w-0">
                      <span className="inline-block rounded-full bg-brand/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand backdrop-blur-xs">
                        {catLabel}
                      </span>
                      {project.title && (
                        <p
                          className={cn(
                            "mt-1 font-semibold leading-snug text-foreground",
                            isHero
                              ? "line-clamp-2 text-sm sm:text-base md:text-lg"
                              : "line-clamp-1 text-xs sm:text-sm"
                          )}
                        >
                          {project.title}
                        </p>
                      )}
                    </div>

                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line bg-background/80 text-foreground transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Expand className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>

                  {isFifthWithMore && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/75 p-4 text-center backdrop-blur-xs transition-colors group-hover:bg-background/65">
                      <span className="text-2xl font-extrabold text-foreground sm:text-3xl">
                        +{remainingCount}
                      </span>
                      <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand">
                        {viewMoreLabel}
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Botón ancho completo en móvil */}
        {items.length > 5 && (
          <div className="mt-6 md:hidden">
            <button
              type="button"
              onClick={() => openModal()}
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-pill border border-line bg-surface px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-foreground transition-colors hover:border-brand/50 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <Images className="size-4 text-brand" aria-hidden="true" />
              <span>
                {viewMoreLabel} ({items.length})
              </span>
            </button>
          </div>
        )}
      </Container>

      {/* --- MODAL DE GALERÍA COMPLETA --- */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={modalTitle}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-background/90 p-3 backdrop-blur-md sm:p-6"
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex h-[90svh] w-full max-w-6xl flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card"
          >
            {/* Cabecera del Modal */}
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-line px-5 py-4 sm:px-6">
              <div>
                <h3 className="text-lg font-extrabold tracking-tight text-foreground sm:text-xl">
                  {modalTitle}
                </h3>
                <p className="text-xs text-muted-text sm:text-sm">
                  {modalSubtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label={closeLabel}
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-pill border border-line bg-background text-foreground transition-colors hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            {/* Píldoras de filtro por categoría */}
            <div className="flex shrink-0 items-center gap-2 overflow-x-auto border-b border-line px-5 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("all");
                  setLightboxIndex(null);
                }}
                className={cn(
                  "shrink-0 rounded-pill px-3.5 py-1.5 text-xs font-semibold transition-colors",
                  activeCategory === "all"
                    ? "bg-brand text-white"
                    : "border border-line bg-background text-muted-text hover:text-foreground"
                )}
              >
                {allFilterLabel} ({items.length})
              </button>

              {availableCategories.map((cat) => {
                const count = items.filter((i) => i.category === cat.id).length;
                const isSelected = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setLightboxIndex(null);
                    }}
                    className={cn(
                      "shrink-0 rounded-pill px-3.5 py-1.5 text-xs font-semibold transition-colors",
                      isSelected
                        ? "bg-brand text-white"
                        : "border border-line bg-background text-muted-text hover:text-foreground"
                    )}
                  >
                    {cat.label} ({count})
                  </button>
                );
              })}
            </div>

            {/* Cuerpo del Modal: Lightbox individual o Grilla completa */}
            {activeLightboxItem && lightboxIndex !== null ? (
              <div className="flex min-h-0 flex-1 flex-col justify-between bg-background p-4 sm:p-6">
                <div className="flex shrink-0 items-center justify-between gap-2 pb-3">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(null)}
                    className="inline-flex min-h-10 items-center gap-1.5 rounded-pill border border-line bg-surface px-3.5 text-xs font-semibold text-foreground transition-colors hover:border-brand hover:text-brand"
                  >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                    <span>Volver a la cuadrícula</span>
                  </button>

                  <span className="text-xs font-medium text-muted-text">
                    {lightboxIndex + 1} / {filteredItems.length}
                  </span>
                </div>

                {/* Imagen ampliada ajustable completa sin recortes */}
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-2xl border border-line bg-surface">
                  <ProjectPhoto
                    key={activeLightboxItem.id}
                    project={activeLightboxItem}
                    categoryLabel={
                      categoryLabels[activeLightboxItem.category] ?? "Proyecto"
                    }
                    fit="contain"
                    sizes="(max-width: 1024px) 95vw, 75vw"
                  />

                  {filteredItems.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setLightboxIndex(
                            (lightboxIndex - 1 + filteredItems.length) %
                              filteredItems.length
                          )
                        }
                        aria-label="Foto anterior"
                        className="absolute left-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background/85 text-foreground backdrop-blur-xs transition-colors hover:border-brand hover:bg-brand hover:text-white"
                      >
                        <ChevronLeft className="size-5" aria-hidden="true" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setLightboxIndex(
                            (lightboxIndex + 1) % filteredItems.length
                          )
                        }
                        aria-label="Foto siguiente"
                        className="absolute right-3 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-background/85 text-foreground backdrop-blur-xs transition-colors hover:border-brand hover:bg-brand hover:text-white"
                      >
                        <ChevronRight className="size-5" aria-hidden="true" />
                      </button>
                    </>
                  )}
                </div>

                {/* Pie con categoría y descripción opcional */}
                <div className="shrink-0 pt-3 sm:pt-4">
                  <span className="inline-block rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-brand">
                    {categoryLabels[activeLightboxItem.category] ?? "Proyecto"}
                  </span>
                  {activeLightboxItem.title && (
                    <h4 className="mt-1 text-base font-bold text-foreground sm:text-lg">
                      {activeLightboxItem.title}
                    </h4>
                  )}
                  {activeLightboxItem.location && (
                    <p className="text-xs text-muted-text">
                      {activeLightboxItem.location}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                  {filteredItems.map((project, index) => {
                    const catLabel =
                      categoryLabels[project.category] ?? "Proyecto";

                    return (
                      <button
                        key={project.id}
                        type="button"
                        onClick={() => setLightboxIndex(index)}
                        className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-background text-left transition-colors hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        <ProjectPhoto
                          project={project}
                          categoryLabel={catLabel}
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/90 via-background/15 to-transparent"
                        />
                        <div className="absolute inset-x-0 bottom-0 p-3">
                          <span className="block text-[10px] font-bold uppercase tracking-wider text-brand">
                            {catLabel}
                          </span>
                          {project.title && (
                            <p className="mt-0.5 line-clamp-2 text-xs font-semibold text-foreground">
                              {project.title}
                            </p>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </Section>
  );
}