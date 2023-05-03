import type { PureDeviceModel } from './device';
import type { PureDriverModel } from './driver';
import type { PureVehicleModel } from './vehicle';

export enum GeofenceEventTypeEnum {
  'going-in' = 'going-in',
  'going-out' = 'going-out',
}
export type GeofenceEventTypeUnion = keyof typeof GeofenceEventTypeEnum;

export type PureGeofenceEventModel = {
  id: string;
  capturedAt: string;
  type: GeofenceEventTypeUnion;
};

export type GeofenceEventModel = PureGeofenceEventModel & {
  geofence: any;
  vehicle: PureVehicleModel;
  driver: PureDriverModel;
  device: PureDeviceModel;
};
