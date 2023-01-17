import { DashboardLayout } from '$ui/components/layouts/dashboard';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return <div>Home</div>;
};

Home.layout = DashboardLayout;

export default Home;
