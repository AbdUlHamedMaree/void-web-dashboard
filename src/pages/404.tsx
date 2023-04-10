import React from 'react';
import type { NextPage } from 'next';
import { NotFoundPage } from '$ui/components/dumb/not-found-page';

type PageProps = {};

const Page: NextPage<PageProps> = () => <NotFoundPage />;

export default Page;
