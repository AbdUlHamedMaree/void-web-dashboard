import type { DriverModel } from '$logic/models/driver';
import { createStore } from '$modules/zustand';
import { useCallback, useMemo } from 'react';

export const useDriversStore = createStore({
  persist: true,
  devtools: true,
  name: 'void-mocked-drivers',
})(
  {
    drivers: [] as DriverModel[],
  },
  set => ({
    setDrivers: (drivers: DriverModel[]) =>
      set(s => {
        s.drivers = drivers;
      }),
    addDriver: (driver: DriverModel) =>
      set(s => {
        s.drivers = [...s.drivers, driver];
      }),
    editDriver: (id?: string | number, driver?: Partial<DriverModel>) =>
      set(s => {
        const index = s.drivers.findIndex(driver => driver.id === id);
        if (index === -1) return;

        s.drivers[index] = {
          ...s.drivers[index],
          ...driver,
        };
      }),
    deleteDriver: (id?: string | number) =>
      set(s => {
        s.drivers = s.drivers.filter(driver => driver.id !== id);
      }),
  })
);

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
