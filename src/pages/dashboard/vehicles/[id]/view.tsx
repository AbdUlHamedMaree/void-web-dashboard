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
import { Link } from '$ui/components/shared/link';
import { routes } from '$routes';
import { getYesNoValue } from '$logic/utils/get-yes-no-value';

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
              <KeyValueUnit label='Name' value={vehicle.name} />
              {/* <KeyValueUnit label='Brand' value={vehicle.brand} />
            <KeyValueUnit label='model' value={vehicle.model} />
            <KeyValue
            label='Manufacturing Year'
            value={format(new Date(vehicle.manufacturingDate), 'yyyy')}
          /> */}
              <KeyValueUnit label='Plate Number' value={vehicle.plateNumber} />
              <KeyValueUnit label='VIN' value={vehicle.vin} />
              <KeyValueUnit
                label='Status'
                value={vehicle.status ? VehicleStatusEnum[vehicle.status] : 'UNKNOWN'}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight='medium'>Status</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <KeyValueUnit label='Speed' value={vehicle.meta.speed} unit='km/h' />
              <KeyValueUnit
                label='Front Left Door'
                value={getYesNoValue(vehicle.meta.frontLeftDoorOpen, 'Opened', 'Closed')}
              />
              <KeyValueUnit
                label='Front Right Door'
                value={getYesNoValue(vehicle.meta.frontRightDoorOpen, 'Opened', 'Closed')}
              />
              <KeyValueUnit
                label='Rear Left Door'
                value={getYesNoValue(vehicle.meta.rearLeftDoorOpen, 'Opened', 'Closed')}
              />
              <KeyValueUnit
                label='Rear Right Door'
                value={getYesNoValue(vehicle.meta.rearLeftDoorOpen, 'Opened', 'Closed')}
              />
              <KeyValueUnit
                label='Trunk Door'
                value={getYesNoValue(vehicle.meta.trunkDoorOpen, 'Opened', 'Closed')}
              />
              <KeyValueUnit
                label='Engine Cover'
                value={getYesNoValue(vehicle.meta.engineCoverOpen, 'Opened', 'Closed')}
              />
              <KeyValueUnit
                label='Roof'
                value={getYesNoValue(vehicle.meta.roofOpen, 'Opened', 'Closed')}
              />
              <KeyValueUnit
                label='Load Weight'
                value={vehicle.meta.loadWeight}
                unit='kg'
              />
              <KeyValueUnit
                label='Engine Load'
                value={vehicle.meta.engineLoad}
                unit='%'
              />
              <KeyValueUnit
                label='Engine RPM'
                value={vehicle.meta.engineRPM}
                unit='rpm'
              />
              <KeyValueUnit
                label='Engine Temperature'
                value={vehicle.meta.engineTemperature}
              />
              <KeyValueUnit
                label='Engine Oil Temperature'
                value={vehicle.meta.engineOilTemperature}
                unit={<>&#8451;</>}
              />
              <KeyValueUnit
                label='Engine Oil Level'
                value={vehicle.meta.engineOilLevel}
              />
              <KeyValueUnit
                label='Engine Work Time'
                value={vehicle.meta.engineWorkTime}
                unit='min'
              />
              <KeyValueUnit
                label='Battery Voltage'
                value={vehicle.meta.batteryVoltage}
                unit='V'
              />
              <KeyValueUnit
                label='Battery Current'
                value={vehicle.meta.batteryCurrent}
                unit='A'
              />
              <KeyValueUnit
                label='Battery Level'
                value={vehicle.meta.batteryLevel}
                unit='%'
              />
              <KeyValueUnit
                label='Battery Charging'
                value={getYesNoValue(vehicle.meta.batteryChargeState, 'ON', 'OFF')}
              />
              <KeyValueUnit
                label='Battery Temperature'
                value={vehicle.meta.batteryTemperature}
                unit={<>&#8451;</>}
              />
              <KeyValueUnit
                label='Total Odometer'
                value={vehicle.meta.totalOdometer}
                unit='m'
              />
              <KeyValueUnit
                label='Trip Odometer'
                value={vehicle.meta.tripOdometer}
                unit='m'
              />
              <KeyValueUnit label='Fuel Level' value={vehicle.meta.fuelLevel} unit='%' />
              <KeyValueUnit
                label='Fuel Used Gps'
                value={vehicle.meta.fuelUsedGps}
                unit='l'
              />
              <KeyValueUnit
                label='Fuel Rate Gps'
                value={vehicle.meta.fuelRateGps}
                unit='l/100km'
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight='medium'>Driver</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <KeyValueUnit
                label='Driver Name'
                value={driver?.name}
                link={
                  routes.dashboard.drivers['[id]'].view({ query: { id: driver?.id } })
                    .link
                }
              />
              <KeyValueUnit label='Driver Email' value={driver?.email} />
              <KeyValueUnit label='Driver Phone Number' value={driver?.phoneNumber} />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded disableGutters>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight='medium'>Device</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <KeyValueUnit
                label='Device Name'
                value={device?.name}
                link={
                  routes.dashboard.devices['[id]'].view({ query: { id: device?.id } })
                    .link
                }
              />
              <KeyValueUnit label='Device Model' value={device?.model} />
              <KeyValueUnit label='Device IMEI' value={device?.imei} />
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

  if (!vehicle) return <>Vehicle not found</>;

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

type KeyValueUnitProps = {
  label?: React.ReactNode;
  value?: React.ReactNode;
  unit?: React.ReactNode;
  link?: string;
};

const KeyValueUnit = memo<KeyValueUnitProps>(function KeyValueUnit({
  label,
  value,
  unit,
  link,
}) {
  return value ? (
    <Box display='flex' flexDirection='column'>
      <Typography variant='overline'>{label}</Typography>
      {link ? (
        <Link ml={1} href={link}>
          {value} {unit}
        </Link>
      ) : (
        <Typography ml={1}>
          {value} {unit}
        </Typography>
      )}
    </Box>
  ) : null;
});
