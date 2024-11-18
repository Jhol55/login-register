import { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldName: string;
  type?: 'text' | 'email' | 'password' | 'number' | undefined;
  includeInForm?: boolean;
}
