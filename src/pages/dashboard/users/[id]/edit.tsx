import React, { useCallback, useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import type { DashboardUsersNewEditFormProps } from '$ui/components/sections/dashboard/users/new&edit';
import { DashboardUsersNewEditForm } from '$ui/components/sections/dashboard/users/new&edit';
import { useRouter } from 'next/router';
import { useUser, useUsersStore } from '$logic/state/users';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query, push } = useRouter();
  const id = query.id as string;

  const user = useUser(id);
  const editUser = useUsersStore(useCallback(s => s.editUser, []));

  const defaultValues = useMemo<DashboardUsersNewEditFormProps['defaultValues']>(
    () => user,
    [user]
  );

  const handleSubmit = useCallback<
    Exclude<DashboardUsersNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      const user = {
        ...values,
      };

      editUser(id, user);
      push('..');
    },
    [editUser, id, push]
  );

  if (!user) return null;

  return (
    <DashboardUsersNewEditForm
      mode='edit'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    />
  );
};

Page.layout = DashboardLayout;

export default Page;
