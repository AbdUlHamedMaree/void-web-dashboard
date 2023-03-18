import React, { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
//
import { DashboardLayoutNavbar } from './navbar';
import { DashboardLayoutSidebar } from './sidebar';
import { Scrollbar } from '$ui/components/shared/scrollbar';
import { APP_BAR_DESKTOP, APP_BAR_MOBILE } from '$logic/constants';

// ----------------------------------------------------------------------

const RootStyle = styled('div')({
  display: 'flex',
  height: '100%',
  overflow: 'hidden',
});

const MainStyle = styled('div')(({ theme }) => ({
  height: '100%',
  paddingTop: APP_BAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP,
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
