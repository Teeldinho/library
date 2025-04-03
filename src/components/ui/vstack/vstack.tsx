import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import styles from "./vstack.module.css";

const vstackVariants = cva(styles.vstack, {
  variants: {
    space: {
      xs: styles["gap-xs"],
      sm: styles["gap-sm"],
      md: styles["gap-md"],
      lg: styles["gap-lg"],
      xl: styles["gap-xl"],
      "2xl": styles["gap-2xl"],
      "3xl": styles["gap-3xl"],
    },
    align: {
      start: styles["items-start"],
      center: styles["items-center"],
      end: styles["items-end"],
    },
  },
  defaultVariants: {
    space: "xs",
    align: "start",
  },
});

type VStackProps = ComponentProps<"div"> & VariantProps<typeof vstackVariants>;

export const VStack = ({ className, space, align, ...props }: VStackProps) => (
  <div className={cn(vstackVariants({ space, align, className }))} {...props} />
);
