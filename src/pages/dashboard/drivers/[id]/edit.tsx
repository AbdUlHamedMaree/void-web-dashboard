import React, { useCallback, useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import type { DashboardDriversNewEditFormProps } from '$ui/components/sections/dashboard/drivers/new&edit';
import { DashboardDriversNewEditForm } from '$ui/components/sections/dashboard/drivers/new&edit';
import { useRouter } from 'next/router';
import { useDriver, useDriversStore } from '$logic/state/drivers';
import { useGetPureVehicle } from '$logic/state/vehicles';
import { useGetPureDevice } from '$logic/state/devices';
import { NotFoundPage } from '$ui/components/dumb/not-found-page';
import { SplashScreen } from '$ui/components/shared/splash-screen';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query, isReady, push } = useRouter();
  const id = query.id as string;

  const driver = useDriver(id);
  const editDriver = useDriversStore(useCallback(s => s.editDriver, []));

  const getPureVehicle = useGetPureVehicle();
  const getPureDevice = useGetPureDevice();

  const defaultValues = useMemo<DashboardDriversNewEditFormProps['defaultValues']>(
    () => ({
      ...driver,
      vehicle: driver?.vehicle?.id,
      device: driver?.device?.id,
    }),
    [driver]
  );

  const handleSubmit = useCallback<
    Exclude<DashboardDriversNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      const driver = {
        ...values,
        vehicle: getPureVehicle(values.vehicle),
        device: getPureDevice(values.device),
      };

      editDriver(id, driver);
      push('..');
    },
    [editDriver, getPureDevice, getPureVehicle, id, push]
  );

  if (!isReady) return <SplashScreen />;

  if (!driver) return <NotFoundPage item='Driver' />;

  return (
    <DashboardDriversNewEditForm
      mode='edit'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    />
  );
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'update',
  subject: 'Driver',
};

export default Page;
