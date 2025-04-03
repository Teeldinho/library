import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import styles from "./center.module.css";

export const Center = ({ className, ...props }: ComponentProps<"div">) => <div className={cn(styles.center, className)} {...props} />;
