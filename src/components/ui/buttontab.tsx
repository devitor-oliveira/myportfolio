import type { ComponentProps, ElementType, ReactNode } from "react";
import { motion } from "motion/react";

type Variants = "default" | "tab";

interface ButtonProps extends Omit<ComponentProps<"button">, "children"> {
  isactive?: boolean;
  variant?: Variants;
  icon?: ElementType;
  children: ReactNode;
}

const variantStyle: Record<Variants, string> = {
  default: "cursor-pointer bg-neutral-900 text-white p-2 rounded",
  tab: "cursor-pointer flex items-center gap-2 px-2 py-2.5 uppercase tracking-wide",
};

export default function ButtonTab({
  variant = "default",
  className = "",
  isactive = false,
  icon: Icon,
  children,
  ...props
}: ButtonProps) {
  const sharedClassName = `${variantStyle[variant]} relative font-detail text-sm font-medium transition-colors duration-200 ${
    isactive ? "text-primary" : "text-text-muted hover:text-primary"
  } ${className}`;

  const content = (
    <>
      {Icon && <Icon size={14} strokeWidth={2} aria-hidden="true" />}
      {children}
      {isactive && (
        <motion.span
          layoutId="tab-indicator"
          className="absolute -bottom-px left-0 right-0 h-0.5 bg-primary"
          transition={{ type: "spring", stiffness: 500, damping: 40 }}
        />
      )}
    </>
  );

  if (variant === "tab") {
    return (
      <button
        type="button"
        role="tab"
        aria-selected={isactive}
        className={sharedClassName}
        {...props}
      >
        {content}
      </button>
    );
  }

  return (
    <button type="button" className={sharedClassName} {...props}>
      {content}
    </button>
  );
}
