import { isDefined } from '$modules/checks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UsePersistedStateOptions<T = any> = {
  /**
   * function to set the data in the storage.
   */
  setItem: (name: string, value: T) => void;

  /**
   * function to get the data from the storage.
   */
  getItem: (name: string) => T | undefined;

  /**
   * function to remove the data from the storage.
   */
  removeItem: (name: string) => void;
};

/**
 * its like `useState` but with persistence over storage.
 * @param name unique name to use in the storage.
 * @param defaultValue initial value.
 * @param options options for the hook.
 * @returns like `useState`.
 */
export const usePersistedState = <T>(
  name: string,
  options: UsePersistedStateOptions<T>,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>, () => void] => {
  const { setItem, getItem, removeItem: optionsRemoveItem } = options;
  const nameRef = useRef(name);
  const defaultValueRef = useRef(defaultValue);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const defaultValueM = useMemo(() => getItem(name) ?? defaultValue, []);
  const [value, setValue] = useState<T>(defaultValueM);

  const removeItem = useCallback(
    () => optionsRemoveItem(nameRef.current),
    [optionsRemoveItem]
  );

  useEffect(() => {
    const storedValue = getItem(nameRef.current);
    if (isDefined(storedValue)) setValue(storedValue);
    else setItem(nameRef.current, defaultValueRef.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setItem(nameRef.current, value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return [value, setValue, removeItem];
};
