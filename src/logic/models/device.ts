import * as m from '@scandinavia/mock';

export type DeviceModel = {
  id: string;
  imei: string;

  name: string;
  model: string;
};

export const mockDevice = (device?: Partial<DeviceModel>): DeviceModel => ({
  id: m.unique(3),
  imei: m.unique(6),
  name: m.fullname(),
  model: `FM${m.pick('C', 'B')}1${m.number(0, 9)}0`,
  ...device,
});
