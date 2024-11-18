import { useForm } from '@/hooks/use-form';
import { cn } from '@/lib/utils';
import { mergeRefs } from '@/utils/mergeRefs';
import { forwardRef, useState } from 'react';
import { Slot } from './slot';
import { InputOTPProps } from './input-otp.type';

/**
 * InputOTP is a specialized OTP (One-Time Password) input component that integrates with `useForm`.
 * Unlike a regular input, it splits the OTP into individual character slots, each displaying a single digit or character.
 *
 * @component
 * @param {InputOTPProps} props - The props for InputOTP.
 * @param {string} props.fieldName - The name used to register the OTP input in the form.
 * @param {number} [props.length=1] - The number of characters (slots) expected in the OTP input.
 * @param {string} [props.containerClassName] - Optional class name for the outer container of the OTP slots.
 * @param {string} [props.slotClassName] - Optional class name for styling each OTP slot.
 * @param {string} [props.fakeCaretClassName] - Optional class name for customizing the fake caret behavior in each slot.
 * @returns {JSX.Element} A multi-slot OTP input field.
 *
 * @example
 * // Usage of InputOTP
 * <InputOTP
 *   fieldName="otp"
 *   length={6}
 * />
 *
 * @remarks
 * This component leverages `useForm` and supports integration with form validation libraries like `react-hook-form` and `zod`.
 * It also provides input masking through `maskSchema` and updates the form state on change.
 * Each character slot is managed independently, styled via the `Slot` component.
 */
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
