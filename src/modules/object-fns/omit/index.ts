export const omit =
  <T extends object>(o: T) =>
  <K extends (keyof T)[]>(...keys: K): Omit<T, K[number]> =>
    keys.reduce(
      (a, e) => {
        delete a[e];
        return a;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      { ...o } as any
    );
