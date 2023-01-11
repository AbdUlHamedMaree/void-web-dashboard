import { isStringFull } from '$modules/checks';
import { usePersistedState, UsePersistedStateOptions } from '../core';

const options: Required<UsePersistedStateOptions> = {
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, JSON.stringify(value));
    } catch {}
  },
  getItem: (name: string) => {
    try {
      const storedValue = localStorage.getItem(name);
      if (isStringFull(storedValue)) return JSON.parse(storedValue);
      return undefined;
    } catch {
      return undefined;
    }
  },
  removeItem: (name: string) => {
    try {
      localStorage.removeItem(name);
    } catch {}
  },
};

export const useLocalStorageState = <T>(name: string, defaultValue: T) =>
  usePersistedState<T>(name, options, defaultValue);
