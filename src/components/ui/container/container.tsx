import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import styles from "./container.module.css";

const containerVariants = cva(styles.base, {
  variants: {
    size: {
      sm: styles["size-sm"],
      md: styles["size-md"],
      lg: styles["size-lg"],
      full: styles["size-full"],
    },
    align: {
      left: styles["align-left"],
      center: styles["align-center"],
      right: styles["align-right"],
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
