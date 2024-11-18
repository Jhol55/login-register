'use client';

import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { Typography } from '@/components/ui/typography';
import { ConfirmEmailForm } from '@/components/forms/confirm-email';
import { useUser } from '@/hooks/use-user';
import Image from 'next/image';

export default function Confirm() {
  const { user } = useUser();

  return (
    <Container variant="main">
      <Container
        variant="section"
        color="bg-zinc-900"
        className="flex-col md:w-2/3 lg:w-1/2 xl:w-1/3 rounded-3xl"
      >
        <Typography variant="h1">Confirmar email</Typography>
        <Typography variant="p" className="text-center px-2.5">
          Um código de confirmação foi enviado para
          <Typography variant="b">{' ' + user?.email}</Typography>. Por favor,
          verifique sua caixa de entrada e siga as instruções para completar o
          processo de registro
        </Typography>
        <ConfirmEmailForm />
        <div className="flex items-center">
          <Typography variant="p" className="whitespace-nowrap">
            Não recebeu o código?
          </Typography>
          <Button className="underline" bgHexColor="#00000000">
            Clique aqui para reenvia-lo
          </Button>
        </div>
      </Container>
      <Image
        src="/background.jpg"
        fill
        alt=""
        className="object-cover -z-50 opacity-40"
      />
    </Container>
  );
}
