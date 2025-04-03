import { cva, VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import styles from "./button.module.css";
import { cn } from "@/lib/utils";
const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      primary: styles["button-primary"],
      secondary: styles["button-secondary"],
      success: styles["button-success"],
    },
    size: {
      sm: styles["button-sm"],
      md: styles["button-md"],
      lg: styles["button-lg"],
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
