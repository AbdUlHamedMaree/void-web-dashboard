import { number } from '@mrii/mock';

export type LocationModel = {
  lat: number;
  lng: number;
};

export const mockLocation = (location?: Partial<LocationModel>): LocationModel => ({
  lat: number(25.094776, 24.514766, true),
  lng: number(55.468773, 55.635536, true),
  ...location,
});
