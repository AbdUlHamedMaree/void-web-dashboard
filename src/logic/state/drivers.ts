import type { DriverModel } from '$logic/models/driver';
import { createEntityStore } from '$logic/utils/create-entity-store';
import { useCallback, useMemo } from 'react';

export const useDriversStore = createEntityStore('driver')<DriverModel>({
  persist: true,
  devtools: true,
  name: 'void-mocked-drivers',
});

export const useDrivers = () => useDriversStore(useCallback(s => s.drivers, []));
export const useDriver = (id?: unknown) =>
  useDriversStore(useCallback(s => s.drivers.find(driver => driver.id === id), [id]));

export const useGetDriver = () => {
  const drivers = useDrivers();
  return useCallback(
    (id?: string | number) => drivers.find(driver => driver.id === id),
    [drivers]
  );
};

export const useGetPureDriver = () => {
  const getDriver = useGetDriver();
  return useCallback(
    (id?: string | number) => {
      const driver = getDriver(id);

      if (!driver) return;

      return {
        ...driver,
        vehicle: undefined,
        device: undefined,
      };
    },
    [getDriver]
  );
};

export const useDriversOptions = () => {
  const drivers = useDrivers();
  return useMemo(
    () =>
      drivers.reduce((acc, d) => {
        acc[d.id] = d.name;
        return acc;
      }, {} as Record<string, string>),
    [drivers]
  );
};
