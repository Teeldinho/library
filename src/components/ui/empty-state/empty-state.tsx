import React from "react";
import { Label } from "@/components/ui/label/label";
import styles from "./empty-state.module.css";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const emptyStateVariants = cva(styles.container, {
  variants: {
    variant: {
      default: styles["variant-default"],
      muted: styles["variant-muted"],
    },
    size: {
      sm: styles["size-sm"],
      md: styles["size-md"],
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

interface EmptyStateProps extends VariantProps<typeof emptyStateVariants> {
  message: string;
  className?: string;
  icon?: React.ReactNode;
  hideIcon?: boolean;
}

export function EmptyState({ message, className, variant = "default", size = "sm", icon, hideIcon = false }: EmptyStateProps) {
  return (
    <div className={cn(emptyStateVariants({ variant, size }), className)}>
      {!hideIcon && (
        <div className={styles.icon}>
          {icon || (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles["empty-icon"]}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
              <path d="M8 11h6" />
            </svg>
          )}
        </div>
      )}
      <Label variant={variant} size={size} weight="medium">
        {message}
      </Label>
    </div>
  );
}

export function EmptyList({ message, className, variant = "default", size = "sm", icon, hideIcon }: EmptyStateProps) {
  return (
    <ul className={styles.list}>
      <li className={styles["list-item"]}>
        <EmptyState message={message} className={className} variant={variant} size={size} icon={icon} hideIcon={hideIcon} />
      </li>
    </ul>
  );
}
