import type { DeviceModel } from '$logic/models/device';
import { mockPureDevice } from '$logic/models/device';
import type { DriverModel } from '$logic/models/driver';
import { mockDriver } from '$logic/models/driver';
import { mockUser } from '$logic/models/user';
import type { VehicleModel } from '$logic/models/vehicle';
import { mockPureVehicle } from '$logic/models/vehicle';
import { useDevicesStore } from '$logic/state/devices';
import { useDriversStore } from '$logic/state/drivers';
import { useUsersStore } from '$logic/state/users';
import { useVehiclesStore } from '$logic/state/vehicles';
import { carTrip01 } from '$logic/_mock/car-trips';
import { initialRoles, useRolesStore } from '$logic/state/roles';
import * as m from '@mrii/mock';

export const mockData = () => {
  const count = m.number(3, 5);
  const drivers: DriverModel[] = [];
  const vehicles: VehicleModel[] = [];
  const devices: DeviceModel[] = [];

  for (let index = 0; index < count; index++) {
    const pureDriver = mockDriver();
    const pureVehicle = mockPureVehicle(
      index === 0
        ? {
            _mock: {
              tripId: 1,
              currentIndex: 0,
            },
            location: carTrip01[0].location,
            rotation: carTrip01[0].rotation,
            status: 'moving',
          }
        : {
            status: 'stopped',
          }
    );
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
  }
  useDriversStore.setState({ drivers });
  useVehiclesStore.setState({ vehicles });
  useDevicesStore.setState({ devices });

  useRolesStore.setState({ roles: initialRoles });

  useUsersStore.setState({
    users: m.array(
      () =>
        mockUser({
          role: initialRoles[m.pick(1, 2)],
        }),
      m.number(6, 10)
    ),
  });
};
