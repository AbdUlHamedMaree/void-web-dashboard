import { memo, useCallback, useMemo, useState } from 'react';
import { MarkerF } from '@react-google-maps/api';
import { useRerenderEffect } from '$logic/hooks/use-rerender-effect';

type MarkerProps = React.ComponentProps<typeof MarkerF>;

export type CarMarkerProps = Omit<MarkerProps, 'icon'> &
  Omit<google.maps.Symbol, 'path'> & { color?: string };

const carIconPathData =
  'M 6 18 L 11 6 Q 12 4 13 6 L 18 18 Q 19 20 17 19 L 13 16 Q 12 15 11 16 L 7 19 Q 5 20 6 18 Z';

export const CarMarker = memo<CarMarkerProps>(function CarMarker({
  color = 'black',
  anchor,
  fillColor = color,
  fillOpacity = 0.5,
  labelOrigin,
  rotation,
  scale,
  strokeColor = color,
  strokeOpacity,
  strokeWeight = 2,
  ...props
}) {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [defaultAnchor] = useState(() => new google.maps.Point(12, 12));

  const icon = useMemo<google.maps.Symbol>(
    () => ({
      path: carIconPathData,
      anchor: anchor ?? defaultAnchor,
      fillColor,
      fillOpacity,
      labelOrigin,
      rotation,
      scale,
      strokeColor,
      strokeOpacity,
      strokeWeight,
    }),
    [
      anchor,
      defaultAnchor,
      fillColor,
      fillOpacity,
      labelOrigin,
      rotation,
      scale,
      strokeColor,
      strokeOpacity,
      strokeWeight,
    ]
  );

  useRerenderEffect(() => {
    marker?.setIcon(icon);
  }, [marker, icon]);

  const handleLoad = useCallback(
    (marker: google.maps.Marker) => {
      props.onLoad?.(marker);
      setMarker(marker);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onLoad]
  );

  const handleUnmount = useCallback(
    (marker: google.maps.Marker) => {
      props.onUnmount?.(marker);

      setMarker(undefined);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.onUnmount]
  );

  return <MarkerF {...props} icon={icon} onLoad={handleLoad} onUnmount={handleUnmount} />;
});
