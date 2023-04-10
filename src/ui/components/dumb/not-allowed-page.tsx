import { routes } from '$routes';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextLinkComposed } from '../shared/link';

export type NotAllowedPageProps = {
  item?: string;
  disableBackButton?: boolean;
  disableHomeButton?: boolean;
};

export const NotAllowedPage: React.FC<NotAllowedPageProps> = ({
  item = 'page',
  disableBackButton,
  disableHomeButton,
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
        403
      </Typography>
      <Typography textAlign='center' variant='h2'>
        Not Allowed!
      </Typography>
      <Typography textAlign='center' color='text.secondary' sx={{ mt: 2 }}>
        The {item} you&apos;re trying access has restricted access.
        <br />
        Please refer to your system administrator.
      </Typography>
      <Typography textAlign='center' sx={{ mt: 2 }}></Typography>
      {(!disableBackButton || !disableHomeButton) && (
        <Stack direction='row' spacing={2} sx={{ pt: 4 }}>
          {!disableBackButton && (
            <Button variant='outlined' color='primary' size='large' onClick={back}>
              Back
            </Button>
          )}
          {!disableHomeButton && (
            <Button
              LinkComponent={NextLinkComposed}
              variant='contained'
              color='primary'
              size='large'
              href={routes.dashboard.live.index().link}
            >
              Back Home
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
};
