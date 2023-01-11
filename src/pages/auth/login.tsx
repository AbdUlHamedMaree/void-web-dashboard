import type { NextPage } from 'next/types';
import { AuthLoginFormSection } from '$ui/components/sections/auth/login';
import { Box } from '@mui/material';
import { ResponsiveContainer } from '$ui/components/shared/responsive-container';
import { Logo } from '$ui/components/shared/logo';

const LoginPage: NextPage = () => {
  return (
    <ResponsiveContainer
      variant='s'
      inset
      sx={{
        width: '100%',
        maxWidth: 540,
        alignSelf: 'center',
        my: 'auto',
      }}
    >
      <Logo textAlign='center' fontSize={[96, 192, 192, 192, 192]} />
      <Box sx={{ mt: 4 }}>
        <AuthLoginFormSection />
      </Box>
    </ResponsiveContainer>
  );
};

export default LoginPage;
