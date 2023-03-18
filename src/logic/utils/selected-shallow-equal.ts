import { shallowEqual } from './shallow-equal';

export const selectedShallowEqual = <T extends object>(
  a: T,
  b: T,
  deepKeys: (keyof T)[]
) => {
  const notEq = deepKeys.some(key => !shallowEqual(a[key] as object, b[key] as object));
  if (notEq) return false;
  return shallowEqual(a, b, deepKeys);
};
