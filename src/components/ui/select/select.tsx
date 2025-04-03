import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import styles from "./select.module.css";

const selectVariants = cva(styles.base, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
    variant: {
      default: styles.variantDefault,
      primary: styles.variantPrimary,
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

type SelectProps = ComponentProps<"select"> &
  VariantProps<typeof selectVariants> & {
    options: { value: string; label: string }[];
    selectSize?: "sm" | "md" | "lg";
    placeholder?: string;
  };

export const Select = ({ className, options, ...props }: SelectProps) => (
  <select className={cn(selectVariants({ className }))} {...props}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
