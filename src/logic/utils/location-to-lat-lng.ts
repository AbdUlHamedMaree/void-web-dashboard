import memoize from 'fast-memoize';

export const locationToLayLng = memoize(
  (loc: [number, number]) => ({ lat: loc[0], lng: loc[1] }),
  {
    serializer: ([lat, lng]) => `${lat}, ${lng}`,
  }
);
