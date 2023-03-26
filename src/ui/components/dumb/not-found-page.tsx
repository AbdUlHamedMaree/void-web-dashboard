import { routes } from '$routes';
import { Button } from '@mui/material';
import { Stack } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { NextLinkComposed } from '../shared/link';

export type NotFoundPageProps = {
  item?: string;
  disableBackButton?: boolean;
  disableHomeButton?: boolean;
};

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  item = 'Page',
  disableBackButton,
  disableHomeButton,
}) => {
  const { back } = useRouter();
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Typography fontFamily='Akronim' lineHeight={1} fontSize={[150, 200, 200, 250]}>
        404
      </Typography>
      <Typography textAlign='center' variant='h2'>
        <Box component='span' color='error.main'>
          Opps,
        </Box>{' '}
        {item} Not Found!
      </Typography>
      <Typography textAlign='center' variant='h5' sx={{ mt: 2 }}>
        The {item} you&apos;re looking for doesn&apos;t exist!
      </Typography>
      {!disableBackButton && !disableHomeButton && (
        <Stack direction='row' spacing={2} sx={{ pt: 2 }}>
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
