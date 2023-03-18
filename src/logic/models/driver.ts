import * as m from '@mrii/mock';
import type { PureDeviceModel } from './device';
import { mockPureDevice } from './device';
import type { PureVehicleModel } from './vehicle';
import { mockPureVehicle } from './vehicle';

export type PureDriverModel = {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
};

export type DriverModel = PureDriverModel & {
  vehicle?: PureVehicleModel;
  device?: PureDeviceModel;
};

export const mockPureDriver = (user?: Partial<PureDriverModel>): PureDriverModel => ({
  id: m.unique(5),
  name: m.fullname(),
  email: `${m.username()}@gmail.com`,
  phoneNumber: m.phone() + '',

  ...user,
});

export const mockDriver = (user?: Partial<DriverModel>): DriverModel => ({
  vehicle: mockPureVehicle(),
  device: mockPureDevice(),
  ...mockPureDriver(),
  ...user,
});
