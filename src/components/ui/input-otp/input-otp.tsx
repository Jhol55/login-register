import { useForm } from '@/hooks/use-form';
import { cn } from '@/lib/utils';
import { mergeRefs } from '@/utils/mergeRefs';
import { forwardRef, useState } from 'react';
import { Slot } from './slot';
import { InputOTPProps } from './input-otp.type';


export const InputOTP = forwardRef<HTMLInputElement, InputOTPProps>(
  (
    {
      fieldName,
      length = 1,
      type = 'text',
      includeInForm = true,
      containerClassName,
      slotClassName,
      fakeCaretClassName,
      className,
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
      const newValue = (maskSchema?.[fieldName]?.(e) ?? e.target.value).slice(
        0,
        length,
      );
      setValue(newValue);
      if (includeInForm) {
        setForm((prev) => ({ ...prev, [fieldName]: newValue }));
      }
      registerOnChange?.(e);
      onChange?.(e);
    };

    return (
      <div className={cn('relative', containerClassName)}>
        <input
          ref={mergeRefs(ref, registerRef)}
          autoComplete="off"
          maxLength={length}
          type={type}
          value={value}
          onChange={handleOnChange}
          className={cn(
            'absolute w-full h-full text-transparent bg-transparent outline-0 select-none z-50 text-opacity-0',
            className,
          )}
          {...props}
          {...registerProps}
        />
        <div className="flex">
          {Array.from({ length }, (_, index) => (
            <Slot
              key={index}
              isActive={value.length === index}
              className={slotClassName}
              fakeCaretClassName={fakeCaretClassName}
            >
              {value?.charAt(index)}
            </Slot>
          ))}
        </div>
      </div>
    );
  },
);

InputOTP.displayName = 'InputOTP';
