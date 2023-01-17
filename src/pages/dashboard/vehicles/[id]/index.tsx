import React from 'react';
import type { NextPage } from 'next';
import { SplashScreen } from '$ui/components/shared/splash-screen';
import { redirectServerProps } from '$logic/helpers/redirect-server-props';

type PageProps = {};

const Page: NextPage<PageProps> = () => {
  return <SplashScreen />;
};

export default Page;

export const getServerSideProps = redirectServerProps('view');
