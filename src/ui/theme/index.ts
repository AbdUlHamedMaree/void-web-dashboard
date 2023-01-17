import { createTheme } from '@mui/material/styles';
import { components } from './components';
import { shadows } from './shadows';
import { palette } from './palette';
import { customShadows } from './custom-shadows';
import { typography } from './typography';

declare module '@mui/material' {
  interface ThemeOptions {
    customShadows?: typeof customShadows;
  }
  interface Theme {
    customShadows: typeof customShadows;
  }
}

export const theme = createTheme({
  palette,
  shape: {
    borderRadius: 8,
  },
  typography,

  shadows,
  customShadows,
});

theme.components = components(theme);
