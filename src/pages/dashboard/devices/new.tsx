import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

import type { DashboardDevicesNewEditFormProps } from '$ui/components/sections/dashboard/devices/new&edit';
import { DashboardDevicesNewEditForm } from '$ui/components/sections/dashboard/devices/new&edit';
import { useDevicesStore } from '$logic/state/devices';
import { unique } from '@mrii/mock';
import { useRouter } from 'next/router';
import { useGetPureVehicle } from '$logic/state/vehicles';
import { useGetPureDriver } from '$logic/state/drivers';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const addDevice = useDevicesStore(useCallback(s => s.addDevice, []));
  const getPureVehicle = useGetPureVehicle();
  const getPureDriver = useGetPureDriver();

  const handleSubmit = useCallback<
    Exclude<DashboardDevicesNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      addDevice({
        id: unique(5),
        ...values,
        vehicle: getPureVehicle(values.vehicle),
        driver: getPureDriver(values.driver),
      });

      push('.');
    },
    [addDevice, getPureDriver, getPureVehicle, push]
  );

  return <DashboardDevicesNewEditForm mode='new' onSubmit={handleSubmit} />;
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'create',
  subject: 'Device',
};

export default Page;
