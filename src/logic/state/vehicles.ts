import type { VehicleModel } from '$logic/models/vehicle';
import { createStore } from '$modules/zustand';
import type { WritableDraft } from 'immer/dist/internal';
import { useCallback, useMemo } from 'react';

export const useVehiclesStore = createStore({
  persist: true,
  devtools: true,
  name: 'void-mocked-vehicles',
})(
  {
    vehicles: [] as VehicleModel[],
  },
  set => ({
    setVehicles: (vehicles: VehicleModel[]) =>
      set(s => {
        s.vehicles = vehicles;
      }),
    addVehicle: (vehicle: VehicleModel) =>
      set(s => {
        s.vehicles = [...s.vehicles, vehicle];
      }),
    editVehicle: (id?: string | number, vehicle?: Partial<VehicleModel>) =>
      set(s => {
        const index = s.vehicles.findIndex(vehicle => vehicle.id === id);
        if (index === -1) return;

        s.vehicles[index] = {
          ...s.vehicles[index],
          ...vehicle,
        };
      }),
    editVehicleDraft: (
      id?: string | number,
      action?: (draft: WritableDraft<VehicleModel>) => void
    ) =>
      set(s => {
        const index = s.vehicles.findIndex(vehicle => vehicle.id === id);
        if (index === -1) return;
        action?.(s.vehicles[index]);
      }),
    deleteVehicle: (id?: string | number) =>
      set(s => {
        s.vehicles = s.vehicles.filter(vehicle => vehicle.id !== id);
      }),
  })
);

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
