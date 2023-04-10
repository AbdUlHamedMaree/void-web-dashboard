import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

import type { DashboardUsersNewEditFormProps } from '$ui/components/sections/dashboard/users/new&edit';
import { DashboardUsersNewEditForm } from '$ui/components/sections/dashboard/users/new&edit';
import { useUsersStore } from '$logic/state/users';
import { unique } from '@mrii/mock';
import { useRouter } from 'next/router';
import { useRolesStore } from '$logic/state/roles';
import { toast } from 'react-toastify';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const addUser = useUsersStore(useCallback(s => s.addUser, []));

  const getRole = useRolesStore(s => s.getRole);

  const handleSubmit = useCallback<
    Exclude<DashboardUsersNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      const role = getRole(values.role);
      if (!role) {
        toast.error('Role not found');
        return;
      }
      addUser({
        id: unique(5),
        ...values,
        role,
      });

      push('.');
    },
    [addUser, getRole, push]
  );

  return <DashboardUsersNewEditForm mode='new' onSubmit={handleSubmit} />;
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'read',
  subject: 'User',
};

export default Page;
