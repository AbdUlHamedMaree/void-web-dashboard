import type { GeofenceModel } from '$logic/models/geofence';
import type { LocationModel } from '$logic/models/location';

export const getGeofenceCenter = (geofence: GeofenceModel): LocationModel => {
  switch (geofence.type) {
    case 'circle':
      return geofence.center;

    case 'marker':
      return geofence.position;

    case 'polygon':
      const sum = geofence.paths.reduce(
        (acc, e) => {
          acc.lat += e.lat;
          acc.lng += e.lng;

          return acc;
        },
        { lat: 0, lng: 0 }
      );
      return {
        lat: sum.lat / geofence.paths.length,
        lng: sum.lng / geofence.paths.length,
      };

    case 'polyline':
      return geofence.path[Math.floor(geofence.path.length / 2)];

    case 'rectangle':
      return {
        lat: (geofence.bounds.north + geofence.bounds.south) / 2,
        lng: (geofence.bounds.east + geofence.bounds.west) / 2,
      };
  }
};
