import React from 'react';
import { NextPage } from 'next';
import { DashboardLayout } from '$ui/components/layouts/dashboard';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  return <div>Users</div>;
};

Page.layout = DashboardLayout;

export default Page;
