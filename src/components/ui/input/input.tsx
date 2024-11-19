'use client';

import { useForm } from '@/hooks/use-form';
import { InputProps } from './input.type';
import { forwardRef, useState } from 'react';
import { mergeRefs } from '@/utils/mergeRefs';


export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      fieldName,
      type = 'text',
      autoComplete = 'on',
      includeInForm = true,
      onChange,
      ...props
    },
    ref,
  ) => {
    const { register, maskSchema, setForm } = useForm();
    const {
      ref: registerRef,
      onChange: registerOnChange,
      ...registerProps
    } = register(fieldName);
    const [value, setValue] = useState('');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = maskSchema?.[fieldName]?.(e) ?? e.target.value;
      setValue(newValue);

      if (includeInForm) {
        setForm((prev) => ({ ...prev, [fieldName]: newValue }));
      }
      registerOnChange?.(e);
      onChange?.(e);
    };

    return (
      <input
        ref={mergeRefs(ref, registerRef)}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={handleOnChange}
        className="w-full rounded-md border border-gray-300 bg-gray-100 p-2.5 text-black outline-none placeholder:text-black/40 focus:ring focus:ring-emerald-400 dark:border-gray-500 dark:bg-gray-300 text-sm"
        {...props}
        {...registerProps}
      />
    );
  },
);

Input.displayName = 'Input';
