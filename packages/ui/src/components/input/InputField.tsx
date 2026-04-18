import * as React from 'react';
import { cn } from "../../lib/utils";
import Input, { type InputProps } from './Input';

export interface InputFieldProps extends InputProps {
  label?: string;
  error?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, variant, className, id: idProp, ...props }, ref) => {
    const generatedId = React.useId();
    const id = idProp ?? generatedId;

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label htmlFor={id} className="text-sm font-semibold text-gray-700">
            {label}
          </label>
        )}
        <Input
          {...props}
          ref={ref}
          id={id}
          variant={error ? 'error' : variant ?? 'gray'}
          inputWrapperClassName={cn('w-full', props.inputWrapperClassName)}
        />
        {error && <span className="break-words text-sm text-red-600">{error}</span>}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
