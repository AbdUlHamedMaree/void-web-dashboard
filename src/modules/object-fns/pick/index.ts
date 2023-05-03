export const pick =
  <T extends object>(o: T) =>
  <K extends (keyof T)[]>(...keys: K): Pick<T, K[number]> =>
    keys.reduce((a, e) => {
      a[e] = o[e];
      return a;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }, {} as any);
