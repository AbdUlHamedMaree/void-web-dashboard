import type { ThemeComponent } from '$logic/types';

export const MuiTableHead: ThemeComponent<'MuiTableHead'> = theme => ({
  styleOverrides: {
    root: {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.neutral,
    },
  },
});
