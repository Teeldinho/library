import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import styles from "./container.module.css";

const containerVariants = cva(styles.base, {
  variants: {
    size: {
      sm: styles.sizeSm,
      md: styles.sizeMd,
      lg: styles.sizeLg,
      full: styles.sizeFull,
    },
    align: {
      left: styles.alignLeft,
      center: styles.alignCenter,
      right: styles.alignRight,
    },
  },
  defaultVariants: {
    size: "md",
    align: "center",
  },
});

type ContainerProps = ComponentProps<"div"> & VariantProps<typeof containerVariants>;

export const Container = ({ className, size, align, ...props }: ContainerProps) => (
  <div className={cn(containerVariants({ size, align, className }))} {...props} />
);
