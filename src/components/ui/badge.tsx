import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning";
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-neutral-900 text-neutral-50 hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200",
      secondary: "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700",
      destructive: "bg-red-500 text-neutral-50 hover:bg-red-600 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-800",
      outline: "border border-neutral-200 text-neutral-950 dark:border-neutral-800 dark:text-neutral-50",
      success: "bg-green-500 text-neutral-50 hover:bg-green-600 dark:bg-green-900 dark:text-neutral-50 dark:hover:bg-green-800",
      warning: "bg-yellow-500 text-neutral-900 hover:bg-yellow-600 dark:bg-yellow-900 dark:text-neutral-50 dark:hover:bg-yellow-800",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:focus:ring-neutral-300",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };