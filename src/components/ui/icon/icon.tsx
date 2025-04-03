import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps, ElementType } from "react";
import styles from "./icon.module.css";

const iconVariants = cva(styles.base, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      muted: styles.muted,
      foreground: styles.foreground,
    },
  },
  defaultVariants: {
    size: "md",
    variant: "foreground",
  },
});

type IconProps<T extends ElementType> = VariantProps<typeof iconVariants> & {
  as?: T;
  className?: string;
} & ComponentProps<T>;

export const Icon = <T extends ElementType = "svg">({ as: Component = "svg", className, size, variant, ...props }: IconProps<T>) => (
  <div className={cn(iconVariants({ size, variant, className }))}>
    <Component
      {...(props as ComponentProps<T>)}
      className={cn(styles.icon, (props as ComponentProps<T>).className)}
      fill="currentColor"
      aria-hidden="true"
    />
  </div>
);
