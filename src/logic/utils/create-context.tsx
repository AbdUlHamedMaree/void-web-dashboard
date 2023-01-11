import { createContext as reactCreateContext, useContext, useMemo } from 'react';

type StateSelector<T, U> = (state: T) => U;

export type CreateContextProviderProps<TState> = React.PropsWithChildren<{
  value: TState;
}>;

const createContext = <TState,>() => {
  const BaseContext = reactCreateContext<TState | undefined>(undefined);
  const Provider = ({ value, children }: CreateContextProviderProps<TState>) => {
    return <BaseContext.Provider value={value}>{children}</BaseContext.Provider>;
  };

  const useProps = <TStateSlice,>(
    selector: StateSelector<TState, TStateSlice> = v => v as unknown as TStateSlice
  ) => {
    const context = useContext(BaseContext);
    if (typeof context === 'undefined')
      throw new Error('You must use `useProps` in children of its `Provider`');
    const memoizedValue = useMemo(() => selector(context), [selector, context]);
    return memoizedValue;
  };

  return [Provider, useProps] as const;
};

export { createContext };
