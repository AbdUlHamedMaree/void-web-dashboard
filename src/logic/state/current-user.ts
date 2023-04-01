import type { UserModel } from '$logic/models/user';
import { createStore } from '$modules/zustand';
import { useCallback } from 'react';

export const useCurrentUserStore = createStore({
  name: 'current-user',
  devtools: true,
  persist: true,
})({ user: null as UserModel | null }, set => ({
  setUser: (user: UserModel | null) =>
    set(s => {
      s.user = user;
    }),
}));

export const useCurrentUser = () => useCurrentUserStore(useCallback(s => s.user, []));
