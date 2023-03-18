import type { NextPage } from 'next/types';
import { AuthLoginFormSection } from '$ui/components/sections/auth/login';
import { Box } from '@mui/material';
import { ResponsiveContainer } from '$ui/components/shared/responsive-container';
import { Logo } from '$ui/components/shared/logo';

// const postsQueryDocument = graphql(`
//   query Devices {
//     devices {
//       name
//     }
//   }
// `);

// const postsQueryDoument = graphql(`
//   mutation Login($payload: LoginPayload!) {
//     login(payload: $payload) {
//       accessToken
//       refreshToken
//       user {
//         email
//         firstName
//         lastName
//         phoneNumber
//       }
//     }
//   }
// `);

const LoginPage: NextPage = () => {
  // const { data } = useGraphQL(postsQueryDocument);
  // const { mutateAsync } = useGraphQLMutation(postsQueryDoument);
  // mutateAsync({ payload: { email: 'string', password: 'password' } });
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
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
    </Box>
  );
};

export default LoginPage;
