import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { routes } from '$routes';
import { array, number } from '@scandinavia/mock';
import { mockVehicle } from '$logic/models/vehicle';

import { TextColumn } from '@mrii/react-table-builder';
import { AppActionsColumn } from '$ui/components/dumb/action-column';
import { ListPage } from '$ui/components/dumb/list-page';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const vehicles = useMemo(() => array(mockVehicle, number(10, 40)), []);

  return (
    <ListPage
      resourceTitle='Vehicles'
      newButtonUrl={routes.dashboard.vehicles.new()}
      rows={vehicles}
    >
      <TextColumn field='id' />
      <TextColumn field='name' />
      <TextColumn field='plateNumber' />
      <TextColumn field='model' />
      <AppActionsColumn />
    </ListPage>
  );
};

Page.layout = DashboardLayout;

export default Page;
