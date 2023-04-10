import { Box } from '@mui/system';
import { Logo } from './logo';

export type SplashScreenProps = {};

export const SplashScreen: React.FC<SplashScreenProps> = () => {
  return (
    <Box
      position='fixed'
      display='flex'
      justifyContent='center'
      alignItems='center'
      zIndex={99999}
      sx={{ inset: 0, backgroundColor: 'background.paper' }}
    >
      <Logo fontSize={[100, 150, 200, 250]} />
    </Box>
  );
};
