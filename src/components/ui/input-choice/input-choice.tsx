'use client';

import { useForm } from '@/hooks/use-form';
import { InputChoiceProps } from './input-choice.type';
import { forwardRef, useState } from 'react';
import { mergeRefs } from '@/utils/mergeRefs';

/**
 * InputChoice is a specialized input component designed to work seamlessly with the `useForm` hook
 * from `react-hook-form`. It provides controlled form state management, including custom handling
 * of `onChange`, making it ideal for boolean or choice-based input fields like checkboxes and radio buttons.
 *
 * This component integrates with the form state and supports custom updates of the form field values.
 *
 * @component
 * @param {InputChoiceProps} props - The properties for the `InputChoice` component.
 * @param {string} props.fieldName - The unique name for the field used to register the input in the form context.
 * @param {"checkbox" | "radio"} [props.type="checkbox"] - Specifies the type of the input. Supports `checkbox` or `radio` input fields.
 * @param {boolean} [props.includeInForm=true] - Determines whether this input field should be included in the form state.
 * @param {React.Ref<HTMLInputElement>} ref - A forwarded ref to the input element.
 * @param {function} [props.onChange] - Optional custom `onChange` handler for the input field.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - Other standard HTML input attributes.
 * @returns {JSX.Element} The rendered input field.
 *
 * @remarks
 * This component integrates with `useForm`, allowing the input to be registered and controlled by the `react-hook-form` hook.
 * - `register`: Registers the input within the form context.
 * - `setForm`: Updates the form state whenever the field value changes.
 *
 * The component ensures the form state stays synchronized with the input value and supports custom logic for handling changes.
 *
 * Unlike a standard HTML `<input />` element, this component:
 * - Manages its state internally (via `useState`).
 * - Strongly integrates with the form state managed by `useForm`.
 * - Supports custom styles, animations, and transitions, especially for boolean-choice inputs like checkboxes and radio buttons.
 *
 * The state of the component is updated whenever the input value changes, and depending on the `includeInForm` value, it will also update the global form state.
 *
 * The applied `className` provides dynamic styles for various interaction states of the component, such as focus, hover, and checked, with visual transitions to enhance the user experience.
 *
 * When used with the `useForm` hook, the `fieldName` acts as the key to map the field's value within the form, enabling validation and submission of the data.
 */
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
