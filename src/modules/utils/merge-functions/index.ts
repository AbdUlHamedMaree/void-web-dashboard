export const mergeFunctions =
  <F extends ((...args: any[]) => any) | undefined>(...funcs: F[]) =>
  (
    ...args: F extends Function ? Parameters<F> : never
  ): F extends Function ? ReturnType<F> : never =>
    funcs.map(func => func?.(...args)).at(-1);
