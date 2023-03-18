import React from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { useRouter } from 'next/router';
import { useUser } from '$logic/state/users';
import { ViewPage } from '$ui/components/dumb/view-page';
import { KeyValueDetails } from '$ui/components/dumb/key-value-details';
import { Grid } from '@mui/material';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query } = useRouter();
  const id = query.id;

  const user = useUser(id);

  return (
    <ViewPage title='Device Details'>
      <Grid container spacing={2}>
        <Grid item md={6} xs={12}>
          <KeyValueDetails label='Name' value={user?.name} />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails label='Phone Number' value={user?.role} />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails label='Email' value={user?.email} />
        </Grid>
        <Grid item md={6} xs={12}>
          <KeyValueDetails label='Phone Number' value={user?.phoneNumber} />
        </Grid>
      </Grid>
    </ViewPage>
  );
};

Page.layout = DashboardLayout;

export default Page;
