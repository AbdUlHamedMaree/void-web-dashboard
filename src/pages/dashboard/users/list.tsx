import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { routes } from '$routes';
import { TextColumn } from '@mrii/react-table-builder';
import type { AppActionsColumnClickHandler } from '$ui/components/dumb/action-column';
import { AppActionsColumn } from '$ui/components/dumb/action-column';
import { ListPage } from '$ui/components/dumb/list-page';
import { useRouter } from 'next/router';
import { useUsers, useUsersStore } from '$logic/state/users';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const users = useUsers();
  const deleteUser = useUsersStore(useCallback(s => s.deleteUser, []));

  const showHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(routes.dashboard.users['[id]'].view({ query: { id } })),
    [push]
  );

  const editHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        push(routes.dashboard.users['[id]'].edit({ query: { id } })),
    [push]
  );

  const deleteHandler = useCallback<AppActionsColumnClickHandler>(
    ({ id }) =>
      () =>
        deleteUser(id),
    [deleteUser]
  );

  return (
    <ListPage
      resourceTitle='Users'
      newButtonUrl={routes.dashboard.users.new()}
      rows={users}
    >
      <TextColumn field='id' />
      <TextColumn field='name' />
      <TextColumn field='email' />
      <TextColumn field='role' />
      <TextColumn field='phoneNumber' />
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
  subject: 'User',
};

export default Page;
