import React from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { useRouter } from 'next/router';
import { useDriver } from '$logic/state/drivers';
import { ViewPage } from '$ui/components/dumb/view-page';
import { KeyValueDetails } from '$ui/components/dumb/key-value-details';
import { Grid } from '@mui/material';
import { NotFoundPage } from '$ui/components/dumb/not-found-page';
import { routes } from '$routes';
import { SplashScreen } from '$ui/components/shared/splash-screen';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query, isReady } = useRouter();
  const id = query.id;

  const driver = useDriver(id);

  if (!isReady) return <SplashScreen />;

  if (!driver) return <NotFoundPage item='Driver' />;

  return (
    <ViewPage title='Device Details'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <KeyValueDetails label='Name' value={driver?.name} />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails label='Email' value={driver?.email} />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails label='Phone Number' value={driver?.phoneNumber} />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails
            label='Vehicle Name'
            value={driver?.vehicle?.name ?? '-'}
            href={
              routes.dashboard.vehicles['[id]'].view({
                query: { id: driver.vehicle?.id },
              }).link
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails
            label='Device Name'
            value={driver?.device?.name ?? '-'}
            href={
              routes.dashboard.devices['[id]'].view({
                query: { id: driver.device?.id },
              }).link
            }
          />
        </Grid>
      </Grid>
    </ViewPage>
  );
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'read',
  subject: 'Driver',
};

export default Page;
