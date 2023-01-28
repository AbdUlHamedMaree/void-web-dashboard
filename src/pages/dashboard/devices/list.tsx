import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { routes } from '$routes';
import { TextColumn } from '@mrii/react-table-builder';
import { array, number } from '@scandinavia/mock';
import { AppActionsColumn } from '$ui/components/dumb/action-column';
import { mockDevice } from '$logic/models/device';
import { ListPage } from '$ui/components/dumb/list-page';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const devices = useMemo(() => array(mockDevice, number(10, 40)), []);

  return (
    <ListPage
      resourceTitle='Devices'
      newButtonUrl={routes.dashboard.devices.new()}
      rows={devices}
    >
      <TextColumn field='id' />
      <TextColumn field='imei' />
      <TextColumn field='name' />
      <TextColumn field='model' />
      <AppActionsColumn />
    </ListPage>
  );
};

Page.layout = DashboardLayout;

export default Page;
