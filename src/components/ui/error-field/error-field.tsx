import { useForm } from '@/hooks/use-form';
import { cn } from '@/lib/utils';
import { ErrorFieldProps } from './error-field.type';
import { forwardRef } from 'react';

/**
 * A component that displays validation error messages for a specific form field.
 * It retrieves the error message from the form's validation state and displays it,
 * styled with Tailwind CSS.
 *
 * @component
 * @param {Object} props - The properties of the `ErrorField` component.
 * @param {string} props.fieldName - The name of the field for which the error message should be displayed.
 * @param {string} [props.className] - Optional additional class names to apply custom styles to the error message.
 *
 * @returns {JSX.Element} A paragraph element displaying the error message for the specified form field.
 *
 * @example
 * <ErrorField fieldName="email" />
 *
 * @remarks
 * The component uses the `useForm` hook to access the form's state and extract the error message
 * associated with the given `fieldName`. It then displays the error message as a paragraph, styled
 * with `text-red-500` for a red color and `min-h-6` and `h-6` to maintain consistent spacing.
 * You can customize the styling using the `className` prop.
 *
 * If no error exists for the specified `fieldName`, nothing is rendered.
 *
 * - `fieldName`: The field name used to retrieve the error message from the form's state.
 * - `className`: Optional custom styles to be applied to the error message.
 *
 * The error message is displayed in small red text (`text-red-500`) and with a fixed height (`min-h-6 h-6`) to ensure proper alignment with other form elements.
 */
export const ErrorField = forwardRef<HTMLParagraphElement, ErrorFieldProps>(
  ({ fieldName, className }, ref) => {
    const { errors } = useForm();

    return (
      <p
        ref={ref}
        className={cn(
          'text-red-500 min-h-6 h-6 text-sm self-start leading-none',
          className,
        )}
      >
        {errors[fieldName]?.message as string}
      </p>
    );
  },
);

ErrorField.displayName = 'ErrorField';
