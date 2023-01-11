export const omit =
  <T extends Record<string | number, unknown>>(o: T) =>
  <K extends (keyof T)[]>(...keys: K): Omit<T, K[number]> => {
    const c = { ...o };
    return keys.reduce((a, e) => {
      delete a[e];
      return a;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, c as any);
  };
