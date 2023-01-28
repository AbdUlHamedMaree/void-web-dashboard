import React, { useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { routes } from '$routes';
import { TextColumn } from '@mrii/react-table-builder';
import { mockUser } from '$logic/models/user';
import { array, number } from '@scandinavia/mock';
import { AppActionsColumn } from '$ui/components/dumb/action-column';
import { ListPage } from '$ui/components/dumb/list-page';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const users = useMemo(() => array(mockUser, number(10, 40)), []);

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
      <AppActionsColumn />
    </ListPage>
  );
};

Page.layout = DashboardLayout;

export default Page;
