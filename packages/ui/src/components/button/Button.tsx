import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center font-medium rounded-md",
    "transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-4",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-primary-500 text-base-white border border-primary-500 shadow-xs",
          "hover:bg-primary-600 hover:border-primary-600",
          "focus-visible:ring-primary-100",
          "disabled:bg-primary-200 disabled:border-primary-200",
        ],
        secondary: [
          "bg-base-white text-gray-700 border border-gray-300 shadow-xs",
          "hover:bg-gray-50 hover:text-gray-800",
          "focus-visible:ring-gray-100",
          "disabled:text-gray-300 disabled:border-gray-200",
        ],
        outline: [
          "bg-base-white text-gray-700 border border-gray-300 shadow-xs",
          "hover:bg-gray-50 hover:text-gray-800",
          "focus-visible:ring-gray-100",
          "disabled:text-gray-300 disabled:border-gray-200",
        ],
        destructive: [
          "bg-error-600 text-base-white border border-error-600 shadow-xs",
          "hover:bg-error-700 hover:border-error-700",
          "focus-visible:ring-error-100",
          "disabled:bg-error-200 disabled:border-error-200",
        ],
      },
      size: {
        sm: "h-8 px-3 text-sm gap-1.5",
        md: "h-10 px-4 text-sm gap-2",
        lg: "h-12 px-4 text-base gap-2",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}