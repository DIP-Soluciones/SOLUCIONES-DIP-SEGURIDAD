import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline";
type ButtonSize = "sm" | "md";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icono opcional (decorativo). Si falta, el hover muestra una flecha. */
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  /** Texto mientras isLoading es true (debe venir de site.ts). Si falta, se mantiene el texto normal. */
  loadingLabel?: string;
}

type ButtonAsButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLinkProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-brand text-white border-none",
  outline: "bg-transparent border border-line text-foreground",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-11 px-5 py-2.5 text-xs md:text-sm",
  md: "min-h-12 px-8 py-3.5 text-sm md:text-base",
};

export function Button({
  variant = "primary",
  size = "md",
  icon,
  className,
  children,
  isLoading = false,
  loadingLabel,
  ...rest
}: ButtonProps) {
  const isPrimary = variant === "primary";

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-pill font-semibold uppercase tracking-wider cursor-pointer text-center transition-colors duration-300",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:opacity-70 disabled:cursor-not-allowed",
    isLoading && "pointer-events-none opacity-70",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  const fillColor = isPrimary ? "bg-pill" : "bg-brand";
  const hoverTextColor = isPrimary ? "text-pill-text" : "text-white";

  const label = isLoading && loadingLabel ? loadingLabel : children;

  const content = (
    <>
      {/* Relleno circular animado con clip-path (invisible en reposo) */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 z-0 rounded-pill transition-[clip-path] duration-[400ms] ease-out motion-reduce:transition-none",
          "[clip-path:circle(0%_at_1.5rem_50%)]",
          "group-hover:[clip-path:circle(150%_at_1.5rem_50%)]",
          "group-focus-visible:[clip-path:circle(150%_at_1.5rem_50%)]",
          fillColor
        )}
      />

      {/* Capa en reposo: define el tamaño del botón */}
      <span className="relative z-10 flex items-center gap-2 transition-all duration-300 group-hover:translate-x-4 group-hover:opacity-0 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0">
        {icon && !isLoading && (
          <span aria-hidden="true" className="flex shrink-0 items-center">
            {icon}
          </span>
        )}
        <span>{label}</span>
      </span>

      {/* Capa de hover: texto + icono (o flecha) */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-20 flex translate-x-4 items-center justify-center gap-2 opacity-0 transition-all duration-300",
          "group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0",
          hoverTextColor
        )}
      >
        <span>{label}</span>
        {!isLoading && (
          <span className="flex shrink-0 items-center">
            {icon ?? <ArrowRight className="size-4" />}
          </span>
        )}
      </span>
    </>
  );

  if (typeof rest.href === "string") {
    const anchorProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type="button"
      className={classes}
      {...buttonProps}
      aria-busy={isLoading || undefined}
      disabled={isLoading || buttonProps.disabled}
    >
      {content}
    </button>
  );
}