import React, { forwardRef, memo, useMemo } from 'react';
import type { MapContainerProps } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import dynamic from 'next/dynamic';

import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(
  () => import('react-leaflet').then(({ MapContainer }) => ({ default: MapContainer })),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then(({ TileLayer }) => ({ default: TileLayer })),
  { ssr: false }
);

const center: LatLngExpression = [24.947026, 55.062373];

export type MapsProps = MapContainerProps;

export const Maps = memo(
  forwardRef<any, React.PropsWithChildren<MapsProps>>(function Maps(
    { children, ...props },
    ref
  ) {
    const style = useMemo(
      () => ({ height: '100%', width: '100%', ...props.style }),
      [props.style]
    );

    return (
      <MapContainer center={center} zoom={13} {...props} style={style} ref={ref}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {children}
      </MapContainer>
    );
  })
);
