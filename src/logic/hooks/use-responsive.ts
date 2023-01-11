import { Breakpoint, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useMemo } from 'react';

export type OperationUnion = 'up' | 'down' | 'between' | 'only';

export const useResponsive = (op: OperationUnion, key: Breakpoint, end?: Breakpoint) => {
  const theme = useTheme();

  const query = useMemo(() => {
    switch (op) {
      case 'up':
        return theme.breakpoints.up(key);
      case 'down':
        return theme.breakpoints.down(key);
      case 'between':
        return theme.breakpoints.between(key, end!);
      case 'only':
        return theme.breakpoints.only(key);
    }
  }, [end, key, op, theme.breakpoints]);

  return useMediaQuery(query);
};
