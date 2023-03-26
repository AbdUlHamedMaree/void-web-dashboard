import type { VehicleStatusUnion } from '$logic/models/vehicle';
import { VehicleStatusToThemeColor, VehicleStatusEnum } from '$logic/models/vehicle';
import type { PathnameUrlObject } from '$routes';
import { Link } from '$ui/components/shared/link';
import {
  GpsFixedOutlined,
  GpsNotFixedOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import { Card, CardContent, Typography, Stack, IconButton, Tooltip } from '@mui/material';
import { memo, useCallback } from 'react';

export type VehicleSidebarCardProps = {
  vehicleId?: string;
  vehicleName?: React.ReactNode;
  vehicleHref?: string | PathnameUrlObject;
  driverName?: React.ReactNode;
  driverHref?: string | PathnameUrlObject;
  deviceName?: React.ReactNode;
  deviceHref?: string | PathnameUrlObject;
  status?: VehicleStatusUnion;

  focused?: boolean;
  selected?: boolean;
  hidden?: boolean;

  setFocusVehicle?: (id: string) => void;
  toggleHideVehicle?: (id: string) => void;
};

export const VehicleSidebarCard = memo<VehicleSidebarCardProps>(
  function VehicleSidebarCard({
    vehicleId = 'UNKNOWN',
    vehicleName,
    vehicleHref = '#',
    driverName,
    driverHref = '#',
    deviceName,
    deviceHref = '#',
    status,
    focused,
    selected,
    hidden,
    setFocusVehicle,
    toggleHideVehicle,
  }) {
    const handleFocusClick = useCallback(
      () => setFocusVehicle?.(vehicleId),
      [setFocusVehicle, vehicleId]
    );

    const handleHideClick = useCallback(
      () => toggleHideVehicle?.(vehicleId),
      [toggleHideVehicle, vehicleId]
    );

    return (
      <Card
        id={vehicleId}
        variant='outlined'
        sx={{
          display: 'flex',
          border: t => (selected ? `2px solid ${t.palette.primary.main}` : undefined),
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Link typography='h6' href={vehicleHref} underline='hover'>
            {vehicleName}
          </Link>

          <Link href={driverHref} underline='hover'>
            {driverName}
          </Link>

          <Link
            variant='body2'
            color='text.secondary'
            href={deviceHref}
            underline='hover'
          >
            {deviceName}
          </Link>

          <Typography
            color={status ? VehicleStatusToThemeColor[status] : undefined}
            fontWeight='medium'
          >
            {status ? VehicleStatusEnum[status] : `Unknown`}
          </Typography>
        </CardContent>
        <Stack gap={1} justifyContent='center' sx={{ p: 1 }}>
          <Tooltip title={focused ? 'Release' : 'Locate'}>
            <IconButton color='primary' onClick={handleFocusClick}>
              {focused ? <GpsFixedOutlined /> : <GpsNotFixedOutlined />}
            </IconButton>
          </Tooltip>
          <Tooltip title={hidden ? 'Show' : 'Hide'}>
            <IconButton color='primary' onClick={handleHideClick}>
              {hidden ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          </Tooltip>
        </Stack>
      </Card>
    );
  }
);
