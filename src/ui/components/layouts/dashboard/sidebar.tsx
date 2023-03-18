import { useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer, Typography, Avatar } from '@mui/material';
import { navConfig } from './nav-config';
import { Scrollbar } from '$ui/components/shared/scrollbar';
import { useRouter } from 'next/router';
import { NavSection } from '$ui/components/shared/nav-section';
import { Logo } from '$ui/components/shared/logo';
import { Link } from '$ui/components/shared/link';
import { routes } from '$routes';
import { DRAWER_WIDTH } from '$logic/constants';
import { useIsDesktop } from '$logic/hooks/use-is-desktop';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH,
  },
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  // backgroundColor: theme.palette.grey[500_12],
  backgroundColor: theme.palette.grey[200],
}));

export type DashboardLayoutSidebarProps = {
  isOpenSidebar?: boolean;
  onCloseSidebar?: () => unknown;
};

export const DashboardLayoutSidebar: React.FC<DashboardLayoutSidebarProps> = ({
  isOpenSidebar,
  onCloseSidebar,
}) => {
  const { pathname } = useRouter();

  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const content = useMemo(
    () => (
      <Scrollbar>
        <Box sx={{ px: 2.5, py: 1 }}>
          <Link
            underline='none'
            href={routes.dashboard.index()}
            sx={{ color: 'text.primary' }}
          >
            <Logo textAlign='center' fontSize={64} />
          </Link>
        </Box>

        <Box sx={{ mb: 5, mx: 2.5 }}>
          <AccountStyle>
            <Avatar src='/__mock/john-doe.png' alt='John Doe' />
            <Box sx={{ ml: 2 }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                {'John Doe'}
              </Typography>
              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                {'Administrator'}
              </Typography>
            </Box>
          </AccountStyle>
        </Box>
        <NavSection navConfig={navConfig} />

        <Box sx={{ flexGrow: 1 }} />
      </Scrollbar>
    ),
    []
  );

  return (
    <RootStyle>
      {!isDesktop && (
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH },
          }}
        >
          {content}
        </Drawer>
      )}

      {isDesktop && (
        <Drawer
          open
          variant='persistent'
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {content}
        </Drawer>
      )}
    </RootStyle>
  );
};
