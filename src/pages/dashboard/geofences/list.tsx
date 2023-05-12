import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { routes } from '$routes';

import { TextColumn } from '@mrii/react-table-builder';
import type { AppActionsColumnClickHandler } from '$ui/components/dumb/action-column';
import { AppActionsColumn } from '$ui/components/dumb/action-column';
import { ListPage } from '$ui/components/dumb/list-page';
import { useRouter } from 'next/router';
import { useGeofences, useGeofencesStore } from '$logic/state/geofences';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const geofences = useGeofences();
  const deleteGeofence = useGeofencesStore(useCallback(s => s.deleteGeofence, []));

  const showHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(routes.dashboard.geofences['[id]'].view({ query: { id } })),
    [push]
  );

  const editHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(routes.dashboard.geofences['[id]'].edit({ query: { id } })),
    [push]
  );

  const deleteHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        deleteGeofence(id),
    [deleteGeofence]
  );

  return (
    <ListPage
      resourceTitle='Geofences'
      newButtonUrl={routes.dashboard.geofences.new()}
      rows={geofences}
    >
      <TextColumn field='id' />
      <TextColumn field='name' />
      <TextColumn field='description' width={230} />
      <TextColumn field='type' />
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
  subject: 'Geofence',
};

export default Page;
