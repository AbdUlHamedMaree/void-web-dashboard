import type { UserModel } from '$logic/models/user';
import { createEntityStore } from '$logic/utils/create-entity-store';
import { useCallback, useMemo } from 'react';

export const useUsersStore = createEntityStore('user')<UserModel>({
  persist: true,
  devtools: true,
  name: 'void-mocked-users',
});

export const useUsers = () => useUsersStore(useCallback(s => s.users, []));
export const useUser = (id?: unknown) =>
  useUsersStore(useCallback(s => s.users.find(user => user.id === id), [id]));

export const useGetUser = () => {
  const users = useUsers();
  return useCallback(
    (id?: string | number) => users.find(user => user.id === id),
    [users]
  );
};

export const useGetPureUser = () => {
  const getUser = useGetUser();
  return useCallback(
    (id?: string | number) => {
      const user = getUser(id);

      if (!user) return;

      return {
        ...user,
        vehicle: undefined,
        device: undefined,
      };
    },
    [getUser]
  );
};

export const useUsersOptions = () => {
  const users = useUsers();
  return useMemo(
    () =>
      users.reduce((acc, d) => {
        acc[d.id] = d.name;
        return acc;
      }, {} as Record<string, string>),
    [users]
  );
};
