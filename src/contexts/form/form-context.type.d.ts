import { Dispatch } from 'react';
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  UseFormSetError,
} from 'react-hook-form';

export interface FormContextProps {
  register: UseFormRegister<FieldValues>;
  setError: UseFormSetError<FieldValues>;
  errors: FieldErrors<FieldValues>;
  maskSchema:
    | Record<string, (e: React.ChangeEvent<HTMLInputElement>) => void>
    | undefined;
  form: { [key: string]: string | number | boolean | undefined };
  setForm: Dispatch<
    React.SetStateAction<{
      [key: string]: string | number | boolean | undefined;
    }>
  >;
  isSubmitting: boolean;
  isSubmitSuccessful: boolean;
}
