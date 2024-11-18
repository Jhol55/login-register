'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProps } from './form.type';
import { FormProvider } from '@/contexts/form';

/**
 * A reusable `Form` component that integrates with React Hook Form and supports Zod validation and mask schemas.
 * It provides form state management, validation handling, and custom form behaviors.
 *
 * @component
 * @param {Object} props - The properties of the Form component.
 * @param {function} [props.onSubmit] - Function to handle form submission. Receives the form state and `setError` method as arguments.
 * @param {function} [props.onChange] - Function to handle form state changes. Receives the current form state.
 * @param {React.ReactNode} props.children - The child components rendered inside the form.
 * @param {ZodSchema} [props.zodSchema] - Zod validation schema for form validation, used with `react-hook-form`'s `resolver`.
 * @param {Object} [props.maskSchema] - Schema for input masking. Used to apply masks to form fields based on field names.
 * @param {"on" | "off"} [props.autoComplete="on"] - Specifies whether the form should have autocomplete enabled or disabled. Default is "on".
 * @param {React.Ref<HTMLFormElement>} ref - Forwarded ref to the form element.
 * @param {React.FormHTMLAttributes<HTMLFormElement>} props.props - Additional HTML attributes for the form element (e.g., className, id, etc.).
 * @returns {JSX.Element} The rendered Form component wrapped in `FormProvider` context.
 *
 * @remarks
 * The `Form` component uses `react-hook-form` for form handling and validation, optionally integrating a Zod validation schema
 * via the `zodResolver`. The form also supports input masking using a `maskSchema`, which can be defined to apply formatting to
 * specific input fields.
 *
 * - `onSubmit`: A callback triggered when the form is submitted. It receives the form state and the `setError` method to handle errors programmatically.
 * - `onChange`: A callback triggered whenever the form state changes, allowing you to synchronize or perform actions with the current form state.
 * - `zodSchema`: The Zod schema used for validation. If provided, the form will automatically validate inputs using this schema.
 * - `maskSchema`: An object for defining custom input masks for form fields.
 * - `FormProvider`: This component is wrapped in `FormProvider` to share form state (`register`, `setError`, `errors`, etc.) with nested form components.
 *
 * The form handles form submission, validation, and state management, offering a flexible and efficient way to manage forms in React.
 * The `FormProvider` ensures that form-related data is shared across child components, enabling them to register fields, handle validation errors,
 * and update the form state.
 */
export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      onSubmit,
      onChange,
      children,
      zodSchema,
      maskSchema,
      autoComplete = 'on',
      ...props
    },
    ref,
  ) => {
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
      resolver: zodSchema ? zodResolver(zodSchema) : undefined,
    });

    /**
     * State to manage the form data.
     */
    const [form, setForm] = useState<{
      [key: string]: string | number | boolean | undefined;
    }>({});

    /**
     * Effect to trigger `onChange` callback whenever the form state changes.
     */
    useEffect(() => {
      onChange?.(form);
    }, [form, onChange]);

    return (
      <FormProvider
        value={{
          register,
          setError,
          errors,
          maskSchema,
          form,
          setForm,
          isSubmitting,
          isSubmitSuccessful,
        }}
      >
        <form
          ref={ref}
          onSubmit={handleSubmit(() => onSubmit?.(form, setError))}
          autoComplete={autoComplete}
          {...props}
        >
          {children}
        </form>
      </FormProvider>
    );
  },
);

Form.displayName = 'Form';
