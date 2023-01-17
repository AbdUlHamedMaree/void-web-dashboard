import type { TypographyProps } from '@mui/material';
import { Typography } from '@mui/material';

export type LogoProps = {} & TypographyProps;

export const Logo: React.FC<LogoProps> = props => {
  return (
    <Typography {...props} fontFamily='Akronim'>
      VOID
    </Typography>
  );
};
