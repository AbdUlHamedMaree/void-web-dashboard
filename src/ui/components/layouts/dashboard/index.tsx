import React, { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
//
import { DashboardLayoutNavbar } from './navbar';
import { DashboardLayoutSidebar } from './sidebar';
import { Scrollbar } from '$ui/components/shared/scrollbar';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const RootStyle = styled('div')({
  height: '100%',
});

const MainStyle = styled('div')(({ theme }) => ({
  paddingTop: APP_BAR_MOBILE + 24,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
  },
}));

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {};

export const DashboardLayout: React.FC<React.PropsWithChildren<DashboardLayoutProps>> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardLayoutNavbar onOpenSidebar={() => setOpen(true)} />
      <DashboardLayoutSidebar
        isOpenSidebar={open}
        onCloseSidebar={() => setOpen(false)}
      />
      <Scrollbar>
        <MainStyle>{children}</MainStyle>
      </Scrollbar>
    </RootStyle>
  );
};
