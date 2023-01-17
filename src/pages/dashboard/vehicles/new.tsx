import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

import type { DashboardVehiclesNewEditFormProps } from '$ui/components/sections/dashboard/vehicles/new&edit';
import { DashboardVehiclesNewEditForm } from '$ui/components/sections/dashboard/vehicles/new&edit';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const handleSubmit = useCallback<
    Exclude<DashboardVehiclesNewEditFormProps['onSubmit'], undefined>
  >(values => {
    console.log(values);
  }, []);

  return <DashboardVehiclesNewEditForm mode='new' onSubmit={handleSubmit} />;
};

Page.layout = DashboardLayout;

export default Page;
