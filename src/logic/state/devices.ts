import type { DeviceModel } from '$logic/models/device';
import { createEntityStore } from '$logic/utils/create-entity-store';
import { useCallback, useMemo } from 'react';

export const useDevicesStore = createEntityStore('device')<DeviceModel>({
  persist: true,
  devtools: true,
  name: 'void-mocked-devices',
});

export const useDevices = () => useDevicesStore(useCallback(s => s.devices, []));
export const useDevice = (id?: unknown) =>
  useDevicesStore(useCallback(s => s.devices.find(device => device.id === id), [id]));

export const useGetDevice = () => {
  const devices = useDevices();
  return useCallback(
    (id?: string | number) => devices.find(device => device.id === id),
    [devices]
  );
};

export const useGetPureDevice = () => {
  const getDevice = useGetDevice();
  return useCallback(
    (id?: string | number) => {
      const device = getDevice(id);

      if (!device) return;

      return {
        ...device,
        driver: undefined,
        vehicle: undefined,
      };
    },
    [getDevice]
  );
};

export const useDevicesOptions = () => {
  const devices = useDevices();
  return useMemo(
    () =>
      devices.reduce((acc, d) => {
        acc[d.id] = d.name;
        return acc;
      }, {} as Record<string, string>),
    [devices]
  );
};
