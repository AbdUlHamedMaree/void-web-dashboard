import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';
import { useMemo } from 'react';

export type ResponsiveContainerVariant = 's' | 'm' | 'l';

export type ResponsiveContainerProps = {
  variant?: ResponsiveContainerVariant;
  inset?: boolean;
  children?: React.ReactNode;
} & BoxProps;

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  variant = 'l',
  inset = false,
  children,
  ...props
}) => {
  const responsiveStyle = useMemo(
    () => (inset ? { px: responsiveValues[variant] } : { mx: responsiveValues[variant] }),
    [inset, variant]
  );
  return (
    <Box {...props} sx={{ ...responsiveStyle, ...props.sx }}>
      {children}
    </Box>
  );
};

const responsiveValues: Record<
  ResponsiveContainerVariant,
  [number, number, number, number, number]
> = {
  s: [1, 2, 2, 4, 4],
  m: [1, 2, 4, 6, 10],
  l: [1, 4, 8, 16, 32],
};
