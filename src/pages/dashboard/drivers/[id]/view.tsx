import React from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { useRouter } from 'next/router';
import { useDriver } from '$logic/state/drivers';
import { ViewPage } from '$ui/components/dumb/view-page';
import { KeyValueDetails } from '$ui/components/dumb/key-value-details';
import { Grid } from '@mui/material';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query } = useRouter();
  const id = query.id;

  const driver = useDriver(id);

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
          <KeyValueDetails label='Vehicle Name' value={driver?.vehicle?.name ?? '-'} />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails label='Device Name' value={driver?.device?.name ?? '-'} />
        </Grid>
      </Grid>
    </ViewPage>
  );
};

Page.layout = DashboardLayout;

export default Page;
