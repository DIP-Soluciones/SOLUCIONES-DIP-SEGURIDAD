import { cn } from "@/lib/utils";

interface ShowcaseTextProps {
  kicker?: string;
  headline: string;
  headlineAccent?: string;
  subline?: string;
  className?: string;
}

export function ShowcaseText({
  kicker,
  headline,
  headlineAccent,
  subline,
  className,
}: ShowcaseTextProps) {
  return (
    <div className={cn("flex flex-col items-start gap-2 text-left", className)}>
      {kicker && (
        <span className="inline-flex w-fit items-center rounded-full bg-brand/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brand">
          {kicker}
        </span>
      )}

      <h2 className="text-2xl font-extrabold tracking-tight text-balance text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
        {headline}
        {headlineAccent && (
          <>
            {" "}
            <span className="text-brand">{headlineAccent}</span>
          </>
        )}
      </h2>

      {subline && (
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-text md:line-clamp-none md:text-base">
          {subline}
        </p>
      )}
    </div>
  );
}