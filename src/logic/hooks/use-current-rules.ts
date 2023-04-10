import { useSession } from 'next-auth/react';

export const useCurrentRules = () => {
  const { data } = useSession();

  return data?.rules;
};
