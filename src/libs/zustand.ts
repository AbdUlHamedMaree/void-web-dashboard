import { immer } from 'zustand/middleware/immer';
import { subscribeWithSelector } from 'zustand/middleware';
import type { StateCreator } from 'zustand';
import { createStore as create } from 'zustand';

export const createStore = <TState extends object, TActions extends object>(
  initialState: TState,
  actions: StateCreator<
    TState & TActions,
    [['zustand/immer', never], ['zustand/subscribeWithSelector', never]],
    [],
    TActions
  >
) =>
  create(
    immer<TState & TActions, [], [['zustand/subscribeWithSelector', never]]>(
      subscribeWithSelector<TState & TActions, [['zustand/immer', never]], []>(
        (set, get, api) => ({
          ...initialState,
          ...actions(set, get, api),
        })
      )
    )
  );
