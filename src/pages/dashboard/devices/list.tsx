import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { routes } from '$routes';
import { TextColumn } from '@mrii/react-table-builder';
import type { AppActionsColumnClickHandler } from '$ui/components/dumb/action-column';
import { AppActionsColumn } from '$ui/components/dumb/action-column';
import { ListPage } from '$ui/components/dumb/list-page';
import { DriverNameColumn, VehicleNameColumn } from '$ui/components/dumb/columns';
import { useRouter } from 'next/router';
import { useDevices, useDevicesStore } from '$logic/state/devices';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const devices = useDevices();
  const deleteDevice = useDevicesStore(useCallback(s => s.deleteDevice, []));

  const showHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(routes.dashboard.devices['[id]'].view({ query: { id } })),
    [push]
  );

  const editHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(routes.dashboard.devices['[id]'].edit({ query: { id } })),
    [push]
  );

  const deleteHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        deleteDevice(id),
    [deleteDevice]
  );

  return (
    <ListPage
      resourceTitle='Devices'
      newButtonUrl={routes.dashboard.devices.new()}
      rows={devices ?? []}
    >
      <TextColumn field='id' />
      <TextColumn field='imei' />
      <TextColumn field='name' />
      <TextColumn field='model' />
      <DriverNameColumn />
      <VehicleNameColumn />
      <AppActionsColumn
        onShow={showHandler}
        onEdit={editHandler}
        onDelete={deleteHandler}
      />
    </ListPage>
  );
};

Page.layout = DashboardLayout;

export default Page;
