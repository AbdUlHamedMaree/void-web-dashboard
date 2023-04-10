import type { DeviceModel } from '$logic/models/device';
import type { DriverModel } from '$logic/models/driver';
import type { RoleModel } from '$logic/models/role';
import type { UserModel } from '$logic/models/user';
import type { VehicleModel } from '$logic/models/vehicle';
import type {
  CreateAbility,
  ExtractSubjectType,
  MongoAbility,
  MongoQuery,
  SubjectRawRule,
} from '@casl/ability';
import { AbilityBuilder } from '@casl/ability';
import { createMongoAbility } from '@casl/ability';
import type { AnyObject } from '@casl/ability/dist/types/types';
import { createContextualCan } from '@casl/react';
import React, { createContext } from 'react';

export type AppCaslActions = 'create' | 'read' | 'update' | 'delete' | 'manage';

export type AppCaslSubjects =
  | 'Vehicle'
  | VehicleModel
  | 'Driver'
  | DriverModel
  | 'User'
  | UserModel
  | 'Device'
  | DeviceModel
  | 'Role'
  | RoleModel
  | 'LivePreview'
  | 'all';

export type AppCaslPossibleAbilities = [AppCaslActions, AppCaslSubjects];

export type AppCaslAbility = MongoAbility<AppCaslPossibleAbilities>;

export const createAppAbility = createMongoAbility as CreateAbility<AppCaslAbility>;

export class AppAbilityBuilder extends AbilityBuilder<AppCaslAbility> {
  constructor() {
    super(createAppAbility);
  }
}

export type AppCaslRule = SubjectRawRule<
  AppCaslActions,
  ExtractSubjectType<AppCaslSubjects>,
  MongoQuery<AnyObject>
>;

export const initialAbility = new AppAbilityBuilder().build();

export const AbilityContext = createContext<AppCaslAbility>(initialAbility);

export const AppCan = createContextualCan(AbilityContext.Consumer);

export type AbilityProviderProps = {
  ability?: AppCaslAbility;
};

export const AbilityProvider: React.FC<React.PropsWithChildren<AbilityProviderProps>> = ({
  ability = initialAbility,
  children,
}) => <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
