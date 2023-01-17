/* eslint-disable react-hooks/exhaustive-deps */
import { isStringFull } from '$modules/checks';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import type { UsePersistedStateOptions } from '../core';
import { usePersistedState } from '../core';

export const useParamsState = <T>(name: string, defaultValue: T) => {
  const { query, replace } = useRouter();

  const setItem = useCallback<UsePersistedStateOptions['setItem']>(
    (name, value) => {
      try {
        replace({ query: { ...query, [name]: JSON.stringify(value) } }, undefined, {
          shallow: true,
        });
      } catch (err) {
        console.error(err);
      }
    },
    [query]
  );

  const getItem = useCallback<UsePersistedStateOptions['getItem']>((name: string) => {
    try {
      const params = new URLSearchParams(location.search);
      const storedValue = params.get(name);
      if (isStringFull(storedValue)) return JSON.parse(storedValue);
      return undefined;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }, []);

  const removeItem = useCallback<UsePersistedStateOptions['removeItem']>(
    (name: string) =>
      replace({ query: { ...query, [name]: null } }, undefined, {
        shallow: true,
      }),
    [query]
  );

  const options: Required<UsePersistedStateOptions> = useMemo(
    () => ({
      setItem,
      getItem,
      removeItem,
    }),
    [getItem, removeItem, setItem]
  );

  return usePersistedState<T>(name, options, defaultValue);
};
