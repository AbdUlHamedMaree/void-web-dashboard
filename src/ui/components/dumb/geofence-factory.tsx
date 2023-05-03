import type {
  CircleProps,
  MarkerProps,
  PolygonProps,
  PolylineProps,
  RectangleProps,
} from '@react-google-maps/api';
import { CircleF } from '@react-google-maps/api';
import { MarkerF } from '@react-google-maps/api';
import { PolygonF } from '@react-google-maps/api';
import { PolylineF, RectangleF } from '@react-google-maps/api';

export type CircleGeofenceProps = {
  type: 'circle';
} & CircleProps;

export type MarkerGeofenceProps = {
  type: 'marker';
} & MarkerProps;

export type PolygonGeofenceProps = {
  type: 'polygon';
} & PolygonProps;

export type PolylineGeofenceProps = {
  type: 'polyline';
} & PolylineProps;

export type RectangleGeofenceProps = {
  type: 'rectangle';
} & RectangleProps;

// ******************************

export type GeofenceFactoryProps =
  | CircleGeofenceProps
  | MarkerGeofenceProps
  | PolygonGeofenceProps
  | PolylineGeofenceProps
  | RectangleGeofenceProps;

export const GeofenceFactory: React.FC<GeofenceFactoryProps> = props => {
  switch (props.type) {
    case 'circle':
      return <CircleF {...props} />;

    case 'marker':
      return <MarkerF {...props} />;

    case 'polygon':
      return <PolygonF {...props} />;

    case 'polyline':
      return <PolylineF {...props} />;

    case 'rectangle':
      return <RectangleF {...props} />;
  }

  return null;
};
