import React, { useCallback, useMemo } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { useRouter } from 'next/router';
import type { DashboardGeofencesNewEditFormProps } from '$ui/components/sections/dashboard/geofences/new&edit';
import { DashboardGeofencesNewEditForm } from '$ui/components/sections/dashboard/geofences/new&edit';
import { useGeofence, useGeofencesStore } from '$logic/state/geofences';
import { NotFoundPage } from '$ui/components/dumb/not-found-page';
import { SplashScreen } from '$ui/components/shared/splash-screen';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query, isReady, push } = useRouter();
  const id = query.id as string;

  const geofence = useGeofence(id);
  const editGeofence = useGeofencesStore(useCallback(s => s.editGeofence, []));

  const defaultValues = useMemo<DashboardGeofencesNewEditFormProps['defaultValues']>(
    () => geofence,
    [geofence]
  );

  const handleSubmit = useCallback<
    Exclude<DashboardGeofencesNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      const geofence = values;

      editGeofence(id, geofence);
      push('..');
    },
    [editGeofence, id, push]
  );

  if (!isReady) return <SplashScreen />;

  if (!geofence) return <NotFoundPage item='Geofence' />;

  return (
    <DashboardGeofencesNewEditForm
      mode='edit'
      onSubmit={handleSubmit}
      defaultValues={defaultValues}
    />
  );
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'update',
  subject: 'Geofence',
};

export default Page;
