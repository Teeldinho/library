import React from "react";
import { Label } from "@/components/ui/label/label";
import styles from "./loading-state.module.css";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const loadingStateVariants = cva(styles.container, {
  variants: {
    variant: {
      default: styles["variant-default"],
      muted: styles["variant-muted"],
    },
    size: {
      sm: styles["size-sm"],
      md: styles["size-md"],
    },
    alignment: {
      center: styles["align-center"],
      left: styles["align-left"],
      right: styles["align-right"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
    alignment: "center",
  },
});

interface LoadingStateProps extends VariantProps<typeof loadingStateVariants> {
  message?: string;
  className?: string;
  hideSpinner?: boolean;
}

export function LoadingState({
  message = "Loading...",
  className,
  variant = "default",
  size = "sm",
  alignment = "center",
  hideSpinner = false,
}: LoadingStateProps) {
  return (
    <div className={cn(loadingStateVariants({ variant, size, alignment }), className)}>
      {!hideSpinner && (
        <div className={styles.indicator} aria-hidden="true">
          <div className={styles.spinner}></div>
        </div>
      )}
      <Label variant={variant} size={size} weight="medium">
        {message}
      </Label>
    </div>
  );
}

export function LoadingList({
  message = "Loading items...",
  className,
  variant = "default",
  size = "sm",
  alignment = "center",
  hideSpinner,
}: LoadingStateProps) {
  return (
    <ul className={styles.list}>
      <li className={styles["list-item"]}>
        <LoadingState message={message} className={className} variant={variant} size={size} alignment={alignment} hideSpinner={hideSpinner} />
      </li>
    </ul>
  );
}
