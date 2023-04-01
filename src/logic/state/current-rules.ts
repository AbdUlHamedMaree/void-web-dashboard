import type { AppCaslRule } from '$logic/libs/casl';
import { createAppAbility } from '$logic/libs/casl';
import { initialAbility } from '$logic/libs/casl';
import { createStore } from '$modules/zustand';
import { useCallback, useMemo } from 'react';

export const useCurrentRulesStore = createStore({
  persist: true,
  devtools: true,
  name: 'void-mocked-rules',
})(
  {
    rules: initialAbility.rules,
  },
  set => ({
    setRules: (rules: AppCaslRule[]) =>
      set(s => {
        s.rules = rules;
      }),
  })
);

export const useCurrentRules = () => useCurrentRulesStore(useCallback(s => s.rules, []));

export const useCurrentAbility = () => {
  const rules = useCurrentRules();
  return useMemo(() => createAppAbility(rules), [rules]);
};
