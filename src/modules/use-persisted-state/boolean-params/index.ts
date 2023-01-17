/* eslint-disable react-hooks/exhaustive-deps */
import { isString } from '$modules/checks';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import type { UsePersistedStateOptions } from '../core';
import { usePersistedState } from '../core';

export const useBooleanParamsState = <T extends boolean>(
  name: string,
  defaultValue: T
) => {
  const { query, replace } = useRouter();

  const setItem = useCallback<UsePersistedStateOptions['setItem']>(
    (name, value) =>
      replace({ query: { ...query, [name]: value + '' } }, undefined, {
        shallow: true,
      }),
    [query]
  );

  const getItem = useCallback<UsePersistedStateOptions['getItem']>((name: string) => {
    try {
      const params = new URLSearchParams(location.search);
      const storedValue = params.get(name);
      if (isString(storedValue)) return storedValue.toLowerCase() === 'true';
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
