import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

import type { DashboardUsersNewEditFormProps } from '$ui/components/sections/dashboard/users/new&edit';
import { DashboardUsersNewEditForm } from '$ui/components/sections/dashboard/users/new&edit';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const handleSubmit = useCallback<
    Exclude<DashboardUsersNewEditFormProps['onSubmit'], undefined>
  >(values => {
    console.log(values);
  }, []);

  return <DashboardUsersNewEditForm mode='new' onSubmit={handleSubmit} />;
};

Page.layout = DashboardLayout;

export default Page;
