import type { PureVehicleModel } from '$logic/models/vehicle';
import { pick } from '$modules/object-fns';
import {
  cycledVehicleTrip01,
  cycledVehicleTrip02,
  cycledVehicleTrip03,
} from './cycle-vehicle-trips';

export const mockedVehicles: PureVehicleModel[] = [
  {
    _mock: {
      currentIndex: 0,
      tripId: 0,
    },
    id: '1',
    brand: 'Audi',
    model: 'R8',
    manufacturingDate: '2023',
    name: 'Audi R8 2023',
    plateNumber: 'A1',
    vin: '111111',
    location: pick(cycledVehicleTrip01[0])('lat', 'lng'),
    rotation: cycledVehicleTrip01[0].rotation,
    status: cycledVehicleTrip01[0].status,
    meta: {
      batteryChargeState: 1,
      batteryCurrent: 12000,
      batteryLevel: 100,
      batteryTemperature: 90,
      batteryVoltage: 30,

      engineLoad: 70,
      engineTemperature: 140,
      engineRPM: 6000,
      engineOilLevel: 0.8,
      engineOilTemperature: 90,
      engineCoverOpen: 0,
      engineWorkTime: 170,

      frontLeftDoorOpen: 0,
      frontRightDoorOpen: 0,

      fuelLevel: 70,
      fuelRateGps: 25,
      fuelUsedGps: 12000,

      loadWeight: 900,
      rearLeftDoorOpen: 0,
      rearRightDoorOpen: 0,
      roofOpen: 1,

      speed: 90,
      totalOdometer: 12000,
      tripOdometer: 90,

      trunkDoorOpen: 0,
    },
  },
  {
    _mock: {
      currentIndex: 0,
      tripId: 1,
    },
    id: '2',
    brand: 'BMW',
    model: 'XM',
    manufacturingDate: '2023',
    name: 'BMW XM 2023',
    plateNumber: 'A2',
    vin: '222222',
    location: pick(cycledVehicleTrip02[0])('lat', 'lng'),
    rotation: cycledVehicleTrip02[0].rotation,
    status: cycledVehicleTrip02[0].status,
    meta: {
      batteryChargeState: 1,
      batteryCurrent: 11000,
      batteryLevel: 100,
      batteryTemperature: 70,
      batteryVoltage: 40,

      engineLoad: 80,
      engineTemperature: 120,
      engineRPM: 7000,
      engineOilLevel: 0.9,
      engineOilTemperature: 90,
      engineCoverOpen: 0,
      engineWorkTime: 170,

      frontLeftDoorOpen: 0,
      frontRightDoorOpen: 0,

      fuelLevel: 90,
      fuelRateGps: 30,
      fuelUsedGps: 18000,

      loadWeight: 1300,
      rearLeftDoorOpen: 0,
      rearRightDoorOpen: 0,
      roofOpen: 1,

      speed: 80,
      totalOdometer: 12000,
      tripOdometer: 30,

      trunkDoorOpen: 0,
    },
  },
  {
    _mock: {
      currentIndex: 0,
      tripId: 2,
    },
    id: '3',
    brand: 'Mercedes',
    model: 'Maybach S Class',
    manufacturingDate: '2023',
    name: 'Mercedes-Benz Maybach S Class 2023',
    plateNumber: 'A3',
    vin: '333333',
    location: pick(cycledVehicleTrip03[0])('lat', 'lng'),
    rotation: cycledVehicleTrip03[0].rotation,
    status: cycledVehicleTrip03[0].status,
    meta: {
      batteryChargeState: 1,
      batteryCurrent: 10000,
      batteryLevel: 100,
      batteryTemperature: 100,
      batteryVoltage: 48,

      engineLoad: 60,
      engineTemperature: 100,
      engineRPM: 8000,
      engineOilLevel: 0.7,
      engineOilTemperature: 60,
      engineCoverOpen: 0,
      engineWorkTime: 88,

      frontLeftDoorOpen: 0,
      frontRightDoorOpen: 0,

      fuelLevel: 60,
      fuelRateGps: 40,
      fuelUsedGps: 11000,

      loadWeight: 800,
      rearLeftDoorOpen: 0,
      rearRightDoorOpen: 0,
      roofOpen: 0,

      speed: 95,
      totalOdometer: 5000,
      tripOdometer: 50,

      trunkDoorOpen: 0,
    },
  },
  {
    id: '4',
    brand: 'Honda',
    model: 'Civic',
    manufacturingDate: '2023',
    name: 'Honda Civic 2023',
    plateNumber: 'A4',
    vin: '444444',
    location: {
      lat: 24.939171222045875,
      lng: 55.048159282417295,
    },
    rotation: 160,
    status: 'stopped',
    meta: {
      batteryChargeState: 0,
      batteryCurrent: 130,
      batteryLevel: 90,
      batteryTemperature: 35,
      batteryVoltage: 12,

      engineLoad: 0,
      engineTemperature: 35,
      engineRPM: 0,
      engineOilLevel: 0.9,
      engineOilTemperature: 30,
      engineCoverOpen: 0,
      engineWorkTime: 0,

      frontLeftDoorOpen: 0,
      frontRightDoorOpen: 0,

      fuelLevel: 80,
      fuelRateGps: 15,
      fuelUsedGps: 1000,

      loadWeight: 700,
      rearLeftDoorOpen: 0,
      rearRightDoorOpen: 0,
      roofOpen: 0,

      speed: 0,
      totalOdometer: 2000,
      tripOdometer: 0,

      trunkDoorOpen: 0,
    },
  },
];
