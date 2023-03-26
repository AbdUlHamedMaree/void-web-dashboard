import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

import type { DashboardUsersNewEditFormProps } from '$ui/components/sections/dashboard/users/new&edit';
import { DashboardUsersNewEditForm } from '$ui/components/sections/dashboard/users/new&edit';
import { useUsersStore } from '$logic/state/users';
import { unique } from '@mrii/mock';
import { useRouter } from 'next/router';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const addUser = useUsersStore(useCallback(s => s.addUser, []));

  const handleSubmit = useCallback<
    Exclude<DashboardUsersNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      addUser({
        id: unique(5),
        ...values,
      });

      push('.');
    },
    [addUser, push]
  );

  return <DashboardUsersNewEditForm mode='new' onSubmit={handleSubmit} />;
};

Page.layout = DashboardLayout;

export default Page;
