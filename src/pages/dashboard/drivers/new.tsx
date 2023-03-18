import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

import type { DashboardDriversNewEditFormProps } from '$ui/components/sections/dashboard/drivers/new&edit';
import { DashboardDriversNewEditForm } from '$ui/components/sections/dashboard/drivers/new&edit';
import { useDriversStore } from '$logic/state/drivers';
import { unique } from '@mrii/mock';
import { useRouter } from 'next/router';
import { useGetPureVehicle } from '$logic/state/vehicles';
import { useGetPureDevice } from '$logic/state/devices';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const addDriver = useDriversStore(useCallback(s => s.addDriver, []));
  const getPureVehicle = useGetPureVehicle();
  const getPureDevice = useGetPureDevice();

  const handleSubmit = useCallback<
    Exclude<DashboardDriversNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      addDriver({
        id: unique(5),
        ...values,
        vehicle: getPureVehicle(values.vehicle),
        device: getPureDevice(values.device),
      });

      push('.');
    },
    [addDriver, getPureDevice, getPureVehicle, push]
  );

  return <DashboardDriversNewEditForm mode='new' onSubmit={handleSubmit} />;
};

Page.layout = DashboardLayout;

export default Page;
