import { number, object } from 'yup';

export const locationSchema = object({
  lat: number().required(),
  lng: number().required(),
});

export const boundsSchema = object({
  east: number().required(),
  north: number().required(),
  south: number().required(),
  west: number().required(),
});
