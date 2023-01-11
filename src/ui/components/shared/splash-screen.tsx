import { Typography } from '@mui/material';

export type SplashScreenProps = {
  children?: React.ReactNode;
};

export const SplashScreen: React.FC<SplashScreenProps> = () => {
  return (
    <Typography variant='h1' m='auto'>
      VOID
    </Typography>
  );
};
