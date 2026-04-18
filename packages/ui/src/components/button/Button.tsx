import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center rounded-md",
    "transition-colors duration-200 cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-4",
    "disabled:pointer-events-none disabled:cursor-not-allowed",
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
    VariantProps<typeof buttonVariants> {
  /**
   * Replaces the button element with a different tag or component (e.g. Next.js Link).
   * Button styling and props are merged onto the rendered element.
   *
   * @example
   * <Button render={<Link href="/apply" />}>Apply now</Button>
   */
  render?: React.ReactElement;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", render: renderProp, ...props }, ref) => {
    return useRender({
      render: renderProp,
      ref,
      defaultTagName: "button",
      props: {
        type,
        className: cn(buttonVariants({ variant, size }), className),
        ...props,
      },
    });
  }
);

Button.displayName = "Button";

export { buttonVariants };
export default Button;
