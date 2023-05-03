import type { GeofenceModel } from '$logic/models/geofence';
import { isNil } from '$modules/checks';

export const isValidGeofence = (value: any): value is GeofenceModel => {
  if (
    isNil(value) ||
    isNil(value.id) ||
    isNil(value.name) ||
    isNil(value.description) ||
    isNil(value.type)
  )
    return false;

  switch (value.type) {
    case 'circle':
      if (
        isNil(value.center) ||
        isNil(value.center.lat) ||
        isNil(value.center.lng) ||
        isNil(value.radius)
      )
        return false;

    case 'marker':
      if (isNil(value.position) || isNil(value.position.lat) || isNil(value.position.lng))
        return false;

    case 'polygon':
      if (isNil(value.paths)) return false;

    case 'polyline':
      if (isNil(value.path)) return false;

    case 'rectangle':
      if (
        isNil(value.bounds) ||
        isNil(value.bounds.east) ||
        isNil(value.bounds.west) ||
        isNil(value.bounds.north) ||
        isNil(value.bounds.south)
      )
        return false;
  }
  return true;
};
