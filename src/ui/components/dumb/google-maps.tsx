import { Alert, AlertTitle, Skeleton } from '@mui/material';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { forwardRef, memo, useCallback } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

type GoogleMapProps = React.ComponentProps<typeof GoogleMap>;
type UseLoadScriptOptions = Parameters<typeof useJsApiLoader>[0];

export type GoogleMapsProps = React.PropsWithChildren<
  Omit<UseLoadScriptOptions, 'googleMapsApiKey'> & GoogleMapProps
>;

const GOOGLE_MAPS_API_KEY = 'KEY';

export const GoogleMaps = memo(
  forwardRef<google.maps.Map, GoogleMapsProps>(function GoogleMaps(
    {
      // hook options
      authReferrerPolicy,
      channel,
      googleMapsClientId,
      id = 'google-map-script',
      language,
      libraries,
      mapIds,
      nonce,
      preventGoogleFontsLoading,
      region,
      version,

      children,
      // maps props
      ...props
    },
    ref
  ) {
    // TODO: uses nextjs script instead.
    const { isLoaded, loadError } = useJsApiLoader({
      authReferrerPolicy,
      channel,
      googleMapsApiKey: GOOGLE_MAPS_API_KEY,
      googleMapsClientId,
      id,
      language,
      libraries,
      mapIds,
      nonce,
      preventGoogleFontsLoading,
      region,
      version,
    });

    const handleLoad = useCallback(
      (map: google.maps.Map) => {
        props.onLoad?.(map);

        if (typeof ref === 'function') return ref(map);
        if (ref) return void (ref.current = map);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.onLoad]
    );

    const handleUnmount = useCallback(
      (map: google.maps.Map) => {
        props.onUnmount?.(map);

        if (typeof ref === 'function') return ref(null);
        if (ref) return void (ref.current = null);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [props.onUnmount]
    );

    if (loadError)
      return (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          Failed to load the google maps - <strong>please contact the support</strong>
        </Alert>
      );

    if (!isLoaded)
      return <Skeleton variant='rounded' animation='wave' width='100%' height='100%' />;

    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        {...props}
        onLoad={handleLoad}
        onUnmount={handleUnmount}
      >
        {children}
      </GoogleMap>
    );
  })
);
