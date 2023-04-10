import React, { useCallback, useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import type { DashboardUsersNewEditFormProps } from '$ui/components/sections/dashboard/users/new&edit';
import { DashboardUsersNewEditForm } from '$ui/components/sections/dashboard/users/new&edit';
import { useRouter } from 'next/router';
import { useUser, useUsersStore } from '$logic/state/users';
import { NotFoundPage } from '$ui/components/dumb/not-found-page';
import { SplashScreen } from '$ui/components/shared/splash-screen';
import { useRolesStore } from '$logic/state/roles';
import { toast } from 'react-toastify';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query, isReady, push } = useRouter();
  const id = query.id as string;

  const user = useUser(id);
  const editUser = useUsersStore(useCallback(s => s.editUser, []));
  const getRole = useRolesStore(s => s.getRole);

  const defaultValues = useMemo<DashboardUsersNewEditFormProps['defaultValues']>(
    () => ({
      ...user,
      role: user?.role.id,
    }),
    [user]
  );

  const handleSubmit = useCallback<
    Exclude<DashboardUsersNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      const role = getRole(values.role);

      if (role) {
        toast.error('Role not found');
        return;
      }

      const user = {
        ...values,
        role,
      };

      editUser(id, user);
      push('..');
    },
    [editUser, getRole, id, push]
  );

  if (!isReady) return <SplashScreen />;

  if (!user) return <NotFoundPage item='User' />;

  return (
    <DashboardUsersNewEditForm
      mode='edit'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    />
  );
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'update',
  subject: 'User',
};

export default Page;
