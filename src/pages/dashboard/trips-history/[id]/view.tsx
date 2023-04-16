import React, { useCallback, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { useRouter } from 'next/router';
import { useTrip } from '$logic/state/trips';
import { GoogleMaps } from '$ui/components/dumb/google-maps';
import { Box, Typography, styled } from '@mui/material';
import { CarMarker } from '$ui/components/dumb/car-marker';
import { NotFoundPage } from '$ui/components/dumb/not-found-page';
import { SplashScreen } from '$ui/components/shared/splash-screen';
import { useIsDesktop } from '$logic/hooks/use-is-desktop';
import { PolylineF } from '@react-google-maps/api';
import { useVehicleStatusToColorDict } from '$logic/hooks/use-vehicle-status-to-color-getter';
import { isServer } from '$logic/libs/checks';
import { ShadowScrollbar } from '$ui/components/shared/shadow-scrollbar';
import { Stack } from '@mui/material';
import { SwipeableDrawer } from '@mui/material';
import { isIOS } from '$logic/utils/is-ios';
import { KeyValueDetails } from '$ui/components/dumb/key-value-details';
import { routes } from '$routes';
import { subDays, set, format, addMinutes } from 'date-fns';

const drawerBleeding = 24;

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.grey[300] : theme.palette.grey[900],
  borderRadius: 3,
}));

const RootContainer = styled('div')(({}) => ({
  height: '100%',
  display: 'flex',
}));

const TripsDrawer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: 340,
  background: theme.palette.background.paper,
}));

const MapContainer = styled('div')(({}) => ({
  flex: 1,
}));

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query, isReady } = useRouter();
  const id = query.id;

  const trip = useTrip(id);

  const isDesktop = useIsDesktop();
  const vehicleStatusToColor = useVehicleStatusToColorDict();

  const [map, setMap] = useState<google.maps.Map>();
  const [open, setOpen] = useState(false);

  const toggleDrawer = useCallback(
    (newOpen: boolean) => () => {
      setOpen(newOpen);
    },
    []
  );

  const initialCenter = useMemo(() => trip?.points[0].location, [trip?.points]);

  const markers = useMemo(
    () =>
      trip?.points.map(point => (
        <CarMarker
          key={point.id}
          position={point.location}
          rotation={point.rotation}
          color={vehicleStatusToColor[point.status]}
        />
      )),
    [trip?.points, vehicleStatusToColor]
  );

  const polylinePath = useMemo(
    () => trip?.points.map(point => point.location) ?? [],
    [trip?.points]
  );

  const startedAt = useMemo(() => subDays(set(new Date(), { hours: 0 }), 2), []);

  const content = useMemo(
    () => (
      <ShadowScrollbar useFlex autoHide>
        <Stack gap={1} sx={{ padding: 1 }}>
          <Typography variant='h4'>Trip Details</Typography>
          <KeyValueDetails
            label='Vehicle'
            value={trip?.vehicle.name}
            href={
              routes.dashboard.vehicles['[id]'].view({
                query: { id: trip?.vehicle.id },
              }).link
            }
          />
          <KeyValueDetails
            label='Driver'
            value={trip?.driver.name}
            href={
              routes.dashboard.drivers['[id]'].view({
                query: { id: trip?.driver.id },
              }).link
            }
          />
          <KeyValueDetails
            label='Device'
            value={trip?.device.name}
            href={
              routes.dashboard.devices['[id]'].view({
                query: { id: trip?.device.id },
              }).link
            }
          />
          <KeyValueDetails label='Total Distance' value='1km 300m' />
          <KeyValueDetails label='Started At' value={format(startedAt, 'PPpp')} />
          <KeyValueDetails
            label='Ended At'
            value={format(addMinutes(startedAt, 25), 'PPpp')}
          />
          <KeyValueDetails label='Total Duration' value='25m 15s' />
          <KeyValueDetails label='Total Moving Duration' value='23m 15s' />
          <KeyValueDetails label='Total Idle Duration' value='2m' />
          <KeyValueDetails label='Max Speed' value='90 km/h' />
        </Stack>
      </ShadowScrollbar>
    ),
    [
      startedAt,
      trip?.device.id,
      trip?.device.name,
      trip?.driver.id,
      trip?.driver.name,
      trip?.vehicle.id,
      trip?.vehicle.name,
    ]
  );

  if (!isReady || isServer()) return <SplashScreen />;

  if (!trip) return <NotFoundPage item='Trip' />;

  return (
    <RootContainer>
      <MapContainer>
        <GoogleMaps center={initialCenter} zoom={17} onLoad={setMap}>
          {markers}
          <PolylineF path={polylinePath} options={{ strokeOpacity: 0.5 }} />
        </GoogleMaps>
      </MapContainer>
      {isDesktop && <TripsDrawer>{content}</TripsDrawer>}
      {!isDesktop && (
        <SwipeableDrawer
          open={open}
          anchor='bottom'
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          disableBackdropTransition={!isIOS()}
          disableDiscovery={isIOS()}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              height: `calc(50% - ${drawerBleeding}px)`,
              overflow: 'visible',
            },
          }}
        >
          <Box
            sx={{
              bgcolor: 'background.paper',
              position: 'absolute',
              display: 'flex',
              justifyContent: 'center',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              right: 0,
              left: 0,
              height: drawerBleeding,
            }}
          >
            <Puller sx={{ mt: 1 }} />
          </Box>
          {content}
        </SwipeableDrawer>
      )}
    </RootContainer>
  );
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'read',
  subject: 'TripsHistory',
};

export default Page;
