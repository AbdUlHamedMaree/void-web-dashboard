import type { DeviceModel } from '$logic/models/device';
import { mockPureDevice } from '$logic/models/device';
import type { DriverModel } from '$logic/models/driver';
import { mockDriver } from '$logic/models/driver';
import { mockUser } from '$logic/models/user';
import type { VehicleModel } from '$logic/models/vehicle';
import { mockVehicleMeta } from '$logic/models/vehicle';
import { useDevicesStore } from '$logic/state/devices';
import { useDriversStore } from '$logic/state/drivers';
import { useUsersStore } from '$logic/state/users';
import { useVehiclesStore } from '$logic/state/vehicles';
import { initialRoles, useRolesStore } from '$logic/state/roles';
import * as m from '@mrii/mock';
import { vehicleTripIdToVehicleTrip } from '$logic/_mock/vehicles-trips';
import type { TripModel } from '$logic/models/trip';
import { mockTrip, mockTripPoint } from '$logic/models/trip';
import { useTripsStore } from '$logic/state/trips';
import { mockedVehicles } from '$logic/_mock/vehicles';

export const mockData = () => {
  const count = 4;

  const drivers: DriverModel[] = [];
  const vehicles: VehicleModel[] = [];
  const devices: DeviceModel[] = [];

  const trips: TripModel[] = [];

  for (let index = 0; index < count; index++) {
    const pureVehicle = mockedVehicles[index];

    const pureDriver = mockDriver();
    const pureDevice = mockPureDevice();

    const driver: DriverModel = {
      ...pureDriver,
      vehicle: pureVehicle,
      device: pureDevice,
    };
    drivers.push(driver);

    const vehicle: VehicleModel = {
      ...pureVehicle,
      driver: pureDriver,
      device: pureDevice,
    };
    vehicles.push(vehicle);

    const device: DeviceModel = {
      ...pureDevice,
      driver: pureDriver,
      vehicle: pureVehicle,
    };
    devices.push(device);

    const vehicleTrip = vehicleTripIdToVehicleTrip[index as 0];
    if (!vehicleTrip) continue;

    const trip = mockTrip({
      vehicle: pureVehicle,
      driver: pureDriver,
      device: pureDevice,
      points: vehicleTrip.map(point => {
        const moving = point.status === 'moving';
        return mockTripPoint({
          location: { lat: point.lat, lng: point.lng },
          rotation: point.rotation,
          status: point.status,
          meta: mockVehicleMeta({
            speed: moving ? m.number(10, 250) : 0,
            engineLoad: moving ? m.number(10, 100) : 0,
            engineRPM: moving ? m.number(1000, 16384) : 0,
          }),
        });
      }),
    });

    trips.push(trip);
  }
  useDriversStore.setState({ drivers });
  useVehiclesStore.setState({ vehicles });
  useDevicesStore.setState({ devices });

  useTripsStore.setState({ trips });

  useRolesStore.setState({ roles: initialRoles });

  useUsersStore.setState({
    users: m.array(
      () =>
        mockUser({
          role: initialRoles[m.pick(1, 2)],
        }),
      m.number(3, 6)
    ),
  });
};
