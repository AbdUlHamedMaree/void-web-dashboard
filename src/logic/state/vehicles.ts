import type { VehicleModel } from '$logic/models/vehicle';
import { createEntityStore } from '$logic/utils/create-entity-store';
import { useCallback, useMemo } from 'react';

export const useVehiclesStore = createEntityStore('vehicle')<VehicleModel>({
  persist: true,
  devtools: true,
  name: 'void-mocked-vehicles',
});

export const useVehicles = () => useVehiclesStore(useCallback(s => s.vehicles, []));
export const useVehicle = (id?: unknown) =>
  useVehiclesStore(useCallback(s => s.vehicles.find(vehicle => vehicle.id === id), [id]));

export const useGetVehicle = () => {
  const vehicles = useVehicles();
  return useCallback(
    (id?: string | number) => vehicles.find(vehicle => vehicle.id === id),
    [vehicles]
  );
};

export const useGetPureVehicle = () => {
  const getVehicle = useGetVehicle();
  return useCallback(
    (id?: string | number) => {
      const vehicle = getVehicle(id);

      if (!vehicle) return;

      return {
        ...vehicle,
        device: undefined,
        driver: undefined,
      };
    },
    [getVehicle]
  );
};

export const useVehiclesOptions = () => {
  const vehicles = useVehicles();
  return useMemo(
    () =>
      vehicles.reduce((acc, d) => {
        acc[d.id] = d.name;
        return acc;
      }, {} as Record<string, string>),
    [vehicles]
  );
};
