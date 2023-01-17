import type { ThemeComponent } from '$logic/types';

export const MuiTypography: ThemeComponent<'MuiTypography'> = theme => {
  return {
    styleOverrides: {
      paragraph: {
        marginBottom: theme.spacing(2),
      },
      gutterBottom: {
        marginBottom: theme.spacing(1),
      },
    },
  };
};
