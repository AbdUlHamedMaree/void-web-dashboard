import type { GetServerSideProps } from 'next';

export const redirectServerProps =
  (destination: string, permanent = true): GetServerSideProps =>
  async () => ({
    redirect: {
      destination,
      permanent,
    },
  });
