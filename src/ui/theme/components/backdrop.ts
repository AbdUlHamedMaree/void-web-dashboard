import type { ThemeComponent } from '$logic/types';
import { alpha } from '@mui/material';

export const MuiBackdrop: ThemeComponent<'MuiBackdrop'> = theme => ({
  styleOverrides: {
    root: {
      backgroundColor: alpha(theme.palette.grey[800], 0.8),
    },
    invisible: {
      background: 'transparent',
    },
  },
});
