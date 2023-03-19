import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { Box, Stack, styled, SwipeableDrawer, TextField } from '@mui/material';
import { ShadowScrollbar } from '$ui/components/shared/shadow-scrollbar';
import { useIsDesktop } from '$logic/hooks/use-is-desktop';
import { isIOS } from '$logic/utils/is-ios';
import { useVehicles } from '$logic/state/vehicles';
import { GoogleMaps } from '$ui/components/dumb/google-maps';
import { CarMarker } from '$ui/components/dumb/car-marker';
import { useVehiclesService } from '$logic/_mock/use-vehicles-service';
import { VehicleSidebarCard } from '$ui/components/sections/dashboard/live';
import { routes } from '$routes';

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

const VehiclesDrawer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: 340,
  background: theme.palette.background.default,
  marginRight: theme.spacing(1),
  borderRight: '1px dashed ' + theme.palette.divider,
}));

const MapContainer = styled('div')(({}) => ({
  flex: 1,
}));

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  useVehiclesService();

  const vehicles = useVehicles();
  const isDesktop = useIsDesktop();

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>('');
  const [focusedVehicleId, setFocusedVehicleId] = useState<string>();
  const [hiddenVehiclesIds, setHiddenVehiclesIds] = useState<string[]>([]);
  const [map, setMap] = useState<google.maps.Map>();

  const toggleDrawer = useCallback(
    (newOpen: boolean) => () => {
      setOpen(newOpen);
    },
    []
  );

  const toggleHideVehicle = useCallback(
    (id: string) =>
      setHiddenVehiclesIds(ids =>
        ids.includes(id) ? ids.filter(d => d !== id) : [...ids, id]
      ),
    []
  );

  const handleFilterChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setFilter(value),
    []
  );

  const filteredVehicles = useMemo(
    () =>
      vehicles.filter(vehicle => {
        const lowerFilter = filter.toLowerCase();
        const vehicleName = vehicle.name.toLowerCase();
        const driverName = vehicle.driver?.name.toLowerCase();
        const deviceName = vehicle.device?.name.toLowerCase();

        if (
          vehicleName.includes(lowerFilter) ||
          driverName?.includes(lowerFilter) ||
          deviceName?.includes(lowerFilter)
        )
          return true;
        return false;
      }),
    [vehicles, filter]
  );

  const vehiclesCards = useMemo(
    () =>
      filteredVehicles.map(vehicle => (
        <VehicleSidebarCard
          key={vehicle.id}
          vehicleId={vehicle.id}
          vehicleName={vehicle.name}
          vehicleHref={
            routes.dashboard.vehicles['[id]'].view({
              query: { id: vehicle.id },
            }).link
          }
          driverName={vehicle.driver?.name}
          driverHref={
            vehicle.driver
              ? routes.dashboard.users['[id]'].view({
                  query: { id: vehicle.driver.id },
                }).link
              : undefined
          }
          deviceName={vehicle.device?.name}
          deviceHref={
            vehicle.device
              ? routes.dashboard.users['[id]'].view({
                  query: { id: vehicle.device.id },
                }).link
              : undefined
          }
          status={vehicle.status}
          focused={vehicle.id === focusedVehicleId}
          hidden={hiddenVehiclesIds.includes(vehicle.id)}
          setFocusVehicle={setFocusedVehicleId}
          toggleHideVehicle={toggleHideVehicle}
        />
      )),
    [focusedVehicleId, hiddenVehiclesIds, toggleHideVehicle, filteredVehicles]
  );

  const vehiclesMarkers = useMemo(
    () =>
      filteredVehicles
        .filter(vehicle => !hiddenVehiclesIds.includes(vehicle.id))
        .map(vehicle =>
          vehicle.location && vehicle.rotation ? (
            <CarMarker
              key={vehicle.id}
              position={{ lat: vehicle.location[0], lng: vehicle.location[1] }}
              rotation={vehicle.rotation}
            />
          ) : null
        ),
    [hiddenVehiclesIds, filteredVehicles]
  );

  const focusedVehicle = useMemo(
    () =>
      focusedVehicleId
        ? filteredVehicles.find(vehicle => vehicle.id === focusedVehicleId)
        : undefined,
    [filteredVehicles, focusedVehicleId]
  );

  const focusedVehicleCenter = useMemo(
    () =>
      focusedVehicle && focusedVehicle.location
        ? { lat: focusedVehicle.location[0], lng: focusedVehicle.location[1] }
        : undefined,
    [focusedVehicle]
  );

  useEffect(() => {
    focusedVehicleCenter && map?.setCenter(focusedVehicleCenter);
  }, [focusedVehicleCenter, map]);

  const content = useMemo(
    () => (
      <>
        <Box sx={{ padding: 1 }}>
          <TextField label='Filter' fullWidth onChange={handleFilterChange} />
        </Box>
        <ShadowScrollbar useFlex autoHide>
          <Stack gap={1} sx={{ padding: 1 }}>
            {vehiclesCards}
          </Stack>
        </ShadowScrollbar>
      </>
    ),
    [handleFilterChange, vehiclesCards]
  );

  return (
    <RootContainer>
      <MapContainer>
        <GoogleMaps onLoad={setMap}>{vehiclesMarkers}</GoogleMaps>
      </MapContainer>
      {isDesktop && <VehiclesDrawer>{content}</VehiclesDrawer>}
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

export default Page;
