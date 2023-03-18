import * as m from '@mrii/mock';
import type { PureDriverModel } from './driver';
import { mockPureDriver } from './driver';
import type { PureVehicleModel } from './vehicle';
import { mockPureVehicle } from './vehicle';

export type PureDeviceModel = {
  id: string;
  imei: string;

  name: string;
  model: string;
};

export type DeviceModel = PureDeviceModel & {
  vehicle?: PureVehicleModel;
  driver?: PureDriverModel;
};

export const mockPureDevice = (device?: Partial<PureDeviceModel>): PureDeviceModel => {
  const model = `FM${m.pick('C', 'B')}1${m.number(0, 9)}0`;
  return {
    id: m.unique(5),
    imei: m.unique(6),
    name: model,
    model,
    ...device,
  };
};

export const mockDevice = (device?: Partial<DeviceModel>): DeviceModel => ({
  vehicle: mockPureVehicle(),
  driver: mockPureDriver(),
  ...mockPureDevice(),
  ...device,
});
