import React, { forwardRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { darkenColor } from '@/utils/darkenColor';
import { MultiVariantButtonProps } from './button.type';

/**
 * Reusable Button component with customizable styles and behavior.
 *
 * @component
 * @param {Object} props - The properties of the Button component.
 * @param {"default" | "gradient"} [props.variant="default"] - The style variant of the button.
 * @param {"button" | "submit" | "reset"} [props.type="button"] - The type of the button.
 * @param {string} [props.bgHexColor="#30c18c"] - The hex color for the button's background.
 * @param {boolean} [props.animated=true] - Whether the button includes hover animations (applies only to the gradient variant).
 * @param {string} [props.className] - Additional custom CSS classes for the button.
 * @param {React.ReactNode} props.children - The content inside the button.
 * @param {React.Ref<HTMLButtonElement>} ref - A ref to the button element.
 * @param {React.ButtonHTMLAttributes<HTMLButtonElement>} props.props - Additional HTML attributes for the button.
 * @returns {JSX.Element} A styled button component.
 */
const Button = forwardRef<HTMLButtonElement, MultiVariantButtonProps>(
  (
    {
      variant = 'default',
      type = 'button',
      bgHexColor = '#30c18c',
      animated = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const animatedStyle = useMemo(
      () =>
        variant === 'gradient' && animated
          ? 'transition-[background] duration-700 hover:bg-right-top'
          : '',
      [variant, animated],
    );

    const classNames = useMemo(
      () =>
        cn(
          'bg-[280%_auto] w-full text-white text-sm text-center font-medium cursor-pointer rounded-md py-2.5 px-2',
          animatedStyle,
          className,
        ),
      [animatedStyle, className],
    );

    const gradientBackground = useMemo(() => {
      if (variant === 'gradient') {
        const darkenedBackgroundColor = darkenColor(bgHexColor, 0.22);
        return `linear-gradient(325deg, ${darkenedBackgroundColor} 0%, ${bgHexColor} 55%, ${darkenedBackgroundColor} 90%)`;
      }
      return undefined;
    }, [variant, bgHexColor]);

    return (
      <button
        ref={ref}
        type={type}
        className={classNames}
        style={{
          backgroundImage: gradientBackground,
          backgroundColor: variant === 'default' ? bgHexColor : undefined,
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
