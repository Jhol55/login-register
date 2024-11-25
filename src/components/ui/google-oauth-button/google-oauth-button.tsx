import { signIn } from 'next-auth/react';
import { forwardRef } from 'react';
import { GoogleOAuthButtonProps } from './google-oauth.button.type';
import { cn } from '@/lib/utils';
import { Button } from '../button';

export const GoogleOAuthButton = forwardRef<
  HTMLButtonElement,
  GoogleOAuthButtonProps
>(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      onClick={() => signIn('google')}
      variant="gradient"
      bgHexColor="#ffffff"
      darkenFactor={0.12}
      type="button"
      className={cn('text-zinc-900', className)}
      icon={{
        src: '/google.png',
        width: 16,
        height: 16,
        alt: 'Google Icon',
      }}
      {...props}
    >
      Entrar com Google
    </Button>
  );
});

GoogleOAuthButton.displayName = 'GoogleOAuthButton';
