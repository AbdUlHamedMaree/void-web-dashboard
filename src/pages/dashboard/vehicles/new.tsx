import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

import type { DashboardVehiclesNewEditFormProps } from '$ui/components/sections/dashboard/vehicles/new&edit';
import { DashboardVehiclesNewEditForm } from '$ui/components/sections/dashboard/vehicles/new&edit';
import { useVehiclesStore } from '$logic/state/vehicles';
import { unique } from '@mrii/mock';
import { useGetPureUser } from '$logic/state/users';
import { useGetPureDevice } from '$logic/state/devices';
import { useRouter } from 'next/router';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const addVehicle = useVehiclesStore(useCallback(s => s.addVehicle, []));
  const getPureUser = useGetPureUser();
  const getPureDevice = useGetPureDevice();

  (window as any).push = push;

  const handleSubmit = useCallback<
    Exclude<DashboardVehiclesNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      addVehicle({
        id: unique(5),
        ...values,
        manufacturingDate: values.manufacturingDate.toISOString(),
        driver: getPureUser(values.driver),
        device: getPureDevice(values.device),
      });
      push('.');
    },
    [addVehicle, getPureDevice, getPureUser, push]
  );

  return <DashboardVehiclesNewEditForm mode='new' onSubmit={handleSubmit} />;
};

Page.layout = DashboardLayout;

export default Page;
