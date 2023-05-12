import { AppAbilityBuilder } from '$logic/libs/casl';
import type { RoleModel } from '$logic/models/role';

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

export const mockedRoles: RoleModel[] = [
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
  'super.admin@void.com': mockedRoles[0],
  'admin@void.com': mockedRoles[1],
  'manager@void.com': mockedRoles[2],
};

export const appMockEmails = Object.keys(emailToRole);
