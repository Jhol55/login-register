'use client';

import React, { forwardRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProps } from './form.type';
import { FormProvider } from '@/contexts/form';

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
      watch,
      handleSubmit,
      setError,
      setValue,
      formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
      resolver: zodSchema ? zodResolver(zodSchema) : undefined,
    });

    const form = watch();

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
          setValue,
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
