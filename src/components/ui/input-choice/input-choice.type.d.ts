import { InputHTMLAttributes } from 'react';

export interface InputChoiceProps
  extends InputHTMLAttributes<HTMLInputElement> {
  fieldName: keyof Record<string, (e: ChangeEvent<HTMLInputElement>) => void>;
  type?: 'checkbox' | 'radio';
  includeInForm?: boolean;
}
