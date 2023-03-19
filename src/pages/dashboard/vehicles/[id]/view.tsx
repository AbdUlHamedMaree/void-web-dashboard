import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

type KeyValueProps = {
  label?: React.ReactNode;
  value?: React.ReactNode;
};

const KeyValue: React.FC<KeyValueProps> = ({ label, value }) => (
  <>
    <Typography variant='overline'>{label}</Typography>
    <Typography ml={1}>{value}</Typography>
  </>
);

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
      <ShadowScrollbar useFlex autoHide>
        <Accordion defaultExpanded={true} disableGutters>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight='medium'>Basic</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <KeyValue label='Name' value={vehicle.name} />
            {/* <KeyValue label='Brand' value={vehicle.brand} />
            <KeyValue label='model' value={vehicle.model} />
            <KeyValue
              label='Manufacturing Year'
              value={format(new Date(vehicle.manufacturingDate), 'yyyy')}
            /> */}
            <KeyValue label='Plate Number' value={vehicle.plateNumber} />
            <KeyValue label='VIN' value={vehicle.vin} />
            <KeyValue
              label='Status'
              value={vehicle.status ? VehicleStatusEnum[vehicle.status] : 'UNKNOWN'}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion disabled disableGutters>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight='medium'>Status</Typography>
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true} disableGutters>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight='medium'>Driver</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <KeyValue label='Driver Name' value={driver?.name} />
            <KeyValue label='Driver Email' value={driver?.email} />
            <KeyValue label='Driver Phone Number' value={driver?.phoneNumber} />
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded={true} disableGutters>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography fontWeight='medium'>Device</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <KeyValue label='Device Name' value={device?.name} />
            <KeyValue label='Device Model' value={device?.model} />
            <KeyValue label='Device IMEI' value={device?.imei} />
          </AccordionDetails>
        </Accordion>
      </ShadowScrollbar>
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
