import React, { forwardRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { darkenColor } from '@/utils/darkenColor';
import { MultiVariantButtonProps } from './button.type';


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
