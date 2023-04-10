import { useCurrentAbility } from '$logic/hooks/use-current-ability';
import type { AppCaslActions, AppCaslSubjects } from '$logic/libs/casl';
import { AbilityProvider } from '$logic/libs/casl';
import { NotAllowedPage } from '$ui/components/dumb/not-allowed-page';
import { NotAuthenticatedPage } from '$ui/components/dumb/not-authenticated-page';
import { SplashPage } from '$ui/components/shared/splash-page';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';

export type AuthGuardProps = {
  action: AppCaslActions;
  subject: AppCaslSubjects;
  field?: string;

  onNotAuthenticated?: () => void;
  onNotAllowed?: () => void;
};

export const AuthGuard: React.FC<React.PropsWithChildren<AuthGuardProps>> = ({
  action,
  subject,
  field,
  children,

  onNotAuthenticated,
  onNotAllowed,
}) => {
  const { status } = useSession();
  const ability = useCurrentAbility();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') return onNotAuthenticated?.();

    if (ability.cannot(action, subject, field)) return onNotAllowed?.();
  }, [status, ability, action, field, onNotAllowed, onNotAuthenticated, subject]);

  if (status === 'loading') return <SplashPage />;

  if (status === 'unauthenticated') return <NotAuthenticatedPage />;

  if (ability.cannot(action, subject, field)) return <NotAllowedPage />;

  return <AbilityProvider ability={ability}>{children}</AbilityProvider>;
};
