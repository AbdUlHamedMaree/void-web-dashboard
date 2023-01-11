import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import create, { StateCreator } from 'zustand';

export const createStore = <TState extends object, TActions extends object>(
  initialState: TState,
  actions: StateCreator<
    TState,
    [['zustand/immer', never], ['zustand/subscribeWithSelector', never]],
    [],
    TActions
  >
) =>
  create(
    immer<TState & TActions, [], [['zustand/subscribeWithSelector', never]]>(
      subscribeWithSelector<TState & TActions, [['zustand/immer', never]], []>(
        (...args: [any, any, any, any]) => ({
          ...actions(...args),
          ...initialState,
        })
      )
    )
  );
