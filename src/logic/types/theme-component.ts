import type { Theme } from '@mui/material';
import type { Components } from '@mui/material';

export type ThemeComponent<TComponentKey extends keyof Components> = (
  theme: Theme
) => Components[TComponentKey];
