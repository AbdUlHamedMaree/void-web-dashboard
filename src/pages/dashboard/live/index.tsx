import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { Box, Stack, styled, SwipeableDrawer, Tab, TextField } from '@mui/material';
import { ShadowScrollbar } from '$ui/components/shared/shadow-scrollbar';
import { useIsDesktop } from '$logic/hooks/use-is-desktop';
import { isIOS } from '$logic/utils/is-ios';
import { useVehicle, useVehicles } from '$logic/state/vehicles';
import { GoogleMaps } from '$ui/components/dumb/google-maps';
import { CarMarker } from '$ui/components/dumb/car-marker';
import { useVehiclesService } from '$logic/_mock/use-vehicles-service';
import { VehicleSidebarCard } from '$ui/components/sections/dashboard/live';
import { routes } from '$routes';
import { VehicleInfoWindow } from '$ui/components/dumb/vehicle-info-window';
import { isDefined } from '$modules/checks';
import type Scrollbars from 'react-custom-scrollbars-2';
import { useMemoizedCallback } from '$logic/hooks/use-memoized-callback';
import { produce } from 'immer';
import { useVehicleStatusToColorDict } from '$logic/hooks/use-vehicle-status-to-color-getter';
import type { TripPoint } from '$logic/_mock/cycle-vehicle-trips';
import type { VehicleStatusUnion } from '$logic/models/vehicle';
import { PolylineF } from '@react-google-maps/api';
import { SmartTabsProvider } from '$ui/components/shared/smart-tabs/smart-tabs-provider';
import { SmartTabs } from '$ui/components/shared/smart-tabs/smart-tabs';
import { SmartTabBody } from '$ui/components/shared/smart-tabs/smart-tab-body';
import { GeofenceSidebarCard } from '$ui/components/sections/dashboard/live/components/geofence-sidebar-card';
import { useGeofences } from '$logic/state/geofences';

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
  background: theme.palette.background.paper,
}));

const MapContainer = styled('div')(({}) => ({
  flex: 1,
}));

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  useVehiclesService();

  const vehicles = useVehicles();
  const geofences = useGeofences();
  const isDesktop = useIsDesktop();
  const vehicleStatusToColor = useVehicleStatusToColorDict();

  const scrollbarRef = useRef<Scrollbars>(null);

  const [selectedVehicleId, setSelectedVehicleId] = useState<string>();
  const [selectedGeofenceId, setSelectedGeofenceId] = useState<string>();
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>('');
  const [focusedVehicleId, setFocusedVehicleId] = useState<string>();
  const [hiddenVehiclesIds, setHiddenVehiclesIds] = useState<string[]>([]);
  const [focusedGeofenceId, setFocusedGeofenceId] = useState<string>();
  const [hiddenGeofencesIds, setHiddenGeofencesIds] = useState<string[]>([]);
  const [map, setMap] = useState<google.maps.Map>();
  const [trip, setTrip] = useState<TripPoint[]>([]);

  const toggleFocusedVehicle = useCallback(
    (id: string) => setFocusedVehicleId(v => (v === id ? undefined : id)),
    []
  );

  const toggleFocusedGeofence = useCallback(
    (id: string) => setFocusedGeofenceId(v => (v === id ? undefined : id)),
    []
  );

  const selectedVehicle = useVehicle(selectedVehicleId);

  const selectVehicle = useMemoizedCallback(
    (vehicleId: string) => () => {
      setSelectedVehicleId(vehicleId);
      const el = document.getElementById(vehicleId);
      if (el) scrollbarRef.current?.scrollTop(el.offsetTop - 8);
    },
    []
  );

  const selectGeofence = useMemoizedCallback(
    (vehicleId: string) => () => {
      setSelectedVehicleId(vehicleId);
      const el = document.getElementById(vehicleId);
      if (el) scrollbarRef.current?.scrollTop(el.offsetTop - 8);
    },
    []
  );

  const unSelectVehicle = useCallback(() => setSelectedVehicleId(undefined), []);
  const unSelectGeofence = useCallback(() => setSelectedGeofenceId(undefined), []);

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

  const toggleHideGeofence = useCallback(
    (id: string) =>
      setHiddenGeofencesIds(ids =>
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

  const filteredGeofences = useMemo(
    () =>
      geofences.filter(geofence => {
        const lowerFilter = filter.toLowerCase();
        const name = geofence.name.toLowerCase();
        const type = geofence.type.toLowerCase();

        if (name.includes(lowerFilter) || type.includes(lowerFilter)) return true;
        return false;
      }),
    [geofences, filter]
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
              ? routes.dashboard.drivers['[id]'].view({
                  query: { id: vehicle.driver.id },
                }).link
              : undefined
          }
          deviceName={vehicle.device?.name}
          deviceHref={
            vehicle.device
              ? routes.dashboard.devices['[id]'].view({
                  query: { id: vehicle.device.id },
                }).link
              : undefined
          }
          status={vehicle.status}
          focused={vehicle.id === focusedVehicleId}
          selected={vehicle.id === selectedVehicleId}
          hidden={hiddenVehiclesIds.includes(vehicle.id)}
          setFocusVehicle={toggleFocusedVehicle}
          toggleHideVehicle={toggleHideVehicle}
        />
      )),
    [
      filteredVehicles,
      focusedVehicleId,
      selectedVehicleId,
      hiddenVehiclesIds,
      toggleFocusedVehicle,
      toggleHideVehicle,
    ]
  );

  const geofencesCards = useMemo(
    () =>
      filteredGeofences.map(geofence => (
        <GeofenceSidebarCard
          key={geofence.id}
          id={geofence.id}
          name={geofence.id}
          type={geofence.type}
          focused={geofence.id === focusedGeofenceId}
          selected={geofence.id === selectedGeofenceId}
          hidden={hiddenGeofencesIds.includes(geofence.id)}
          setFocus={toggleFocusedGeofence}
          toggleHide={toggleHideGeofence}
        />
      )),
    [
      filteredGeofences,
      focusedGeofenceId,
      selectedGeofenceId,
      hiddenGeofencesIds,
      toggleFocusedGeofence,
      toggleHideGeofence,
    ]
  );

  const vehiclesMarkers = useMemo(
    () =>
      filteredVehicles
        .filter(vehicle => !hiddenVehiclesIds.includes(vehicle.id))
        .map(vehicle =>
          vehicle.location && vehicle.rotation ? (
            <CarMarker
              key={vehicle.id}
              position={vehicle.location}
              rotation={vehicle.rotation}
              onClick={selectVehicle(vehicle.id)}
              color={vehicle.status ? vehicleStatusToColor[vehicle.status] : undefined}
            />
          ) : null
        ),
    [filteredVehicles, hiddenVehiclesIds, selectVehicle, vehicleStatusToColor]
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
      focusedVehicle && focusedVehicle.location ? focusedVehicle.location : undefined,
    [focusedVehicle]
  );

  useEffect(() => {
    focusedVehicleCenter && map?.setCenter(focusedVehicleCenter);
  }, [focusedVehicleCenter, map]);

  const content = useMemo(
    () => (
      <SmartTabsProvider initialTabKey='vehicles'>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <SmartTabs>
            <Tab label='Vehicles' value='vehicles' />
            <Tab label='Geofences' value='geofences' />
          </SmartTabs>
        </Box>
        <SmartTabBody value='vehicles' index={0}>
          <Box sx={{ padding: 1 }}>
            <TextField label='Filter' fullWidth onChange={handleFilterChange} />
          </Box>
          <ShadowScrollbar ref={scrollbarRef} useFlex autoHide>
            <Stack gap={1} sx={{ padding: 1 }}>
              {vehiclesCards}
            </Stack>
          </ShadowScrollbar>
        </SmartTabBody>
        <SmartTabBody value='geofences' index={1}>
          <Box sx={{ padding: 1 }}>
            <TextField label='Filter' fullWidth onChange={handleFilterChange} />
          </Box>
          <ShadowScrollbar ref={scrollbarRef} useFlex autoHide>
            <Stack gap={1} sx={{ padding: 1 }}>
              {geofencesCards}
            </Stack>
          </ShadowScrollbar>
        </SmartTabBody>
      </SmartTabsProvider>
    ),
    [geofencesCards, handleFilterChange, vehiclesCards]
  );

  const mockTrip = useMemo(
    () => ({
      trip,
      setRotation: (rotation: number) => {
        setTrip(
          produce(trip => {
            const last = trip.at(-1);
            if (last) last.rotation = rotation;
          })
        );
      },
      setStatus: (status: VehicleStatusUnion) => {
        setTrip(
          produce(trip => {
            const last = trip.at(-1);
            if (last) last.status = status;
          })
        );
      },
      removeLast: () => {
        setTrip(trip => trip.slice(0, -1));
      },
      append: (point: TripPoint) => {
        setTrip(trip => [...trip, point]);
      },
      get: () => JSON.stringify(trip),
    }),
    [trip]
  );

  useEffect(() => {
    (window as any).mockTrip = mockTrip;
  }, [mockTrip]);

  const onRightClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      e.latLng &&
        mockTrip.append({
          ...e.latLng.toJSON(),
          rotation: 0,
          status: 'moving',
        });
    },
    [mockTrip]
  );

  return (
    <RootContainer>
      <MapContainer>
        <GoogleMaps onLoad={setMap} onRightClick={onRightClick}>
          {selectedVehicle?.location && (
            <VehicleInfoWindow
              onCloseClick={unSelectVehicle}
              position={selectedVehicle.location}
              name={selectedVehicle.name}
              driverName={
                selectedVehicle.driver ? selectedVehicle.driver?.name : undefined
              }
              deviceName={selectedVehicle.device?.name}
              speed={
                isDefined(selectedVehicle.meta.speed) ? (
                  <>
                    {selectedVehicle.meta.speed}
                    <Box component='span' color='text.secondary'>
                      {' '}
                      km/h
                    </Box>
                  </>
                ) : null
              }
              status={selectedVehicle.status}
            />
          )}
          {vehiclesMarkers}
          {trip.map(point => (
            <CarMarker
              key={JSON.stringify(point)}
              position={point}
              rotation={point.rotation}
              color={vehicleStatusToColor[point.status]}
            />
          ))}
          <PolylineF path={trip} />
        </GoogleMaps>
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

Page.auth = {
  action: 'read',
  subject: 'LivePreview',
};

export default Page;
