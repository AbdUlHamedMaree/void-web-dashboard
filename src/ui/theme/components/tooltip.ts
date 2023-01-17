import type { ThemeComponent } from '$logic/types';

export const MuiTooltip: ThemeComponent<'MuiTooltip'> = theme => ({
  styleOverrides: {
    tooltip: {
      backgroundColor: theme.palette.grey[800],
    },
    arrow: {
      color: theme.palette.grey[800],
    },
  },
});
