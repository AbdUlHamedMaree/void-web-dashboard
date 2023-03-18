import React from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { useRouter } from 'next/router';
import { useVehicle } from '$logic/state/vehicles';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  const { query } = useRouter();
  const id = query.id;

  const vehicle = useVehicle(id);

  return <div>View</div>;
};

Page.layout = DashboardLayout;

export default Page;
