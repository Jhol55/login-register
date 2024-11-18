import {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from 'react';

export interface InputOTPProps extends InputHTMLAttributes<HTMLInputElement> {
  fieldName: string;
  length: number;
  type?: HTMLInputTypeAttribute;
  includeInForm?: boolean;
  containerClassName?: string;
  slotClassName?: string;
  fakeCaretClassName?: string;
  className?: string;
  onInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
