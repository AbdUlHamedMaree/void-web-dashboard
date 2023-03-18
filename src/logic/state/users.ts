import type { UserModel } from '$logic/models/user';
import { createStore } from '$modules/zustand';
import { useCallback, useMemo } from 'react';

export const useUsersStore = createStore({
  persist: true,
  devtools: true,
  name: 'void-mocked-users',
})(
  {
    users: [] as UserModel[],
  },
  set => ({
    setUsers: (users: UserModel[]) =>
      set(s => {
        s.users = users;
      }),
    addUser: (user: UserModel) =>
      set(s => {
        s.users = [...s.users, user];
      }),
    editUser: (id?: string | number, user?: Partial<UserModel>) =>
      set(s => {
        const index = s.users.findIndex(user => user.id === id);
        if (index === -1) return;

        s.users[index] = {
          ...s.users[index],
          ...user,
        };
      }),
    deleteUser: (id?: string | number) =>
      set(s => {
        s.users = s.users.filter(user => user.id !== id);
      }),
  })
);

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
