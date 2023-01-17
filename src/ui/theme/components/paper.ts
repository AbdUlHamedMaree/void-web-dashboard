import type { ThemeComponent } from '$logic/types';

export const MuiPaper: ThemeComponent<'MuiPaper'> = theme => ({
  defaultProps: {
    elevation: 0,
  },
  styleOverrides: {
    root: {
      backgroundImage: 'none',
    },
  },
});
