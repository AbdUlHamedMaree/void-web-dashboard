import type { AppCaslRule } from '$logic/libs/casl';

export type RoleModel = {
  id: string;
  name: string;
  rules: AppCaslRule[];
};
