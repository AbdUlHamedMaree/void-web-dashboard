import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { routes } from '$routes';
import { TextColumn } from '@mrii/react-table-builder';
import type { AppActionsColumnClickHandler } from '$ui/components/dumb/action-column';
import { AppActionsColumn } from '$ui/components/dumb/action-column';
import { ListPage } from '$ui/components/dumb/list-page';
import { DeviceNameColumn, VehicleNameColumn } from '$ui/components/dumb/columns';
import { useRouter } from 'next/router';
import { useDrivers, useDriversStore } from '$logic/state/drivers';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const drivers = useDrivers();
  const deleteDriver = useDriversStore(useCallback(s => s.deleteDriver, []));

  const showHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(routes.dashboard.drivers['[id]'].view({ query: { id } })),
    [push]
  );

  const editHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(routes.dashboard.drivers['[id]'].edit({ query: { id } })),
    [push]
  );

  const deleteHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        deleteDriver(id),
    [deleteDriver]
  );

  return (
    <ListPage
      resourceTitle='Drivers'
      newButtonUrl={routes.dashboard.drivers.new()}
      rows={drivers}
    >
      <TextColumn field='id' />
      <TextColumn field='name' />
      <TextColumn field='email' />
      <TextColumn field='phoneNumber' />
      <VehicleNameColumn />
      <DeviceNameColumn />
      <AppActionsColumn
        onShow={showHandler}
        onEdit={editHandler}
        onDelete={deleteHandler}
      />
    </ListPage>
  );
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'read',
  subject: 'Driver',
};

export default Page;
