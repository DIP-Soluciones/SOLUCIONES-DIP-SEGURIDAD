import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { featureIcons, type FeatureIconId } from "@/components/ui/feature-icons";
import type { ShowcaseFeature } from "@/content/site";

interface ShowcaseFeaturesProps {
  features: readonly ShowcaseFeature[];
  showAllOnMobile?: boolean;
  className?: string;
}

export function ShowcaseFeatures({
  features,
  showAllOnMobile = false,
  className,
}: ShowcaseFeaturesProps) {
  return (
    <ul
      role="list"
      className={cn("flex flex-col divide-y divide-line", className)}
    >
      {features.map((feat, index) => {
        const Icon = (feat.icon && featureIcons[feat.icon as FeatureIconId]) || Check;

        return (
          <li
            key={`${feat.title}-${index}`}
            className={cn(
              "flex items-start gap-3.5 py-2.5 first:pt-0 last:pb-0 md:py-3",
              !showAllOnMobile && index >= 3 && "hidden md:flex",
              !showAllOnMobile &&
                index === 2 &&
                "[@media(max-height:680px)]:hidden md:[@media(max-height:680px)]:flex"
            )}
          >
            <Icon
              className="mt-0.5 size-6 shrink-0 text-brand"
              strokeWidth={2}
              aria-hidden="true"
            />

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold leading-snug text-foreground md:text-base">
                  {feat.title}
                </span>

                {feat.tag && (
                  <span className="inline-flex items-center rounded-full bg-brand/15 px-2 py-0.5 text-[11px] font-semibold leading-none text-brand">
                    {feat.tag}
                  </span>
                )}
              </div>

              {feat.description && (
                <p
                  className={cn(
                    "mt-0.5 text-xs leading-relaxed text-muted-text md:text-sm",
                    !showAllOnMobile && "line-clamp-2 md:line-clamp-none"
                  )}
                >
                  {feat.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}