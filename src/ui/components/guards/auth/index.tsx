import type { AppCaslActions, AppCaslSubjects } from '$logic/libs/casl';
import { AbilityProvider } from '$logic/libs/casl';
import { useCurrentAbility } from '$logic/state/current-rules';
import React, { useLayoutEffect } from 'react';

export type AuthGuardProps = {
  action: AppCaslActions;
  subject: AppCaslSubjects;
  field?: string;

  onUnAuth?: () => void;
};

export const AuthGuard: React.FC<React.PropsWithChildren<AuthGuardProps>> = ({
  action,
  subject,
  field,
  children,

  onUnAuth,
}) => {
  const ability = useCurrentAbility();

  useLayoutEffect(() => {
    if (ability.cannot(action, subject, field)) onUnAuth?.();
  }, [ability, action, field, onUnAuth, subject]);

  // TODO: Not Allowed Page
  if (ability.cannot(action, subject, field)) return <>not allowed</>;

  return <AbilityProvider ability={ability}>{children}</AbilityProvider>;
};
