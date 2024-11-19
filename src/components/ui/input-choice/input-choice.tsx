'use client';

import { useForm } from '@/hooks/use-form';
import { InputChoiceProps } from './input-choice.type';
import { forwardRef, useState } from 'react';
import { mergeRefs } from '@/utils/mergeRefs';


export const InputChoice = forwardRef<HTMLInputElement, InputChoiceProps>(
  (
    { fieldName, type = 'checkbox', includeInForm = true, onChange, ...props },
    ref,
  ) => {
    const { register, setForm } = useForm();
    const {
      ref: registerRef,
      onChange: registerOnChange,
      ...registerProps
    } = register(fieldName);
    const [value, setValue] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.checked;
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
        checked={value}
        onChange={handleOnChange}
        className="border-1 relative box-border block min-h-4 min-w-4 max-w-4 cursor-pointer appearance-none rounded-md border-[#d9d9d9] bg-slate-200 transition-all duration-300 before:absolute before:left-2/4 before:top-[42%] before:h-[10px] before:w-[6px] before:-translate-x-2/4 before:-translate-y-2/4 before:rotate-45 before:scale-0 before:border-b-2 before:border-r-2 before:border-solid before:border-b-white before:border-r-white before:opacity-0 before:transition-all before:delay-100 before:duration-100 before:ease-in before:content-[''] after:absolute after:inset-0 after:rounded-[7px] after:opacity-0 after:shadow-[0_0_0_calc(30px_/_2.5)_#34d399] after:transition-all after:duration-500 after:ease-in after:content-[''] checked:border-transparent checked:bg-[#34d399] checked:before:-translate-x-2/4 checked:before:-translate-y-2/4 checked:before:rotate-45 checked:before:scale-x-[1] checked:before:scale-y-[1] checked:before:opacity-100 checked:before:transition-all checked:before:delay-100 checked:before:duration-200 checked:before:ease-in hover:border-[#34d399] focus:outline-[#34d399] [&:active:not(:checked)]:after:opacity-100 [&:active:not(:checked)]:after:shadow-none [&:active:not(:checked)]:after:transition-none"
        {...props}
        {...registerProps}
      />
    );
  },
);

InputChoice.displayName = 'Input';
