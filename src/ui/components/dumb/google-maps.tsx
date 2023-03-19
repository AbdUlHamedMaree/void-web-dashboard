import { NEXT_PUBLIC_GOOGLE_API_KEY } from '$logic/constants/env';
import { Alert, AlertTitle, Skeleton } from '@mui/material';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { forwardRef } from 'react';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 24.937804,
  lng: 55.075093,
};

type GoogleMapProps = React.ComponentProps<typeof GoogleMap>;
type UseLoadScriptOptions = Parameters<typeof useLoadScript>[0];

export type GoogleMapsProps = React.PropsWithChildren<
  Omit<UseLoadScriptOptions, 'googleMapsApiKey'> & GoogleMapProps
>;

export const GoogleMaps = forwardRef<GoogleMap, GoogleMapsProps>(function GoogleMaps(
  {
    // hook options
    id,
    version,
    nonce,
    googleMapsClientId,
    language,
    region,
    libraries,
    preventGoogleFontsLoading,
    channel,
    mapIds,
    authReferrerPolicy,

    children,
    // maps props
    ...props
  },
  ref
) {
  const { isLoaded, loadError } = useLoadScript({
    authReferrerPolicy,
    channel,
    googleMapsApiKey: NEXT_PUBLIC_GOOGLE_API_KEY ?? '',
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

  if (loadError)
    return (
      <Alert severity='error'>
        <AlertTitle>Error</AlertTitle>
        Failed to load the google maps - <strong>please contact the support</strong>
        <br />
        Error Message:<code>{`[${loadError.name}] ${loadError.message}`}</code>
      </Alert>
    );

  if (!isLoaded)
    return <Skeleton variant='rounded' animation='wave' width='100%' height='100%' />;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      {...props}
      ref={ref}
    >
      {children}
    </GoogleMap>
  );
});
