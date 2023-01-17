import type { ThemeComponent } from '$logic/types';

export const MuiAutocomplete: ThemeComponent<'MuiAutocomplete'> = theme => ({
  styleOverrides: {
    paper: {
      boxShadow: theme.customShadows.z20,
    },
  },
});
