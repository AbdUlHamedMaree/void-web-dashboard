import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { routes } from '$routes';

import { DateColumn, SelectColumn, TextColumn } from '@mrii/react-table-builder';
import type { AppActionsColumnClickHandler } from '$ui/components/dumb/action-column';
import { AppActionsColumn } from '$ui/components/dumb/action-column';
import { ListPage } from '$ui/components/dumb/list-page';
import { DeviceNameColumn, DriverNameColumn } from '$ui/components/dumb/columns';
import { useRouter } from 'next/router';
import { useVehicles, useVehiclesStore } from '$logic/state/vehicles';
import { VehicleStatusEnum } from '$logic/models/vehicle';

const VehicleStatusItems = Object.entries(VehicleStatusEnum).map(([value, label]) => ({
  value,
  label,
}));

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const vehicles = useVehicles();
  const deleteVehicle = useVehiclesStore(useCallback(s => s.deleteVehicle, []));

  const showHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(routes.dashboard.vehicles['[id]'].view({ query: { id } })),
    [push]
  );

  const editHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(routes.dashboard.vehicles['[id]'].edit({ query: { id } })),
    [push]
  );

  const deleteHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        deleteVehicle(id),
    [deleteVehicle]
  );

  return (
    <ListPage
      resourceTitle='Vehicles'
      newButtonUrl={routes.dashboard.vehicles.new()}
      rows={vehicles}
    >
      <TextColumn field='id' />
      <TextColumn field='name' />
      <TextColumn field='vin' />
      <TextColumn field='brand' />
      <TextColumn field='model' />
      <DateColumn field='manufacturingDate' format='yyyy' />
      <TextColumn field='plateNumber' />
      <SelectColumn field='status' items={VehicleStatusItems} />
      <DriverNameColumn />
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
  subject: 'Role',
};

export default Page;
