import { AppAbilityBuilder } from '$logic/libs/casl';
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

const superAdmin = new AppAbilityBuilder();
superAdmin.can('manage', 'all');

const admin = new AppAbilityBuilder();
admin.can('manage', 'all');
admin.cannot('manage', 'Role');
admin.cannot('manage', 'User', { 'role.id': { $eq: 'super_admin' } });

const manager = new AppAbilityBuilder();
manager.can('manage', 'all');
manager.cannot('manage', 'Role');
manager.cannot('manage', 'User');

export const initialRoles: RoleModel[] = [
  {
    id: 'super_admin',
    name: 'Super Admin',
    rules: superAdmin.rules,
  },
  {
    id: 'admin',
    name: 'Admin',
    rules: admin.rules,
  },
  {
    id: 'manager',
    name: 'Manager',
    rules: manager.rules,
  },
];

export const emailToRole = {
  'super.admin@void.com': initialRoles[0],
  'admin@void.com': initialRoles[1],
  'manager@void.com': initialRoles[2],
};

export const appMockEmails = [
  'super.admin@void.com',
  'admin@void.com',
  'manager@void.com',
];
