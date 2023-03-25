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

  meta: {
    speed?: number; // (0 - 350) km/h

    frontLeftDoorOpen?: 0 | 1; // (yes - no)
    frontRightDoorOpen?: 0 | 1; // (yes - no)
    rearLeftDoorOpen?: 0 | 1; // (yes - no)
    rearRightDoorOpen?: 0 | 1; // (yes - no)
    trunkDoorOpen?: 0 | 1; // (yes - no)
    engineCoverOpen?: 0 | 1; // (yes - no)
    roofOpen?: 0 | 1; // (yes - no)

    loadWeight?: number; // (0 - 16772215) kg

    engineLoad?: number; // (0 - 100) %
    engineRPM?: number; // (0 - 16384) rpm
    engineTemperature?: number; // (-600 - 1270) C
    engineOilTemperature?: number; // (0 - 215) C
    engineOilLevel?: number; // (0 - 1) floating point
    engineWorkTime?: number; // (0 - 1677215) min

    batteryVoltage?: number; // (0 - 65535) V
    batteryCurrent?: number; // (0 - 65535) A
    batteryLevel?: number; // (0 - 100) %
    batteryChargeState?: 0 | 1; // (yes - no)
    batteryTemperature?: number; // (-32768	- 32767) C

    totalOdometer?: number; // (0 - 2147483647) m
    tripOdometer?: number; // (0 - 2147483647) m

    fuelLevel?: number; // (0 - 100) %
    fuelUsedGps?: number; // (0 - 4294967295) l
    fuelRateGps?: number; // (0 - 32767) 	l/100km
  };
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
    meta: {
      speed: m.number(0, 350),

      frontLeftDoorOpen: m.pick(0, 1),
      frontRightDoorOpen: m.pick(0, 1),
      rearLeftDoorOpen: m.pick(0, 1),
      rearRightDoorOpen: m.pick(0, 1),
      trunkDoorOpen: m.pick(0, 1),
      engineCoverOpen: m.pick(0, 1),
      roofOpen: m.pick(0, 1),

      loadWeight: m.number(0, 16772215),

      engineLoad: m.number(0, 100),
      engineRPM: m.number(0, 16384),
      engineTemperature: m.number(-600, 1270),
      engineOilTemperature: m.number(0, 215),
      engineOilLevel: m.number(0, 1, true),
      engineWorkTime: m.number(0, 1677215),

      batteryVoltage: m.number(0, 65535),
      batteryCurrent: m.number(0, 65535),
      batteryLevel: m.number(0, 100),
      batteryChargeState: m.pick(0, 1),
      batteryTemperature: m.number(-32768, 32767),

      totalOdometer: m.number(0, 2147483647),
      tripOdometer: m.number(0, 2147483647),

      fuelLevel: m.number(0, 100),
      fuelUsedGps: m.number(0, 4294967295),
      fuelRateGps: m.number(0, 32767),
      ...vehicle?.meta,
    },
  };
};

export const mockVehicle = (vehicle?: Partial<VehicleModel>): VehicleModel => ({
  device: mockPureDevice(),
  driver: mockPureDriver(),
  ...mockPureVehicle(),
  ...vehicle,
});
