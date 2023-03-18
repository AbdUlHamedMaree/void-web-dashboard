import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

import type { DashboardUsersNewEditFormProps } from '$ui/components/sections/dashboard/users/new&edit';
import { DashboardUsersNewEditForm } from '$ui/components/sections/dashboard/users/new&edit';
import { useUsersStore } from '$logic/state/users';
import { unique } from '@mrii/mock';
import { useRouter } from 'next/router';
import { useGetPureVehicle } from '$logic/state/vehicles';
import { useGetPureDevice } from '$logic/state/devices';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const addUser = useUsersStore(useCallback(s => s.addUser, []));
  const getPureVehicle = useGetPureVehicle();
  const getPureDevice = useGetPureDevice();

  const handleSubmit = useCallback<
    Exclude<DashboardUsersNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      addUser({
        id: unique(5),
        ...values,
        vehicle: getPureVehicle(values.vehicle),
        device: getPureDevice(values.device),
      });

      push('.');
    },
    [addUser, getPureDevice, getPureVehicle, push]
  );

  return <DashboardUsersNewEditForm mode='new' onSubmit={handleSubmit} />;
};

Page.layout = DashboardLayout;

export default Page;
