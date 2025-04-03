import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import styles from "./select.module.css";

const selectVariants = cva(styles.base, {
  variants: {
    size: {
      sm: styles["size-sm"],
      md: styles["size-md"],
      lg: styles["size-lg"],
    },
    variant: {
      default: styles["variant-default"],
      primary: styles["variant-primary"],
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

export const Select = ({ className, options, selectSize, ...props }: SelectProps) => (
  <select className={cn(selectVariants({ size: selectSize, className }))} {...props}>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);
