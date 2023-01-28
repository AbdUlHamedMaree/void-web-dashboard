import React from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import { Maps } from '$ui/components/dumb/maps';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  return <Maps />;
};

Page.layout = DashboardLayout;

export default Page;
