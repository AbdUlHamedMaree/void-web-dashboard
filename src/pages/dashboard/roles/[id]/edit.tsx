import React, { useCallback, useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { useRouter } from 'next/router';
import type { DashboardVehiclesNewEditFormProps } from '$ui/components/sections/dashboard/vehicles/new&edit';
import { DashboardVehiclesNewEditForm } from '$ui/components/sections/dashboard/vehicles/new&edit';
import { useVehicle, useVehiclesStore } from '$logic/state/vehicles';
import { useGetPureDriver } from '$logic/state/drivers';
import { useGetPureDevice } from '$logic/state/devices';
import { NotFoundPage } from '$ui/components/dumb/not-found-page';
import { SplashScreen } from '$ui/components/shared/splash-screen';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query, isReady, push } = useRouter();
  const id = query.id as string;

  const vehicle = useVehicle(id);
  const editVehicle = useVehiclesStore(useCallback(s => s.editVehicle, []));

  const getPureDriver = useGetPureDriver();
  const getPureDevice = useGetPureDevice();

  const defaultValues = useMemo<DashboardVehiclesNewEditFormProps['defaultValues']>(
    () => ({
      ...vehicle,
      manufacturingDate: vehicle?.manufacturingDate
        ? new Date(vehicle.manufacturingDate)
        : undefined,
      driver: vehicle?.driver?.id,
      device: vehicle?.device?.id,
    }),
    [vehicle]
  );

  const handleSubmit = useCallback<
    Exclude<DashboardVehiclesNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      const vehicle = {
        ...values,
        manufacturingDate: values.manufacturingDate.toISOString(),
        driver: getPureDriver(values.driver),
        device: getPureDevice(values.device),
      };

      editVehicle(id, vehicle);
      push('..');
    },
    [editVehicle, getPureDevice, getPureDriver, id, push]
  );

  if (!isReady) return <SplashScreen />;

  if (!vehicle) return <NotFoundPage item='Vehicle' />;

  return (
    <DashboardVehiclesNewEditForm
      mode='edit'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    />
  );
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'update',
  subject: 'Role',
};

export default Page;
