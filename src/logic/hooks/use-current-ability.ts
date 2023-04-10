import { createAppAbility } from '$logic/libs/casl';
import { useMemo } from 'react';
import { useCurrentRules } from './use-current-rules';

export const useCurrentAbility = () => {
  const rules = useCurrentRules();
  return useMemo(() => createAppAbility(rules), [rules]);
};
