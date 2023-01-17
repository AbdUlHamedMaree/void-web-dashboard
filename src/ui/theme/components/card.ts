import type { ThemeComponent } from '$logic/types';

export const MuiCard: ThemeComponent<'MuiCard'> = theme => ({
  styleOverrides: {
    root: {
      boxShadow: theme.customShadows.card,
      borderRadius: Number(theme.shape.borderRadius) * 2,
      position: 'relative',
      zIndex: 0, // Fix Safari overflow: hidden with border radius
    },
  },
});

export const MuiCardHeader: ThemeComponent<'MuiCardHeader'> = theme => ({
  defaultProps: {
    titleTypographyProps: { variant: 'h6' },
    subheaderTypographyProps: { variant: 'body2' },
  },
  styleOverrides: {
    root: {
      padding: theme.spacing(3, 3, 0),
    },
  },
});

export const MuiCardContent: ThemeComponent<'MuiCardContent'> = theme => ({
  styleOverrides: {
    root: {
      padding: theme.spacing(3),
    },
  },
});
