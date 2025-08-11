import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      default:
        "bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200",
      outline:
        "border border-neutral-300 dark:border-neutral-700 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
      ghost:
        "bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
    };
    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      sm: "px-3 py-2 text-sm rounded-lg",
      md: "px-4 py-3 text-sm rounded-full",
      lg: "px-5 py-3.5 text-base rounded-full",
    };
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";


