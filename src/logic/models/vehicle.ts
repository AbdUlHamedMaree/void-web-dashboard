import * as m from '@scandinavia/mock';

export type VehicleModel = {
  id: string;
  name: string;
  plateNumber: string;
  model: string;
};

export const mockVehicle = (vehicle?: Partial<VehicleModel>): VehicleModel => ({
  id: m.unique(3),
  name: m.word(),
  plateNumber: m.unique(6),
  model: m.word(),
  ...vehicle,
});
