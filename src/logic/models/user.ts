import * as m from '@mrii/mock';
import type { RoleModel } from './role';

export type UserModel = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: Omit<RoleModel, 'rules'>;
};

export const mockUser = (user?: Partial<UserModel>): UserModel => ({
  id: m.unique(5),
  name: m.fullname(),
  email: `${m.username()}@gmail.com`,
  role: {
    id: m.unique(3),
    name: 'Employee',
  },
  phoneNumber: m.phone() + '',

  ...user,
});
