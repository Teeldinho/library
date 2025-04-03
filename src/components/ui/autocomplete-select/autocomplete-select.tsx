import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import styles from "./autocomplete-select.module.css";

const autocompleteSelectVariants = cva(styles.base, {
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

type AutocompleteSelectProps = ComponentProps<"input"> &
  VariantProps<typeof autocompleteSelectVariants> & {
    options: { value: string; label: string }[];
    inputSize?: "sm" | "md" | "lg";
  };

export const AutocompleteSelect = ({ className, options, inputSize, variant, ...props }: AutocompleteSelectProps) => (
  <>
    <input
      {...props}
      type="text"
      className={cn(autocompleteSelectVariants({ size: inputSize, variant, className }))}
      list={props.id ? `${props.id}-datalist` : "datalist"}
      placeholder={props.placeholder || "Select..."}
    />
    <datalist id={props.id ? `${props.id}-datalist` : "datalist"}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </datalist>
  </>
);
