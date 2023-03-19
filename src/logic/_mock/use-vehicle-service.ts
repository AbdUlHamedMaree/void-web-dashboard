import { useVehicles, useVehiclesStore } from '$logic/state/vehicles';
import { useEffect, useMemo } from 'react';
import { carTrip01 } from './car-trips';
import { useIntervalSignal } from '$logic/hooks/use-interval-signal';

const tripIdToTrip = {
  1: carTrip01,
};

export const useVehicleService = (vehicleId?: string) => {
  const vehicles = useVehicles();
  const editVehicle = useVehiclesStore(s => s.editVehicle);
  const signal = useIntervalSignal(1300);

  const vehicle = useMemo(
    () => vehicles.find(vehicle => vehicle._mock && vehicle.id === vehicleId),
    [vehicles, vehicleId]
  );

  useEffect(() => {
    if (!vehicle || !vehicle._mock) return;

    const trip = tripIdToTrip[vehicle._mock.tripId as 1];
    const newIndex =
      vehicle._mock.currentIndex + 1 >= trip.length ? 0 : vehicle._mock.currentIndex + 1;

    const currentStep = trip[newIndex];
    editVehicle(vehicle.id, {
      _mock: {
        currentIndex: newIndex,
        tripId: vehicle._mock.tripId,
      },
      location: currentStep.location,
      rotation: currentStep.rotation,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signal]);
};
