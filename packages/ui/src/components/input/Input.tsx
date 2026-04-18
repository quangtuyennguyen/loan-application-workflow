import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from 'react';

const sizeVariants = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-base",
  lg: "h-12 px-6 text-lg",
} as const;

const colorVariants = {
  gray: {
    border: "border-gray-300",
    text: "text-gray-900",
    focusBorder: "focus-within:border-gray-500",
    focusRing: "focus-within:ring-gray-500",
    placeholder: "placeholder:text-gray-500",
    disabled: "disabled:text-gray-500",
    icon: "text-gray-500",
  },
  error: {
    border: "border-error-300",
    text: "text-error-900",
    focusBorder: "focus-within:border-error-500",
    focusRing: "focus-within:ring-error-500",
    placeholder: "placeholder:text-error-400",
    disabled: "disabled:text-error-400",
    icon: "text-error-500",
  },
  primary: {
    border: "border-primary-300",
    text: "text-primary-900",
    focusBorder: "focus-within:border-primary-500",
    focusRing: "focus-within:ring-primary-500",
    placeholder: "placeholder:text-primary-400",
    disabled: "disabled:text-primary-400",
    icon: "text-primary-500",
  }
} as const;

const inputWrapperStyles = cva(
  [
    "flex gap-2 items-center rounded-md bg-transparent border transition-colors",
    "focus-within:outline-none focus-within:ring-1 focus-within:ring-offset-0",
  ],
  {
    variants: {
      variant: {
        gray: [colorVariants.gray.border, colorVariants.gray.text, colorVariants.gray.focusBorder, colorVariants.gray.focusRing],
        error: [colorVariants.error.border, colorVariants.error.text, colorVariants.error.focusBorder, colorVariants.error.focusRing],
        primary: [colorVariants.primary.border, colorVariants.primary.text, colorVariants.primary.focusBorder, colorVariants.primary.focusRing],
      },
      size: sizeVariants,
      hasLeadingButton: { true: "rounded-l-none", false: "" },
      hasTrailingButton: { true: "rounded-r-none", false: "" },
    },
    defaultVariants: {
      variant: "gray",
      size: "md",
      hasLeadingButton: false,
      hasTrailingButton: false,
    },
  }
);

const inputElementStyles = cva(
  ["flex-1 bg-transparent outline-none", "disabled:cursor-not-allowed"],
  {
    variants: {
      variant: {
        gray: [colorVariants.gray.placeholder, colorVariants.gray.disabled],
        error: [colorVariants.error.placeholder, colorVariants.error.disabled],
        primary: [colorVariants.primary.placeholder, colorVariants.primary.disabled],
      },
      size: { sm: "text-sm", md: "text-base", lg: "text-lg" },
    },
    defaultVariants: { variant: "gray", size: "md" },
  }
);

const iconStyles = cva("flex items-center justify-center", {
  variants: {
    variant: {
      gray: colorVariants.gray.icon,
      error: colorVariants.error.icon,
      primary: colorVariants.primary.icon,
    },
    size: { sm: "w-4 h-4", md: "w-5 h-5", lg: "w-6 h-6" },
  },
  defaultVariants: { variant: "gray", size: "md" },
});

const attachedButtonPosition = {
  leading: 'rounded-l-md rounded-r-none border-r-0',
  trailing: 'rounded-r-md rounded-l-none border-l-0',
} as const;

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  VariantProps<typeof inputWrapperStyles> {
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  leadingButton?: React.ReactNode;
  trailingButton?: React.ReactNode;
  wrapperClassName?: string;
  inputWrapperClassName?: string;
  inputElementClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      wrapperClassName,
      inputWrapperClassName,
      inputElementClassName,
      size = "md",
      variant = "gray",
      leadingIcon,
      trailingIcon,
      leadingButton,
      trailingButton,
      ...props
    },
    ref
  ) => {
    const hasLeadingButton = Boolean(leadingButton);
    const hasTrailingButton = Boolean(trailingButton);

    const cloneIconWithStyles = (icon: React.ReactNode) => {
      if (React.isValidElement<React.HTMLAttributes<HTMLElement>>(icon)) {
        return React.cloneElement(icon, {
          className: cn(iconStyles({ variant, size }), icon.props.className),
        });
      }
      return icon;
    };

    const inputElement = (
      <div
        className={cn(
          inputWrapperStyles({ variant, size, hasLeadingButton, hasTrailingButton }),
          inputWrapperClassName
        )}
      >
        {leadingIcon && cloneIconWithStyles(leadingIcon)}
        <input
          ref={ref}
          className={cn(inputElementStyles({ variant, size }), inputElementClassName)}
          {...props}
        />
        {trailingIcon && cloneIconWithStyles(trailingIcon)}
      </div>
    );

    if (!hasLeadingButton && !hasTrailingButton) {
      return inputElement;
    }

    return (
      <div className={cn("flex items-center", wrapperClassName)}>
        {hasLeadingButton && leadingButton && React.isValidElement<React.HTMLAttributes<HTMLElement>>(leadingButton) && (
          React.cloneElement(leadingButton, {
            className: cn(attachedButtonPosition.leading, leadingButton.props.className),
          })
        )}
        {inputElement}
        {hasTrailingButton && trailingButton && React.isValidElement<React.HTMLAttributes<HTMLElement>>(trailingButton) && (
          React.cloneElement(trailingButton, {
            className: cn(attachedButtonPosition.trailing, trailingButton.props.className),
          })
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
