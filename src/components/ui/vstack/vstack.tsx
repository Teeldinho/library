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
      stretch: styles["items-stretch"],
      baseline: styles["items-baseline"],
    },
    justify: {
      start: styles["justify-start"],
      center: styles["justify-center"],
      end: styles["justify-end"],
      between: styles["justify-between"],
      around: styles["justify-around"],
      evenly: styles["justify-evenly"],
    },
  },
  defaultVariants: {
    space: "xs",
    align: "start",
    justify: "start",
  },
});

type VStackProps = ComponentProps<"div"> & VariantProps<typeof vstackVariants>;

export const VStack = ({ className, space, align, justify, ...props }: VStackProps) => (
  <div className={cn(vstackVariants({ space, align, justify, className }))} {...props} />
);
