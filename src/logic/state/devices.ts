import type { DeviceModel } from '$logic/models/device';
import { createStore } from '$modules/zustand';
import { useCallback, useMemo } from 'react';

export const useDevicesStore = createStore({
  persist: true,
  devtools: true,
  name: 'void-mocked-devices',
})(
  {
    devices: [] as DeviceModel[],
  },
  set => ({
    setDevices: (devices: DeviceModel[]) =>
      set(s => {
        s.devices = devices;
      }),
    addDevice: (device: DeviceModel) =>
      set(s => {
        s.devices = [...s.devices, device];
      }),
    editDevice: (id?: string | number, device?: Partial<DeviceModel>) =>
      set(s => {
        const index = s.devices.findIndex(device => device.id === id);
        if (index === -1) return;

        s.devices[index] = {
          ...s.devices[index],
          ...device,
        };
      }),
    deleteDevice: (id?: string | number) =>
      set(s => {
        s.devices = s.devices.filter(device => device.id !== id);
      }),
  })
);

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
