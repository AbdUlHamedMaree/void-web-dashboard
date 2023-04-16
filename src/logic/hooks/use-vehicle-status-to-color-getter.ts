import type { VehicleStatusUnion } from '$logic/models/vehicle';
import { useTheme } from '@mui/material';
import { useMemo } from 'react';

export const useVehicleStatusToColorDict = () => {
  const theme = useTheme();

  return useMemo<Record<VehicleStatusUnion, string>>(
    () => ({
      stopped: theme.palette.error.main,
      idle: theme.palette.warning.main,
      moving: theme.palette.success.main,
    }),
    [theme.palette.error.main, theme.palette.success.main, theme.palette.warning.main]
  );
};
