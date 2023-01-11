import { Components } from '@mui/material';

export const MuiCssBaseline: Components['MuiCssBaseline'] = {
  styleOverrides: {
    '*': {
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
    },
    html: {
      WebkitOverflowScrolling: 'touch',
    },
    '#__next': {
      display: 'flex',
      flexDirection: 'column',
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
  },
};
