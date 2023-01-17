import * as m from '@scandinavia/mock';

export type UserModel = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  role: AppRoleUnion;
};

export enum AppRoleEnum {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  DRIVER = 'DRIVER',
}

export type AppRoleUnion = keyof typeof AppRoleEnum;

export const AppRoleToReadable: Record<AppRoleUnion, string> = {
  ADMIN: 'Admin',
  DRIVER: 'Driver',
  MANAGER: 'Manager',
};

export const mockUser = (user?: Partial<UserModel>): UserModel => ({
  id: m.unique(3),
  name: m.fullname(),
  email: `${m.username()}@gmail.com`,
  role: m.pick(...Object.values(AppRoleEnum)),
  phoneNumber: m.phone() + '',
  ...user,
});
