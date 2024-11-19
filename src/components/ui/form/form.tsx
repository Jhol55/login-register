'use client';

import React, { forwardRef, useEffect, useState } from 'react';
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
      handleSubmit,
      setError,
      formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm({
      resolver: zodSchema ? zodResolver(zodSchema) : undefined,
    });

    const [form, setForm] = useState<{
      [key: string]: string | number | boolean | undefined;
    }>({});

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
