import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { routes } from '$routes';

import { TextColumn } from '@mrii/react-table-builder';
import type { AppActionsColumnClickHandler } from '$ui/components/dumb/action-column';
import { AppActionsColumn } from '$ui/components/dumb/action-column';
import { ListPage } from '$ui/components/dumb/list-page';
import {
  DeviceNameColumn,
  DriverNameColumn,
  VehicleNameColumn,
} from '$ui/components/dumb/columns';
import { useRouter } from 'next/router';
import { useTrips } from '$logic/state/trips';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const trips = useTrips();

  const showHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(routes.dashboard['trips-history']['[id]'].view({ query: { id } })),
    [push]
  );

  return (
    <ListPage resourceTitle='Trips' rows={trips}>
      <TextColumn field='id' />
      <VehicleNameColumn />
      <DriverNameColumn />
      <DeviceNameColumn />
      <AppActionsColumn onShow={showHandler} disableEdit disableDelete />
    </ListPage>
  );
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'read',
  subject: 'Role',
};

export default Page;
