import * as m from '@mrii/mock';

export enum AppRoleEnum {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

export type AppRoleUnion = keyof typeof AppRoleEnum;

export const AppRoleToReadable: Record<AppRoleUnion, string> = {
  ADMIN: 'Admin',
  MANAGER: 'Manager',
};

export type UserModel = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: AppRoleUnion;
};

export const mockUser = (user?: Partial<UserModel>): UserModel => ({
  id: m.unique(5),
  name: m.fullname(),
  email: `${m.username()}@gmail.com`,
  role: m.number(0, 100) > 90 ? 'ADMIN' : 'MANAGER',
  phoneNumber: m.phone() + '',

  ...user,
});
