import { cva, VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const buttonVariants = cva("", {
  variants: {
    variant: {
      primary: "data-[variant=primary]",
      secondary: "data-[variant=secondary]",
      success: "data-[variant=success]",
    },
    size: {
      sm: "data-[size=sm]",
      md: "data-[size=md]",
      lg: "data-[size=lg]",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

export function Button({ variant, size, className, ref, ...props }: ButtonProps) {
  return <button ref={ref} data-button data-variant={variant} data-size={size} className={buttonVariants({ variant, size, className })} {...props} />;
}
