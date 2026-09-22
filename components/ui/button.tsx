import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import type { IconType } from "react-icons";

const baseStyles =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 text-base font-medium transition-[transform,color,background-color,border-color,box-shadow,opacity] duration-200 hover:-translate-y-0.5 hover:shadow-soft active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50 aria-disabled:shadow-none motion-reduce:transform-none";

const variantStyles = {
  dark: {
    button: "bg-ink text-white hover:bg-brand",
    icon: "bg-white text-ink",
  },
  brand: {
    button: "bg-brand text-white hover:bg-ink",
    icon: "bg-white text-ink",
  },
  light: {
    button: "bg-white text-ink hover:bg-surface",
    icon: "bg-ink text-white",
  },
  outline: {
    button:
      "border border-ink/15 bg-transparent text-ink hover:border-ink/30 hover:bg-ink/5",
    icon: "bg-ink text-white",
  },
  outlineLight: {
    button:
      "border border-white/40 bg-transparent text-white hover:bg-white hover:text-ink",
    icon: "bg-white text-ink",
  },
  luit: {
    button:
      "bg-[#155EEF] text-white hover:bg-[#0B1220] focus-visible:outline-[#155EEF]",
    icon: "bg-white text-[#0B1220]",
  },
  luitOutline: {
    button:
      "border border-[#155EEF]/35 bg-transparent text-[#0B1220] hover:border-[#155EEF] hover:bg-white focus-visible:outline-[#155EEF]",
    icon: "bg-[#155EEF] text-white",
  },
} as const;

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  icon?: LucideIcon | IconType;
  variant?: keyof typeof variantStyles;
};

export function ButtonLink({
  children,
  className = "",
  icon: Icon,
  variant = "dark",
  ...props
}: ButtonLinkProps) {
  const styles = variantStyles[variant];
  const isDisabled =
    props["aria-disabled"] === true || props["aria-disabled"] === "true";

  const content = (
    <>
      <span>{children}</span>
      {Icon ? (
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5 group-hover:rotate-45 group-focus-visible:translate-x-0.5 group-focus-visible:rotate-45 group-active:translate-x-0 group-active:rotate-0 motion-reduce:transform-none ${styles.icon}`}
        >
          <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
        </span>
      ) : null}
    </>
  );

  if (isDisabled) {
    return (
      <span
        role="link"
        aria-disabled="true"
        className={`${baseStyles} ${styles.button} ${className}`}
      >
        {content}
      </span>
    );
  }

  return (
    <Link className={`${baseStyles} ${styles.button} ${className}`} {...props}>
      {content}
    </Link>
  );
}

type ButtonActionProps = ComponentPropsWithoutRef<"button"> & {
  icon?: LucideIcon | IconType;
  variant?: keyof typeof variantStyles;
};

export function ButtonAction({
  children,
  className = "",
  icon: Icon,
  type = "button",
  variant = "dark",
  ...props
}: ButtonActionProps) {
  const styles = variantStyles[variant];

  return (
    <button
      type={type}
      className={`${baseStyles} ${styles.button} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {Icon ? (
        <span
          className={`grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5 group-hover:rotate-45 group-focus-visible:translate-x-0.5 group-focus-visible:rotate-45 group-active:translate-x-0 group-active:rotate-0 motion-reduce:transform-none ${styles.icon}`}
        >
          <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
        </span>
      ) : null}
    </button>
  );
}
