// material
import { alpha, styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
// components
//
import { DashboardLayoutSearchbar } from './searchbar';
import { DashboardLayoutAccountPopover } from './account-popover';
import { Menu } from '@mui/icons-material';
import { APP_BAR_DESKTOP, APP_BAR_MOBILE, DRAWER_WIDTH } from '$logic/constants';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: theme.shadows[4],
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APP_BAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APP_BAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export type DashboardLayoutNavbarProps = { onOpenSidebar?: () => unknown };

export const DashboardLayoutNavbar: React.FC<DashboardLayoutNavbarProps> = ({
  onOpenSidebar,
}) => {
  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton
          onClick={onOpenSidebar}
          sx={{ mr: 1, color: 'text.primary', display: { lg: 'none' } }}
        >
          <Menu />
        </IconButton>

        <DashboardLayoutSearchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction='row' alignItems='center' spacing={{ xs: 0.5, sm: 1.5 }}>
          {/* <DashboardLayoutLanguagePopover /> */}
          {/* <DashboardLayoutNotificationsPopover /> */}
          <DashboardLayoutAccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};
