import React from 'react';
import type { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  return <div>live</div>;
};

Page.layout = DashboardLayout;

export default Page;
