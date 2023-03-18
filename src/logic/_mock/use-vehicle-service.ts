import { useVehicles, useVehiclesStore } from '$logic/state/vehicles';
import { useEffect, useMemo } from 'react';
import { carTrip01 } from './car-trips';
import { useIntervalSignal } from '$logic/hooks/use-interval-signal';
// import { LatLngBounds } from 'leaflet';

const tripIdToTrip = {
  1: carTrip01,
};

export const useVehicleService = () => {
  const vehicles = useVehicles();
  const editVehicle = useVehiclesStore(s => s.editVehicle);
  const signal = useIntervalSignal(1300);

  const mockedVehicles = useMemo(
    () => vehicles.filter(vehicle => vehicle._mock),
    [vehicles]
  );

  useEffect(() => {
    mockedVehicles.map(vehicle => {
      if (!vehicle._mock) return;

      const trip = tripIdToTrip[vehicle._mock.tripId as 1];
      const newIndex =
        vehicle._mock.currentIndex + 1 >= trip.length
          ? 0
          : vehicle._mock.currentIndex + 1;

      const currentStep = trip[newIndex];
      editVehicle(vehicle.id, {
        _mock: {
          currentIndex: newIndex,
          tripId: vehicle._mock.tripId,
        },
        location: currentStep.location,
        rotation: currentStep.rotation,
      });
    });
  }, [signal]);
};
