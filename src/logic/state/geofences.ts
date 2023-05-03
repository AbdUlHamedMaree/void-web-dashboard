import type { GeofenceModel } from '$logic/models/geofence';
import { createEntityStore } from '$logic/utils/create-entity-store';
import { useCallback, useMemo } from 'react';

export const useGeofencesStore = createEntityStore('geofence')<GeofenceModel>({
  persist: true,
  devtools: true,
  name: 'void-mocked-geofences',
});

export const useGeofences = () => useGeofencesStore(useCallback(s => s.geofences, []));
export const useGeofence = (id?: unknown) =>
  useGeofencesStore(
    useCallback(s => s.geofences.find(geofence => geofence.id === id), [id])
  );

export const useGetGeofence = () => {
  const geofences = useGeofences();
  return useCallback(
    (id?: string | number) => geofences.find(geofence => geofence.id === id),
    [geofences]
  );
};

export const useGetPureGeofence = () => {
  const getGeofence = useGetGeofence();
  return useCallback(
    (id?: string | number) => {
      const geofence = getGeofence(id);

      if (!geofence) return;

      return {
        ...geofence,
        vehicle: undefined,
        device: undefined,
      };
    },
    [getGeofence]
  );
};

export const useGeofencesOptions = () => {
  const geofences = useGeofences();
  return useMemo(
    () =>
      geofences.reduce((acc, d) => {
        acc[d.id] = d.name;
        return acc;
      }, {} as Record<string, string>),
    [geofences]
  );
};
