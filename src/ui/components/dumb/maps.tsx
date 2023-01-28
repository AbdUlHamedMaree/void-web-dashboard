import React, { forwardRef, memo } from 'react';
import type { MapContainerProps } from 'react-leaflet';
import type { Map } from 'leaflet';
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

export type MapsProps = MapContainerProps;

export const Maps = memo(
  forwardRef<Map, React.PropsWithChildren<MapsProps>>(function Maps(
    { children, ...props },
    ref
  ) {
    return (
      <MapContainer
        ref={ref}
        center={[51.505, -0.09]}
        zoom={13}
        {...props}
        style={{ height: '100%', width: '100%', ...props.style }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {children}
      </MapContainer>
    );
  })
);
