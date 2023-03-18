import * as m from '@mrii/mock';
import { carsBrands } from './cars-brands';
import type { PureDeviceModel } from './device';
import { mockPureDevice } from './device';
import type { PureDriverModel } from './driver';
import { mockPureDriver } from './driver';

export enum VehicleStatusEnum {
  idle = 'Idle',
  moving = 'Moving',
  stopped = 'Stopped',
}

export type VehicleStatusUnion = keyof typeof VehicleStatusEnum;

export const VehicleStatusToThemeColor: Record<VehicleStatusUnion, string> = {
  idle: 'info.main',
  moving: 'success.main',
  stopped: 'error.main',
};

export type PureVehicleModel = {
  _mock?: {
    tripId: number;
    currentIndex: number;
  };
  id: string;
  name: string;
  plateNumber: string;
  vin: string;
  model: string;
  brand: string;
  manufacturingDate: string;
  status?: VehicleStatusUnion;
  location?: [number, number];
  rotation?: number;
};

export type VehicleModel = PureVehicleModel & {
  device?: PureDeviceModel;
  driver?: PureDriverModel;
};

export const mockPureVehicle = (
  vehicle?: Partial<PureVehicleModel>
): PureVehicleModel => {
  const brand = m.pick(...carsBrands);
  const manufacturingDate = m.date();
  const manufacturingYear = manufacturingDate.getFullYear();
  const model = m.word();
  const name = `${brand} ${model} ${manufacturingYear}`;

  return {
    id: m.unique(5),
    name,
    plateNumber: m.unique(6),
    vin: m.phone(11) + '',
    model,
    brand,
    manufacturingDate: manufacturingDate.toISOString(),
    status: m.pick(...(Object.keys(VehicleStatusEnum) as VehicleStatusUnion[])),
    location: [
      m.number(25.094776, 24.514766, true),
      m.number(55.468773, 55.635536, true),
    ],
    rotation: m.number(0, 360),
    ...vehicle,
  };
};

export const mockVehicle = (vehicle?: Partial<VehicleModel>): VehicleModel => ({
  device: mockPureDevice(),
  driver: mockPureDriver(),
  ...mockPureVehicle(),
  ...vehicle,
});
