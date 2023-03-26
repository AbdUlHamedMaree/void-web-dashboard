import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { useRouter } from 'next/router';
import { useVehicle } from '$logic/state/vehicles';
import { GoogleMaps } from '$ui/components/dumb/google-maps';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  ListItem,
  ListItemText,
  styled,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { isIOS } from '$logic/utils/is-ios';
import { ShadowScrollbar } from '$ui/components/shared/shadow-scrollbar';
import { useIsDesktop } from '$logic/hooks/use-is-desktop';
import { CarMarker } from '$ui/components/dumb/car-marker';
import { useVehicleService } from '$logic/_mock/use-vehicle-service';
import { ExpandMore } from '@mui/icons-material';
import { VehicleStatusEnum } from '$logic/models/vehicle';
import { routes } from '$routes';
import { getYesNoValue } from '$logic/utils/get-yes-no-value';
import { Divider } from '@mui/material';
import { Link } from '$ui/components/shared/link';
import { List } from '@mui/material';
import { NotFoundPage } from '$ui/components/dumb/not-found-page';

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
}));

const MapContainer = styled('div')(({}) => ({
  flex: 1,
}));

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query } = useRouter();
  const id = query.id;

  useVehicleService(id as string);
  const vehicle = useVehicle(id);

  const isDesktop = useIsDesktop();

  const [open, setOpen] = useState(false);
  const [map, setMap] = useState<google.maps.Map>();

  const toggleDrawer = useCallback(
    (newOpen: boolean) => () => {
      setOpen(newOpen);
    },
    []
  );

  useEffect(() => {
    if (vehicle?.location)
      map?.setCenter({ lat: vehicle?.location[0], lng: vehicle?.location[1] });
  }, [vehicle?.location, map]);

  const content = useMemo(() => {
    if (!vehicle) return null;

    const driver = vehicle.driver;
    const device = vehicle.device;

    return (
      <>
        <Box p={2}>
          <Typography variant='h6'>Vehicle Details</Typography>
        </Box>
        <ShadowScrollbar useFlex autoHide>
          <Accordion defaultExpanded disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight='medium'>Basic</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ width: '100%' }}>
                <KeyValueUnitListItem label='Name' value={vehicle.name} />
                {/* <KeyValueUnit label='Brand' value={vehicle.brand} />
            <KeyValueUnit label='model' value={vehicle.model} />
            <KeyValue
            label='Manufacturing Year'
            value={format(new Date(vehicle.manufacturingDate), 'yyyy')}
          /> */}
                <KeyValueUnitListItem label='Plate Number' value={vehicle.plateNumber} />
                <KeyValueUnitListItem label='VIN' value={vehicle.vin} />
                <KeyValueUnitListItem
                  label='Status'
                  value={vehicle.status ? VehicleStatusEnum[vehicle.status] : 'UNKNOWN'}
                />
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight='medium'>Status</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ width: '100%' }}>
                <KeyValueUnitListItem
                  label='Speed'
                  value={vehicle.meta.speed}
                  unit=' km/h'
                />
                <KeyValueUnitListItem
                  label='Front Left Door'
                  value={getYesNoValue(
                    vehicle.meta.frontLeftDoorOpen,
                    'Opened',
                    'Closed'
                  )}
                />
                <KeyValueUnitListItem
                  label='Front Right Door'
                  value={getYesNoValue(
                    vehicle.meta.frontRightDoorOpen,
                    'Opened',
                    'Closed'
                  )}
                />
                <KeyValueUnitListItem
                  label='Rear Left Door'
                  value={getYesNoValue(vehicle.meta.rearLeftDoorOpen, 'Opened', 'Closed')}
                />
                <KeyValueUnitListItem
                  label='Rear Right Door'
                  value={getYesNoValue(vehicle.meta.rearLeftDoorOpen, 'Opened', 'Closed')}
                />
                <KeyValueUnitListItem
                  label='Trunk Door'
                  value={getYesNoValue(vehicle.meta.trunkDoorOpen, 'Opened', 'Closed')}
                />
                <KeyValueUnitListItem
                  label='Engine Cover'
                  value={getYesNoValue(vehicle.meta.engineCoverOpen, 'Opened', 'Closed')}
                />
                <KeyValueUnitListItem
                  label='Roof'
                  value={getYesNoValue(vehicle.meta.roofOpen, 'Opened', 'Closed')}
                />
                <KeyValueUnitListItem
                  label='Load Weight'
                  value={vehicle.meta.loadWeight}
                  unit=' kg'
                />
                <KeyValueUnitListItem
                  label='Engine Load'
                  value={vehicle.meta.engineLoad}
                  unit='%'
                />
                <KeyValueUnitListItem
                  label='Engine RPM'
                  value={vehicle.meta.engineRPM}
                  unit=' rpm'
                />
                <KeyValueUnitListItem
                  label='Engine Temperature'
                  value={vehicle.meta.engineTemperature}
                />
                <KeyValueUnitListItem
                  label='Engine Oil Temperature'
                  value={vehicle.meta.engineOilTemperature}
                  unit={<> &#8451;</>}
                />
                <KeyValueUnitListItem
                  label='Engine Oil Level'
                  value={vehicle.meta.engineOilLevel}
                />
                <KeyValueUnitListItem
                  label='Engine Work Time'
                  value={vehicle.meta.engineWorkTime}
                  unit=' min'
                />
                <KeyValueUnitListItem
                  label='Battery Voltage'
                  value={vehicle.meta.batteryVoltage}
                  unit=' V'
                />
                <KeyValueUnitListItem
                  label='Battery Current'
                  value={vehicle.meta.batteryCurrent}
                  unit=' A'
                />
                <KeyValueUnitListItem
                  label='Battery Level'
                  value={vehicle.meta.batteryLevel}
                  unit='%'
                />
                <KeyValueUnitListItem
                  label='Battery Charging'
                  value={getYesNoValue(vehicle.meta.batteryChargeState, 'ON', 'OFF')}
                />
                <KeyValueUnitListItem
                  label='Battery Temperature'
                  value={vehicle.meta.batteryTemperature}
                  unit={<> &#8451;</>}
                />
                <KeyValueUnitListItem
                  label='Total Odometer'
                  value={vehicle.meta.totalOdometer}
                  unit=' m'
                />
                <KeyValueUnitListItem
                  label='Trip Odometer'
                  value={vehicle.meta.tripOdometer}
                  unit=' m'
                />
                <KeyValueUnitListItem
                  label='Fuel Level'
                  value={vehicle.meta.fuelLevel}
                  unit='%'
                />
                <KeyValueUnitListItem
                  label='Fuel Used Gps'
                  value={vehicle.meta.fuelUsedGps}
                  unit=' l'
                />
                <KeyValueUnitListItem
                  label='Fuel Rate Gps'
                  value={vehicle.meta.fuelRateGps}
                  unit=' l/100km'
                />
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight='medium'>Driver</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ width: '100%' }}>
                <KeyValueUnitListItem
                  label='Driver Name'
                  value={driver?.name}
                  link={
                    routes.dashboard.drivers['[id]'].view({ query: { id: driver?.id } })
                      .link
                  }
                />
                <KeyValueUnitListItem label='Driver Email' value={driver?.email} />
                <KeyValueUnitListItem
                  label='Driver Phone Number'
                  value={driver?.phoneNumber}
                />
              </List>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight='medium'>Device</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List sx={{ width: '100%' }}>
                <KeyValueUnitListItem
                  label='Device Name'
                  value={device?.name}
                  link={
                    routes.dashboard.devices['[id]'].view({ query: { id: device?.id } })
                      .link
                  }
                />
                <KeyValueUnitListItem label='Device Model' value={device?.model} />
                <KeyValueUnitListItem label='Device IMEI' value={device?.imei} />
              </List>
            </AccordionDetails>
          </Accordion>
        </ShadowScrollbar>
      </>
    );
  }, [vehicle]);

  const initialCenter = useMemo(
    () =>
      vehicle?.location
        ? { lat: vehicle.location[0], lng: vehicle.location[1] }
        : undefined,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!vehicle) return <NotFoundPage item='Vehicle' />;

  return (
    <RootContainer>
      <MapContainer>
        <GoogleMaps center={initialCenter} onLoad={setMap}>
          {vehicle.location && (
            <CarMarker
              position={{ lat: vehicle.location[0], lng: vehicle.location[1] }}
              rotation={vehicle.rotation}
            />
          )}
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

export default Page;

type KeyValueUnitListItemProps = {
  label?: React.ReactNode;
  value?: React.ReactNode;
  unit?: React.ReactNode;
  link?: string;
};

const KeyValueUnitListItem = memo<KeyValueUnitListItemProps>(function KeyValueUnit({
  label,
  value,
  unit,
  link,
}) {
  return value ? (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemText
          primary={label}
          secondary={
            <>
              <Typography
                sx={{ display: 'inline' }}
                component='span'
                variant='body2'
                color='text.primary'
              >
                {link ? <Link href={link}>{value}</Link> : value}
              </Typography>
              {unit}
            </>
          }
        />
      </ListItem>
      <Divider variant='middle' component='li' />
    </>
  ) : null;
});
