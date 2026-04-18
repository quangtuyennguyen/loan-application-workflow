'use client';

import { Controller, type FieldValues, type Path, type Control } from 'react-hook-form';
import { InputField, type InputFieldProps } from '@tuyennq/ui/src/components/input/InputField';

interface HookFormInputFieldProps<T extends FieldValues>
  extends Omit<InputFieldProps, 'name' | 'value' | 'onChange' | 'onBlur' | 'ref'> {
  control: Control<T>;
  name: Path<T>;
}

export function HookFormInputField<T extends FieldValues>({
  control,
  name,
  type,
  ...rest
}: HookFormInputFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <InputField
          {...rest}
          {...field}
          type={type}
          value={field.value ?? ''}
          error={fieldState.error?.message}
          onChange={(e) => {
            if (type === 'number') {
              const raw = e.target.value;
              field.onChange(raw === '' ? undefined : parseFloat(raw));
            } else {
              field.onChange(e);
            }
          }}
        />
      )}
    />
  );
}
