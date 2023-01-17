import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

import type { DashboardDevicesNewEditFormProps } from '$ui/components/sections/dashboard/devices/new&edit';
import { DashboardDevicesNewEditForm } from '$ui/components/sections/dashboard/devices/new&edit';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const handleSubmit = useCallback<
    Exclude<DashboardDevicesNewEditFormProps['onSubmit'], undefined>
  >(values => {
    console.log(values);
  }, []);

  return <DashboardDevicesNewEditForm mode='new' onSubmit={handleSubmit} />;
};

Page.layout = DashboardLayout;

export default Page;
