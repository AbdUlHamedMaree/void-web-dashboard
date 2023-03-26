import type { VehicleStatusUnion } from '$logic/models/vehicle';
import {
  AirlineSeatReclineNormalOutlined,
  DirectionsCarFilledOutlined,
  MemoryOutlined,
  SpeedOutlined,
} from '@mui/icons-material';
import { Grid, Typography } from '@mui/material';
import { InfoWindowF } from '@react-google-maps/api';
import { memo } from 'react';

export type VehicleInfoWindowProps = {
  name?: React.ReactNode;
  driverName?: React.ReactNode;
  deviceName?: React.ReactNode;
  speed?: React.ReactNode;
  status?: VehicleStatusUnion;
} & React.ComponentProps<typeof InfoWindowF>;

export const VehicleInfoWindow: React.FC<VehicleInfoWindowProps> = memo(
  function VehicleInfoWindow({ name, driverName, deviceName, speed, status, ...props }) {
    return (
      <InfoWindowF {...props}>
        <Grid container spacing={1} maxWidth={350}>
          <Grid item xs={12}>
            <Typography>{name}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography display='flex' gap={1}>
              <AirlineSeatReclineNormalOutlined />
              {driverName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography display='flex' gap={1}>
              <MemoryOutlined />
              {deviceName}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography display='flex' gap={1}>
              <SpeedOutlined />
              {speed}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography display='flex' gap={1}>
              <DirectionsCarFilledOutlined />
              {status}
            </Typography>
          </Grid>
        </Grid>
      </InfoWindowF>
    );
  }
);
