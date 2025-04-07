import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import styles from "./input.module.css";

const inputVariants = cva(styles.base, {
  variants: {
    inputSize: {
      sm: styles["size-sm"],
      md: styles["size-md"],
      lg: styles["size-lg"],
    },
    variant: {
      default: styles["variant-default"],
      primary: styles["variant-primary"],
      subtle: styles["variant-subtle"],
    },
  },
  defaultVariants: {
    inputSize: "md",
    variant: "default",
  },
});

type InputProps = ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    inputSize?: "sm" | "md" | "lg";
  };

export const Input = ({ className, inputSize, variant, ...props }: InputProps) => (
  <input className={cn(inputVariants({ inputSize, variant, className }))} {...props} />
);
