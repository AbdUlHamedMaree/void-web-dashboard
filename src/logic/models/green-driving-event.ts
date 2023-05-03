import type { PureDeviceModel } from './device';
import type { PureDriverModel } from './driver';
import type { PureVehicleModel } from './vehicle';

export enum GreenDrivingEventTypeEnum {
  'harsh-acceleration' = 'harsh-acceleration',
  'harsh-breaking' = 'harsh-breaking',
}
export type GreenDrivingEventTypeUnion = keyof typeof GreenDrivingEventTypeEnum;

export type PureGreenDrivingEventModel = {
  id: string;
  capturedAt: string;
  type: GreenDrivingEventTypeUnion;
};

export type GreenDrivingEventModel = PureGreenDrivingEventModel & {
  vehicle: PureVehicleModel;
  driver: PureDriverModel;
  device: PureDeviceModel;
};
