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
        404
      </Typography>
      <Typography textAlign='center' variant='h2'>
        Not Found!
      </Typography>
      <Typography textAlign='center' color='text.secondary' sx={{ mt: 2, maxWidth: 400 }}>
        Sorry, we couldn&apos;t find the {item} you&apos;re looking for. Perhaps
        you&apos;ve mistyped the URL? Be sure to check your spelling.
      </Typography>
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
              Home
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
};
