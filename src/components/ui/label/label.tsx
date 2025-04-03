import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import styles from "./label.module.css";

const labelVariants = cva(styles.base, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type LabelProps = ComponentProps<"label"> & VariantProps<typeof labelVariants>;

export const Label = ({ className, size, ...props }: LabelProps) => <label className={cn(labelVariants({ size, className }))} {...props} />;
