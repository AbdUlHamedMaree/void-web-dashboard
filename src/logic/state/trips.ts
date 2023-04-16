import type { TripModel } from '$logic/models/trip';
import { createEntityStore } from '$logic/utils/create-entity-store';
import { useCallback } from 'react';

export const useTripsStore = createEntityStore('trip')<TripModel>({
  persist: true,
  devtools: true,
  name: 'void-mocked-trips',
});

export const useTrips = () => useTripsStore(useCallback(s => s.trips, []));
export const useTrip = (id?: unknown) =>
  useTripsStore(useCallback(s => s.trips.find(trip => trip.id === id), [id]));

export const useGetTrip = () => {
  const trips = useTrips();
  return useCallback(
    (id?: string | number) => trips.find(trip => trip.id === id),
    [trips]
  );
};
