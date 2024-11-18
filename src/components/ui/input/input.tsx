'use client';

import { useForm } from '@/hooks/use-form';
import { InputProps } from './input.type';
import { forwardRef, useState } from 'react';
import { mergeRefs } from '@/utils/mergeRefs';

/**
 * `Input` is a specialized input component designed to work seamlessly with the `useForm` hook
 * from `react-hook-form`. It offers controlled form state management, input masking, and custom `onChange` handling,
 * making it suitable for complex form logic, validation, and submission.
 *
 * This component integrates with a Zod schema for input validation and supports custom masking for field values (e.g., phone number formatting).
 *
 * @component
 * @param {InputProps} props - The properties for the `Input` component.
 * @param {string} props.fieldName - The unique field name used to register the input in the form context.
 * @param {"text" | "password" | "email" | "number"} [props.type="text"] - Specifies the type of the input.
 * @param {string} [props.autoComplete="on"] - Controls the auto-completion behavior for the input field.
 * @param {boolean} [props.includeInForm=true] - Indicates whether this input field should be included in the form state.
 * @param {React.Ref<HTMLInputElement>} ref - A forwarded ref for the input element.
 * @param {function} [props.onChange] - Optional custom `onChange` handler for the input field.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - Other standard HTML input attributes.
 * @returns {JSX.Element} The rendered input field.
 *
 * @remarks
 * This component integrates with `useForm`, which allows the input to be registered and controlled by the `react-hook-form` hook.
 * - `register`: Registers the input field within the form context.
 * - `setForm`: Updates the form state whenever the field value changes.
 * - `maskSchema`: Custom input masking can be applied to the field value (e.g., for formatting phone numbers).
 *
 * The component ensures that the form state remains synchronized with the input value. The `maskSchema` allows for dynamic formatting, such as adding a phone number mask or other input masks based on the field name.
 *
 * Unlike a standard HTML `<input />`, this component:
 * - Manages its own state internally (via `useState`).
 * - Supports custom masking for values, applying it during state changes.
 * - Integrates tightly with the form state managed by `useForm`, updating the global form state when necessary.
 *
 * The `className` applies various styles, including responsiveness, focus states, and transitions for better user interaction. It also accounts for dark mode and light mode styling.
 *
 * The component ensures seamless integration with form submission logic, as the `fieldName` property links the input field to its corresponding value in the form state, making it ready for validation and submission.
 */
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
