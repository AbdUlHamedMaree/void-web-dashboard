import type { RoleModel } from '$logic/models/role';
import { createEntityStore } from '$logic/utils/create-entity-store';
import { useCallback, useMemo } from 'react';

export const useRolesStore = createEntityStore('role')<RoleModel>({
  persist: true,
  devtools: true,
  name: 'void-mocked-roles',
});

export const useRoles = () => useRolesStore(useCallback(s => s.roles, []));
export const useRole = (id?: unknown) =>
  useRolesStore(useCallback(s => s.roles.find(role => role.id === id), [id]));

export const useGetRole = () => {
  const roles = useRoles();
  return useCallback(
    (id?: string | number) => roles.find(role => role.id === id),
    [roles]
  );
};

export const useGetPureRole = () => {
  const getRole = useGetRole();
  return useCallback(
    (id?: string | number) => {
      const role = getRole(id);

      if (!role) return;

      return {
        ...role,
        vehicle: undefined,
        device: undefined,
      };
    },
    [getRole]
  );
};

export const useRolesOptions = () => {
  const roles = useRoles();
  return useMemo(
    () =>
      roles.reduce((acc, d) => {
        acc[d.id] = d.name;
        return acc;
      }, {} as Record<string, string>),
    [roles]
  );
};
