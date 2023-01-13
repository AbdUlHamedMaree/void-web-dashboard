import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import type { DashboardUsersNewEditFormProps } from '$ui/components/sections/dashboard/users/new&edit';
import { DashboardUsersNewEditForm } from '$ui/components/sections/dashboard/users/new&edit';
import { useRouter } from 'next/router';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query } = useRouter();
  const id = query.id;

  const handleSubmit = useCallback<
    Exclude<DashboardUsersNewEditFormProps['onSubmit'], undefined>
  >(values => {
    console.log(values);
  }, []);

  return <DashboardUsersNewEditForm mode='edit' onSubmit={handleSubmit} />;
};

Page.layout = DashboardLayout;

export default Page;
