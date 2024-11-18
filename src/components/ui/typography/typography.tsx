import React from 'react';
import { cn } from '@/lib/utils';
import { TypographyProps } from './typography.type';

export const Typography = ({
  className,
  color = 'text-white',
  variant = 'p',
  children,
  ...props
}: TypographyProps) => {
  const Component = variant;

  const styles = {
    p: `text-sm font-medium`,
    b: 'text-sm font-semibold',
    span: `text-md font-medium`,
    label: `text-sm font-medium w-fit self-start`,
    h1: `text-4xl font-bold`,
    h2: `text-3xl font-semi-bold`,
    h3: `text-2xl font-semibold`,
    h4: `text-xl font-medium`,
    h5: `text-lg font-medium`,
    h6: `text-md font-medium`,
  };

  return (
    <Component {...props} className={cn(styles[variant], color, className)}>
      {children}
    </Component>
  );
};
