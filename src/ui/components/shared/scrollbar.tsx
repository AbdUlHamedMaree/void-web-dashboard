import SimpleBarReact, { Props as SimpleBarReactProps } from 'simplebar-react';
import { alpha, styled } from '@mui/material/styles';
import { Box, BoxProps, SxProps, Theme } from '@mui/material';
import React, { Ref, useMemo } from 'react';
import { isMobile } from '$modules/checks';

const RootStyle = styled('div')(() => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}));

const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));

export type ScrollbarProps = {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
} & SimpleBarReactProps &
  BoxProps & { ref?: Ref<SimpleBarReact>; color?: string };

export const Scrollbar: React.FC<ScrollbarProps> = ({ children, ...other }) => {
  const mobile = useMemo(() => isMobile(), []);
  if (mobile) {
    return (
      <Box {...other} sx={{ overflowX: 'auto', ...other.sx }}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} {...other}>
        {children as string}
      </SimpleBarStyle>
    </RootStyle>
  );
};
