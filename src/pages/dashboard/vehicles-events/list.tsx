import React from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { DefaultContainer } from '$ui/components/dumb/default-container';
import { Box, Card, Tab } from '@mui/material';
import { Typography } from '@mui/material';
import { GreenDrivingVehiclesEventsSection } from '$ui/components/sections/dashboard/vehicles-events/green-driving';
import { SmartTabs } from '$ui/components/shared/smart-tabs/smart-tabs';
import { SmartTabBody } from '$ui/components/shared/smart-tabs/smart-tab-body';
import { SmartTabsProvider } from '$ui/components/shared/smart-tabs/smart-tabs-provider';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  return (
    <DefaultContainer maxWidth='lg'>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant='h4'>Events</Typography>
      </Box>
      <Card sx={{ mt: 4 }}>
        <SmartTabsProvider initialTabKey='green-driving'>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <SmartTabs>
              <Tab label='Green Driving' value='green-driving' />
              <Tab label='Geofence' value='geofence' />
            </SmartTabs>
          </Box>
          <SmartTabBody value='green-driving' index={0}>
            <GreenDrivingVehiclesEventsSection />
          </SmartTabBody>
          <SmartTabBody value='geofence' index={1}>
            <GreenDrivingVehiclesEventsSection />
          </SmartTabBody>
        </SmartTabsProvider>
      </Card>
    </DefaultContainer>
  );
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'read',
  subject: 'VehicleEvents',
};

export default Page;
