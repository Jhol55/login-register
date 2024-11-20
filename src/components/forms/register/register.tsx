import { SubmitButton } from '@/components/ui/submit-button';
import { Typography } from '@/components/ui/typography';
import { InputProps } from '@/components/ui/input/input.type';
import { ErrorField } from '@/components/ui/error-field';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React, { useId } from 'react';
import { registerFormSchema } from '@/components/forms/register/register.schema';
import { cn } from '@/lib/utils';
import { FieldValues, UseFormSetError } from 'react-hook-form';
import { userService } from '@/services/user';
import { useRouter } from 'next/navigation';

export const RegisterForm = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  const baseId = useId();
  const router = useRouter();

  const inputs: (InputProps & { label: string })[] = [
    {
      label: 'Nome de usuário',
      placeholder: 'Chuck Norris',
      fieldName: 'username',
      type: 'text',
    },
    {
      label: 'Email',
      placeholder: 'sample@gmail.com',
      fieldName: 'email',
      type: 'text',
    },
    {
      label: 'Senha',
      placeholder: '••••••••••••',
      fieldName: 'password',
      type: 'password',
    },
    {
      label: 'Repetir Senha',
      placeholder: '••••••••••••',
      fieldName: 'repeatPassword',
      type: 'password',
    },
  ];

  const handleSubmit = async (
    data: FieldValues,
    setError: UseFormSetError<FieldValues>,
  ) => {
    const response = await userService.register(data);

    if (!response?.success) {
      setError('email', {
        message: 'Email já cadastrado',
      });
      return;
    }

    router.push('/confirm');
  };

  return (
    <Form
      className={cn(
        'flex flex-col gap-2 w-full h-full overflow-y-auto md:rounded-r-3xl p-4 -z-50 bg-zinc-900',
        className,
      )}
      zodSchema={registerFormSchema}
      onSubmit={handleSubmit}
    >
      <div className="h-full" /> {/* justify-center when overflow */}
      {inputs.map((input, index) => (
        <React.Fragment key={index}>
          <Typography variant="label" htmlFor={`${baseId}-${index}`}>
            {input.label}
          </Typography>

          <Input
            id={`${baseId}-${index}`}
            type={input.type}
            placeholder={input.placeholder}
            fieldName={input.fieldName}
          />

          <ErrorField fieldName={input.fieldName} />
        </React.Fragment>
      ))}
      <SubmitButton variant="gradient">Registre-se</SubmitButton>
      {children}
      <div className="h-full" /> {/* justify-center when overflow */}
    </Form>
  );
};
