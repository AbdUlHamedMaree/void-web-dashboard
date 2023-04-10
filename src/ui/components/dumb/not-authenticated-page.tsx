import { routes } from '$routes';
import { Button } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextLinkComposed } from '../shared/link';

export type NotAuthenticatedPageProps = {
  item?: string;
};

export const NotAuthenticatedPage: React.FC<NotAuthenticatedPageProps> = ({
  item = 'page',
}) => {
  const { back } = useRouter();

  return (
    <Box
      position='fixed'
      zIndex={99999}
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      p={2}
      sx={{
        inset: 0,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography fontFamily='Akronim' lineHeight={1} fontSize={[150, 200, 200, 250]}>
        401
      </Typography>
      <Typography textAlign='center' variant='h2'>
        Not Authenticated!
      </Typography>
      <Typography textAlign='center' color='text.secondary' sx={{ mt: 2 }}>
        You need to login first to access this {item}
      </Typography>
      <Button
        LinkComponent={NextLinkComposed}
        variant='contained'
        color='primary'
        size='large'
        href={routes.auth.login().link}
        sx={{ mt: 4 }}
      >
        Login
      </Button>
    </Box>
  );
};
