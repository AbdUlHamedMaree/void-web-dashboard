import type { ThemeComponent } from '$logic/types';

export const MuiCssBaseline: ThemeComponent<'MuiCssBaseline'> = theme => ({
  styleOverrides: {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    html: {
      WebkitOverflowScrolling: 'touch',
    },
    'html, body, #__next': {
      width: '100%',
      height: '100%',
    },
    input: {
      '&[type=number]': {
        MozAppearance: 'textfield',
        '&::-webkit-outer-spin-button': {
          margin: 0,
          WebkitAppearance: 'none',
        },
        '&::-webkit-inner-spin-button': {
          margin: 0,
          WebkitAppearance: 'none',
        },
      },
    },
    img: {
      display: 'block',
      maxWidth: '100%',
    },
    // for DataGrid
    '.MuiDataGrid-columnHeaders': {
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.neutral,
    },
  },
});
