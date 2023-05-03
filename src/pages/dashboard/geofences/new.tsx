import React, { useCallback } from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

import type { DashboardGeofencesNewEditFormProps } from '$ui/components/sections/dashboard/geofences/new&edit';
import { DashboardGeofencesNewEditForm } from '$ui/components/sections/dashboard/geofences/new&edit';
import { useGeofencesStore } from '$logic/state/geofences';
import { unique } from '@mrii/mock';
import { useRouter } from 'next/router';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { push } = useRouter();

  const addGeofence = useGeofencesStore(useCallback(s => s.addGeofence, []));

  const handleSubmit = useCallback<
    Exclude<DashboardGeofencesNewEditFormProps['onSubmit'], undefined>
  >(
    values => {
      addGeofence({
        ...values,
        id: unique(5),
      });
      push('.');
    },
    [addGeofence, push]
  );

  return <DashboardGeofencesNewEditForm mode='new' onSubmit={handleSubmit} />;
};

Page.layout = DashboardLayout;

Page.auth = {
  action: 'create',
  subject: 'Geofence',
};

export default Page;
