import type {
  CircleProps,
  MarkerProps,
  PolygonProps,
  PolylineProps,
  RectangleProps,
} from '@react-google-maps/api';
import type { BoundsModel } from './bound';
import type { LocationModel } from './location';

export type GeofencesProp =
  | CircleProps
  | MarkerProps
  | PolygonProps
  | PolylineProps
  | RectangleProps;

export type Geofence =
  | google.maps.Circle
  | google.maps.Marker
  | google.maps.Polygon
  | google.maps.Polyline
  | google.maps.Rectangle;

export enum GeofenceTypeEnum {
  circle = 'circle',
  marker = 'marker',
  polygon = 'polygon',
  polyline = 'polyline',
  rectangle = 'rectangle',
}

export type GeofenceTypeUnion = keyof typeof GeofenceTypeEnum;

export type BaseGeofenceModel = {
  id: string;
  name: string;
  description: string;
};

export type CircleGeofenceModel = BaseGeofenceModel & {
  type: 'circle';
  center: LocationModel;
  radius: number;
};

export type MarkerGeofenceModel = BaseGeofenceModel & {
  type: 'marker';
  position: LocationModel;
};

export type PolygonGeofenceModel = BaseGeofenceModel & {
  type: 'polygon';
  paths: LocationModel[];
};

export type PolylineGeofenceModel = BaseGeofenceModel & {
  type: 'polyline';
  path: LocationModel[];
};

export type RectangleGeofenceModel = BaseGeofenceModel & {
  type: 'rectangle';
  bounds: BoundsModel;
};

export type GeofenceModel =
  | CircleGeofenceModel
  | MarkerGeofenceModel
  | PolygonGeofenceModel
  | PolylineGeofenceModel
  | RectangleGeofenceModel;
