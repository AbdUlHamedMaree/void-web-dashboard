import React, { useCallback, useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { useRouter } from 'next/router';
import type { DashboardDevicesNewEditFormProps } from '$ui/components/sections/dashboard/devices/new&edit';
import { DashboardDevicesNewEditForm } from '$ui/components/sections/dashboard/devices/new&edit';
import { useDevice, useDevicesStore } from '$logic/state/devices';
import { useGetPureDriver } from '$logic/state/drivers';
import { useGetPureVehicle } from '$logic/state/vehicles';
import { NotFoundPage } from '$ui/components/dumb/not-found-page';
import { SplashScreen } from '$ui/components/shared/splash-screen';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query, isReady, push } = useRouter();
  const id = query.id as string;

  const device = useDevice(id);
  const editDevice = useDevicesStore(useCallback(s => s.editDevice, []));

  const getPureDriver = useGetPureDriver();
  const getPureVehicle = useGetPureVehicle();

  const defaultValues = useMemo<DashboardDevicesNewEditFormProps['defaultValues']>(
    () => ({
      ...device,
      driver: device?.driver?.id,
      vehicle: device?.vehicle?.id,
    }),
    [device]
  );

  const handleSubmit = useCallback<
    Exclude<DashboardDevicesNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      const device = {
        ...values,
        driver: getPureDriver(values.driver),
        vehicle: getPureVehicle(values.vehicle),
      };

      editDevice(id, device);

      push('..');
    },
    [editDevice, getPureDriver, getPureVehicle, id, push]
  );

  if (!isReady) return <SplashScreen />;

  if (!device) return <NotFoundPage item='Device' />;

  return (
    <DashboardDevicesNewEditForm
      mode='edit'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    />
  );
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'update',
  subject: 'Device',
};

export default Page;
