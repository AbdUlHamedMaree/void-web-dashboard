import React from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { useRouter } from 'next/router';
import { useDevice } from '$logic/state/devices';
import { ViewPage } from '$ui/components/dumb/view-page';
import { KeyValueDetails } from '$ui/components/dumb/key-value-details';
import { Grid } from '@mui/material';
import { NotFoundPage } from '$ui/components/dumb/not-found-page';
import { routes } from '$routes';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query } = useRouter();
  const id = query.id;

  const device = useDevice(id);

  if (!device) return <NotFoundPage item='Device' />;

  return (
    <ViewPage title='Device Details'>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <KeyValueDetails label='Name' value={device.name} />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails label='Model' value={device.model} />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails label='IMEI' value={device.imei} />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails
            label='Driver Name'
            value={device.driver?.name ?? '-'}
            href={
              routes.dashboard.drivers['[id]'].view({ query: { id: device.driver?.id } })
                .link
            }
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails
            label='Vehicle Name'
            value={device.vehicle?.name ?? '-'}
            href={
              routes.dashboard.vehicles['[id]'].view({
                query: { id: device.vehicle?.id },
              }).link
            }
          />
        </Grid>
      </Grid>
    </ViewPage>
  );
};

Page.layout = DashboardLayout;

export default Page;
