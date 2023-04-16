import * as m from '@mrii/mock';
import type { PureDriverModel } from './driver';
import { mockPureDriver } from './driver';
import type { PureVehicleModel, VehicleMetaModel, VehicleStatusUnion } from './vehicle';
import { VehicleStatusEnum, mockVehicleMeta } from './vehicle';
import { mockPureVehicle } from './vehicle';
import type { LocationModel } from './location';
import { mockLocation } from './location';
import type { PureDeviceModel } from './device';
import { mockPureDevice } from './device';

export type TripPointModel = {
  id: string;
  location: LocationModel;
  rotation: number;
  status: VehicleStatusUnion;
  meta: VehicleMetaModel;
};

export type TripModel = {
  id: string;
  points: TripPointModel[];
  vehicle: PureVehicleModel;
  driver: PureDriverModel;
  device: PureDeviceModel;
};

export const mockTripPoint = (point?: Partial<TripPointModel>): TripPointModel => ({
  id: m.unique(5),
  location: mockLocation(),
  meta: mockVehicleMeta(),
  rotation: m.number(0, 360),
  status: m.pick(...(Object.keys(VehicleStatusEnum) as VehicleStatusUnion[])),
  ...point,
});

export const mockTrip = (device?: Partial<TripModel>): TripModel => ({
  id: m.unique(5),
  points: m.array(mockTripPoint, m.number(10, 20)),
  vehicle: mockPureVehicle(),
  driver: mockPureDriver(),
  device: mockPureDevice(),
  ...device,
});
