import { Color } from '$logic/types/color';
import {
  createTheme,
  PaletteColorOptions,
  responsiveFontSizes,
} from '@mui/material/styles';
import { primaryPalette } from './primary';
import { components } from './components';

const colorToPaletteColor = (color: Color): PaletteColorOptions => ({
  ...color,
  A100: color[100],
  A200: color[200],
  A400: color[400],
  A700: color[700],
  light: color[300],
  main: color[400],
  dark: color[500],
});

export const theme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "'Open Sans', 'Cairo', sans-serif",
    },
    palette: {
      primary: colorToPaletteColor(primaryPalette),
      info: {
        main: '#0984e3',
      },
      success: {
        main: '#00b894',
      },
      warning: {
        main: '#fdcb6e',
      },
      error: {
        main: '#d63031',
      },
    },
    shape: {
      borderRadius: 8,
    },
    components,
  })
);
