import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import styles from "./card.module.css";

const cardVariants = cva(styles.card, {
  variants: {
    variant: {
      default: styles.default,
      primary: styles.primary,
      secondary: styles.secondary,
      tertiary: styles.tertiary,
    },
    space: {
      sm: styles["space-sm"],
      md: styles["space-md"],
      lg: styles["space-lg"],
    },
  },
  defaultVariants: {
    variant: "default",
    space: "md",
  },
});

type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants>;

export const Card = ({ className, space, variant, ...props }: CardProps) => (
  <div className={cn(cardVariants({ space, variant, className }))} {...props} />
);
