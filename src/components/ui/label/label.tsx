import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import styles from "@/components/ui/label/label.module.css";

const labelVariants = cva(styles.base, {
  variants: {
    size: {
      xs: styles["size-xs"],
      sm: styles["size-sm"],
      md: styles["size-md"],
      xl: styles["size-xl"],
    },
    variant: {
      default: styles["variant-default"],
      muted: styles["variant-muted"],
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

type LabelProps = ComponentProps<"label"> & VariantProps<typeof labelVariants>;

export const Label = ({ className, size, ...props }: LabelProps) => <label className={cn(labelVariants({ size, className }))} {...props} />;
