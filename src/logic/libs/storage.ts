import type { DeviceModel } from '$logic/models/device';
import type { PureUserModel, UserModel } from '$logic/models/user';
import type { VehicleModel } from '$logic/models/vehicle';
import { dataStorage } from '$modules/data-storage';

export const storage = {
  user: dataStorage<PureUserModel>('void-user'),
  auth: dataStorage<boolean>('void-auth'),
  language: dataStorage<string>('void-language'),

  drivers: dataStorage<UserModel[]>('void-mocked-drivers'),
  vehicles: dataStorage<VehicleModel[]>('void-mocked-vehicles'),
  devices: dataStorage<DeviceModel[]>('void-mocked-devices'),
};
